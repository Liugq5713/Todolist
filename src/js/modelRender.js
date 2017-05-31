editForm = document.querySelector("#editFormModel").innerHTML
html = ejs.render(editForm, { user_event: "test" });
console.log(html);
document.querySelector("#model").innerHTML = html;
console.log("test");