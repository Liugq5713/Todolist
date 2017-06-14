window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window || window.webkitIDBCursor || window.msIDBCursor;


// 数据库初始化，数据库的函数应该只是返回数据而已
// 但是因为是异步的，所以给数据库传入异步函数。
TODO.DB = {
    request: function() {
        return indexedDB.open('todolist', 1)
    },
    init: function() {
        var request = this.request();
        request.onupgradeneeded = function(e) {
            db = e.target.result;
            if (!db.objectStoreNames.contains('user')) {
                // 在这里可以设置键值，也可以是auto
                var store = db.createObjectStore('user', {
                    keyPath: 'id',
                    autoIncrement: true
                });
            }
            // 在这里新建好一个数据库demo
            store.add({
                id: 0,
                user_event: 0,
                finished: true,
                date: 0,
            });
        };
        // 异步成功后才能获取到
        request.onsuccess = function(e) {
            db = e.target.result;
            //加载数据的模板
            TODO.DB.event_all(TODO.AJAX.addModule, '#panel-display', './src/gsit/panel.ejs');
            user_id = TODO.DB.id_now();
            console.log(user_id);


        };
        request.onerror = function(e) {
            console.log('failed');
        };
    },
    del_all_event: function() {
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const range = IDBKeyRange.lowerBound(1);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                const requestDel = cursor.delete();
                requestDel.onsuccess = function() {
                    console.log('del success');
                };
                requestDel.onerror = function() {
                    console.log('del fail');
                };
                cursor.continue();
            } else {}
        };
    },
    // 
    add_event: function(data) {
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const addOpt = storeHander.add(data);
        addOpt.onerror = function() {
            console.log('failed');
        };
        addOpt.onsuccess = function() {
            console.log('add success');
        };
    },
    // 获取到现在的ID值
    id_now: function() {
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const range = IDBKeyRange.lowerBound(0);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                user_id = cursor.value.id;
            } else {
                console.log(user_id);
            }
        };
    },
    // 展示数据
    event_all: function(callback, dom, src) {
        var arr = [];
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                arr.push(cursor.value);
                cursor.continue();
            } else {
                callback.call(this, dom, src, arr);
                console.log('done');
            }

        };
    },
    // 显示已经完成的数据
    event_has_done: function(callback, dom, src) {
        var arr = [];
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');

        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.finished) {
                    arr.push(cursor.value);
                    console.log(`${cursor.value}done`);
                }
                cursor.continue();
            } else {
                callback.call(this, dom, src, arr);
                console.log('done');
            }
        };
    },
    // 显示未完成的数据
    event_todo: function(callback, dom, src) {
        var arr = [];

        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                if (!cursor.value.finished) {
                    arr.push(cursor.value);
                    console.log(`${cursor.value}todo`);
                }
                cursor.continue();
            } else {
                callback.call(this, dom, src, arr);
                console.log('done');
            }
        };
    }
};
window.onload = function() {
    TODO.DB.init();
};