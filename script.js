function initializeCanvas() {
    var canvas = document.getElementById("graphCanvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function validateExpression(expression) {
    try {
        eval(expression.replace(/x/g, '(1)'));
        return true;
    } catch (error) {
        alert("올바른 수식을 입력해주세요!");
        return false;
    }
}

function drawGraph() {
    var expression = document.getElementById("expressionInput").value;
    var minX = parseFloat(document.getElementById("minXInput").value);
    var maxX = parseFloat(document.getElementById("maxXInput").value);

    if (!validateExpression(expression)) {
        return;
    }

    var canvas = document.getElementById("graphCanvas");
    var ctx = canvas.getContext("2d");

    if (window.myChart) {
        window.myChart.destroy();
    }

    canvas.style.display = "block";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    initializeCanvas();

    var data = [];
    var step = (maxX - minX) / 100;
    for (var x = minX; x <= maxX; x += step) {
        var y = eval(expression.replace(/x/g, '(' + x + ')'));
        data.push({x: x, y: y});
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Graph',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    });
}

window.onload = function() {
    initializeCanvas();
};
