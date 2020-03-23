var body = document.body;

var question1 = document.createElement("input");
document.body.append(question1);

var mulButton = document.createElement("button");
document.body.append(mulButton);
mulButton.textContent = "*";

var question2 = document.createElement("input");
document.body.append(question2);

var mulButton2 = document.createElement("button");
document.body.append(mulButton2);
mulButton2.textContent = "=";

var userAnswer = document.createElement("input");
document.body.append(userAnswer);

var answerButton = document.createElement("button");
document.body.append(answerButton);
answerButton.textContent = "맞아!!";

var answer = document.createElement("div");
document.body.append(answer);

question1.value = Math.floor(Math.random() * 9) + 1;
question2.value = Math.floor(Math.random() * 9) + 1;

var result = question1.value * question2.value;

answerButton.addEventListener("click",function (e) {
    // 이벤트 리스너가 여기서도 반복문 역할을 하고 있지만
    // 항상 반복 역할을 하는 것은 아니다

    if (result === parseInt(userAnswer.value)) {
        answer.textContent = "딩동댕";

        question1.value = Math.floor(Math.random() * 9) + 1;
        question2.value = Math.floor(Math.random() * 9) + 1;

        result = question1.value * question2.value;

    } else
        answer.textContent = "땡";

});
