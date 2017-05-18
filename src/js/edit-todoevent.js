// 检测点击edit按钮事件
function panelEventEdit(id) {
    formShow();
    // 给表单显示一些提示信信息
    let transaction = db.transaction(['user'], 'readwrite'),
        storeHandler = transaction.objectStore('user');
    storeHandler.get(id).onsuccess = function(e) {
        const todoObj = e.target.result;
        editEventForm.todoEventName.value = todoObj.user_event;
        // 如果有标签就显示，没有就不显示
        // 关于标签，应该是放在数组里面，并且使用标签分割。
        // 添加多个标签的时候，如何使用空格将他们分开。split()
        if (!editEventForm.eventTag.value) {

        } else {
            editEventForm.eventTag.value = todoObj.tag;
        }
        // 将todo事件的id放在表单中， 方便提交， 修改数据库。
        editEventForm.todoEventId.value = todoObj.id;
    };
}


editEventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitEvent();
    showData();
    // 把面板关闭（隐藏）
    formHidden();
}, false);

function submitEvent() {
    var tags = TODO.tags;
    console.log(tags);
    // 获取表单根元素
    const editEventForm = document.querySelector('#editEventForm');

    // 获取id值
    let id = editEventForm.todoEventId.value;
    // 注意获取到的id值是string类型的。
    id = Number(id);
    // 获取修改的数据
    const eventName = editEventForm.todoEventName.value;
    // 获取修改后的id值
    const tag = tags.get();
    console.log(tags.Tags);
    console.log(tag);
    let transaction = db.transaction(['user'], 'readwrite'),
        storeHandler = transaction.objectStore('user');

    const req = storeHandler.get(id);

    req.onerror = function(event) {
        console.debug(event);
    };

    req.onsuccess = function(e) {
        const todoObj = e.target.result;
        todoObj.user_event = eventName;
        todoObj.tag = tag;
        const putReq = storeHandler.put(todoObj);
        putReq.onsuccess = function(err) {
            console.log('edit successful');
        };
        putReq.onerror = function() {};
    };
}

// 显示编辑表单
function formShow() {
    // 获取到表单
    const editEventForm = document.querySelector('#editEventForm');
    //获取遮罩
    const mask = document.querySelector('.mask');
    // 让表单显示
    TODO.addClass(editEventForm, 'form-show');
    TODO.delClass(editEventForm, 'form-hidden');
    // 显示遮罩层
    TODO.addClass(mask, 'mask-show');
    TODO.delClass(mask, 'mask-hidden');
}
// 隐藏编辑表单
function formHidden() {
    // 获取到表单
    const editEventForm = document.querySelector('#editEventForm');
    // 让表单显示
    TODO.delClass(editEventForm, 'form-show');
    TODO.addClass(editEventForm, 'form-hidden');

    // 显示遮罩层
    const mask = document.querySelector('.mask');
    TODO.addClass(mask, 'mask-hidden');
    TODO.delClass(mask, 'mask-show');
}