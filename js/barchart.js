var countries = [];
var femaleUnpaid = [];
var maleUnpaid = [];
var femalePaid = [];
var malePaid = [];

function loadDataTwo(){
  $.ajax({
    url:'timespentworking.xml',
    type: 'GET',
    datatype: 'xml',
    success: parseDataTwo
  });
} // important! using ajax to call xml

function parseDataTwo(xml){
  $(xml).find("country").each(function(index){
    countries.push($(this).attr("name"));
    maleUnpaid.push(parseFloat($(this).find("men_unpaid").text()));
    femaleUnpaid.push(parseFloat($(this).find("women_unpaid").text()));
    malePaid.push(parseFloat($(this).find("men_paid").text()));
    femalePaid.push(parseFloat($(this).find("women_paid").text()));
  });

  // console.log(countries);
  // console.log(maleUnpaid);

  buildBarChart();
}

function buildBarChart() {
    $('#barchart').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: 'Time spent in paid and unpaid work by gender'
        },
        subtitle: {
            text: 'Source: <a href="http://stats.oecd.org/index.aspx?queryid=54751#">OECD</a>',
            x: -20
        },

        xAxis: {
            categories: countries
        },

        yAxis: {
            allowDecimals: true,
            min: 0,
            title: {
                text: 'Minutes Spent Per Day'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: [{
            name: 'Men Paid',
            data: malePaid,
            stack: 'male',
            color: '#ff0000'
        }, {
            name: 'Men Unpaid',
            data: maleUnpaid,
            stack: 'male',
            color: '#7F0000'
        }, {
            name: 'Women Paid',
            data: femalePaid,
            stack: 'female',
            color: '#0000ff'
        }, {
            name: 'Women Unpaid',
            data: femaleUnpaid,
            stack: 'female',
            color: '#00007F'
        }]
    });
};

$(document).ready(function(){
//console.log("doc ready!");
loadDataTwo();
})
