TODO.Clock.canvas = document.getElementById('myClock');
TODO.Clock.ctx = TODO.Clock.canvas.getContext('2d');
//时钟本身的配置
TODO.Clock.cfg = {
    //canvas的宽高
    width: TODO.Clock.canvas.width,
    height: TODO.Clock.canvas.height,
    //圆心相对于0，0点处的偏移量

    radius: 120,
    //线的长度
    hLength: 50,
    mLength: 70,
    sLength: 90
};
//番茄钟的配置
TODO.Clock.pomodoro_cfg = {
    //这是以分为单位的番茄时间,时间到就提醒
    Time: 25,
    //这是表盘上显示点的个数
    DotCount: 15
};
//表示一个点代表多少秒
TODO.Clock.scale = 60 * TODO.Clock.pomodoro_cfg.Time / TODO.Clock.pomodoro_cfg.DotCount;
//当打开时，获得点开闹钟时的初始时间
TODO.Clock.RecordTime = (function() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var mCnt = 60 * (h * 60 + m) + s;
    return mCnt;
})();
TODO.Clock.getCurTime = function() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var mCnt = 60 * (h * 60 + m) + s;
    return mCnt;
};
//画出大体钟的框架，其实这段函数里面就是一个圆
TODO.Clock.drawMap = function() {
    var count = TODO.Clock.pomodoro_cfg.DotCount;
    var ctx = TODO.Clock.ctx;
    var offset = TODO.Clock.cfg.width / 2;
    var r = TODO.Clock.cfg.radius;
    for (let i = 0; i < count; i++) {
        const x = r * Math.cos(i * (2 * Math.PI / count)) + offset;
        const y = r * Math.sin(i * (2 * Math.PI / count)) + offset;
        ctx.fillStyle = ' green';
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
};

TODO.Clock.runTime = function() {
    var count = TODO.Clock.pomodoro_cfg.DotCount;
    var ctx = TODO.Clock.ctx;
    var r = TODO.Clock.cfg.radius;
    var offset = TODO.Clock.cfg.width / 2;

    var CurTime = TODO.Clock.getCurTime();
    var passTime = CurTime - TODO.Clock.RecordTime;
    var dotMin = TODO.Clock.scale;
    var cnt = parseInt(passTime / dotMin);
    for (let i = 0; i < cnt; i++) {
        var x = r * Math.cos(i * (2 * Math.PI / count)) + offset;
        var y = r * Math.sin(i * (2 * Math.PI / count)) + offset;
        ctx.fillStyle = 'black';
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    //如果运行时间达到番茄时间了，那么就发送一个提醒
    if (passTime === (60 * TODO.Clock.pomodoro_cfg.Time)) {
        console.log(passTime);
        console.log(60 * TODO.Clock.pomodoro_cfg.Time);
        TODO.Clock.sendNotification();
    }

};
TODO.Clock.sendNotification = function() {
    if (window.Notification) {
        //允许通知
        if (Notification.permission == 'granted') {
            console.log(1);
            const notication = new Notification('任务完成了嘛？ ', {
                body: '先休息一下吧',
                tag: '// 标签',
                // icon: "//字符串。通知面板左侧那个图标地址。
            });
            //不是拒绝状态，但是还是需要去申请
        } else if (Notification.permission != 'denied') {

            Notification.requestPermission().then((permission) => {
                if (permission == 'granted') {
                    const notification = new Notification('任务完成了嘛？ ', {
                        body: '先休息一下吧',
                        tag: '// 标签',
                        // icon: "//字符串。通知面板左侧那个图标地址。
                    });
                }
            });
        } else {
            alert('nothing');
        }
    }
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
    ctx.arc(TODO.Clock.width / 2, TODO.Clock.height / 2, 120, x, y, true);
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

    var r = TODO.Clock.cfg.radius;
    var offset = TODO.Clock.cfg.width / 2;
    var ctx = TODO.Clock.ctx;
    ctx.lineWidth = 2;
    // 获取当前时间
    const date = new Date();
    // 秒针
    const second = date.getSeconds();
    const xSecond = 90 * Math.cos(second * (Math.PI / 30) - Math.PI / 2) + offset;
    const ySecond = 90 * Math.sin(second * (Math.PI / 30) - Math.PI / 2) + offset;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(offset, offset);
    ctx.lineTo(xSecond, ySecond);
    ctx.closePath();
    ctx.stroke();

    // 分针
    const minute = date.getMinutes();
    const xMinute = 70 * Math.cos(minute * (Math.PI / 30) - Math.PI / 2) + offset;
    const yMinute = 70 * Math.sin(minute * (Math.PI / 30) - Math.PI / 2) + offset;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(offset, offset);
    ctx.lineTo(xMinute, yMinute);
    ctx.closePath();
    ctx.stroke();

    // 时针
    const hour = date.getHours() % 12;
    const xHour = 50 * Math.cos(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + offset;
    const yHour = 50 * Math.sin(hour * (Math.PI / 6) + minute * (Math.PI / 360) - Math.PI / 2) + offset;
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(offset, offset);
    ctx.lineTo(xHour, yHour);
    ctx.closePath();
    ctx.stroke();
};
//刷新你的clock界面，让钟运动起来
TODO.Clock.flashMap = function() {
    var ctx = TODO.Clock.ctx;
    ctx.clearRect(0, 0, TODO.Clock.cfg.width, TODO.Clock.cfg.height);
    TODO.Clock.drawMap();
    TODO.Clock.runPointer();
    TODO.Clock.runTime();
};

setInterval(TODO.Clock.flashMap, 1000);