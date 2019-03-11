# NinjaRMM Node Module

This is an unofficial [NinjaRMM](https://ninjarmm.com)'s [API](https://ninjaresources.s3.amazonaws.com/PublicApi/0.1.2/NinjaRMM%20Public%20API%20v0.1.2.pdf) Node client.

Test live at https://codesandbox.io/s/github/maddog986/node-ninjarmm

## Installation

```
npm install node-ninjarmm
```

## Usage

First you need to instantiate it.

```javascript
const NinjaRMM = require('../ninjarmm.js');

const ninjaClient = new NinjaRMM({
  private: 'PRIVATE KEY',
  public: 'PUBLIC KEY'
});
```

Using the created client, call the methods you need, example:

```javascript
//get customers example
ninjaClient
  .get('customers')
  .then(response => console.log('customers', response))
  .catch(err => console.log('ERROR:', err));

//get devices example
ninjaClient
  .get('devices')
  .then(response => console.log('devices', response))
  .catch(err => console.log('ERROR:', err));
```

## Release Notes

[See Changelog](https://github.com/maddog986/node-ninjarmm/blob/master/CHANGELOG.md)

## License

MIT License

Copyright(c) 2019 Drew Gauderman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
