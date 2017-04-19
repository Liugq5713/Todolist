//更新节点的操作
function refreshNode(user_object) {
    //在网页上更新数据
    var dataParent = document.getElementById("showData");
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

    //footer
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
    dataParent.appendChild(panel);
    panel.appendChild(panel_head);
    panel.appendChild(panel_body);

    //添加点击事件
    panel.addEventListener('click', function() {
        user_object.finished = !user_object.finished;
        //完成的情况
        if (user_object.finished) {
            panel_body.classList.remove("eventTodo");
            panel_body.classList.add('eventDone');
            panel.classList.remove("panel-info");
            panel.classList.add("panel-danger");

        }
        //未完成的情况
        else {
            panel_body.classList.remove('eventDone');
            panel_body.classList.add("eventTodo");
            panel.classList.remove("panel-danger");
            panel.classList.add("panel-info");
        }

        //把数据同步到数据库
        var transaction = db.transaction(["user"], "readwrite"),
            storeHander = transaction.objectStore('user');
        user_object.finished = user_object.finished;
        console.log(user_object);
        //因为ID是自动增长的，所以使用put会给他增加数据，而不是修改数据
        storeHander.put(user_object).onsuccess = function(e) {
            console.log("修改数据成功");
        };

    }, false);
}


//清除TODO显示面板上所有的节点
function clearAllNodes() {
    var root = document.getElementById('showData');
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild);
    }
}