document.getElementById('item').addEventListener('keydown', (e) => {
    const keycode = e.keyCode;
    if (keycode == 13) {
        pressEnter();
    }
}, false);

function pressEnter() {
    const btn = document.getElementById('add');
    btn.click();
    clearInput();
    // 防止用户按下回车键之后做其他的动作
    event.returnValue = false;
}


// 清除输入框中的数据
function clearInput() {
    const inputTag = document.getElementById('item');
    inputTag.value = '';
}

// 添加回到顶部的按钮

window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('Top').style.display = 'block';
    } else {
        document.getElementById('Top').style.display = 'none';
    }
}

document.getElementById('Top').addEventListener('click', () => {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}, false);