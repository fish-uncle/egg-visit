'use strict';
const uuid = require('uuid/v4');
const crypto = require('crypto');

module.exports = {
  uuid() {
    return uuid()
  },
  get encrypt() {
    return str => {
      let secret = this.config.keys;
      secret instanceof Array ? secret = secret[0] : void 0;
      const cipher = crypto.createCipher('aes192', secret);
      let enc = cipher.update(str, 'utf8', 'hex');
      enc += cipher.final('hex');
      return enc;
    }
  },
  get decrypt() {
    return str => {
      let secret = this.config.keys;
      secret instanceof Array ? secret = secret[0] : void 0;
      const decipher = crypto.createDecipher('aes192', secret);
      let dec = decipher.update(str, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    }
  }
};