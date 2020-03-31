var stocks;
d3.json("/stocks").then(function (data) {
  stocks = data
  console.log(data)
  init()
});

// // console.log(url);
// for (var i = 0; i < btc.length; i++){
//     console.log(btc[i]);
// }


//  app.js belly button diversity




function buildCharts(stock) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
}

  // populate drop down
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select('#sel-stock');

    // Use the list of sample names to populate the select options - reference server routes in app.py
    // route is the from app.py file. sample is id
  let sampleNames = []
  stocks.forEach(stock => {
    if (!sampleNames.includes(stock.name)){
      sampleNames.push(stock.name)
    }
  })
      sampleNames.forEach(sample => {
        selector
          .append('option')
          .text(sample)
          .property('value', sample);
      });

      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
   
  }

  // // called in HTML - pass information from drop down here 
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);

  }

  // // Initialize the dashboard
  // init();
