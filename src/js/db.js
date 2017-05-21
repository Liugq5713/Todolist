window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window || window.webkitIDBCursor || window.msIDBCursor;

// 数据库初始化
TODO.DB.init = function() {
    request = indexedDB.open('todolist', 1);
    request.onerror = function(e) {
        console.log('failed');
    };

    request.onupgradeneeded = function(e) {
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
        console.log("here");
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

// 获取到现在的ID值
TODO.DB.getID = function() {
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
TODO.DB.showData = function() {
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
TODO.DB.showDataDone = function() {
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
TODO.DB.showDataTodo = function() {
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
TODO.DB.addData = function(data) {
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

//删除所有数据
TODO.DB.delAllData = function() {
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