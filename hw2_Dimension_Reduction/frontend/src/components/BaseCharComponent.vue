<template>
  <b-col sm="12" md="4" class="p-5">
    <div ref="refChartDiv"></div>
    <h3>{{ title }}</h3>
  </b-col>
</template>

<script>
import * as d3 from "d3";
import CONSTANTS from "@/constants";
export default {
  name: "BaseChartComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors: d3
        .scaleSequential()
        .interpolator(d3.interpolateWarm)
        .domain([0, 9]),
    };
  },
  created() {
    this.fetchCSVData();
  },
  methods: {
    fetchCSVData() {
      fetch(this.$props.apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then((result) => {
          return d3.csvParse(result);
        })
        .then((result) => {
          this.drawChart(result);
        });
    },
    drawChart(csvData) {
      var size = CONSTANTS.SIZE;
      var margin = size.MARGIN;
      var width = size.WIDTH;
      var height = size.HEIGHT;
      var svg = d3
        .select(this.$refs.refChartDiv)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      console.log(this.colors(9));
      var x_list = csvData.map((x) => x["x"]);
      var x_min = Math.min(...x_list);
      var x_max = Math.max(...x_list);
      var y_list = csvData.map((x) => x["y"]);
      var y_min = Math.min(...y_list);
      var y_max = Math.max(...y_list);
      var x = d3.scaleLinear().domain([x_min, x_max]).range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      var y = d3.scaleLinear().domain([y_min, y_max]).range([0, height]);
      svg.append("g").call(d3.axisLeft(y));
      var color = d3
        .scaleSequential()
        .interpolator(d3.interpolateWarm)
        .domain([0, 9]);
      svg
        .append("g")
        .selectAll("dot")
        .data(csvData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.x);
        })
        .attr("cy", function (d) {
          return y(d.y);
        })
        .attr("r", 5)
        .style("fill", function (d) {
          return color(d.label);
        });
    },
  },
};
</script>
