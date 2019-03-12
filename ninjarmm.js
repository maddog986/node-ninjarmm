/**
 * Copyright (C) 2019. Drew Gauderman
 *
 * This source code is licensed under the MIT license found in the
 * README.md file in the root directory of this source tree.
 */

/*
 * Built for NinjaRMM.com API v0.1.2
 * https://ninjaresources.s3.amazonaws.com/PublicApi/0.1.2/NinjaRMM%20Public%20API%20v0.1.2.pdf
 */

//requirements
const request = require('request'),
  crypto = require('crypto');

//export the sonar class
module.exports = class NinjaRMM {
  //class startup
  constructor(opts) {
    //required fields
    ['private', 'public'].forEach(name => {
      if (!opts.hasOwnProperty(name)) {
        throw new Error('options.' + name + ' is a required argument.');
      }
    });

    //base options
    this.opts = {
      host: 'api.ninjarmm.com/v1', //default host field
      ...opts
    };
  }

  //single function that builds the request
  modem(opts, cb) {
    //datetime
    const dateTime = new Date().toUTCString();

    //build signature to sign
    const stringToSign = ['GET', null, null, dateTime, `/v1/${opts.endpoint}`].join('\n');

    //the signature for authorization
    const signature = crypto
      .createHmac('sha1', this.opts.private)
      .update(Buffer.from(stringToSign).toString('base64'))
      .digest()
      .toString('base64');

    //build request options
    let options = {
      uri: `https://${this.opts.host}/${opts.endpoint}`,
      method: opts.method || 'GET',
      headers: {
        Authorization: `NJ ${this.opts.public}:${signature}`, //authorization string
        Date: dateTime //when the authorization string was built
      },
      json: true //return body as json
    };

    //call the callback function
    if (cb) {
      return request(options, cb);
    }

    //no callback function so return a promise

    //return as a promise
    return new Promise((res, rej) =>
      request(options, (e, r) => {
        //error during request
        if (e) return rej(e);

        //get the json
        const jsonBody = r.body;

        //ninja returned an error
        if (jsonBody.error) {
          rej(jsonBody);
        }

        //return the json
        res(jsonBody);
      })
    );
  }

  //get something
  get(endpoint, opts = {}, cb) {
    //if no opts but callback function
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    //if not callback function then returns a promise
    return this.modem({
        endpoint: endpoint, //the api endpoint
        ...opts //all extra options that may be passed in
      },
      cb
    );
  }
};