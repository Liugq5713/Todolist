//加载信息模板
var xhrEjs = new XMLHttpRequest();
xhrEjs.open('GET', './src/gsit/info.ejs', true);
xhrEjs.send();
xhrEjs.onreadystatechange = function() {
    if (xhrEjs.readyState == 4) {
        html = ejs.render(xhrEjs.responseText);
        document.querySelector('#info').innerHTML = html;
        //模板加载完成后，加载对应的JS文件
        var xhrClock = new XMLHttpRequest();
        xhrClock.open('GET', './src/js/clock.js', true);
        xhrClock.send();
        xhrClock.onreadystatechange = function() {
            if (xhrClock.readyState == 4) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.text = xhrClock.responseText;
                document.body.appendChild(script);
            }
        }

    }
};