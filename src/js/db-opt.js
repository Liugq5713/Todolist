// 添加数据
function addData(data) {
  let transaction = db.transaction(['user'], 'readwrite'),
    storeHander = transaction.objectStore('user');
  const addOpt = storeHander.add(data);
  addOpt.onerror = function () {
    console.log('failed');
  };
  addOpt.onsuccess = function () {
    console.log('add success');
  };
}

// TODO:删除所有数据
function delAllData() {
  let transaction = request.result.transaction(['user'], 'readwrite'),
    storeHander = transaction.objectStore('user');
  const range = IDBKeyRange.lowerBound(1);
  storeHander.openCursor(range, 'next').onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      const requestDel = cursor.delete();
      requestDel.onsuccess = function () {
        console.log('del success');
        showData();
      };
      requestDel.onerror = function () {
        console.log('del fail');
      };
      cursor.continue();
    } else {}
  };
}
