//检测点击edit按钮事件
function panelEventEdit(id) {
    //获取到表单
    var editEventForm = document.querySelector('#editEventForm');
    //让表单显示
    editEventForm.classList.remove('form-hidden');
    editEventForm.classList.add('form-show');
    //显示遮罩层
    document.querySelector('.mask').classList.remove('mask-hidden');
    document.querySelector('.mask').classList.add('mask-show');
    //给表单显示一些提示信信息
    var transaction = db.transaction(["user"], "readwrite"),
        storeHandler = transaction.objectStore('user');
    storeHandler.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        console.log(editEventForm.elements);
        console.log(editEventForm.elements['todoEventName']);
        editEventForm.todoEventName.value = todoObj.user_event;
        //如果有标签就显示，没有就不显示
        //console.log(editEventForm.eventTag.value);
        // if (!editEventForm.eventTag.value) {

        // } else {
        //     editEventForm.eventTag.value = todoObj.tag;

        // }
        //将todo事件的id放在表单中，方便提交，修改数据库。
        editEventForm.todoEventId.value = todoObj.id;
    }
}

//有问题，应该又是异步执行的问题。
function submitEvent() {
    //获取表单根元素
    var editEventForm = document.querySelector('#editEventForm');

    //获取id值
    var id = editEventForm.todoEventId.value;
    console.log(id);
    //注意获取到的id值是string类型的。
    var id = Number(id);

    //获取修改的数据
    console.log(2);
    var eventName = editEventForm.todoEventName.value;
    console.log(3);

    var tag = editEventForm.eventTag.value;
    console.log(4);

    var transaction = db.transaction(["user"], "readwrite"),
        storeHandler = transaction.objectStore('user');
    //TODO:修改数据库不成功，只是偶尔成功。
    storeHandler.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        console.log(todoObj);
        todoObj.user_event = eventName;
        todoObj.tag = tag;
        console.log(todoObj);
        var putReq = storeHandler.put(todoObj);
        putReq.onsuccess = function(err) {
            console.log(todoObj);
        };
        putReq.onerror = function() {
            console.log(e);
            console.log("failed");
        }
    }

};