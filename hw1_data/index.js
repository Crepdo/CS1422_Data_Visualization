const numerly = `A couple,A few ,Dozens,A lot,Some,Several,Many,Fractions of,Scores of,Hundreds of
2,3,30,20,4,7,12,0.15,80,250
2,3,24,12,6,10,50,0.5,40,200
2,5,30,15,5,4,25,0.25,500,500
2,5,30,15,5,4,25,0.25,500,500
2,3,48,50,3,5,5,0.01,100000,599
2,3,36,10,5,7,20,0.5,400,400
2,3,36,9,4,3,7,4,8,200
2,3,50,50,15,10,20,0.5,100,1000
2,4,36,30,5,8,20,0.2,100,500
2,5,36,16,10,8,25,4,1000,300
2,4,36,80,3,4,7,0.5,30000,300
2,6,36,50,4,8,50,0.33,100,200
2,3,36,25,4,7,10,0.2,50,300
2,3,48,10,8,7,60,0.25,40,400
2,3,12,10,3,4,8,0.25,14,350
2,3,24,10,2,4,10,0.1,6,200
2,3,36,100,5,7,30,1,40,3000
2,3,36,20,3,5,9,0.1,50,300
5,2,12,20,3,10,8,1,3,200
2,3,24,10,3,2,10,0.01,40,200
2,3,36,10,3,5,10,0.1,300,300
2,3,48,12,6,6,40,15,80,400
3,4,60,20,3,7,25,0.25,100,250
2,3,12,20,3,8,20,3,30,300
2,3,24,10,5,4,25,0.1,40,250
2,3,36,9,4,7,10,0.5,60,200
2,3,24,25,5,10,25,0.25,100,200
2,3,36,10,4,5,20,0.25,2000,300
2,3,36,12,4,7,5,0.1,60,500
2,3,30,14,4,7,7,2,200,200
2,3,36,47,5,4,8,0.4,67,318
3,4,36,10,5,8,20,0.5,40,300
2,3,24,2948,5,7,1000,10,50,500
4,7,12,43,5,5,30,0.5,25,120
8,10,50,20,4,8,100,0.1,100,700
2,3,36,8,5,4,25,3,100,300
2,3,12,10,6,5,20,0.4,100,100
3,5,40,23,6,6,58,33,40,400
2,3,36,7,5,4,7,0.5,40,500
2,3,24,12,4,7,6,0.1,300,300
2,3,24,20,5,10,10,50,1000,500
3,5,36,10,5,10,15,0.5,40,200
2,3,36,12,4,5,20,0.2,200,300
2,3,60,7,3,7,5,0.1,80,300
2,3,120,12,3,5,25,0.1,80,300
2,4,36,20,7,5,80,100,500,500`

var numerlyData = d3.csvParse(numerly)
console.log(numerlyData)

// var numberlyDiv = d3.select("#numerly")
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 50, left: 70},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
function chart1(data) {

    // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.Species;})
      .rollup(function(d) {
        q1 = d3.quantile(d.map(function(g) {console.log(g); return g.Sepal_Length;}).sort(d3.ascending),.25)
        median = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.5)
        q3 = d3.quantile(d.map(function(g) { return g.Sepal_Length;}).sort(d3.ascending),.75)
        interQuantileRange = q3 - q1
        min = q1 - 1.5 * interQuantileRange
        max = q3 + 1.5 * interQuantileRange
        return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
      })
      .entries(data)
  
    // Show the Y scale
    var y = d3.scaleBand()
      .range([ height, 0 ])
    //   .domain(["setosa", "versicolor", "virginica"])
      .domain(["A couple","A few ","Dozens","A lot","Some","Several","Many","Fractions of","Scores of","Hundreds of"
      ])
      .padding(.4);
    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()
  
    // Show the X scale
    var x = d3.scaleLinear()
    .domain([0,1000000000])
      .range([0, width])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .select(".domain").remove()
  
    // Color scale
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([0,1000000000])
  
    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .text("Sepal Length");
  
    // Show the main vertical line
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.value.min))})
        .attr("x2", function(d){return(x(d.value.max))})
        .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
        .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
        .attr("stroke", "black")
        .style("width", 40)

  }
chart1(numerlyData);    