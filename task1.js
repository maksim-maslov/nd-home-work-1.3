'use strict';

const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('md5');

const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");

input.pipe(hash);
hash.pipe(process.stdout);
hash.pipe(output);

