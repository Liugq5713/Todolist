//检测点击edit按钮事件
function panelEventEdit(id) {
    formShow();
    //给表单显示一些提示信信息
    var transaction = db.transaction(["user"], "readwrite"),
        storeHandler = transaction.objectStore('user');
    storeHandler.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        console.log(editEventForm.elements);
        console.log(editEventForm.elements['todoEventName']);
        editEventForm.todoEventName.value = todoObj.user_event;
        //如果有标签就显示，没有就不显示
        //关于标签，应该是放在数组里面，并且使用标签分割。
        //添加多个标签的时候，如何使用空格将他们分开。split()
        if (!editEventForm.eventTag.value) {

        } else {
            editEventForm.eventTag.value = todoObj.tag;

        }
        // 将todo事件的id放在表单中， 方便提交， 修改数据库。
        editEventForm.todoEventId.value = todoObj.id;
    }
}


editEventForm.addEventListener('submit', function(event) {
    event.preventDefault();
    submitEvent();
    showData();
    //把面板关闭（隐藏）
    formHidden();
}, false);

function submitEvent() {
    //获取表单根元素
    var editEventForm = document.querySelector('#editEventForm');

    //获取id值
    var id = editEventForm.todoEventId.value;
    console.log(id);

    //注意获取到的id值是string类型的。
    var id = Number(id);

    //获取修改的数据
    var eventName = editEventForm.todoEventName.value;
    var tag = editEventForm.eventTag.value;

    var transaction = db.transaction(["user"], "readwrite"),
        storeHandler = transaction.objectStore('user');

    var req = storeHandler.get(id);

    req.onerror = function(event) {
        console.debug(event);
    };

    req.onsuccess = function(e) {
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

//显示编辑表单
function formShow() {
    //获取到表单
    var editEventForm = document.querySelector('#editEventForm');
    //让表单显示
    editEventForm.classList.remove('form-hidden');
    editEventForm.classList.add('form-show');
    //显示遮罩层
    document.querySelector('.mask').classList.remove('mask-hidden');
    document.querySelector('.mask').classList.add('mask-show');
}
//隐藏编辑表单
function formHidden() {
    //获取到表单
    var editEventForm = document.querySelector('#editEventForm');
    //让表单显示
    editEventForm.classList.remove('form-show');
    editEventForm.classList.add('form-hidden');
    //显示遮罩层
    document.querySelector('.mask').classList.remove('mask-show');
    document.querySelector('.mask').classList.add('mask-hidden');
}