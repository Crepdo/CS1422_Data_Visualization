var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, 9])

var problyColor = d3.scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, 100])