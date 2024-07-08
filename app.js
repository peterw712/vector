function transformVectors(x, y) {
    let newY = Array(y.length).fill(0);

    for (let i = 0; i < x.length; i++) {
        let clippedY = [];
        for (let j = i; j < x.length; j++) {
            if (j === i) {
                clippedY.push(y[j]);
            } else {
                let x1 = x[j - 1], y1 = y[j - 1];
                let x2 = x[j], y2 = y[j];  // This is incorrect as it should not always be y[j].
                // Correcting y2 to actually point to the next y value when j < x.length
                y2 = (j + 1 < x.length) ? y[j + 1] : y[j];
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
    if (yValues.length !== 12) {
        alert('Please enter exactly 12 y-values.');
        return;
    }

    // Create xValues starting from 15 to 180, every 15 units
    const xValues = Array.from({ length: 12 }, (_, i) => (i + 1) * 15);

    // Get transformed y-values using the existing function
    const transformedYValues = transformVectors(xValues, yValues);

    // Prepend a 0 to the original and transformed y-values for plotting
    const plotYValues = [0, ...yValues];
    const plotTransformedYValues = [0, ...transformedYValues];

    // Adjust xValues to start from 0 for plotting
    const plotXValues = [0, ...xValues];

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: plotXValues,
            datasets: [
                {
                    label: 'Original Vectors',
                    data: plotYValues,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Transformed Vectors',
                    data: plotTransformedYValues,
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
