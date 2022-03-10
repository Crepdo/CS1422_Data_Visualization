var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0,9])
    
console.log(myColor(3));