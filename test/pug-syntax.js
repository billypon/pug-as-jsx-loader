/* global describe it */
/* eslint no-undef: "error" */
require('should');
const run = require('./helper').run;

/* eslint-disable */
const tests = [
['interpolation',
`div(foo=bar)
div(onClick=(() => click()))
div= foo
div #{bar}`,
`<>
  <div foo={bar}></div>
  <div onClick={() => click()}></div>
  <div>{foo}</div>
  <div>{bar}</div>
</>`],

['conditional',
`div
  if foo
    div bar

  if foo
    div foo
  else
    div bar

  if foo
    div foo
  else if bar
    div bar
  else
    div baz`,
`<div>
  {foo && <div>bar</div>}
  {foo ? <div>foo</div> : <div>bar</div>}
  {foo ? <div>foo</div> : bar ? <div>bar</div> : <div>baz</div>}
</div>`],

['each',
`div
  each value in array
    div= value

  each value, index in array
    div(key=index)= value`,
`<div>
  {array.map(value => (
    <div>{value}</div>
  ))}
  {array.map((value, index) => (
    <div key={index}>{value}</div>
  ))}
</div>`],

['case',
`div
  case value
    when 'foo'
      div foo
    when 'bar': div bar
    default
      div baz`,
`<div>
  {(() => {
    switch (value) {
      case 'foo':
        return <div>foo</div>
      case 'bar':
        return <div>bar</div>
      default:
        return <div>baz</div>
    }
    return null
  })()}
</div>`],
];

/* eslint-enable */

describe('pug syntax', () => {
  tests.forEach(([name, input, expected]) => {
    it(name, () => run(input).then((output) => {
      output.jsx.should.be.eql(expected);
    }));
  });
});
