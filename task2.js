'use strict';

const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('md5');

const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("output.txt");

const Transform  = require('stream').Transform;

class CTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push(`${hash.digest('hex').toString()}`);    
    callback();
  }
}

const transform = new CTransform();

input.pipe(transform);
transform.pipe(process.stdout);
transform.pipe(output);

