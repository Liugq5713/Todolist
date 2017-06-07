var addList = function() { var e = setEvent(); if (e.user_event == "") { return false }
    addData(e);
    refreshNode(e);
    clearInput() };
var setEvent = function() { console.log(user_id); var e = document.getElementById("item").value; var t = new Date; var n = t.Format("yyyy年MM月dd日 hh:mm:ss");
    user_id++; var o = { id: user_id, user_event: e, finished: false, user_date: n };
    console.log(o); return o };
Date.prototype.Format = function(e) { var t = { "y+": this.getFullYear(), "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S+": this.getMilliseconds() }; for (var n in t) { if (new RegExp("(" + n + ")").test(e)) { if (n == "y+") { e = e.replace(RegExp.$1, ("" + t[n]).substr(4 - RegExp.$1.length)) } else if (n == "S+") { var o = RegExp.$1.length;
                o = o == 1 ? 3 : o;
                e = e.replace(RegExp.$1, ("00" + t[n]).substr(("" + t[n]).length - 1, o)) } else { e = e.replace(RegExp.$1, RegExp.$1.length == 1 ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)) } } } return e };

function addData(e) { var t = db.transaction(["user"], "readwrite"),
        n = t.objectStore("user"); var o = n.add(e);
    o.onerror = function() { console.log("failed") };
    o.onsuccess = function() { console.log("add success") } }

function delAllData() { var e = request.result.transaction(["user"], "readwrite"),
        t = e.objectStore("user"); var n = IDBKeyRange.lowerBound(0, true);
    t.openCursor(n, "next").onsuccess = function(e) { var t = e.target.result; if (t) { var n = t.delete();
            n.onsuccess = function() { console.log("del success");
                showData() };
            n.onerror = function() { console.log("del fail") };
            t.continue() } else {} } }

function delPanel(e) { console.log(db); var t = db.transaction("user", "readwrite"),
        n = t.objectStore("user");
    console.log(typeof e);
    n.delete(Number(e)).onsuccess = function(e) { console.log("del success") } }
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window || window.webkitIDBCursor || window.msIDBCursor;
var cfg = { dbname: "todolist", dbVersion: "1" };
(function e() { request = indexedDB.open(cfg.dbname, cfg.dbVersion);
    request.onerror = function(e) { console.log("failed") };
    request.onsuccess = function(e) { db = e.target.result;
        showData();
        user_id = getId();
        document.getElementById("done").addEventListener("click", function() { showDataDone() }, false);
        document.getElementById("todo").addEventListener("click", function() { showDataTodo() }, false);
        document.getElementById("all").addEventListener("click", function() { showData() }, false);
        document.getElementById("delete").addEventListener("click", function() { delAllData() }, false) };
    request.onupgradeneeded = function(e) { db = e.target.result; if (!db.objectStoreNames.contains("user")) { var t = db.createObjectStore("user", { keyPath: "id", autoIncrement: true }) }
        t.add({ id: 0, user_event: 0, finished: true, date: 0 }) } })();

function getId() { var e = db.transaction(["user"], "readwrite"),
        t = e.objectStore("user"); var n = IDBKeyRange.lowerBound(0);
    t.openCursor(n, "next").onsuccess = function(e) { var t = e.target.result; if (t) { t.continue();
            user_id = t.value.id } else { console.log(user_id) } } }

function showData() { clearAllNodes(); var e = db.transaction(["user"], "readwrite"),
        t = e.objectStore("user"); var n = IDBKeyRange.lowerBound(0, true);
    t.openCursor(n, "next").onsuccess = function(e) { var t = e.target.result; if (t) { refreshNode(t.value);
            console.log(t.value + "show");
            t.continue() } else { console.log("done") } } }

function showDataDone() { clearAllNodes(); var e = db.transaction(["user"], "readwrite"),
        t = e.objectStore("user"); var n = IDBKeyRange.lowerBound(0, true);
    t.openCursor(n, "next").onsuccess = function(e) { var t = e.target.result; if (t) { if (t.value.finished) { console.log(t.value + "done");
                refreshNode(t.value) }
            t.continue() } else {} } }

function showDataTodo() { clearAllNodes(); var e = db.transaction(["user"], "readwrite"),
        t = e.objectStore("user"); var n = IDBKeyRange.lowerBound(0, true);
    t.openCursor(n, "next").onsuccess = function(e) { var t = e.target.result; if (t) { if (!t.value.finished) { console.log(t.value + "todo");
                refreshNode(t.value) }
            t.continue() } else {} } }

function refreshNode(e) { var t = document.getElementById("showData"); var n = document.createTextNode(e.user_date); var o = document.createTextNode(e.user_event); var s = document.createElement("div");
    s.classList.add("panel"); var a = document.createElement("div");
    a.classList.add("panel-heading"); var d = document.createElement("div");
    d.className = "panel-body"; if (e.finished) { d.classList.add("eventDone");
        s.classList.add("panel-danger") } else { d.classList.add("eventTodo");
        s.classList.add("panel-info") }
    a.appendChild(n);
    d.appendChild(o);
    t.appendChild(s);
    s.appendChild(a);
    s.appendChild(d); var r = document.createElement("button");
    r.classList.add("btn-sm");
    r.classList.add("panelDel"); var i = document.createTextNode("delete");
    r.appendChild(i);
    a.appendChild(r);
    r.setAttribute("data-btnId", e.id);
    r.addEventListener("click", function(e) { var t = e.target.getAttribute("data-btnId");
        delPanel(t);
        showData() }, false);
    d.addEventListener("click", function() { e.finished = !e.finished; if (e.finished) { d.classList.remove("eventTodo");
            d.classList.add("eventDone");
            s.classList.remove("panel-info");
            s.classList.add("panel-danger") } else { d.classList.remove("eventDone");
            d.classList.add("eventTodo");
            s.classList.remove("panel-danger");
            s.classList.add("panel-info") } var t = db.transaction(["user"], "readwrite"),
            n = t.objectStore("user");
        e.finished = e.finished;
        console.log(e);
        n.put(e).onsuccess = function(e) { console.log("修改数据成功") } }, false) }

function clearAllNodes() { var e = document.getElementById("showData"); while (e.hasChildNodes()) { e.removeChild(e.firstChild) } }
document.getElementById("item").addEventListener("keydown", function(e) { var t = e.keyCode; if (t == 13) { pressEnter() } }, false);

function pressEnter() { var e = document.getElementById("add");
    e.click();
    clearInput();
    event.returnValue = false }

function clearInput() { var e = document.getElementById("item");
    e.value = "" }
window.onscroll = function() { scrollFunction() };

function scrollFunction() { if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { document.getElementById("Top").style.display = "block" } else { document.getElementById("Top").style.display = "none" } }
document.getElementById("Top").addEventListener("click", function() { document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0 }, false);