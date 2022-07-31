function init() {
  var selector = d3.select("#selDataset");

  d3.json("static/data/samples.json").then((data) => {
    console.log(data);    
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
      buildBarChart(firstSample);
      buildBubbleChart(firstSample);
      buildGaugeChart(firstSample);
      buildMetadata(firstSample);
  });

}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildBarChart(newSample);
  buildBubbleChart(newSample);
  buildGaugeChart(newSample);

}

function buildMetadata(sample) {

// Use `d3.json` to fetch the sample data for the plots
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray= metadata.filter(sampleObj => sampleObj.id == sample);
    var result= resultArray[0]
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text('${key.toUpperCase()}: ${value}');
    });
  });
}

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;
  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
  });
}

d3.selectAll("#dropdownMenu").on("change", updatePlotly);
function updatePlotly(); {
  var dropdownMenu = d3.select("#dropdownMenu");
  var dataset = dropdownMenu.property("value");

  var xData = [1, 2, 3, 4, 5];
  var yData = [];

  if (dataset === 'dataset1') {
    yData = [1, 2, 4, 8, 16];
  };

  if (dataset === 'dataset2') {
    yData = [1, 10, 100, 1000, 10000];
  };

  var trace = {
    x: [xData],
    y: [yData],
  };
  Plotly.restyle("plot", trace);
};
