TODO.Panel = (function() {
    // 清除TODO显示面板上所有的节点
    var clear_all_event = function() {
        TODO.DB.del_all_event();
        const root = document.querySelector('#panel-display');
        while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
        }
    };

    //加载未做TODO事项模板
    var event_todo = function() {
        TODO.DB.event_todo(TODO.AJAX.addModule, '#panel-display', './src/gsit/panel.ejs');
    };
    //加载已完成TODO事项模板
    var event_has_done = function() {
        TODO.DB.event_has_done(TODO.AJAX.addModule, '#panel-display', './src/gsit/panel.ejs');
    };
    //加载所有TODO事项模板
    var event_all = function() {
        TODO.DB.event_all(TODO.AJAX.addModule, '#panel-display', './src/gsit/panel.ejs');
    };


    // 点击panel-body事件
    var panel_body_change = function(id, panelBody, panel) {
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        storeHander.get(id).onsuccess = function(e) {
            const todoObj = e.target.result;
            todoObj.finished = !todoObj.finished;
            storeHander.put(todoObj).onsuccess = function(e) {
                // 完成的情况
                if (todoObj.finished) {
                    TODO.addClass(panelBody, 'eventDone');
                    TODO.addClass(panel, 'panel-danger');
                    TODO.delClass(panelBody, 'eventTodo');
                    TODO.delClass(panel, 'panel-info');
                }
                // 未完成的情况
                else {
                    TODO.delClass(panelBody, 'eventDone');
                    TODO.delClass(panel, 'panel-danger');
                    TODO.addClass(panelBody, 'eventTodo');
                    TODO.addClass(panel, 'panel-info');
                }
                console.dir(todoObj);
            };
        };
    };

    // 点击start按钮事件
    var start_pauseBtn = function(id, startBtn) {
        var info = document.querySelector('#info');
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        storeHander.get(id).onsuccess = function(e) {
            const todoObj = e.target.result;
            todoObj.started = !todoObj.started;
            storeHander.put(todoObj).onsuccess = function(e) {
                // 开始的情况
                const myClock = document.querySelector('#myClock');
                if (todoObj.started) {
                    TODO.delClass(startBtn, 'start-img');
                    TODO.delClass(info, 'hidden-info');
                    TODO.addClass(info, 'show-info');
                    TODO.addClass(startBtn, 'pause-img');
                }
                // 未开始的情况
                else {
                    TODO.delClass(info, 'show-info');
                    TODO.delClass(startBtn, 'pause-img');
                    TODO.addClass(startBtn, 'start-img');
                    TODO.addClass(info, 'hidden-info');
                }
            };
        };
    };

    // 点击del按钮的事件
    var del_btn = function(id) {
        let transaction = db.transaction('user', 'readwrite'),
            storeHander = transaction.objectStore('user');
        // 删除操作,需要检验一下键的类型
        storeHander.delete(id).onsuccess = function(e) {
            event_all();
        };
    };

    return {
        //清除面板上所有的数据
        clear_all_event,
        //展示不同的节点
        event_todo,
        event_has_done,
        event_all,
        //点击不同的按钮
        panel_body_change,
        start_pauseBtn,
        del_btn
    }
}());