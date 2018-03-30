'use strict';


function random(min, max) {
  const diff = max - min + 1;
  return Math.floor(Math.random() * diff) + min;
}


const Readable  = require("stream").Readable;

class CReadable extends Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    this.push(random(0, 9).toString());
  }
}


const Writable  = require('stream').Writable;

class CWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}


const Transform  = require('stream').Transform;

class CTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {    
    this.push(`${chunk.toString()}___${random(0, 99)}`);    
    setTimeout(() => callback(), 1000);
  }
}


const read = new CReadable();
const transform = new CTransform();
const write = new CWritable();

read.pipe(transform);
transform.pipe(write);
