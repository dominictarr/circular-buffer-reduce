module.exports = function (acc, current, iter) {
  var width = acc.width, max = acc.max
  if(!iter) iter = current, current = acc.current
  var _cur = ~~(current/width)
  var cur = ~~(acc.current/width)
  var start = (cur - max) + 1
  var diff = _cur - cur
  for(var i = 0; i < max; i++) {
    if(diff+i < 0 || diff+i >= max) iter(null, i)
    else {
      var j = (start + i + diff)%max
      iter(acc.data[j], i)
    }
  }
}











