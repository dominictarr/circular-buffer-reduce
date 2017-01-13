
var stats = require('statistics')
function reduce (a, i) {
  return stats(a, i.value)
}
var reduce1 = require('./')(function (item) { return item.ts }, reduce, 1000, 60)
var reduce2 = require('./')(function (item) { return item.ts }, reduce, 1000*60, 60)
//var reduce2 = require('./')(function (item) { return item.ts }, function (a, i) { return stats(a, i.value) }, 60)
var acc1, acc2

function line(ary) {
  return ary.map(function (e) { return ~~(1000*e.value.mean)/1000}).join(', ')
}
;(function next () {
  setTimeout(function () {
    var data = {ts: Date.now(), value: Math.random() }
    acc1 = reduce1(acc1, data)
    acc2 = reduce2(acc2, data)
//    console.log(line(acc2))
    next()
  }, Math.random()*100)
})() 


setInterval(function () {
  console.log(acc1)
//  console.log(line(acc1.data))
//  console.log(line(acc2.data))
}, 1000)

