function draw(data) {

/*
  D3.js setup code
*/

    "use strict";
    var margin = 75,
        width = 800 - margin,
        height = 600 - margin;

    var header = d3.select("body")
      .append("h2")
      .text("Titanic Survivors");

    var explanation = d3.select("body")
      .append("h3")
      .text("Commonly known as simply 'The Titanic', the RMS Titanic was \
      a British passenger ship that was supposedly unsikable. On its \
      maiden voyage in 1912 it collided with an iceberg and sunk. \
      The story was source of many dramas and of a film with the same \
      name. What is less known is that there was one great factor that \
      would determine your chances of survival.");

      var annotation = d3.select("body")
        .append("h3")
        .text("Below the number of survivers of the ship's passengers is \
        shown split by gender. Is there anything surprising?");

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

    var myChart = new dimple.chart(svg, data);
    var x = myChart.addCategoryAxis("x", "sex");
    x.addOrderRule(["female","male"]);
    x.fontSize = 20;
    var y = myChart.addMeasureAxis("y", "survived");
    y.fontSize = 20;
    y.title = "number of persons"
    var series = myChart.addSeries(["survived"], dimple.plot.bar);
    series.aggregate = dimple.aggregateMethod.count;
    series.barGap = 0.6;
    var legend = myChart.addLegend(200,135,500,30,"left",series);
    legend.fontSize = 20;
    myChart.draw();
    x.titleShape.remove();

  };
