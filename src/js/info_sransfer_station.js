const infoTransferStation = (function() {
    let RunClock = [];
    let start = true;
    //检测有没有其他番茄钟在运行
    const b_runingClock = function() {
        if (RunClock.length == 0) {
            return true;
        } else {
            return false;
        }
    };
    //打开该id的番茄钟
    const openClock = function(id, btn) {
        if (b_runingClock()) {
            TODO.Panel.start_pauseBtn(id, btn);
        } else {
            return false;
        }
    };
    //禁用其他按钮的番茄钟
    const disableOtherStartBtn = function() {
        const Btn = document.querySelectorAll('.start-img');
        //遍历数组中的元素，函数中的arg代表数组中的每一个元素
        Btn.forEach(function(btn) {
            log('here');
            log(btn);
            btn.disabled = true;
        })
    };

    //启用其他按钮的番茄钟
    const enableOtherStartBtn = function() {
        const Btn = document.querySelectorAll('.start-img');
        //遍历数组中的元素，函数中的arg代表数组中的每一个元素
        Btn.forEach(function(btn) {
            btn.disabled = false;
        })
    };
    //只有按下对应的按钮，才能关闭本番茄钟
    const closeClock = function(id, btn) {
        TODO.Panel.start_pauseBtn(id, btn);
        RunClock.splice(id, 1);
    }

    const receiveMsg = function() {
        const id = Array.prototype.shift.call(arguments);
        const btn = Array.prototype.shift.call(arguments);
        if (start) {
            openClock(id, btn);
            log(btn);
            disableOtherStartBtn();
            btn.disabled = false;
        } else {
            closeClock(id, btn);
            enableOtherStartBtn();
        }
        start = !start;
    }
    return {
        receiveMsg,
    }
})();