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

function delPanel(id) {
    var transaction = request.result.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');

    //TODO:删除操作未成功
    storeHander.get(id).onsuccess = function(e) {
        console.log(e.target);
    }
    storeHander.delete(id).onsuccess = function(e) {
        console.log("del success");
    }
}