var tape = require('tape')

var W = require('../')
var Each = require('../each')

function ts (e) { return e.ts }
function sum (a, e) { return (a|0) + e.value }

var each = Each(1000, 10)

function toArray (acc, current) {
  var ary = []
  each(acc, current || acc.current, function (value) {
    ary.push(isNaN(value) ? null : value)
  })
  return ary
}

tape('simple', function (t) {
  var reduce = W(ts, sum, 1000, 10)

  var acc = null
  acc = reduce(acc, {ts: 0, value: 1})
  t.deepEqual(acc, {data: [1], current: 0})
  acc = reduce(acc, {ts: 1, value: 2})
  t.deepEqual(acc, {data: [3], current: 1})
  acc = reduce(acc, {ts: 1001, value: 3})
  t.deepEqual(acc, {data: [3, 3], current: 1001})
  acc = reduce(acc, {ts: 3001, value: 4})
  t.deepEqual(acc, {data: [3, 3, , 4], current: 3001})
  console.log(acc)
  acc = reduce(acc, {ts: 4001, value: 5})
  acc = reduce(acc, {ts: 5001, value: 6})
  acc = reduce(acc, {ts: 6001, value: 7})

  acc = reduce(acc, {ts: 7001, value: 8})
  acc = reduce(acc, {ts: 8001, value: 9})
  acc = reduce(acc, {ts: 9001, value: 10})

  t.deepEqual(acc, {data: [3, 3, , 4, 5, 6, 7, 8, 9, 10], current: 9001})
  t.deepEqual(toArray(acc), [3, 3, null, 4, 5, 6, 7, 8, 9, 10])
  t.deepEqual(toArray(acc, 12000), [4, 5, 6, 7, 8, 9, 10, null, null, null])

  acc = reduce(acc, {ts: 10001, value: 11})

  t.deepEqual(acc, {data: [11, 3, , 4, 5, 6, 7, 8, 9, 10], current: 10001})
  t.deepEqual(toArray(acc), [3, null, 4, 5, 6, 7, 8, 9, 10, 11])

  acc = reduce(acc, {ts: 12001, value: 12})
  t.deepEqual(acc, {data: [11, , 12, 4, 5, 6, 7, 8, 9, 10], current: 12001})

  acc = reduce(acc, {ts: 15001, value: 15})
  t.deepEqual(acc, {data: [11, , 12, , , 15, 7, 8, 9, 10], current: 15001})

  acc = reduce(acc, {ts: 21001, value: 22})
  t.equal(acc.data.length, 10)

  t.deepEqual(acc,{data: [, 22,12, , ,15,,,,,], current: 21001})
  acc = reduce(acc, {ts: 26001, value: 26})
  t.deepEqual(acc,{data: [, 22,, , ,,26,,,,], current: 26001})

  acc = reduce(acc, {ts: 64001, value: 64})
  t.deepEqual(acc,{data: [,,, ,64,,,,,,], current: 64001})

  t.deepEqual(toArray(acc), [null, null, null, null, null, null, null, null, null, 64])

  t.deepEqual(toArray(acc, 73001), [64, null, null, null, null, null, null, null, null, null])

  t.end()

})


