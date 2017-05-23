TODO.editForm.formShow = function() {
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
};
// 隐藏编辑表单
TODO.editForm.formHidden = function() {
    // 获取到表单
    const editEventForm = document.querySelector('#editEventForm');
    // 让表单显示
    TODO.delClass(editEventForm, 'form-show');
    TODO.addClass(editEventForm, 'form-hidden');

    // 显示遮罩层
    const mask = document.querySelector('.mask');
    TODO.addClass(mask, 'mask-hidden');
    TODO.delClass(mask, 'mask-show');
};

TODO.editForm.submitEvent = function() {
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
};

// 检测点击edit按钮事件
TODO.editForm.panelEventEdit = function(id) {
    TODO.editForm.formShow();
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

TODO.editForm.createForm = function() {
    //一个表单元素
    var form = document.createElement('form');
    form.id = 'editEventForm';
    TODO.addClass(form, 'form-horizontal', 'form-position', 'form-hidden');
    //事件名
    var TodoName = TODO.editForm.createLabel('事件名:', "todoEventName");
    console.log(TodoName);
    console.log(TodoName.childNodes[0]);
    TODO.addClass(TodoName.childNodes[1], 'form-control');
    var TagName = TODO.editForm.createLabel('标签名:', "eventTag");
    TODO.addClass(TagName.childNodes[1], 'tag', 'form-control');
    var btn = TODO.editForm.createButton();

    //新建一个隐藏数据的输入框
    var inputDataHidden = document.createElement('input');
    inputDataHidden.name = "todoEventId";
    TODO.addClass(inputDataHidden, "hidden-id");
    //把这些元素附在form表单上
    form.appendChild(TodoName);
    form.appendChild(TagName);
    form.appendChild(btn);
    form.appendChild(inputDataHidden);
    document.querySelector('.container').appendChild(form);
    //标签
    return form;
};

TODO.editForm.createLabel = function(name, inputName) {
    var div = document.createElement('div');
    div.classList.add('form-group');
    var label = document.createElement('label');
    var labelText = document.createTextNode(name);
    var input = document.createElement('input');
    input.name = inputName;
    input.type = 'text';
    label.appendChild(labelText);
    div.appendChild(label);
    div.appendChild(input);
    return div;
}

TODO.editForm.createButton = function() {
    var div = document.createElement('div');
    div.classList.add('form-group');
    var btn = document.createElement('button');
    btn.classList.add('btn');
    var btnText = document.createTextNode('提交');
    btn.appendChild(btnText);
    div.appendChild(btn);
    return div;
};