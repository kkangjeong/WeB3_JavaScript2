window.addEventListener("load", function () {
    var first = document.querySelector("#first");
    var second = document.querySelector("#second");
    var result = document.querySelector("#result");
    var equalBtn = document.querySelector("#equal-btn");
    var right = document.querySelector("#right");

    first.value = Math.floor((Math.random() * 12) + 1);
    second.value = Math.floor((Math.random() * 9)) + 1;
    var answer = first.value * second.value;

    right.onclick = function () {
        if (parseInt(result.value) === answer){
            alert("맞아요");
            first.value = Math.floor(Math.random() * 9);
            second.value = Math.floor(Math.random() * 9);
            answer = first.value * second.value;
        }
        else
            alert("다시 해봅시다");
    };
});
