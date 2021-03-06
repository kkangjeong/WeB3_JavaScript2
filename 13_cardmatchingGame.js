var garo = 4;
var sero = 3;
var colors = ["red", "red", "orange", "orange", "green", "green", "yellow", "yellow", "white", "white", "pink", "pink"];
var colorCandidate = colors.slice();    // 백업을 해놓는 것 // .slice()는 참조관계(똑같이 바뀌는 것) 안되도록 끊는 것


// 문자, 숫자, 불린(3개는 원시값)  : 참조가 안되서 = 을 붙이면 복사(다른 대상이 만들어지는) // 똑같이 바뀌지 않는다
// 객체, 배열, 함수  : = 을 붙이면 참조 //똑같이 바뀐다 // 바뀌지 않도록 복사!하는 것

// 얕은 복사 = 복사
// 깊은 복사 = 복사

// 1. 객체의 참조
// var person = {
//     name : "정인";
// }
// var copyperson = person;
//
// copyperson.name = "강정";

// console.log(person);        // "정인"이 아니라 "강정"으로 된다(똑같이 바뀐다)


// +) 원시값(문자)의 복사

// var value = "정인";
// var copy = value;
// copy = "강정";
// console.log(value); // 결과 : 정인 // 이게 일반적이지
// 그런데 객체, 배열, 함수는 copy를 바꿨는데 value도 바뀐다

// 2. 객체의 복사
// 1) 빈 객체 만든 후 하나하나 넣는 무식한 방법(객체안의 속성이 많다면 일일이 번거롭다)
//     var obj = {a : 1, b : 2};
//     // var obj2 = obj;  // 이거는 객체의 참조니까 똑같이 안 변하도록 복사를 하고 싶다
//     var obj2 = {};
//     obj2.a = obj.a;     // wow obj.a는 원시값이니까 복사가 가능한 것
//     obj2.b = obj.b;
//
//     obj2.a = 3;
//     console.log(obj.a);  //  1

// 2) Object.keys(obj).forEach (속성 안에 속성이 있다면 단점 발생)
//  var obj = {a : 1, b : 2, c : 3};
//  Object.keys(obj);
//  var obj2 = {};
//  Object.keys(obj).forEach(function(key){         // Object.keys는 객체의 속성명들을 배열로 바꾼다 : ["a", "b", "c"]
//      obj2[key] = obj[key];   // 속성 개수에 상관없이 *객체를 복사한 것
//  });
// obj2.a = 4;
// console.log(obj.a);      // 그대로 1이다

// 참조관계인지 아닌지 파악하는 방법
var obj = {a : 1, b : 2, c : 3};
var obj2 = obj;     // 객체니까 참조
console.log(obj === obj2);      //true -> 참조관계이다(연결되어 있다는 뜻)

// +)
var obj = {a : 1, b : 2, c : 3};
var obj2 = {a : 1, b : 2, c : 3};

obj === obj2  //false
obj2 = obj // 하면
obj === obj2  //true


var cardColor = [];

var clickflag = true;           // 5초 후에 닫치는데 그전에 못 닫게(못 클릭하게)
var clickedCard = [];
var completedCard = [];
var startTime;

function shuffle() {
    // colorCandidate 에서 한개씩 뺄 때 colors 에서도 똑같이 빠져서(참조 관계) 에러
    for(var i = 0; colorCandidate.length > 0; i++){
        cardColor = cardColor.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}


function cardSetting(garo, sero) {
    clickflag = false;
    for(var i = 0; i < garo * sero; i++) {
        var card = document.createElement("div");
        card.className = "card";  // 하나만 추가할 때는 이렇게 
        // card.classList.add("card"); 랑 같다

        var cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        var cardFront = document.createElement("div");
        cardFront.className = "card-front";
        var cardBack = document.createElement("div");
        cardBack.className = "card-back";

        cardBack.style.backgroundColor = cardColor[i];

        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        document.querySelector("#wrapper").appendChild(card);

        (function (c) {
            card.addEventListener("click", function () {
                if (clickflag && !completedCard.includes(c)) {
                    c.classList.toggle("flipped");
                    clickedCard.push(c);
                    if(clickedCard.length === 2){
                        if(clickedCard[0].querySelector(".card-back").style.backgroundColor === clickedCard[1].querySelector(".card-back").style.backgroundColor)
                        {
                            // 두개 열고
                            completedCard.push(clickedCard[0]);
                            completedCard.push(clickedCard[1]);

                            clickedCard = [];
                            if(completedCard.length === garo * sero){
                                var endTime = new Date();
                                alert("축하합니다 성공! " + (endTime - startTime) / 1000 + "초 걸렸습니당");
                                // 항상 게임이 끝나면 초기화를 해줘야
                                document.querySelector("#wrapper").innerHTML = "";
                                colorCandidate = colors.slice();
                                cardColor = [];
                                completedCard = [];
                                startTime = null;
                                shuffle();
                                cardSetting(garo, sero);
                            }
                        }
                        else{
                            clickflag = false; // 1초 전에 클릭못하도록
                            // 두개 닫고
                            setTimeout(function () {
                                clickedCard[0].classList.remove("flipped");
                                clickedCard[1].classList.remove("flipped");
                                clickflag = true;
                                clickedCard = [];
                            },1000);
                        }
                        // clickedCard = []; 공통된다고 여기에 쓰면 안된다 -> 비동기(바로 위 setTimeout)라 이게 먼저 실행되면 배열에 아무것도 없어서
                    }
                }
            });
        })(card);


        // 유저가 카드 외울 시간을 준다
        // document.querySelectorAll(".card").forEach(function (card) {
        //     card.classList.add("flipped");
        // });  이건데 시간제약 두고 싶으니까 밑처럼

        document.querySelectorAll(".card").forEach(function (card, index) {
            setTimeout(function () {
                card.classList.add("flipped");
            }, 1000 + 100 * index);
        });


        // 5초 후에 모든 카드 안보이게 뒤집기
        setTimeout(function () {
            document.querySelectorAll(".card").forEach(function (card, index) {
                card.classList.remove("flipped");
            });
            clickflag = true;
            startTime = new Date();
        },5000);


        // 클릭하면 카드 돌아가는 코드
        // 반복문안에서 비동기니까
        // 즉시 실행 함수
        // (function(c) {
        //     card.addEventListener("click", function () {
        //         c.classList.toggle("flipped");   // toggle : 스위치개념 -> flipped 클래스 없으면 넣고, 있으면 빼는(*토글 : 전환이라는 뜻)
        //     });
        // })(card);       // 앞에서 했던 방법 : card가 c로 복사되는 것 (클로저로 해결)

    }
}
shuffle();
cardSetting(garo, sero);