const dataset2 = `Almost Certainly,Highly Likely,Very Good Chance,Probable,Likely,Probably,We Believe,Better Than Even,About Even,We Doubt,Improbable,Unlikely,Probably Not,Little Chance,Almost No Chance,Highly Unlikely,Chances Are Slight
95,80,85,75,66,75,66,55,50,40,20,30,15,20,5,25,25
95,75,75,51,75,51,51,51,50,20,49,25,49,5,5,10,5
95,85,85,70,75,70,80,60,50,30,10,25,25,20,1,5,15
95,85,85,70,75,70,80,60,50,30,10,25,25,20,1,5,15
98,95,80,70,70,75,65,60,50,10,50,5,20,5,1,2,10
95,99,85,90,75,75,80,65,50,7,15,8,15,5,1,3,20
85,95,65,80,40,45,80,60,45,45,35,20,40,20,10,20,30
97,95,75,70,70,80,75,55,50,25,30,15,25,20,3,5,10
95,95,80,70,65,80,65,55,50,20,30,35,35,15,5,15,10
90,85,90,70,75,70,65,60,52,60,20,30,45,20,10,6,25
90,90,85,70,60,75,80,60,50,25,1,15,40,20,15,10,15
99,97,70,75,75,75,90,67,50,17,10,10,25,17,2,3,5
60,80,70,70,60,55,60,55,50,20,5,30,30,10,5,5,15
88.7,69,80,51,70,60,50,5,50,30,49,20,40,13,2,3,5
99,98,85,85,75,65,5,65,50,100,1,10,100,100,95,90,35
95,90,80,70,70,80,85,60,50,30,40,30,40,15,1,5,10
97,90,70,51,65,60,75,51,50,5,10,15,10,15,2,7,5
99,95,75,60,65,75,80,55,50,25,3,15,30,10,1,5,40
95,95,90,60,80,75,75,60,50,25,10,10,20,25,5,5,10
95,90,75,80,75,75,50,50.1,50,25,20,25,49.9,25,5,5,10
90,80,80,75,80,75,60,60,50,40,30,10,25,20,5,5,5
92,85,75,60,70,60,85,57,50,25,33,10,10,7,3,3,13
98,90,75,80,85,85,85,60,49,5,15,2,10,2,5,5,5
98,92,91,85,85,85,70,60,50,30,7,18,27,17,2,3,10
90,90,75,75,65,80,80,60,50,12,25,35,30,20,2,10,20
95,85,80,75,65,75,50,60,50,33,10,25,25,10,2,5,5
95,90,80,60,75,60,60,51,50,10,49,20,40,15,5,20,10
98,95,75,85,90,85,75,98,50,40,7,10,25,10,2,5,5
85,85,90,60,65,76,50,51,50,33,25,25,20,10,1,15,15
80,15,74,65,65,65,60,60,50,38,29,36,34,29,7,15,30
98,80,75,65,70,55,60,55,50,25,20,12,35,15,1,8,15
96,85,80,75,70,90,80,60,50,5,9,3,20,20,10,5,12
99,85,75,80,75,90,50,51,50,1,0.001,10,10,5,0.05,10,5
85,84,87,50,60,65,50,60,50,60,3,24,30,20,5,15,30
90,95,80,70,90,60,60,80,40,25,3,5,20,4,2,2,30
95,85,80,64,80,80,75,80,50,10,10,25,20,8,2,5,5
98,96,90,90,90,80,70,53,50,40,4,30,30,8,1,5,10
98,96,82,75,86,80,45,69,52,21,12,34,26,18,7,3,13
80,90,70,80,80,80,70,60,50,10,0,20,30,10,1,10,10
95,90,90,80,90,90,85,55,48,15,20,35,15,15,5,8,10
99,90,80,90,60,50,90,60,50,40,20,10,40,5,1,30,15
85,80,80,70,70,70,65,51,45,30,15,35,30,10,5,15,20
90,70,80,75,70,65,70,60,50,15,35,20,25,5,2,10,10
95,80,90,75,70,75,100,60,50,10,5,10,20,10,1,5,5
85,90,75,65,65,60,95,55,50,95,5,20,40,25,2,5,10
95,80,75,75,60,68,55,51,49,25,20,35,40,17,5,10,15`

// canvas layout
var problyData = d3.csvParse(dataset2);
var target_canvas = d3.select("#chart2");
var margin = { top: 50, right: 100, bottom: 50, left: 100 };

const width2 = 800 - margin.left - margin.right;
const height2 = 600 - margin.top - margin.bottom;

var svg = target_canvas
    .append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    // with this convention, all subsequent code can ignore margins

// color style & range
var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateViridis)
    .domain([0,100])

// x axis
var x = d3
    .scaleLinear()
    .range([0, width2])
    .domain([-10, 110]);
    
svg.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .attr("class", "xAxis")
    .call(d3.axisBottom(x)
        .ticks(10)
        .tickFormat(
            function (d) {
                //console.log(d)
                return d+"%";
            }
        ).tickSize(-height2)
    ).select(".domain").remove();

// x axis title
svg.append("text")
    .attr("class", "xlabel")
    .attr("x", width2*0.7/2)
    .attr("y", height2+30)
    .attr("dx", ".75em")
    .text("Probability");

// y axis

// Create a Y scale for densities
const y = d3.scaleLinear()
    .domain([0, 0.6])
    .range([ height2, 0]);


// y labels
label_list = [];
for (var k in problyData[0]) { label_list.push(k);};

var yTag = d3
    .scaleBand()
    .range([height2, 0])
    .domain(label_list)
    .paddingInner(1)

svg.append("g")
    .attr("class", "xAxis")
    .call(d3.axisLeft(yTag).tickSize(-width2)).select(".domain").remove()

// compute all means
mean_list = []
for (var i = 0; i < label_list.length; i++) {
    var currentGroup = label_list[i]
    mean = d3.mean(problyData, function(d) { return +d[currentGroup] })
    mean_list.push(mean)
}

// Compute kernel density estimation for each column:
const kde = KDEstimate(kernelizer(7), x.ticks(50)) // 50 for more accurate density
const DSet = []
for (i = 0; i < label_list.length; i++) {
        key = label_list[i]
        density = kde(problyData.map(function(d){  return d[key]; }) )
        DSet.push({key: key, density: density})
}
// support functions to do kernelize option
function KDEstimate(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
}
function kernelizer(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}

// fill color
svg.selectAll("areas")
.data(DSet)
.join("path")
  .attr("transform", function(d){return(`translate(0, ${(yTag(d.key)-height2)})` )})
  .attr("fill", function(d){
    grp = d.key ;
    index = label_list.indexOf(grp)
    value = mean_list[index]
    return myColor( value  )
  })
  .datum(function(d){return(d.density)})
  .attr("opacity", ".7")
  .attr("stroke", "#000")
  .attr("stroke-width", 2)
  .attr("d", d3.line()
    .curve(d3.curveBasis)
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); })
)