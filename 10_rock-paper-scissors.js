var dictionary = {
    바위: '0',
    가위: '-200px',
    보: '-400px'
};

function computerChoose(computer) {
// 2방법) 객체를 배열로 바꾸는 법 : Object.entries(dictionary);
// 1차원 배열일 때는 indexof , 2차원 배열일 때는 find랑 findindex
    return Object.entries(dictionary).find(function (v) {
        return v[1] === computer;
    })[0];
// 배열.find는 반복문이지만 원하는 것을 찾으면 멈춘다

}
// 1방법) dictionary 단점
// var dictionary2 = {
//     "0" : "바위",
//     "-200px" : "가위",
//     "-400px" : "보"
// }


var interval;

var computer = '0';

function intervalMaker() {
    interval = setInterval(function () {
        if (computer === dictionary.바위) {
            computer = dictionary.가위;
        } else if (computer === dictionary.가위) {
            computer = dictionary.보;
        } else {
            computer = dictionary.바위;
        }
        document.querySelector("#computer").style.background = "url(10.png)" + computer + ' 0';
    }, 100);
};

intervalMaker();

// 0.1초 마다 바꿀 것
// setTimeout은 한번하고 끝나는데 setInterval은 계속 실행

var h2 = document.querySelectorAll("h2");


document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(interval);    //interval 멈추도록 변수처리랑 clear

        setTimeout(function () {
            intervalMaker();
        }, 2000);
        var me = this.textContent;
        // 2번)
        h2[0].innerHTML = "컴퓨터 : " + computerChoose(computer) + "<br />" + "나 : " + this.textContent;
        // 1번) document.write(this.textContent, dictionary2[computer]);

        var score = {
            가위 : 1,
            바위 : -1,
            보 : 0
        }
        if(score[me] - score[computerChoose(computer)] === 0){
            h2[1].textContent = "무승부입니다";
        }else if([-1, 2].includes(score[me] - score[computerChoose(computer)]))
            // 또는 일 때 배열.includes
            h2[1].textContent = "졌습니다";
        else{
            h2[1].textContent = "이겼습니다";        }
    });
});