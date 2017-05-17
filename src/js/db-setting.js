window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window || window.webkitIDBCursor || window.msIDBCursor;

const cfg = {
  dbname: 'todolist',
  dbVersion: '1',
};
(function window_load() {
  request = indexedDB.open(cfg.dbname, cfg.dbVersion);

  request.onerror = function (e) {
    console.log('failed');
  };
    // 异步成功后才能获取到
  request.onsuccess = function (e) {
    db = e.target.result;
    showData();
    user_id = getId();
    const todoShowSelect = document.querySelector('#todoShowWay');
    todoShowSelect.addEventListener('change', (e) => {
      switch (todoShowSelect.value) {
        case 'showDataDone':
          showDataDone();
          break;
        case 'showDataTodo':
          showDataTodo();
          break;
        case 'showData':
          showData();
          break;
        default:
          showData();
          break;
      }
    }, false);
    document.getElementById('delete').addEventListener('click', () => { delAllData(); }, false);
  };

  request.onupgradeneeded = function (e) {
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
}());


// 获取到现在的ID值
function getId() {
  let transaction = db.transaction(['user'], 'readwrite'),
    storeHander = transaction.objectStore('user');

  const range = IDBKeyRange.lowerBound(0);
  storeHander.openCursor(range, 'next').onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      cursor.continue();
      user_id = cursor.value.id;
    } else {
      console.log(user_id);
    }
  };
}
