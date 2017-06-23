//数据库初始化，以及加载文件
window.onload = function() {
    TODO.DB.init();
};
//设置闹钟刷新
setInterval(TODO.Clock.flashMap, 1000);