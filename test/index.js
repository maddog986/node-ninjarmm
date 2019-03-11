/**
 * Copyright (C) 2019. Drew Gauderman
 *
 * This source code is licensed under the MIT license found in the
 * README.md file in the root directory of this source tree.
 */

//must setup environment variables to run this test
if (!process.env.PRIVATE || !process.env.PUBLIC) {
  throw new Error('SETUP YOUR ENVIRONMENT VARIABLES');
}

//include the class
const NinjaRMM = require('../ninjarmm.js');

//start up the client using promise return
const nClient = new NinjaRMM({
  private: process.env.PRIVATE,
  public: process.env.PUBLIC
});

//get customers example
nClient
  .get('customers')
  .then(response => console.log('customers', response))
  .catch(err => console.log('ERROR:', err));

//get devices example using a callback function
nClient.get('devices', function(err, devices) {
  if (err) return console.log('ERROR', err);

  console.log('devices', devices);
});
