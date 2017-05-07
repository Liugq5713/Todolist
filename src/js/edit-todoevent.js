//检测点击edit按钮事件
function panelEventEdit(id) {
    var editEventForm = document.querySelector('#editEventForm');
    editEventForm.classList.remove('form-hidden');
    editEventForm.classList.add('form-show');
    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    storeHander.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        var inputEvent = document.querySelector('#todoEventName');
        inputEvent.value = todoObj.user_event;

        //将todo事件的id放在表单中，方便提交，修改数据库。
        var todoEventId = document.querySelector('#todoEventId');
        todoEventId.value = todoObj.id;
    }
}

//有问题，应该又是异步执行的问题。
function submitEvent() {
    //获取id值
    var id = document.querySelector('#todoEventId').value;
    //注意获取到的id值是string类型的。
    var id = Number(id);

    //获取修改的数据
    var eventName = document.querySelector('#todoEventName').value;
    var tag = document.querySelector('#eventTag').value;

    var transaction = db.transaction(["user"], "readwrite"),
        storeHander = transaction.objectStore('user');
    //TODO:修改数据库不成功
    storeHander.get(id).onsuccess = function(e) {
        var todoObj = e.target.result;
        console.log(todoObj);
        todoObj.user_event = eventName;
        todoObj.tag = tag;
        storeHander.put(todoObj).onsuccess = function() {
            console.log(e);
        }

        storeHander.put(todoObj).onerror = function() {
            console.log(e);
            console.log("failed");
        }

    }
}