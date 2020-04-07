/*
var body = document.body;

var divTag = document.createElement("div");
document.body.append(divTag);
divTag.textContent = "자전거";

var inputTag = document.createElement("input");
document.body.append(inputTag);

var buttonTag = document.createElement("button");
document.body.append(buttonTag);
buttonTag.textContent = "입력";

var divTag2 = document.createElement("div");
document.body.append(divTag2);

buttonTag.addEventListener('click', function () {

    if (divTag.textContent[divTag.textContent.length - 1] === inputTag.value[0]) {
        divTag.textContent = inputTag.value;
        inputTag.value = "";
        divTag2.textContent = "딩동댕"
        inputTag.focus();   //다시입력할 때 커서 자동으로 가있도록
    }
    else
        divTag2.textContent = "땡";
        inputTag.focus();

});
// textContent(div태그)인지 value(input태그)인지 헷갈리지 않게

*/



//2) form 태그 추가 :  enter눌러서 버튼 클릭되도록
var body = document.body;

var divTag = document.createElement("div");
document.body.append(divTag);
divTag.textContent = "자전거";

var formTag = document.createElement("form");
document.body.append(formTag);

var inputTag = document.createElement("input");
formTag.append(inputTag);

var buttonTag = document.createElement("button");
formTag.append(buttonTag);
buttonTag.textContent = "입력";

var divTag2 = document.createElement("div");
document.body.append(divTag2);

formTag.addEventListener('submit', function (e) {
    e.preventDefault();         //기본동작인 새로고침 안되도록(submit일 때)
    if (divTag.textContent[divTag.textContent.length - 1] === inputTag.value[0]) {
        divTag.textContent = inputTag.value;
        inputTag.value = "";
        divTag2.textContent = "딩동댕"
        inputTag.focus();   //다시입력할 때 커서 자동으로 가있도록
    }
    else
        divTag2.textContent = "땡";
        inputTag.focus();

});
