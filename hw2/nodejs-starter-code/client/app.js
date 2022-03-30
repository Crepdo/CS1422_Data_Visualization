import './assets/scss/app.scss'

var $ = require('jquery')
var d3 = require('d3')

$(document).ready(function() {
    $('#helloworld')
        .append('<span>Hello, jQuery! </span>')
    
    d3.select('#helloworld')
        .append('span')
        .html('Hello, D3!');

    var w = 800, h = 800

    d3.csv('/data/income_evaluation.csv', function(d) {
        // convert to numerical values
        d.age = +d.age
        d.fnlwgt = +d.fnlwgt
        d.education_num = +d.education_num
        d.capital_gain = +d.capital_gain
        d.capital_loss = +d.capital_loss
        d.hours_per_week = +d.hours_per_week

        return d
    }).then(function(data) {
        // Your d3 drawing code comes here
        // The below example draws a simple "scatterplot"
        console.log(data)

        d3.select('.canvas')
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', function(d) {
                return d.education_num / 18.0 * w;
            })
            .attr('cy', function(d) {
                return d.hours_per_week / 100.0 * h
            })
            .attr('r', 3)
    }) 
})