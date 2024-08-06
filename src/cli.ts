#!/usr/bin/env node

import { startDevServer } from './dev-server';
import { generateFiles } from './file-generator';
import { Runtime } from './runtime';
import { processSite } from './ssp';

const runtime = new Runtime({
  siteDir: "site",
  processor: processSite,
});

const fns: Record<string, () => void> = {
  dev: () => startDevServer(runtime),
  generate: () => generateFiles(runtime),
};

const cmd = process.argv[2] ?? '';
const fn = fns[cmd] ?? showHelp;
fn();

function showHelp() {
  console.log("Usage: imlib <dev | generate>");
}
