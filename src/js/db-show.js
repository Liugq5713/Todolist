//展示数据
function showData() {
    clearAllNodes();
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');

    var range = IDBKeyRange.lowerBound(0, true);
    storeHander.openCursor(range, 'next').onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            refreshNode(cursor.value);
            console.log(cursor.value + "show");
            cursor.continue();
        } else {
            console.log("done");
        }
    };
}
//显示已经完成的数据
function showDataDone() {
    clearAllNodes();
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');

    var range = IDBKeyRange.lowerBound(0, true);
    storeHander.openCursor(range, 'next').onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            if (cursor.value.finished) {
                console.log(cursor.value + "done");
                refreshNode(cursor.value);
            }
            cursor.continue();
        } else {}
    };
}

//显示未完成的数据
function showDataTodo() {
    clearAllNodes();
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');

    var range = IDBKeyRange.lowerBound(0, true);
    storeHander.openCursor(range, 'next').onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            if (!cursor.value.finished) {
                console.log(cursor.value + "todo");
                refreshNode(cursor.value);
            }
            cursor.continue();
        } else {}
    };
}