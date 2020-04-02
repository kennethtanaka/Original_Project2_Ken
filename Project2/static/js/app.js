var stocks;
var covid;

d3.json("/stocks").then(function (data) {
  stocks = data
  d3.json("/us").then(function (coviddata){
    covid = coviddata
    console.log(covid)
    init()
  })
});


function buildCharts(stock) {
  var stockInfo = stocks.filter(row => row.name === stock)
  var stockClose = stockInfo.map(row => row.close)
  var stockDate = stockInfo.map(row => row.datetime)
  var covidCases = covid.map(row => row.Cases)
  var covidDate = covid.map(row => row.Date.split("T")[0])
  // console.log(stockDate)
  var linetrace = {
    x: stockDate,
    y: stockClose,
    type: 'scatter',
    
  };

  var bartrace = {
    x: covidDate,
    y: covidCases,
    type: 'bar',
    
  };

  var data = [linetrace, bartrace];

  var layout = {
    yaxis: {
      autorange : true, 
      range : [0,30000],
      type : "linear"
    }
  }
  Plotly.newPlot('plot', data,layout);
  
}

function animateChart (stock){
  var stockInfo = stocks.filter(row => row.name === stock)
  var stockClose = stockInfo.map(row => row.close)
  var animationData = {
    data : [{y: stockClose}],
  
  }
  var transition = {
    transition: {
      duration: 500,
      easing: "cubic-in-out",
    },
  
   frame: {
      duration: 500,
    }
  }
    Plotly.animate('plot', animationData, transition);
  }

// populate drop down
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#sel-stock');

  // Use the list of sample names to populate the select options - reference server routes in app.py
  // route is the from app.py file. sample is id
  let stockNames = []
  stocks.forEach(stock => {
    if (!stockNames.includes(stock.name)) {
      stockNames.push(stock.name)
    }
  })
  stockNames.forEach(stock => {
    selector
      .append('option')
      .text(stock)
      .property('value', stock);
  });

  // Use the first sample from the list to build the initial plots
  const firstStock = stockNames[0];
  buildCharts(firstStock);


}

// // called in HTML - pass information from drop down here 
function optionChanged(newStock) {
  // Fetch new data each time a new sample is selected
  buildCharts(newStock);
  //animateChart(newStock)
}

  // // Initialize the dashboard
  // init();
