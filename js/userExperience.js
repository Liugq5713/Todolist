//在这里我给函数参数添加了e，但是这个e是没有值的。所以直接在函数中添加event来实现取得键盘的值
function bindEnter(e) {
    console.log(e);
    var btn = document.getElementById('add');

    var keycode = event.keyCode;
    if (keycode == 13) {
        btn.click();
        clearInput();
        //防止用户按下回车键之后做其他的动作
        event.returnValue = false;
    }
}

//清除输入框中的数据
function clearInput() {
    var inputComment = document.getElementById('item');
    inputComment.value = "";
}