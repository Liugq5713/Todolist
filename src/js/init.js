/* global TODO */
//DB不应该作为一个模块直接在项目中使用，应该进行二次封装。
TODO = {
    DB: {},
    Panel: {},
    tags: {},
    editForm: {},
    List: {},
    Clock: {}
};

TODO.addClass = function(domElement) {
    var Styles = Array.prototype.slice.call(arguments, 1);
    for (var i in Styles) {
        domElement.classList.add(Styles[i]);
    }
};
TODO.delClass = function(domElement) {
    var Styles = Array.prototype.slice.call(arguments, 1);
    for (var i in Styles) {
        domElement.classList.remove(Styles[i]);
    }
};

//单例模式
TODO.single = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};
//异步和异步操作加载单例模式的模板,
TODO.AJAX = {
    //使用ajax加载数据
    addModule: function(dom, src, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                //加载模板操作
                if (data) {
                    console.dir(data);
                    html = ejs.render(xhr.responseText, { arr: data });
                    document.querySelector(dom).innerHTML = html;
                } else {
                    html = ejs.render(xhr.responseText);
                    document.querySelector(dom).innerHTML = html;
                }
                //这边如果想操作，可以传入回调函数。
                // callback.call(this, html);
            }
        }
    },
    //使用动态script加载script脚本
    addScript: function(src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }
};
// 格式化日期,来源网络
Date.prototype.Format = function(fmt) {
    const o = {
        'y+': this.getFullYear(),
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S+': this.getMilliseconds(), // 毫秒
    };
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            if (k == 'y+') {
                fmt = fmt.replace(RegExp.$1, (`${o[k]}`).substr(4 - RegExp.$1.length));
            } else if (k == 'S+') {
                let lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, (`00${o[k]}`).substr((`${o[k]}`).length - 1, lens));
            } else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
            }
        }
    }
    return fmt;
};