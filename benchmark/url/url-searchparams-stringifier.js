'use strict';
const common = require('../common.js');
const Buffer = require('buffer').Buffer;
const URLSearchParams = new (require('url').URL)('a:').searchParams.constructor;

const inputs = {
  noencode: 'foo=bar&baz=quux&xyzzy=thud',
  // multicharsep: 'foo=bar&&&&&&&&&&baz=quux&&&&&&&&&&xyzzy=thud',
  multicharsep: '&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
  encodemany: '%66%6F%6F=bar&%62%61%7A=quux&xyzzy=%74h%75d',
  encodelast: 'foo=bar&baz=quux&xyzzy=thu%64',
  multivalue: 'foo=bar&foo=baz&foo=quux&quuy=quuz',
  multivaluemany: 'foo=bar&foo=baz&foo=quux&quuy=quuz&foo=abc&foo=def&' +
                  'foo=ghi&foo=jkl&foo=mno&foo=pqr&foo=stu&foo=vwxyz',
  manypairs: 'a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'
};

const bench = common.createBenchmark(main, {
  type: Object.keys(inputs),
  n: [1e5]
});

function main(conf) {
  const input = inputs[conf.type];
  const n = conf.n | 0;

  const params = new URLSearchParams(input);

  bench.start();
  // Using Buffer.from to prevent JS version from cheating with ropes instead
  // of strings
  for (var i = 0; i < n; i += 1)
    Buffer.from(params.toString());
  bench.end(n);
}
