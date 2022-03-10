const numberly = `A couple,A few ,Dozens,A lot,Some,Several,Many,Fractions of,Scores of,Hundreds of
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
var numberlyData = d3.csvParse(numberly);
var canvas1 = d3.select("#chart1");
var margin = { top: 30, right: 30, bottom: 60, left: 100 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
var svg = canvas1
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "center")
    .text("Perceptions of Probability");

svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("Assigned Number");

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Phrase");

key_list = [];
for (var k in numberlyData[0]) {
    key_list.push(k);
};
const superscript = ["⁻²", "⁻¹", "⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
var x = d3
    // .scaleLog()
    .scaleLinear()
    .domain([-2.3, 5.3])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "xAxis")
    .call(d3.axisBottom(x)
        .ticks(7)
        .tickFormat(
            function (d) {
                d = Math.pow(10, d);
                var s = superscript[Math.floor(Math.log10(d)) + 2];
                return "10" + s;
            }
        ).tickSize(-height)
    ).select(".domain").remove();
var y = d3
    .scaleBand()
    .range([height, 0])
    .domain(key_list)
    .paddingInner(1)
    .paddingOuter(.5)
svg.append("g")
    .attr("class", "xAxis")
    .call(
        d3.axisLeft(y)
            .tickSize(-width)
    )
    .select(".domain").remove()
for (var i = 0; i < key_list.length; i++) {
    var key = key_list[i];
    var data = numberlyData.map(function (d) { return Math.log10(d[key]); });
    console.log(data);
    var data_sorted = data.sort(d3.ascending);
    var q1 = d3.quantile(data_sorted, .25);
    var median = d3.quantile(data_sorted, .5);
    var q3 = d3.quantile(data_sorted, .75);
    var interQuantileRange = q3 - q1;
    var min = Math.max(q1 - 1.5 * interQuantileRange, 1e-2);
    var max = Math.max(q3 + 1.5 * interQuantileRange, 1e-2);
    var min = q1 - 1.5 * interQuantileRange;
    var max = q3 + 1.5 * interQuantileRange;

    var center = 200
    var box_height = 20

    svg
        .append("line")
        .attr("x1", x(min))
        .attr("x2", x(max))
        .attr("y1", y(key))
        .attr("y2", y(key))
        .attr("stroke", "black")
    svg
        .append("rect")
        .attr("x", x(q1))
        .attr("y", y(key) - box_height / 2)
        .attr("height", box_height)
        .attr("width", (x(q3) - x(q1)))
        .attr("stroke", "black")
        .style("fill", "#69b3a2")
        .style("fill", function (d) { return (myColor(i)) })
    svg
        .append("line")
        .attr("x1", x(median))
        .attr("x2", x(median))
        .attr("y1", y(key) + box_height / 2)
        .attr("y2", y(key) - box_height / 2)
        .attr("stroke", "black")
    for (var d in data) {
        svg.append("circle")
            .attr("r", 4)
            .attr("cx", x(data[d]))
            .attr("cy", y(key) - box_height / 2 + Math.random() * box_height)
            .style("fill", function (d) { return (myColor(i)) })
            .style("opacity", 0.3)
    }
}