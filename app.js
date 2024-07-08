function transformAndPlot() {
    const yValuesInput = document.getElementById('y-values').value;
    const yValues = yValuesInput.split(',').map(Number);
    if (yValues.length !== 12) {
        alert('Please enter exactly 12 y-values.');
        return;
    }

    // Prepend a 0 to the y-values
    yValues.unshift(0);
    
    // Create xValues starting from 0, increasing by 15, ending at 180
    const xValues = Array.from({ length: 13 }, (_, i) => i * 15);
    
    // Transform the y-values, now including the initial zero
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
