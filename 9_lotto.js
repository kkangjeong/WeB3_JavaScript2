// 당첨숫자를 (숫자야구처럼) 맞춰서 등수 매기는 것도 응용해보기

// Array(숫자)로 빈 배열을 만들 수 있다 // 각각 출력할 때-> 반복문 불가
//var numberCandidate = Array(45);    //45개 일일이 배열 나열하기 귀찮으니까 array함수 사용//이거는 자주쓰지는 않고 []대괄호로 주로 한다
//윗줄은 공간만 만든 것

//var fill = numberCandidate.fill();

// 2) 별로 (forEach로)
// 인덱스를 두번째 매개변수에 넣으면 사용가능
// fill.forEach(function (e, index) {
//     fill[index] = index + 1;    //1부터 45까지 넣기(인덱스 값이 0부터 44라서 +1하기)
// });
// console.log(fill);

// 1) 매핑이용하기 map으로
// var map = fill.map(function (e, index) {
//     return index + 1;    //1부터 45까지 넣기(인덱스 값이 0부터 44라서 +1하기)
// });

//-> 한줄로 쓰면 //변수 map은 6개 숫자후보 의미
var map = Array(45).fill().map(function (e, index) {
    return index + 1;
});
console.log(map);

//셔플이용해서 숫자 6개 뽑기(랜덤하게 섞어서 앞6개뽑기 or 뒤6개뽑기)
var shuffle = [];
//while 은 기준값(map.length 하나뽑으면 하나씩 줄어드니까) 계속 바뀌면 사용 (for보다)
while(map.length > 0){
    var output = map.splice(Math.floor(Math.random() * map.length),1)[0];
    //random함수 정확하지는 않아서 실제 서비스에서는 쓰면 욕먹는다
    shuffle.push(output);
}
var bonusNumber = shuffle[shuffle.length - 1];
var winningNumbers = shuffle.slice(0,6);
console.log("당첨숫자들", winningNumbers.sort(function (p, c) {return p-c;}), "보너스숫자" ,bonusNumber);
//[1, 25, 28, 31, 42, 5] : sort 된거다// 일의자리하고 십의자리라서
//sort에다가 함수넣으면 우리가 생각하는 숫자 소트된다 // c - p이면 내림차순 //0보다 크면 자리를 바꿔서

/*
for(var i = 0; i < winningNumbers.length; i++){
    //1초에 한개씩 공 보여주도록 (비동기)
    // 클로저에 관한 문제(반복문 안에 비동기 사용할 때)
    setTimeout(function () {
        var ball = document.createElement("div");
        ball.textContent = winningNumbers[i];
        result.appendChild(ball);
    },1000);
}
*/

// html태그를 자바스크립트로 가져오는 방법
var result = document.getElementById("result");
//var result = document.querySelector("#result");


function coloringball(n, result){
    var ball = document.createElement("div");
    ball.textContent = n;
    // js로 css 조작하기
    ball.style.display = "inline-block";
    ball.style.border = "1px solid black";
    //ball.style.border-radius 안되고(js에서는 마이나스로 인식해서)
    ball.style.borderRadius = "10px";
    ball.style.width = "20px";
    ball.style.height = "20px";
    ball.style.textAlign = "center";
    ball.style.marginRight = "10px";
    ball.style.fontSize = "12px";

    var backgroundColor;
    if(n <= 10){
        backgroundColor = "red";
    }else if(n <= 20){
        backgroundColor ="orange";
    }else if(n <= 30){
        backgroundColor ="yellow";
    }else if(n <= 40){
        backgroundColor ="blue";
    }else{
        backgroundColor = "green";
    }
    ball.style.background = backgroundColor;
    result.append(ball);
}
setTimeout(function () {
    coloringball(winningNumbers[0], result);
},1000);
setTimeout(function () {
    coloringball(winningNumbers[1], result);
},2000);
setTimeout(function () {
    coloringball(winningNumbers[2], result);
},3000);
setTimeout(function () {
    coloringball(winningNumbers[3], result);
},4000);
setTimeout(function () {
    coloringball(winningNumbers[4], result);
},5000);
setTimeout(function () {
    coloringball(winningNumbers[5], result);
},6000);

setTimeout(function () {
    var bonusBox = document.getElementsByClassName("bonus")[0];
//  var bonusBox = document.querySelector(".bonus");

    coloringball(bonusNumber, bonusBox);
},7000);
