// 更新节点的操作
function refreshNode(user_object) {
  const Panel = addPanel(user_object);
  const delBtn = addDelBtn(Panel.head, user_object);
  const startBtn = addStartBtn(Panel.head, user_object);
  const setBtn = addSetBtn(Panel.head, user_object);
}

// 清除TODO显示面板上所有的节点
function clearAllNodes() {
  const root = document.getElementById('showData');
  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
}

// 添加基础的面板head body
function addPanel(user_object) {
    // 在网页上更新数据
  const panelParent = document.getElementById('showData');
    // 新建文本节点,记录时间和事件的节点，然后给文本节点赋值
  const textData = document.createTextNode(user_object.user_date);
  const textEvent = document.createTextNode(user_object.user_event);
    // 搭好结构
    // 总体
  const panel = document.createElement('div');
  panel.classList.add('panel');
    // head-info 时间  是否完成 删除
  const panel_head = document.createElement('div');
  panel_head.classList.add('panel-heading');

    // body
  const panel_body = document.createElement('div');
  panel_body.className = 'panel-body';
    // 根据完成的情况添加样式
    // 完成的情况
  if (user_object.finished) {
    panel_body.classList.add('eventDone');
    panel.classList.add('panel-danger');
  }
    // 未完成的情况
  else {
    panel_body.classList.add('eventTodo');
    panel.classList.add('panel-info');
  }
    // 把文本节点附加上
  panel_head.appendChild(textData);
  panel_body.appendChild(textEvent);
    // 节点附加
  panelParent.appendChild(panel);
  panel.appendChild(panel_head);
  panel.appendChild(panel_body);
    // 给pannel面板添加标记
  panel_body.setAttribute('data-panelId', user_object.id);
    // 构建一个返回值数组
  const Panel = [];
  Panel.head = panel_head;
  Panel.body = panel_body;
  Panel.panel = panel;
  return Panel;
}


// 添加删除按钮
function addDelBtn(panel_head, user_object) {
    // 添加了一个删除按钮
  const delBtn = document.createElement('button');
    // delBtn.classList.add("btn-sm");
  delBtn.classList.add('panelDel');
  const btn = document.createTextNode('delete');
  delBtn.appendChild(btn);
  panel_head.appendChild(delBtn);
    // 给数据添加ID,方便查找与定义
  delBtn.setAttribute('data-panelId', user_object.id);
    // 把删除的按钮返回
  return delBtn;
}

// 添加小图标的公用函数
function addPanelBtn(panel_head, user_object) {
  const btn = document.createElement('button');
  btn.classList.add('btn-user');
  panel_head.appendChild(btn);
    // 给数据添加ID,方便查找与定义
  btn.setAttribute('data-panelId', user_object.id);
    // 按钮返回
  return btn;
}
// 添加开始暂停按钮
function addStartBtn(panel_head, user_object) {
  const startBtn = addPanelBtn(panel_head, user_object);
  startBtn.classList.add('start-pause');
  startBtn.classList.add('start-img');
  return startBtn;
}

// 添加设置按钮
function addSetBtn(panel_head, user_object) {
  const setBtn = addPanelBtn(panel_head, user_object);
  setBtn.classList.add('set-btn');
  return setBtn;
}
