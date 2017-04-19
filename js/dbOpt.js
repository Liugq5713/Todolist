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






//TODO:删除数据
function delData() {
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