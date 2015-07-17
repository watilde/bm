# bm.js
test code.

## Downloads
+ Development Version (20KB): [bm.js](dist/bm.js)
+ Production Version (6.2KB): [bm.min.js](dist/bm.min.js)

## Directory detail
+ dist
+ src
+ test

### dist
The directory is where to put the code used by user.

### src
This directory is where to write the main code. I separated many code as module like common npm. lib directory is a little bit special. I put here some common code as module called from bm.js inside like private function.

### test
This directory is where to write test code. Test code are using mocha, chai, and sinon.js.

## Development
Install devDependencies
```
$ npm install
```

Build src code
```
$ npm run build
```

Run test
```
$ npm test
```
