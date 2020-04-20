/* Copyright (c) 2020 by mustapha mekhatria (https://codepen.io/mushigh/pen/KKKyLXr)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

Highcharts.chart('container', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        backgroundColor: 'white',
        style: {
            fontFamily: 'Courier'
        }
    },  

    legend: {
        align: 'left',
        layout: 'vertical',
        verticalAlign: 'top',
        itemMarginTop: 10,
        title: {
            text:'Race', 
            style: {
                fontSize: '12px',
                textAlign: 'center',
                fontFamily: 'Courier'
            },
        },
        labelFormatter: function () {             
           return this.name
         }
    },

    title: {
        text: 'Average Sentenced Days And Bond Amount'
    },

    subtitle: {
        text: 'by Race'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Sentenced Days'
        },
        labels: {
            format: '{value} days'
        },
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 543.25,
            label: {
                rotation: 90,
                y: 15,
                style: {
                    fontStyle: 'italic',
                    fontFamily: 'Courier'
                },
                text: 'Average (543.25 Days)'
            },
            zIndex: 3
        }]
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Bond Amount'
        },
        labels: {
            format: '{value} $'
        },
        maxPadding: 0.2,
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 142382.9,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic',
                    fontFamily: 'Courier'
                },
                text: 'Average (142,232.9 $)',
                x: -10
            },
            zIndex: 3
        }]
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h4>{point.race}</h4></th></tr>' +
            '<tr><th>Sentenced Days:</th><td>{point.x} Days</td></tr>' +
            '<tr><th>Bond Amount:</th><td>{point.y} $</td></tr>' +
            '<tr><th>Total Inmates:</th><td>{point.z} Inmates</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: [{
                x: 651.97,
                y: 110143.6,
                z: 1109,
                name: 'WH',
                race: 'White',
            }
        ],name: 'White'
    },{
        data: [{
                x: 456.69,
                y: 161592.3,
                z: 718,
                name: 'HN',
                race: 'Hispanic',
            },
        ],name: 'Hispanic'
}, {
    data: [{
            x: 489.92,
            y: 161588.4,
            z: 1057,
            name: 'BL',
            race: 'Black',
        },
    ],name: 'Black'
}, {
    data: [{
            x: 791.29,
            y: 225717.9,
            z: 14,
            name: 'AS',
            race: 'Asian',
        },
    ],name: 'Asian'
}, {
    data: [{
        x: 283.89,
        y: 197300,
        z: 9,
        name: 'A IND',
        race: 'American Indian',
        },
    ],name: 'American IND'
}]

});