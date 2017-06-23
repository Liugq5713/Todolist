TODO.Clock = (function() {
    var canvas = document.getElementById('myClock');
    var ctx = canvas.getContext('2d');

    //时钟本身的配置
    var cfg = {
        //canvas的宽高
        width: canvas.width,
        height: canvas.height,
        //圆心相对于0，0点处的偏移量

        radius: 120,
        //线的长度
        hLength: 50,
        mLength: 70,
        sLength: 90
    };

    //番茄钟的配置
    var pomodoro_cfg = {
        //这是以分为单位的番茄时间,时间到就提醒
        Time: 25,
        //这是表盘上显示点的个数
        dotCount: 15
    };

    //表示一个点代表多少秒
    var scale = 60 * pomodoro_cfg.Time / pomodoro_cfg.dotCount;
    //当打开时，获得点开闹钟时的初始时间
    var RecordTime = (function() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var mCnt = 60 * (h * 60 + m) + s;
        return mCnt;
    })();
    var getCurTime = function() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var mCnt = 60 * (h * 60 + m) + s;
        return mCnt;
    };
    //画出大体钟的框架，其实这段函数里面就是一个圆
    var drawMap = function() {
        var count = pomodoro_cfg.dotCount;

        var offset = cfg.width / 2;
        var r = cfg.radius;
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

    var runTime = function() {
        var count = pomodoro_cfg.dotCount;

        var r = cfg.radius;
        var offset = cfg.width / 2;

        var CurTime = getCurTime();
        var passTime = CurTime - RecordTime;
        var dotMin = scale;
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
        if (passTime === (60 * pomodoro_cfg.Time)) {
            console.log(passTime);
            console.log(60 * pomodoro_cfg.Time);
            sendNotification();
        }

    };
    var sendNotification = function() {
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
    var Ring = function(x, y) {
        var gradient = ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变进行填充
        ctx.strokeStyle = gradient;

        // ctx.clearRect(0, 0, 400, 400);

        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 120, x, y, true);
        ctx.stroke();
    };
    //画出动态圈的函数
    var drawRing = function() {
        // 获取当前时间
        const date = new Date();
        // 秒针
        const second = date.getMilliseconds();

        Ring(0, 2 * Math.PI * second / 1000);
    };
    //钟上面的指针
    var runPointer = function() {

        var r = cfg.radius;
        var offset = cfg.width / 2;

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
    var flashMap = function() {
        ctx.clearRect(0, 0, cfg.width, cfg.height);
        drawMap();
        runPointer();
        runTime();
    };

    return {
        flashMap
    }

}());