// 点击panel-body事件
function panelBodyChange(id, panelBody, panel) {
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
        };
    };
}

// 点击start按钮事件
function startpauseBtn(id, startBtn) {
    let transaction = db.transaction(['user'], 'readwrite'),
        storeHander = transaction.objectStore('user');
    storeHander.get(id).onsuccess = function(e) {
        const todoObj = e.target.result;
        todoObj.started = !todoObj.started;
        storeHander.put(todoObj).onsuccess = function(e) {
            // 完成的情况
            const myClock = document.querySelector('#myClock');
            if (todoObj.started) {
                TODO.addClass(myClock, 'show-clock');
                TODO.addClass(startBtn, 'pause-img');
                TODO.delClass(startBtn, 'start-img');
                TODO.delClass(myClock, 'no-clock');
            }
            // 未完成的情况
            else {
                TODO.delClass(myClock, 'show-clock');
                TODO.delClass(startBtn, 'pause-img');
                TODO.addClass(startBtn, 'start-img');
                TODO.addClass(myClock, 'no-clock');
            }
        };
    };
}


// 点击del按钮的事件
function delBtn(id) {
    let transaction = db.transaction('user', 'readwrite'),
        storeHander = transaction.objectStore('user');
    // 删除操作,需要检验一下键的类型
    storeHander.delete(id).onsuccess = function(e) {
        showData();
    };
}