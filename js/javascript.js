function draw(data) {

/*
  D3.js setup code
*/

    "use strict";
    // define dimensions of visualization
    var margin = 75,
        width = 800 - margin,
        height = 600 - margin;

    // add title
    var header = d3.select("body")
      .append("h2")
      .text("Titanic Survivors");

    // add explanatory text
    var explanation = d3.select("body")
      .append("h3")
      .text("Commonly known as simply 'The Titanic', the RMS Titanic was \
      a British passenger ship that was supposedly unsinkable. On its \
      maiden voyage in 1912 it collided with an iceberg and sunk. \
      The story was source of many dramas and of a film with the same \
      name. What is less known is that there was one great factor that \
      would determine your chances of survival.");

      var annotation = d3.select("body")
        .append("h3")
        .text("Below the number of survivers of the ship's passengers is \
        shown split by gender. Is there anything surprising?");

    // add svg to draw in
    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .attr("class", "vis")
      .append('g')
          .attr('class','chart');

/*
  Dimple.js Chart construction code
*/
    // bind data to chart
    var myChart = new dimple.chart(svg, data);
    // create axis
    var x = myChart.addCategoryAxis("x", "sex");
    x.addOrderRule(["female","male"]);
    x.fontSize = 20;
    var y = myChart.addMeasureAxis("y", "survived");
    y.fontSize = 20;
    y.title = "number of persons"
    // create dimple series for visualization
    var series = myChart.addSeries(["survived"], dimple.plot.bar);
    // count number of passengers in each category
    series.aggregate = dimple.aggregateMethod.count;
    // define separation width of bars in chart
    series.barGap = 0.6;
    // create custom tooltip
    series.getTooltipText = function (e) {
      console.log(e.aggField);
      if (e.aggField == "0") {
        var cat = "deceised";
      } else {
        var cat = "survived";
      };
      return [cat,
              "persons: "+ e.height];
    };

    // create legend
    var legend = myChart.addLegend(195,120,50,30,"left",series);
    legend.fontSize = 20;
    legend.width = 50;
    // create visualization
    myChart.draw();
    // remove x axis label
    x.titleShape.remove();
    // customize legend
    var legends = d3.selectAll(".dimple-legend-text.dimple-0")
      .html("deceised");
    legends = d3.selectAll(".dimple-legend-text.dimple-1")
      .html("survived");
  };
