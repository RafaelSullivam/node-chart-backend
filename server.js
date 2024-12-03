const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const express = require('express');
const path = require('path');
const app = express();

const width = 600; // width of the chart
const height = 600; // height of the chart
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });

app.get("/grafico", async (req, res) => {
    // Dados do gráfico
    const data = {
        labels: [14, 18, 23, 28, 33],
        datasets: [
            {
                data: [36.7, 35.9, 35.2, 34.7, 34.2],
                borderColor: "black",
                fill: false,
            },
            {
                data: [36.7, 35.9, 35.2, 34.6, 34.3],
                borderColor: "blue",
                pointBackgroundColor: "blue",
                pointBorderColor: "blue",
                pointStyle: "rectRot",
                borderWidth: 0,
                pointRadius: 8,
                fill: false,
            },
        ],
    };

    // Configuração do gráfico
    const configuration = {
        type: "line",
        data,
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                    position: "top",
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    res.type('image/png');
    res.send(image);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3006, () => {
    console.log('Server is running on port 3006');
});