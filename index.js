module.exports = function (id, reduce, width, max) {
  return function (acc, data) {
    if(!acc) acc = {data: new Array(max), current: null}
    var ts = id(data)
    var cur = ~~(ts/width), _cur = ~~(acc.current/width)
    if(cur !== _cur) {
      _cur = Math.max(_cur, cur - max)
      while(_cur++ < cur)
        delete acc.data[_cur % max]
      acc.data[cur % max] = reduce(null, data)
    }
    else
      acc.data[cur % max] = reduce(acc.data[cur % max], data)
    acc.current = ts
    return acc
  }
}

