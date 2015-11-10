$(document).ready(function(){
                loadData();
                buildMap();
                loadDataTable();


            })


           var htmlTable = [];
           var state = [];
           var statePop = [];
           var insecurePercent = [];
           var insecurePop = [];
           var vinsecurePercent = [];
           var vinsecurePop = [];

            function loadData () {
                $.ajax({
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseData(xml)
                    }
                });




        $('#line-graph').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                  text: 'Chlamydia Prevalence',
                  x: -20
                },

                xAxis: {
                    categories:['2000', '2002', '2003', '2004', '2005','2006','2007','2008','2009','2010','2011','2012','2013']
                },
                yAxis: {
                    title: {
                        text: 'Chlamydia Cases for North Carolina'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false,
                        color: "#EE9A49"
                    }
                },
                series: [{
                  name: 'North Carolina',
                  data: [21985, 22101, 24726, 26187, 28967, 31183, 33615, 30611, 37516, 41045, 42048, 54819, 50596, 48416]
                }],
                legend: {
                  layout: 'horizontal',
                  align: 'right',
                  verticalAlign: 'middle',
                  borderWidth: 4
                 }
            });
     };



    function buildMap() {

                $.getJSON('data/map.json', function (data) {


                    $.each(data, function () {
                        this.code = this.code.toUpperCase();
                    });


                    $('#map1').highcharts('Map', {

                        chart : {
                            borderWidth : 1
                        },

                        title : {
                            text : ''
                        },


                        legend: {
                            layout: 'horizontal',
                            borderWidth: 0,
                            floating: true,
                            verticalAlign: 'top',
                            y: -13
                        },

                        mapNavigation: {
                            enabled: true,
                            enableMouseWheelZoom: false,
                            buttonOptions: {
                                align: 'right'
                            }
                        },

                        colorAxis: {
                            min: 5,
                            max: 25,
                            stops: [
                                [0, '#e5c589'],
                                [0.25, '#ccaf7a'],
                                [0.5, '#b2996b'],
                                [0.75, '#99835b'],
                                [1, '#7f6d4c']
                            ],
                            tickInterval: 100000

                        },


                        series : [{
                            animation: {
                                duration: 500
                            },
                            data : data,
                            mapData: Highcharts.maps['countries/us/us-all'],
                            joinBy: ['postal-code', 'code'],
                            dataLabels: {
                                enabled: false,

                            },
                            name: 'Chlamydia Cases',
                            states: {
                                hover: {
                                                color: '#fff7ea',
                                                borderColor: '#fff7ea'
                                }
                            },
                            tooltip: {
                                pointFormat: '{point.code}: {point.value}'
                            }
                        }]
                    });
                });
           };


           $('#line').highcharts({
                   chart: {
                       type: 'line'
                   },
                   title: {
                     text: 'Chlamydia Prevalence in North Carolina',
                     x: -20
                   },

                   xAxis: {
                       categories:['2000', '2002', '2003', '2004', '2005','2006','2007','2008','2009','2010','2011','2012','2013']
                   },
                   yAxis: {
                       title: {
                           text: 'Chlamydia Cases for North Carolina'
                       }
                   },
                   plotOptions: {
                       line: {
                           dataLabels: {
                               enabled: true
                           },
                           enableMouseTracking: false,
                           color: "#99835b"
                       }
                   },
                   series: [{
                     name: 'North Carolina',
                     data: [21985, 22101, 24726, 26187, 28967, 31183, 33615, 30611, 37516, 41045, 42048, 54819, 50596, 48416]
                   }],
                   legend: {
                     layout: 'horizontal',
                     align: 'right',
                     verticalAlign: 'middle',
                     borderWidth: 4
                    }
               });


        function loadDataTable() {
            $.ajax({
                    url: 'data/data-table.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseDataTable(xml)
                    }
                });
        };



        function parseDataTable(xml) {
            $(xml).find("tableusa").each(function(index){
                htmlTable += "<tr><td></td>"
                htmlTable += "<td>" + $(this).find("state").text() + "</td>"
                htmlTable += "<td>" + $(this).find("year").text() + "</td>"
                htmlTable += "<td>" + $(this).find("count").text() + "</td>"
                htmlTable += "<td>" + $(this).find("rank").text() + "</td>"
                htmlTable += "<td>" + $(this).find("rcount").text() + "</td>"
                htmlTable += "<td>" + $(this).find("rrate").text() + "</td></tr>"
            })
            buildDataTable();
        };

        function buildDataTable() {
            $("#data-table-form").html(htmlTable);
            $('#data-table').DataTable({
                responsive: {
                details: {
                    type: 'column',
                    target: 'tr'

                                }
                },
                columnDefs: [ {
                className: 'control',
                orderable: false,
                targets:   0
                } ],
                order: [ 1, 'asc' ]
            });
        }

        $(function () {
        $('#bar').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    '2000',
                    '2013',


                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Cases (thousands)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} k</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{

                  name: 'California',
                  data: [95392.0,167436.0],
                color: "#99835b"

              }, {
                  name: 'New York',
                  data: [31494.0,95803.0],
                  color: "#ccaf7a"
              }, {
                  name: 'Florida',
                  data: [33390.0,80182.0],
                  color: "#b2996b"
              }, {
                  name: 'Illinois',
                  data: [40350.0, 63797.0],
                    color: "#7f6d4c"

                }, {
                    name: 'Texas',
                    data: [68814.0,129861.0],
                      color: "#e5c589"
            }]
        });
    });
