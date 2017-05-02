var canvas = document.getElementById('myClock');
var ctx = canvas.getContext("2d");


function drawMap() {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.arc(200, 200, 120, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();

    for (var i = 0; i < 12; i++) {
        var x = 120 * Math.cos(i * (Math.PI / 6)) + 200;
        var y = 120 * Math.sin(i * (Math.PI / 6)) + 200;
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, true)
        ctx.closePath();
        ctx.stroke();
    }

}

var isDraw = false;

function run() {
    //获取当前时间
    var date = new Date();
    //秒针
    var second = date.getSeconds();
    var xSecond = 110 * Math.cos(second * (Math.PI / 30) - Math.PI / 2) + 200;
    var ySecond = 110 * Math.sin(second * (Math.PI / 30) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(200, 200);
    ctx.lineTo(xSecond, ySecond);
    ctx.closePath();
    ctx.stroke();

    //分针
    var minute = date.getMinutes();
    var xMinute = 100 * Math.cos(minute * (Math.PI / 30) - Math.PI / 2) + 200;
    var yMinute = 100 * Math.sin(minute * (Math.PI / 30) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(200, 200);
    ctx.lineTo(xMinute, yMinute);
    ctx.closePath();
    ctx.stroke();

    //时针
    var hour = date.getHours() % 12;
    var xHour = 80 * Math.cos(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + 200;
    var yHour = 80 * Math.sin(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(200, 200);
    ctx.lineTo(xHour, yHour);
    ctx.closePath();
    ctx.stroke();

}

function flashMap() {
    ctx.clearRect(0, 0, 400, 400);
    drawMap();
    run();
}

setInterval(flashMap, 1000);