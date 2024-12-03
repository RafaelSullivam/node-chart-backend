const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const path = require('path');

const app = express();
const port = 3000; // Porta em que o servidor vai rodar

// Dados do gráfico
const labelsX = [14, 33];
const dataY = [36.7, 34.3];
const scatterData = [
    { x: 14, y: 36.7 },
   
];


// Configuração do gráfico
const chartConfig = {
    type: 'line', // Tipo de gráfico principal
    data: {
        labels: labelsX, // Eixo X com valores numéricos
        datasets: [
            {
                type: 'line', // Tipo de gráfico: linha
                label: 'Linha',
                data: dataY, // Dados do eixo Y
                borderColor: 'rgba(0, 0, 0, 1)', // Cor preta
                fill: false, // Não preencher abaixo da linha
                tension: 0.1, // Suavização da linha
                pointRadius: 0, // Tamanho dos pontos
                pointBackgroundColor: 'rgba(0, 0, 0, 1)', // Cor dos pontos
                pointBorderWidth: 2, // Largura da borda dos pontos
            },
            {
                type: 'scatter', // Tipo de gráfico: dispersão
                label: 'Dispersão',
                data: scatterData, // Dados do gráfico de dispersão
                borderColor: 'rgba(255, 0, 0, 1)', // Cor vermelha
                backgroundColor: 'rgba(255, 0, 0, 1)', // Cor dos pontos
                pointRadius: 5, // Tamanho dos pontos
                pointBorderWidth: 2, // Largura da borda dos pontos
                pointStyle: 'rectRot' // Formato diamante
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'linear', // Eixo X com valores numéricos
                position: 'bottom',
                min: 10, // Valor mínimo do eixo X
                max: 35, // Valor máximo do eixo X
                ticks: {
                    callback: function (value) {
                        return value.toFixed(1); // Formatação dos valores no eixo X
                    }
                }
            },
            y: {
                type: 'linear', // Escala linear para o eixo Y
                min: 33, // Valor mínimo do eixo Y
                max: 38, // Valor máximo do eixo Y
                ticks: {
                    stepSize: 0.5, // Incremento de 0.5 em 0.5
                    callback: function (value) {
                        return value.toFixed(1); // Formatação dos valores no eixo Y
                    }
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        }
    }
};

// Criação da instância do gráfico
const width = 800; // Largura do gráfico
const height = 600; // Altura do gráfico
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

app.get('/grafico', async (req, res) => {
    try {
        // Renderizar o gráfico e retornar como uma imagem
        const image = await chartJSNodeCanvas.renderToBuffer(chartConfig);
        res.set('Content-Type', 'image/png');
        res.send(image); // Enviar a imagem gerada como resposta
    } catch (error) {
        res.status(500).send('Erro ao gerar o gráfico');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});