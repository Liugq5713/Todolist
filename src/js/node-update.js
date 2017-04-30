//更新节点的操作
function refreshNode(user_object) {
    var Panel = addPanel(user_object);
    var delBtn = addDelBtn(Panel["head"], user_object);
    var startBtn = addStartBtn(Panel["head"], user_object);


    //监听删除事件
    delBtn.addEventListener("click", function(e) {
        //btnid不是一个数字，是string
        var btnId = e.target.getAttribute("data-btnId");
        delPanel(btnId);
        showData();
    }, false);

    //点击开始暂停事件
    startBtn.addEventListener('click', function() {
        user_object.started = !user_object.started;
        if (user_object.started) {
            startBtn.removeAttribute("src", "./src/img/start.svg");
            startBtn.classList.remove("start-img");
            startBtn.classList.add("pause-img");
            startBtn.setAttribute("src", "./src/img/pause.svg");

        } else {
            startBtn.removeAttribute("src", "./src/img/pause.svg");
            startBtn.classList.remove("pause-img");

            startBtn.classList.add("start-img");
            startBtn.setAttribute("src", "./src/img/start.svg");
        }
    }, false);

    //添加点击事件
    Panel["body"].addEventListener('click', function() {
        user_object.finished = !user_object.finished;
        //完成的情况
        if (user_object.finished) {
            Panel["body"].classList.remove("eventTodo");
            Panel["body"].classList.add('eventDone');
            Panel["panel"].classList.remove("panel-info");
            Panel["panel"].classList.add("panel-danger");

        }
        //未完成的情况
        else {
            Panel["body"].classList.remove('eventDone');
            Panel["body"].classList.add("eventTodo");
            Panel["panel"].classList.remove("panel-danger");
            Panel["panel"].classList.add("panel-info");
        }
        addTodoEventDB(user_object);

    }, false);
}

//清除TODO显示面板上所有的节点
function clearAllNodes() {
    var root = document.getElementById('showData');
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild);
    }
}

//添加基础的面板head body
function addPanel(user_object) {
    //在网页上更新数据
    var panelParent = document.getElementById("showData");
    //新建文本节点,记录时间和事件的节点，然后给文本节点赋值
    var textData = document.createTextNode(user_object.user_date);
    var textEvent = document.createTextNode(user_object.user_event);
    //搭好结构
    //总体
    var panel = document.createElement("div");
    panel.classList.add("panel");
    //head-info 时间  是否完成 删除
    var panel_head = document.createElement("div");
    panel_head.classList.add("panel-heading");

    //body
    var panel_body = document.createElement("div");
    panel_body.className = "panel-body";
    //根据完成的情况添加样式
    //完成的情况
    if (user_object.finished) {
        panel_body.classList.add("eventDone");
        panel.classList.add("panel-danger");
    }
    //未完成的情况
    else {
        panel_body.classList.add("eventTodo");
        panel.classList.add("panel-info");
    }
    //把文本节点附加上
    panel_head.appendChild(textData);
    panel_body.appendChild(textEvent);
    //节点附加
    panelParent.appendChild(panel);
    panel.appendChild(panel_head);
    panel.appendChild(panel_body);

    var Panel = [];
    Panel["head"] = panel_head;
    Panel["body"] = panel_body;
    Panel["panel"] = panel;
    return Panel;
};

function addDelBtn(panel_head, user_object) {
    //添加了一个删除按钮
    var delBtn = document.createElement("button");
    // delBtn.classList.add("btn-sm");
    delBtn.classList.add("panelDel");
    var btn = document.createTextNode("delete");
    delBtn.appendChild(btn);
    panel_head.appendChild(delBtn);
    //给数据添加ID,方便查找与定义
    delBtn.setAttribute("data-btnId", user_object.id);
    // 把删除的按钮返回
    return delBtn;
};


function addStartBtn(panel_head, user_object) {
    //添加了一个删除按钮
    var startBtn = document.createElement("input");
    startBtn.classList.add("start-img");
    startBtn.setAttribute("type", "image");
    startBtn.setAttribute("src", "./src/img/start.svg");
    panel_head.appendChild(startBtn);
    //给数据添加ID,方便查找与定义
    startBtn.setAttribute("data-btnId", user_object.id);
    // 把删除的按钮返回
    return startBtn;
}