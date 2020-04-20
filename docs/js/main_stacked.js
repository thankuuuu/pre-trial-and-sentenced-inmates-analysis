/*Copyright (c) 2020 by sweta shrestha (https://codepen.io/sweetanzell/pen/qXBRBy)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

$(".wrapper").delay(600).fadeIn(500);
var barDataset = [
  {
    "race": 1,
    "successful": 4767,
    "unsuccessful": 1436
  },
  {
    "race": 2,
    "successful": 5068,
    "unsuccessful": 643
  },
  {
    "race": 3,
    "successful": 3710,
    "unsuccessful": 431
  },
  {
    "race": 4,
    "successful": 97,
    "unsuccessful": 23
  },
  {
    "race": 5,
    "successful": 43,
    "unsuccessful": 7
  },
]

function drawBarGraph(data) {

  var x_label = ['WHITE','BLACK','HISPANIC','ASIAN','AMERICAN IND'];

  var status = ["successful", "unsuccessful"];

  var colors = [ ["Successful", "#50E3C2"],
                ["Unsuccessful", "#EF5C6E"] ];

  var margin = {top: 30, right: 30, bottom: 40, left: 60},
      width  = 800 - margin.left - margin.right,
      height = 290 - margin.top - margin.bottom;

  var z = d3.scale.ordinal()
  .range(["#50E3C2", "#EF5C6E"]);

  var n = 6;
  var x = d3.scale.linear()
  .domain([1, n - 1])
  .rangeRound([10, 600], .1);

  var y = d3.scale.linear()
  .rangeRound([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(function(d, i){
    return x_label[i] //"Year1 Year2, etc depending on the tick value - 0,1,2,3,4"
})
  .ticks(5)
  .tickSize(0);;

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickFormat(d3.format("d"));

  var svg = d3.select("#chart-bar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var layers = d3.layout.stack()
  (status.map(function (c) {
    return data.map(function (d) {
      return {x: d.race, y: d[c]};
    });
  }));


  y.domain([
    0, d3.max(layers[layers.length - 1], function (d) {
      return d.y0 + d.y;
    })
  ]);


  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.svg.axis().scale(y)
      .orient("left").ticks(5);
  }

  // add the Y gridlines
  svg.append("g")
    .attr("class", "gridline")
    .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
         );

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(6," + height + ")")
    .call(xAxis)

  svg.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-7.5em")
    .attr("y", "-3.8em")
    .style("text-anchor", "middle")
    .text("Number of Pre-trial Inmates");


  function type(d) {
    // d.date = parseDate(d.date);
    d.race;
    status.forEach(function (c) {
      d[c] = +d[c];
    });
    return d;
  }  
  
   var tooltip = d3.select("#chart-bar").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  var layer = svg.selectAll(".layer")
  .data(layers)
  .enter().append("g")
  .attr("class", "layer")
  .style("fill", function (d, i) {
    return z(i);
  });

  layer.selectAll("rect")
    .data(function (d) {
    return d;
  })
    .enter().append("rect")
    .on("mouseover", function (d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", 1);
    tooltip.html("<span>" + d.y + "inmantes" + "</span>")
      .style("left", (d3.event.pageX - 25) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  })
    .on("mouseout", function (d) {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  })
      .attr("x", function (d) {
    return x(d.x);
  })
    .attr("y",  function(d) {
    return height;
  })
    .attr("width", 100)
    .attr("height", 0)
    .transition().duration(1500)
    .attr("y", function (d) {
    return y(d.y + d.y0);
  })
    .attr("height", function (d) {
    return y(d.y0) - y(d.y + d.y0);
  });

}

drawBarGraph(barDataset);


$('.count').each(function () {
  $(this).prop('Counter',0).animate({
    Counter: $(this).text()
  }, {
    duration: 1500,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});