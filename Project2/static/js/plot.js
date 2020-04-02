// 15 - 04 Evr Stock_Candlestick
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var stock = d3.select("#stockInput").node().value;
    console.log(stock);
  
    // clear the input value
    d3.select("#stockInput").node().value = "";
  
    // Build the plot with the new stock
    buildPlot(stock);
  }

function buildPlot() {

    d3.json('/dji').then(function (data) {

        // Grab values from the response json object to build the plots
        //var name = data.dataset.name;
        //var stock = data.dataset.dataset_code;
        //var startDate = data.dataset.start_date;
        //var endDate = data.dataset.end_date;
        var dates = unpack(data.dataset.datetime, 0);
        var openingPrices = unpack(data.dataset.data, 1);
        var highPrices = unpack(data.dataset.data, 2);
        var lowPrices = unpack(data.dataset.data, 3);
        var closingPrices = unpack(data.dataset.data, 4);

        // line Trace from DJI
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: name,
            x: dates,
            y: closingPrices,
            line: {
                color: "#17BECF"
            }
        };

        // bar Trace from Covid-19
        var trace2 = {
            type: "bar",
            x: dates,
            y: cases,
        };

        var data = [trace1, trace2];

        var layout = {
            title: `${stock} closing prices`,
            xaxis: {
                range: [startDate, endDate],
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            },
            showlegend: false
        };

        Plotly.newPlot("plot", data, layout);

    });
}

buildPlot();
