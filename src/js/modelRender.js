var xhrEjs = new XMLHttpRequest();
xhrEjs.open('GET', './src/gsit/info.ejs', true);
xhrEjs.send();
xhrEjs.onreadystatechange = function() {
    if (xhrEjs.readyState == 4) {
        html = ejs.render(xhrEjs.responseText);
        console.log(html);
        document.querySelector('#info').innerHTML = html;
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
}