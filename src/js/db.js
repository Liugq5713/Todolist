window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window || window.webkitIDBCursor || window.msIDBCursor;


// 数据库初始化，数据库的函数应该只是返回数据而已
//但是因为是异步的，所以给数据库传入异步函数。
TODO.DB = (function(request) {
    init = function() {
        console.log('init');
        request.onerror = function(e) {
            console.log('failed');
        };

        request.onupgradeneeded = function(e) {
            console.log('upgradeneeded');
            db = e.target.result;
            if (!db.objectStoreNames.contains('user')) {
                // 在这里可以设置键值，也可以是auto
                var store = db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
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
            console.log("success");
            db = e.target.result;
            TODO.DB.showData();
            user_id = TODO.DB.getID();
            const todoShowSelect = document.querySelector('#todoShowWay');
            todoShowSelect.addEventListener('change', (e) => {
                switch (todoShowSelect.value) {
                    case 'showDataDone':
                        TODO.DB.showDataDone();
                        break;
                    case 'showDataTodo':
                        TODO.DB.showDataTodo();
                        break;
                    case 'showData':
                        TODO.DB.showData();
                        break;
                    default:
                        TODO.DB.showData();
                        break;
                }
            }, false);
            document.getElementById('delete').addEventListener('click', () => { TODO.DB.delAllData(); }, false);

        };
    };
    delAllData = function() {
        let transaction = request.result.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const range = IDBKeyRange.lowerBound(1);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                const requestDel = cursor.delete();
                requestDel.onsuccess = function() {
                    console.log('del success');
                    TODO.DB.showData();
                };
                requestDel.onerror = function() {
                    console.log('del fail');
                };
                cursor.continue();
            } else {}
        };
    };
    // 获取到现在的ID值
    getID = function() {
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
    };
    // 展示数据
    showData = function() {
        TODO.Panel.clearAllNodes();
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');

        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                TODO.Panel.refreshNode(cursor.value);
                console.log(`${cursor.value}show`);
                cursor.continue();
            } else {
                console.log('done');
            }
        };
    };
    // 显示已经完成的数据
    showDataDone = function() {
        TODO.Panel.clearAllNodes();
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');

        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.finished) {
                    console.log(`${cursor.value}done`);
                    TODO.Panel.refreshNode(cursor.value);
                }
                cursor.continue();
            } else {}
        };
    };
    // 显示未完成的数据
    showDataTodo = function() {
        TODO.Panel.clearAllNodes();
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');

        const range = IDBKeyRange.lowerBound(0, true);
        storeHander.openCursor(range, 'next').onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                if (!cursor.value.finished) {
                    console.log(`${cursor.value}todo`);
                    TODO.Panel.refreshNode(cursor.value);
                }
                cursor.continue();
            } else {}
        };
    };
    // 添加数据
    addData = function(data) {
        let transaction = db.transaction(['user'], 'readwrite'),
            storeHander = transaction.objectStore('user');
        const addOpt = storeHander.add(data);
        addOpt.onerror = function() {
            console.log('failed');
        };
        addOpt.onsuccess = function() {
            console.log('add success');
        };
    };
    return {
        init,
        delAllData,
        getID,
        showData,
        showDataDone,
        showDataTodo,
        addData
    }
})(indexedDB.open('todolist', 1));

window.onload = function() {
    TODO.DB.init();
};