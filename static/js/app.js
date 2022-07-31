let jsonFile = "static/data/samples.json"

function init() {
  var selector = d3.select("#selDataset");

  d3.json(jsonFile).then((data) => {
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
  d3.json(jsonFile).then((data) => {
    var metaData = data.metaData;
    var resultArray = metaData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      d3.select("#sample-metadata")
      .append("h5").text('${key}: ${value}');
    });
  });
}

function buildBarChart(sample) {
  d3.json(jsonFile).then((data) => {
      var samples = data.samples;
      var sample_data = samples.filter(x => x.id == sample);
      console.log(sample_data);

      sample_data = sample_data[0];

      var otu_ids = sample_data.otu_ids;
      var otu_labels = sample_data.otu_labels;
      var sample_values = sample_data.sample_values;

      var yticks = otu_ids.map(x => `OTU ${x}`);

      var trace1 = {
          x: sample_values.slice(0, 10).reverse(),
          y: yticks.slice(0, 10).reverse(),
          hovertext: otu_labels.slice(0, 10).reverse(),
          name: 'Top Bacteria',
          orientation: "h",
          marker: {
              color: "firebrick"
          },
          type: 'bar'
      }
      var barData = [trace1]; 
      var barLayout = {
          title: "Top Bacteria Bar Chart",
          xaxis: { title: "Count of Bacteria" }
      };
      Plotly.newPlot('bar', barData, barLayout);
  });
}

function buildGaugeChart(sample) {
  d3.json(jsonFile).then((data) => {
      var metadata = data.metadata;
      var metadata_data = metadata.filter(x => x.id == sample);
      metadata_data = metadata_data[0];


      var wfreq = metadata_data.wfreq;

      var trace1 = {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Washing Frequence" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 5 },
          gauge: {
              axis: { range: [null, 10] },
              steps: [
                  { range: [0, 4], color: "lightgray" },
                  { range: [4, 8], color: "gray" }
              ],
              threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 9.5
              }
          }
      };
      var gaugeData = [trace1];
      var gaugeLayout = {
          title: "Washing Frequency Gauge Chart"
      };

      Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });

}