TODO.styleAdd = function (domElement) {
   var Styles= Array.prototype.slice.call(arguments,1);
   for(var i in Styles){
       domElement.classList.add(Styles[i]);
   }
};
TODO.styleDel = function (domElement) {
   var Styles= Array.prototype.slice.call(arguments,1);
   for(var i in Styles){
       domElement.classList.remove(Styles[i]);
   }
};