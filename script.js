// 초기화 함수: 캔버스 크기 조절
function initializeCanvas() {
    var canvas = document.getElementById("graphCanvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

// 수식 입력에 대한 오류 처리
function validateExpression(expression) {
    try {
        eval(expression.replace(/x/g, '(1)')); // x에 임의의 값(1)을 대입하여 계산 가능 여부 확인
        return true;
    } catch (error) {
        alert("올바른 수식을 입력해주세요!");
        return false;
    }
}

// 그래프 그리기 함수
function drawGraph() {
    var expression = document.getElementById("expressionInput").value;
    var minX = parseFloat(document.getElementById("minXInput").value);
    var maxX = parseFloat(document.getElementById("maxXInput").value);

    if (!validateExpression(expression)) {
        return;
    }

    // Chart.js를 사용하여 그래프를 그리는 코드
    var canvas = document.getElementById("graphCanvas");
    var ctx = canvas.getContext("2d");

    // 이전 그래프 삭제
    if (window.myChart) {
        window.myChart.destroy();
    }

    // 캔버스를 보이도록 설정
    canvas.style.display = "block";

    // 캔버스를 지우고 새로운 그래프를 그리기 위해 clearRect 사용
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 캔버스 크기를 화면 비율에 맞게 조정
    initializeCanvas();

    // 수식을 계산하여 그래프 데이터 생성
    var data = [];
    var step = (maxX - minX) / 100; // 100개의 점으로 그래프를 그릴 것임
    for (var x = minX; x <= maxX; x += step) {
        var y = eval(expression.replace(/x/g, '(' + x + ')')); // 수식을 계산
        data.push({x: x, y: y});
    }

    // Chart.js를 사용하여 그래프 그리기
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

// 초기화 시 캔버스 크기 조절
window.onload = function() {
    initializeCanvas();
};
