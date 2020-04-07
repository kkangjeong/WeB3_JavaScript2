document.querySelector("#btn").addEventListener("click", function () {
    var first = document.querySelector("#first");
    var inputWord = document.querySelector("#input-word");
    var div = document.querySelector("div");

    if(first.value[(first.value).length - 1] === inputWord.value[0]) {
        first.value = inputWord.value;
        inputWord.value = "";
    }
    else{
        alert("다시 입력해요");
    }
});