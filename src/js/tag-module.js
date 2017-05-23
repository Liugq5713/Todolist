TODO.tags = (function() {
    var Tags = [];
    // 读操作
    const getAll = function() {
        return Tags;
    };
    const inputValue = function() {
            const tagContent = document.querySelector('#tag');
            return tagContent.value;
        }
        // 存入操作
    const pushSingleStr = function(str) {
        // 判断标签不是重复的
        if (Tags.indexOf(str) === -1) {
            Tags.push(str);
            return true;
        }
        return false;
    };
    const htmlAddTag = function() {
        const hasAddTag = document.querySelector('#hasAddTag');
        const tagContent = document.querySelector('#tag');
        const tagText = document.createTextNode(tagContent.value);
        const span = document.createElement('span');
        span.classList.add('label');
        span.classList.add('label-primary');
        span.appendChild(tagText);
        hasAddTag.appendChild(span);
    };
    const addTag = function() {
        let value = inputValue();
        if (pushSingleStr(value)) {
            htmlAddTag();
        } else {
            return false;
        }
    }
    const inputClear = function() {
        const tagContent = document.querySelector('#tag');
        tagContent.value = '';
    };
    return {
        addTag: addTag,
        push: pushSingleStr,
        clear: inputClear,
        get: getAll
    };
}());
// 对于标签的处理
// 按空格键提交
// document.getElementById('tag').addEventListener('keydown', (e) => {
//     const keycode = e.keyCode;
//     // 将模块赋值给一个局部变量
//     let tags = TODO.tags;
//     if (keycode === 32) {
//         tags.addTag();
//         tags.clear();
//     }
// }, false);