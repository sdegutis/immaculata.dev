import * as babel from '@babel/core';
import { readFileSync } from 'fs';

export class Compiler {

  packageJson = JSON.parse(readFileSync('package.json').toString('utf8'));

  compile(code: string, realFilePath?: string, browserFilePath?: string) {
    let prefix = '';
    if (browserFilePath && !browserFilePath.startsWith('/@imlib/')) {
      const levels = browserFilePath.match(/\//g)!.length - 1;
      prefix = '.' + '/..'.repeat(levels);
    }

    const plugins: babel.PluginItem[] = [
      [require('@babel/plugin-transform-typescript'), { isTSX: true }],
      [require('@babel/plugin-transform-react-jsx'), { runtime: 'automatic', importSource: '/@imlib', throwIfNamespace: false }],
      this.#makeImportRenamer(!!browserFilePath),
    ];

    if (realFilePath) {
      plugins.unshift(require('@babel/plugin-transform-modules-commonjs'));
    }

    return {
      code: babel.transformSync(code, {
        filename: realFilePath ?? browserFilePath,
        plugins,
      })!.code!,
    };
  }

  #makeImportRenamer(inBrowser: boolean): babel.PluginItem {
    return {
      visitor: {
        ImportDeclaration: {
          enter: (path) => {
            const dep = path.node.source.value;
            if (dep === '/@imlib/jsx-runtime') {
              path.node.source.value = (inBrowser ? '/@imlib/jsx-browser.js' : '/@imlib/jsx-node.js');
            }
            else if (inBrowser) {
              const version = (
                this.packageJson.devDependencies[dep] ??
                this.packageJson.dependencies[dep]
              );
              if (version) {
                path.node.source.value = `https://cdn.jsdelivr.net/npm/${dep}@${version}/+esm`;
              }
              else {
                const typeDep = '@types/' + dep.replace(/^@(.+?)\/(.+)/, '$1__$2');
                if (this.packageJson.devDependencies[typeDep]) {
                  path.node.source.value = `https://cdn.jsdelivr.net/npm/${dep}/+esm`;
                }
              }
            }
          }
        }
      }
    };
  }

}
