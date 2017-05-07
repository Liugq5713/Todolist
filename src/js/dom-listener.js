var panel = document.querySelector('#showData');
//委托父元素进行监听
panel.addEventListener('click', function(e) {
    //获取对应事件的数据库编号，查询到对应的事件
    var id = Number(e.target.getAttribute('data-panelId'));
    // console.log(e.target);

    //点击panel-body事件
    if (e.target.classList[0] == 'panel-body') {
        var panelBody = e.target;
        var panel = e.target.parentNode;
        panelBodyChange(id, panelBody, panel);
    }
    //点击start按钮事件
    if (e.target.classList[1] == 'start-pause') {
        var startBtn = e.target;
        startpauseBtn(id, startBtn);
    }

    //点击del按钮事件
    if (e.target.classList[0] == 'panelDel') {
        delBtn(id);
    }

    //点击edit按钮事件
    if (e.target.classList[1] === 'set-btn') {
        panelEventEdit(id);
    }
}, false);