const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', '_worker.js');
const outputFile = inputFile;

console.log('[obfuscate] Reading _worker.js...');
const code = fs.readFileSync(inputFile, 'utf-8');

console.log('[obfuscate] Obfuscating (lightweight preset)...');
const result = JavaScriptObfuscator.obfuscate(code, {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: false,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  transformObjectKeys: false,
  unicodeEscapeSequence: false
});

const obfuscatedCode = result.getObfuscatedCode();
fs.writeFileSync(outputFile, obfuscatedCode, 'utf-8');

const originalSize = (Buffer.byteLength(code) / 1024).toFixed(1);
const obfuscatedSize = (Buffer.byteLength(obfuscatedCode) / 1024).toFixed(1);
console.log(`[obfuscate] Done! ${originalSize}KB -> ${obfuscatedSize}KB`);
