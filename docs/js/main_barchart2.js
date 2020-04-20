/*The MIT License (MIT)

Copyright (c) 2015 Juan Cruz-Benito. http://juancb.es

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

// Bar Chart
datasetTotal = [
      {label:"Female", value:17.60, count:"447 of 2540"},
      {label:"Male", value:18.10, count:"2460 of 13594"}
    ];
    
    datasetOption1 = [
      {label:"Female", value:33.94, count:"148 of 436"},
      {label:"Male", value:33.23, count:"735 of 2212"}
    ];
    
    datasetOption2 = [
      {label:"Female", value:13.04, count:"18 of 138"},
      {label:"Male", value:18.33, count:"125 of 682"}
    ];
    
    datasetOption3 = [
      {label:"Female", value:23.40, count:"11 of 47"},
      {label:"Male", value:25.82, count:"102 of 395"}
    ];
    
    datasetOption4 = [
      {label:"Female", value:7.75, count:"20 of 258"},
      {label:"Male", value:7.32, count:"53 of 724"}
    ];
    
    datasetOption5 = [
      {label:"Female", value:13.45, count:"16 of 119"},
      {label:"Male", value:12.02, count:"72 of 599"}
    ];
    
    datasetOption6 = [
      {label:"Female", value:15, count:"12 of 80"},
      {label:"Male", value:15.05, count:"70 of 465"}
    ];
    
    datasetOption7 = [
      {label:"Female", value:15.91, count:"21 of 132"},
      {label:"Male", value:17.78, count:"77 of 433"}
    ];
    
    datasetOption8 = [
      {label:"Female", value:36, count:"9 of 25"},
      {label:"Male", value:30.59, count:"52 of 170"}
    ];
    
    datasetOption9 = [
      {label:"Female", value:50, count:"3 of 6"},
      {label:"Male", value:33.33, count:"57 of 171"}
    ];
    
    datasetOption10= [
      {label:"Female", value:26.32, count:"5 of 19"},
      {label:"Male", value:29.44, count:"53 of 180"}
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
    