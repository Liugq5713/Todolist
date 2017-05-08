var panel = document.querySelector('#showData');
//委托父元素进行监听
panel.addEventListener('click', function(e) {
    //获取对应事件的数据库编号，查询到对应的事件
    var id = Number(e.target.getAttribute('data-panelId'));
    // console.log(e.target);

    //点击panel-body事件
    if (hasClass(e.target, 'panel-body')) {
        var panelBody = e.target;
        var panel = e.target.parentNode;
        panelBodyChange(id, panelBody, panel);
    }
    //点击start按钮事件
    if (hasClass(e.target, 'start-pause')) {
        var startBtn = e.target;
        startpauseBtn(id, startBtn);
    }

    //点击del按钮事件
    if (hasClass(e.target, 'panelDel')) {
        delBtn(id);
    }

    //点击edit按钮事件
    if (hasClass(e.target, 'set-btn')) {
        panelEventEdit(id);
    }
}, false);


//实现hasclass方法
function hasClass(obj, cls) {
    var obj_class = obj.className;
    //将字符串分割成数组
    var obj_class_lst = obj_class.split(/\s+/);
    var x = 0;
    //遍历数组，检测是否有该类元素
    for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {
            return true;
        }
    }
    return false;
}