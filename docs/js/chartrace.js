/*Copyright (c) 2020 by Olsi Odobashi (https://codepen.io/olsiodobashi/pen/woENmj)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";
var Charts = /** @class */ (function () {
    function Charts() {
        this.colors = ["#DB66AE", "#8185D6", "#89D9DF", "#E08886"];
        this.tickColor = "#757681";
        this.initRadar();

    }
    Charts.prototype.initRadar = function () {
        var ctxD = $('#radarChartDark'), ctxL = $('#radarChartLight'), chartData = {
            type: 'radar',
            data: {
                labels: ["Total", "White", "Hispanic", "Black", "Asian", "American IND"],
                datasets: [
                    {
                        label: "Crimes Per 1K Population",
                        backgroundColor: this.convertHex(this.colors[1], 20),
                        borderColor: this.colors[1],
                        borderWidth: 1,
                        pointRadius: 2,
                        data: [27.7, 27, 18.93, 52.48, 5.1, 75.42],
                    },
                    {
                        label: "Inmates Per 1M Population",
                        backgroundColor: this.convertHex(this.colors[3], 20),
                        borderColor: this.colors[3],
                        borderWidth: 1,
                        pointRadius: 2,
                        data: [50.31, 31.02, 65.82, 141.68, 6.6, 22.93],
                    }
                ]
            },
            options: {
                scale: {
                    pointLabels: {
                        fontColor: this.tickColor
                    },
                    ticks: {
                        display: false,
                        stepSize: 25
                    }
                },
                legend: {
                    position: "bottom",
                    labels: {
                        boxWidth: 11,
                        fontColor: this.tickColor,
                        fontSize: 11
                    }
                }
            }
        },
        myDarkRadarChart = new Chart(ctxD, chartData);
    };

    Charts.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
    };
    return Charts;
}());
new Charts();
