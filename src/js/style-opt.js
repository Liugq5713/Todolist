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