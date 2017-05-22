TODO.Clock.canvas = document.getElementById('myClock');
TODO.Clock.ctx = TODO.Clock.canvas.getContext('2d');
//画出大体钟的框架，其实这段函数里面就是一个圆
TODO.Clock.drawMap = function() {
    var ctx = TODO.Clock.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.arc(200, 200, 120, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();

    // for (let i = 0; i < 12; i++) {
    //     const x = 120 * Math.cos(i * (Math.PI / 6)) + 200;
    //     const y = 120 * Math.sin(i * (Math.PI / 6)) + 200;
    //     ctx.fillStyle = 'green';
    //     ctx.beginPath();
    //     ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    //     ctx.closePath();
    //     ctx.stroke();
    // }
};
//一个圈的函数
TODO.Clock.Ring = function(x, y) {

    var ctx = TODO.Clock.ctx;
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // 用渐变进行填充
    ctx.strokeStyle = gradient;

    // ctx.clearRect(0, 0, 400, 400);

    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(200, 200, 120, x, y, true);
    ctx.stroke();
};
//画出动态圈的函数
TODO.Clock.drawRing = function() {
    // 获取当前时间
    const date = new Date();
    // 秒针
    const second = date.getMilliseconds();

    TODO.Clock.Ring(0, 2 * Math.PI * second / 1000);
};
//钟上面的指针
TODO.Clock.runPointer = function() {
    var ctx = TODO.Clock.ctx;
    ctx.lineWidth = 2;
    // 获取当前时间
    const date = new Date();
    // 秒针
    const second = date.getSeconds();
    const xSecond = 110 * Math.cos(second * (Math.PI / 30) - Math.PI / 2) + 200;
    const ySecond = 110 * Math.sin(second * (Math.PI / 30) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(200, 200);
    ctx.lineTo(xSecond, ySecond);
    ctx.closePath();
    ctx.stroke();

    // 分针
    const minute = date.getMinutes();
    const xMinute = 100 * Math.cos(minute * (Math.PI / 30) - Math.PI / 2) + 200;
    const yMinute = 100 * Math.sin(minute * (Math.PI / 30) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(200, 200);
    ctx.lineTo(xMinute, yMinute);
    ctx.closePath();
    ctx.stroke();

    // 时针
    const hour = date.getHours() % 12;
    const xHour = 80 * Math.cos(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + 200;
    const yHour = 80 * Math.sin(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + 200;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(200, 200);
    ctx.lineTo(xHour, yHour);
    ctx.closePath();
    ctx.stroke();
};
//刷新你的clock界面，让钟运动起来
TODO.Clock.flashMap = function() {
    var ctx = TODO.Clock.ctx;
    ctx.clearRect(0, 0, 400, 400);
    TODO.Clock.drawMap();
    TODO.Clock.drawRing();
    TODO.Clock.runPointer();
};

setInterval(TODO.Clock.flashMap, 30);