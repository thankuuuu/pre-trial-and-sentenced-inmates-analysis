/*The MIT License (MIT)

Copyright (c) 2015 Juan Cruz-Benito. http://juancb.es

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

// Bar Chart
datasetTotal = [
  {label:"American IND", value:18, count:"9 of 50"},
  {label:"Asian", value:11.67, count:"14 of 120"},
  {label:"Black", value:18.51, count:"1057 of 5711"},
  {label:"Hispanic", value:17.34, count:"718 of 4141"},
  {label:"White", value:18.14, count:"1109 of 6112"},
];

datasetOption1 = [
  {label:"American IND", value:66.67, count:"2 of 3"},
  {label:"Asian", value:33.33, count:"4 of 12"},
  {label:"Black", value:31.44, count:"276 of 878"},
  {label:"Hispanic", value:32.67, count:"197 of 603"},
  {label:"White", value:35.07, count:"404 of 1152"}
];

datasetOption2 = [
  {label:"American IND", value:0, count:"0 of 2"},
  {label:"Asian", value:16.67, count:"1 of 6"},
  {label:"Black", value:21.01, count:"54 of 257"},
  {label:"Hispanic", value:13.17, count:"27 of 205"},
  {label:"White", value:17.43, count:"61 of 350"}
];

datasetOption3 = [
  {label:"American IND", value:50, count:"1 of 2"},
  {label:"Asian", value:0, count:"0 of 5"},
  {label:"Black", value:24.29, count:"34 of 140"},
  {label:"Hispanic", value:30.84, count:"33 of 107"},
  {label:"White", value:23.94, count:"45 of 188"}
];

datasetOption4 = [
  {label:"American IND", value:25, count:"1 of 4"},
  {label:"Asian", value:0, count:"0 of 8"},
  {label:"Black", value:7.06, count:"18 of 255"},
  {label:"Hispanic", value:6.64, count:"16 of 241"},
  {label:"White", value:8.02, count:"38 of 474"}
];

datasetOption5 = [
  {label:"American IND", value:0, count:"0 of 2"},
  {label:"Asian", value:0, count:"0 of 3"},
  {label:"Black", value:13.33, count:"38 of 285"},
  {label:"Hispanic", value:10.73, count:"28 of 261"},
  {label:"White", value:13.17, count:"22 of 167"}
];

datasetOption6 = [
  {label:"American IND", value:0, count:"0 of 1"},
  {label:"Asian", value:0, count:"0 of 4"},
  {label:"Black", value:15.08, count:"30 of 199"},
  {label:"Hispanic", value:14.39, count:"20 of 139"},
  {label:"White", value:15.84, count:"32 of 202"}
];

datasetOption7 = [
  {label:"American IND", value:0, count:"0 of 3"},
  {label:"Asian", value:0, count:"0 of 1"},
  {label:"Black", value:18.37, count:"36 of 196"},
  {label:"Hispanic", value:13.20, count:"19 of 144"},
  {label:"White", value:19.46, count:"43 of 221"}
];

datasetOption8 = [
  {label:"American IND", value:100, count:"1 of 1"},
  {label:"Asian", value:0, count:"0 of 1"},
  {label:"Black", value:31.78, count:"34 of 107"},
  {label:"Hispanic", value:36.54, count:"19 of 52"},
  {label:"White", value:20.59, count:"7 of 34"}
];

datasetOption9 = [
  {label:"American IND", value:0, count:"0 of 0"},
  {label:"Asian", value:0, count:"0 of 0"},
  {label:"Black", value:31.53, count:"35 of 111"},
  {label:"Hispanic", value:38.1, count:"16 of 42"},
  {label:"White", value:37.5, count:"9 of 24"},
];

datasetOption10= [
  {label:"American IND", value:100, count:"2 of 2"},
  {label:"Asian", value:66.67, count:"2 of 3"},
  {label:"Black", value:31.03, count:"27 of 87"},
  {label:"Hispanic", value:22.81, count:"13 of 57"},
  {label:"White", value:28, count:"14 of 50"}
];

d3.selectAll("input").on("change", selectDataset);

function selectDataset()
{
  var value = this.value;
  if (value == "total")
  {
      change(datasetTotal);
  }
  else if (value == "option1")
  {
      change(datasetOption1);
  }
  else if (value == "option2")
  {
      change(datasetOption2);
  }
  else if (value == "option3")
  {
      change(datasetOption3);
  }
  else if (value == "option4")
  {
      change(datasetOption4);
  }
  else if (value == "option5")
  {
      change(datasetOption5);
  }
  else if (value == "option6")
  {
      change(datasetOption6);
  }
  else if (value == "option7")
  {
      change(datasetOption7);
  }
  else if (value == "option8")
  {
      change(datasetOption8);
  }
  else if (value == "option9")
  {
      change(datasetOption9);
  }
  else if (value == "option10")
  {
      change(datasetOption10);
  }
}

var margin = {top: (parseInt(d3.select('body').style('height'), 10)/20), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/20), left: (parseInt(d3.select('body').style('width'), 10)/5)},
      width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
      height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

var div = d3.select("body").append("div").attr("class", "toolTip");

var formatPercent = d3.format("");

var y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], .2, 0.5);

var x = d3.scale.linear()
      .range([0, width]);

var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(-height)
      .orient("bottom");

var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
//.tickFormat(formatPercent);

var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

d3.select("input[value=\"total\"]").property("checked", true);
change(datasetTotal);

function change(dataset) {

  y.domain(dataset.map(function(d) { return d.label; }));
  x.domain([0, d3.max(dataset, function(d) { return d.value; })]);

  svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

  svg.select(".y.axis").remove();
  svg.select(".x.axis").remove();

  svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(0)")
          .attr("x", 50)
          .attr("dx", ".1em")
          .style("text-anchor", "end")
          .text("Option %");


  var bar = svg.selectAll(".bar")
          .data(dataset, function(d) { return d.label; });
  // new data:
  bar.enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.value); })
          .attr("y", function(d) { return y(d.label); })
          .attr("width", function(d) { return width-x(d.value); })
          .attr("height", y.rangeBand());

  bar
          .on("mousemove", function(d){
              div.style("left", d3.event.pageX+10+"px");
              div.style("top", d3.event.pageY-25+"px");
              div.style("display", "inline-block");
              div.html((d.label)+"<br>"+(d.value)+"%"+"<br>"+(d.count));
          });
  bar
          .on("mouseout", function(d){
              div.style("display", "none");
          });


  // removed data:
  bar.exit().remove();

  // updated data:
  bar.transition()
          .duration(750)
          .attr("x", function(d) { return 0; })
          .attr("y", function(d) { return y(d.label); })
          .attr("width", function(d) { return x(d.value); })
          .attr("height", y.rangeBand());
};
