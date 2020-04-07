// 10회 제한, "1234"  [1234]  "1, 2, 3, 4"(쉽표까지 스트링)  3개 데이터 다루는 법

var body = document.body;

var divTag = document.createElement("div");
document.body.append(divTag);
divTag.textContent="4자리 숫자야구";

var inputTag = document.createElement("input");
document.body.append(inputTag);

var buttonTag = document.createElement("button");
document.body.append(buttonTag);
buttonTag.textContent = "확인";

var strikeCountTag = document.createElement("h1");
document.body.append(strikeCountTag);

var ballCountTag = document.createElement("h1");
document.body.append(ballCountTag);


var numberCandidate;
var number4digits;

//4가지 숫자 중복제거 해야
function randomnumber(){
    numberCandidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    number4digits = [];

    // +) 문제랑 관계없는 함수들 정리
    //var output = numberCandidate.shift();      //pop은 뒤에서부터 꺼내는//shift는 앞에서부터 꺼내는
    //number4digits.unshift(output);             //push는 앞에서부터 넣는//unshift는 뒤에서부터 넣는

    for (var i = 0; i < 4; i++) {
        var output = numberCandidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];      //9-i는 삭제 된거 다음번에 할 때 1개씩 적어지니까//splice는 배열반환이라서
        number4digits.push(output);
        //Math.floor(Math.random() * 9) //0부터8까지
    }
}
randomnumber();

console.log(number4digits);

//10회 제한
var count = 0;
buttonTag.addEventListener("click", function () {
    //.split()  :  문자를 배열로(그래도 스트링! 값들의 배열이다)
    //.join()   : 배열을 문자로

    //한방에 맞으면
    //join 이용해서 배열을 문자열로
    if (inputTag.value === number4digits.join("")) {
        document.write("홈런");

        //2. 무한루프
        randomnumber();
        count = 0;

    } else {
        //2) 더 나은 코드
        var changeinputTag = (inputTag.value).split('');

        var strikeCount = 0;
        var ballCount = 0;

        count++;
        if (count > 10) {
            strikeCountTag.textContent = "10번 넘게 틀려서 실패ㅠ 답은 : " + number4digits.join(' ,');
            ballCountTag.textContent = "";      //출력안되게 하려고
            randomnumber();
            count = 0;
        } else {
            //split 이용해서 문자를 배열로
            for (var i = 0; i < 4; i++) {
                if (parseInt(changeinputTag[i]) === number4digits[i]) {
                    strikeCount++;
                } else if (number4digits.indexOf(parseInt(changeinputTag[i])) > -1) {	//indexOf : 값위치 리턴//없으면 -1//같은자리인지 확인은 바로 위 if문에서 걸렀으니까
                    ballCount++;
                }
            }
            strikeCountTag.textContent = strikeCount + "S";
            ballCountTag.textContent = ballCount + "B";
        }
    }

});

        /*
        // 1) 내가 짠 코드
        var strikeCount = 0;
        var ballCount = 0;

        if (number4digits[0] === parseInt(inputTag.value[0]))
            strikeCount += 1;
        if (number4digits[1] === parseInt(inputTag.value[1]))
            strikeCount += 1;
        if (number4digits[2] === parseInt(inputTag.value[2]))
            strikeCount += 1;
        if (number4digits[3] === parseInt(inputTag.value[3]))
            strikeCount += 1;

        if (number4digits[0] === parseInt(inputTag.value[1]) || number4digits[0] === parseInt(inputTag.value[2]) || number4digits[0] === parseInt(inputTag.value[3]))
            ballCount += 1;
        if (number4digits[1] === parseInt(inputTag.value[0]) || number4digits[1] === parseInt(inputTag.value[2]) || number4digits[1] === parseInt(inputTag.value[3]))
            ballCount += 1;
        if (number4digits[2] === parseInt(inputTag.value[0]) || number4digits[2] === parseInt(inputTag.value[1]) || number4digits[2] === parseInt(inputTag.value[3]))
            ballCount += 1;
        if (number4digits[3] === parseInt(inputTag.value[0]) || number4digits[3] === parseInt(inputTag.value[1]) || number4digits[3] === parseInt(inputTag.value[2]))
            ballCount += 1;

        strikeCountTag.textContent = strikeCount + "S";
        ballCountTag.textContent = ballCount + "B";

        */
