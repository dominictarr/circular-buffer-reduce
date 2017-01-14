
# circular-buffer-reduce

apply a reduce function to a circular buffer.

I created this for performance monitoring, I need to make performance measurements,
but do not require high precision measurements to be stored forever. For example,
I want to keep a measure of bandwidth used per second, but I don't really need to track
the bandwidth per second for the entire time the app has been running - the last 60 seconds
is enough! It is useful to know the history of performance, but instead we could track the
averages over the last hour at the precision of minutes, not seconds, and then the past
few days at the precision of hours!

This means we can measure performance characteristics over a wide range of time spans
without using much resources at all. This means we can add performance monitoring to our
app without adversely effecting performance.

## Example

``` js
var stats = require('stats/mutable')
function id (item) { return item.ts }
function reduce (acc, item) {
  return stats(acc, item.value)
}
var circular_reduce = require('circular-buffer-reduce')(id, reduce, 1000, 60)


var acc
//whenever something happens, apply the reduce function.
acc = circular_reduce(acc, {ts: Date.now(), value: Math.random()})
```

## api - createCircularReduce(getTs, reduce, width, max) => circular_reduce

`createCircularReduce` returns a reduce function that aggregates incoming items
into `max` aggregations that are each `width` units wide. If you want to track
the last minute worth of seconds, and each item has a javascript timestamp
(in milliseconds) then `width` should be `1000`, and `max` should be `60`.

`getTs` is a function that returns the timestamp for the current item passed to
`circular_reduce`. `reduce` is a standard reduce function that takes the current
accumulator and the data item. since there is no option for a initial item,
`reduce` must accept `reduce(null, item)` as the first item in a new accumulation.
