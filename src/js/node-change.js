// 点击panel-body事件
function panelBodyChange(id, panelBody, panel) {
  let transaction = db.transaction(['user'], 'readwrite'),
    storeHander = transaction.objectStore('user');
  storeHander.get(id).onsuccess = function (e) {
    const todoObj = e.target.result;
    todoObj.finished = !todoObj.finished;
    storeHander.put(todoObj).onsuccess = function (e) {
            // 完成的情况
      if (todoObj.finished) {
        TODO.styleAdd(panelBody,'eventDone');
        TODO.styleAdd(panel,'panel-danger');
        TODO.styleDel(panelBody,'eventTodo');
        TODO.styleDel(panel,'panel-info');
      }
            // 未完成的情况
      else {
         TODO.styleDel(panelBody,'eventDone');
        TODO.styleDel(panel,'panel-danger');
        TODO.styleAdd(panelBody,'eventTodo');
        TODO.styleAdd(panel,'panel-info');
      }
    };
  };
}

// 点击start按钮事件
function startpauseBtn(id, startBtn) {
  let transaction = db.transaction(['user'], 'readwrite'),
    storeHander = transaction.objectStore('user');
  storeHander.get(id).onsuccess = function (e) {
    const todoObj = e.target.result;
    todoObj.started = !todoObj.started;
    storeHander.put(todoObj).onsuccess = function (e) {
            // 完成的情况
      const myClock = document.querySelector('#myClock');
      if (todoObj.started) {
        TODO.styleAdd(myClock,'show-clock');
        TODO.styleAdd(startBtn,'pause-img');
        TODO.styleDel(startBtn,'start-img');
        TODO.styleDel(myClock,'no-clock');
      }
            // 未完成的情况
      else {
        TODO.styleDel(myClock,'show-clock');
        TODO.styleDel(startBtn,'pause-img');
        TODO.styleAdd(startBtn,'start-img');
        TODO.styleAdd(myClock,'no-clock');
      }
    };
  };
}


// 点击del按钮的事件
function delBtn(id) {
  let transaction = db.transaction('user', 'readwrite'),
    storeHander = transaction.objectStore('user');
    // 删除操作,需要检验一下键的类型
  storeHander.delete(id).onsuccess = function (e) {
    showData();
  };
}
