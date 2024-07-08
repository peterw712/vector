function transformVectors(x, y) {
    let newY = Array(y.length).fill(0);

    for (let i = 0; i < x.length; i++) {
        let clippedY = [0];
        for (let j = i; j < x.length; j++) {
            if (j === i) {
                clippedY.push(y[j]);
            } else {
                let x1 = x[j - 1], y1 = y[j - 1];
                let x2 = x[j], y2 = y[j];
                let yClipped = y1 + (y2 - y1) * (x[i] - x1) / (x2 - x1);
                clippedY.push(yClipped);
            }
        }
        newY[i] = (y[i] + clippedY.reduce((a, b) => a + b, 0)) / (clippedY.length + 1);
    }

    return newY;
}

function transformAndPlot() {
    const yValuesInput = document.getElementById('y-values').value;
    const yValues = yValuesInput.split(',').map(Number);
    if (yValues.length !== 13) {
        alert('Please enter exactly 13 y-values.');
        return;
    }

    const xValues = Array.from({ length: 13 }, (_, i) => (i) * 15);
    const transformedYValues = transformVectors(xValues, yValues);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'Original Vectors',
                    data: yValues,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Transformed Vectors',
                    data: transformedYValues,
                    borderColor: 'blue',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'y'
                    }
                }
            }
        }
    });
}
