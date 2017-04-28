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