// Code for generating a Chart.js line chart
/* This script file will demonstrate how to create a scatter plot
Data from: 
Mean from:
*/

async function getData(){
    const response = await fetch('data/research.csv');
    const data = await response.text();
    // console.log(data);

    const xGroups = []; // x axis labels
    const yMeasures = []; // y axis labels

    const yLength = []; // y-axis widths
    const yWidth = []; // y-axis lengths
    const yArea = []; // y-axis areas

    // \n - new line chara
    // split('\n) will separate the table into array of individual rows
    // slice(start, end) - return a new array starting at index start up to but not including end
    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row => {
        const columns = row.split(','); // split each row into columns using the commas
        const group = parseFloat(columns[0]); // assign year value
        xGroups.push(group); // push year value into array xYears

        // done

        const length = parseFloat(columns[1]); // convert global temp value from string to math values
        yLength.push(length); // add 14 to convert difference to temp value in (deg-C)
    
        const width = parseFloat(columns[2]); // convert global temp value from string to math values
        yWidth.push(width);
    
        const area = parseFloat(columns[3]); // convert global temp value from string to math values
        yArea.push(area);

        // done

        console.log(group, length, width, area);
    });
    return {xGroups, yLength, yWidth, yArea} // use {} to return mult. vals as obj
}

// done

async function createChart(){
    const data = await getData(); // wait until getData processes
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart

    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'scatter',
        data: {                         //  Define data
            labels: data.xGroups,        //  x-axis labels
            datasets: [                 //  Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `Length of Drosophila Melanogaster Ovary in mm`,     // Dataset label for legend
                    data:     data.yLength,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgb(91, 0, 171)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Length of Drosophila Melanogaster Ovary in mm`,     // Dataset label for legend
                    data:     data.yWidth,    // Reference to array of y-values
                    fill:     '-1',           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(124, 0, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgb(161, 0, 59)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                    tension: 0.4 // Smoothness of the line
                },
                {
                    label:    `Upper Surface Area of Drosophila Melanogaster Ovary in mm^2`,     // Dataset label for legend
                    data:     data.yArea,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(225, 86, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgb(255, 147, 70)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                    tension: 0.4
                }
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Experimental Groups (1, 2, 3, 4, 5, 6)',     // x-axis title
                        font: {                   // font properties
                            family: 'Georgia, serif',
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        callback: function(val, index){
                            // Control the labeling of the tick marks
                            return index%2===0 ? this.getLabelForValue(val) : '';
                        },

                        
                    min: 0,                     // starting value      
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'Measurement of Ovary Sample in mm or mm^2',     // y-axis title
                        font: {
                            family: 'Georgia, serif',
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: 20,        // Actual value can be set dynamically
                        font: {
                            family: 'Georgia, serif',
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Ovarian Measurements for Length, Width, and Upper Surface Area from Diet Treatment',
                    font: {
                        family: 'Georgia, serif',
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Georgia, serif',
                            size: 14
                        }
                    }
                }
            }
        }       
    }); 
}

createChart();