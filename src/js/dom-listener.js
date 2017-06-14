//使用了父元素委托，监听panel上的发生的事件
(function() {
    const panel = document.querySelector('#panel-display');
    // 委托父元素进行监听
    panel.addEventListener('click', (e) => {
        // 获取对应事件的数据库编号，查询到对应的事件
        const id = Number(e.target.getAttribute('data-panelId'));
        console.log(id);

        // 点击panel-body事件
        if (hasClass(e.target, 'panel-body')) {
            const panelBody = e.target;
            const panel = e.target.parentNode;
            TODO.Panel.panelBodyChange(id, panelBody, panel);
        }
        // 点击start按钮事件
        if (hasClass(e.target, 'start-pause')) {
            const startBtn = e.target;
            TODO.Panel.startpauseBtn(id, startBtn);
        }

        // 点击del按钮事件
        if (hasClass(e.target, 'panelDel')) {
            TODO.Panel.delBtn(id);
        }

        // 点击edit按钮事件
        if (hasClass(e.target, 'set-btn')) {
            TODO.single(TODO.editForm.createForm);
            TODO.editForm.panelEventEdit(id);
            editEventForm.addEventListener('submit', (event) => {
                event.preventDefault();
                TODO.editForm.submitEvent();
                TODO.DB.showData();
                // 把面板关闭（隐藏）
                TODO.editForm.formHidden();
            }, false);
        }
    }, false);

    // 实现hasclass方法
    function hasClass(obj, cls) {
        const obj_class = obj.className;
        // 将字符串分割成数组
        const obj_class_lst = obj_class.split(/\s+/);
        let x = 0;
        // 遍历数组，检测是否有该类元素
        for (x in obj_class_lst) {
            if (obj_class_lst[x] == cls) {
                return true;
            }
        }
        return false;
    }
})();
//监听选项卡变动的事件
(function(todoShowSelect) {
    todoShowSelect.addEventListener('change', (e) => {
        switch (todoShowSelect.value) {
            case 'showDataDone':
                TODO.Panel.event_has_done();
                break;
            case 'showDataTodo':
                TODO.Panel.event_todo();
                break;
            case 'showData':
                TODO.Panel.event_all();
                break;
            default:
                TODO.Panel.event_all();
                break;
        }
    }, false);

})(document.querySelector('#todoShowWay'));
//删除所有事件的按钮
document.getElementById('delete').addEventListener('click', () => {
    TODO.Panel.clear_all_event();
}, false);