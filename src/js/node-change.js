//点击panel-body事件
function panelBodyChange(id, panelBody, panel) {
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    storeHander.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        todoObj.finished = !todoObj.finished;
        storeHander.put(todoObj).onsuccess = function(e) {
            //完成的情况
            if (todoObj.finished) {
                panelBody.classList.remove("eventTodo");
                panelBody.classList.add('eventDone');
                panel.classList.remove("panel-info");
                panel.classList.add("panel-danger");

            }
            //未完成的情况
            else {
                panelBody.classList.remove('eventDone');
                panelBody.classList.add("eventTodo");
                panel.classList.remove("panel-danger");
                panel.classList.add("panel-info");
            }
        }
    };
}

//点击start按钮事件
function startpauseBtn(id, startBtn) {
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    storeHander.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        todoObj.started = !todoObj.started;
        storeHander.put(todoObj).onsuccess = function(e) {
            //完成的情况
            var myClock = document.querySelector('#myClock');
            if (todoObj.started) {
                startBtn.classList.remove("start-img");
                myClock.classList.remove('no-clock');
                myClock.classList.add('show-clock');
                startBtn.classList.add("pause-img");
            }
            //未完成的情况
            else {
                startBtn.classList.remove("pause-img");
                myClock.classList.remove('show-clock');
                myClock.classList.add('no-clock');
                startBtn.classList.add("start-img");
            }
        }
    };
}


//点击del按钮的事件
function delBtn(id) {
    var transaction = db.transaction("user", "readwrite"),
        storeHander = transaction.objectStore('user');
    // 删除操作,需要检验一下键的类型
    storeHander.delete(id).onsuccess = function(e) {
        showData();
    }
}