//添加数据
function addData(data) {
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    var addOpt = storeHander.add(data);
    addOpt.onerror = function() {
        console.log("failed");
    }
    addOpt.onsuccess = function() {
        console.log("add success");
    };
}






//TODO:删除所有数据
function delAllData() {
    var transaction = request.result.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    var range = IDBKeyRange.lowerBound(0, true);
    storeHander.openCursor(range, 'next').onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            var requestDel = cursor.delete();
            requestDel.onsuccess = function() {
                console.log("del success");
                showData();
            }
            requestDel.onerror = function() {
                console.log("del fail");
            }
            cursor.continue();
        } else {}
    };
}
//这边我以为我传入的是一个数字，但是其实不是的，是一个string，需要类型转化
function delPanel(keyPath) {
    console.log(db);
    var transaction = db.transaction("user", "readwrite"),
        storeHander = transaction.objectStore('user');
    console.log(typeof(keyPath));

    //TODO:删除操作,需要检验一下键的类型

    storeHander.delete(Number(keyPath)).onsuccess = function(e) {
        console.log("del success");
    }
}

//增加TODO事件后，同步时间到数据库
function addTodoEventDB(user_object) {
    //把数据同步到数据库
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    user_object.finished = user_object.finished;
    console.log(user_object);
    //因为ID是自动增长的，所以使用put会给他增加数据，而不是修改数据
    storeHander.put(user_object).onsuccess = function(e) {
        console.log("修改数据成功");
    };

}