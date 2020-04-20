var screen = document.querySelector("#screen");

// 2방법
// console.time("time2");

// 3방법 (new Date랑 차이점이 소수점 뒷자리가 더 길다//더 세밀)
// var sTime = performance.now();

var startTime;      // startTime 스코프 조심해야 그래서 이렇게
var endTime;
var dataRecord = [];
var timeout;

screen.addEventListener("click", function () {  // 비동기라서 클릭함수가 끝나면 startTime, endTime 두 변수 모두 날라가서 밖으로 뺴야한다
    // 2방법
    // console.timeEnd("time2");

    // 3방법
    // var eTime = performance.now();
    // console.log((eTime - sTime) / 1000);
    
    if(screen.classList.contains("waiting")){         //현재 클래스 파악하기
        screen.classList.remove("waiting");
        screen.classList.add("ready");
        // 두 줄을 screen.style.backgroundColor = "red"; 하면 되는데 왜 굳이 클래스를 지우고 다시 만들고하나?
        // css 보다 js 코드 적게 하기 위함
        screen.textContent = "초록색이 되면 클릭하세요";

        // 랜덤한 시간 후에 다음창으로 바껴야
        timeout = setTimeout(function () {
            startTime = new Date();     // startTime 스코프 조심해야 그래서 이렇게
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);   // 2000~3000 사이 수

    }
    else if(screen.classList.contains("ready")){
        if(!startTime){       // 빨강일때 누르면 안되도록(부정 출발이니까)  // !는 false를 true로 true를 false로 바꾸는 것
            clearTimeout(timeout);  // setTimeout 취소
            screen.classList.remove("ready");
            screen.classList.add("waiting");
            screen.textContent = "너무 성급했어요 다시!";
        }
        else{
            screen.classList.remove("ready");
            screen.classList.add("now");
            screen.textContent = "클릭하세요";
        }
    }
    else if(screen.classList.contains("now")){
        endTime = new Date();
        console.log((endTime - startTime) / 1000);       // 자바스크립트에서 시간을 체크하는 방법 3가지 중 1방법
        // startTime 스코프 조심해야
        dataRecord.push((endTime - startTime) / 1000);

        startTime = null;   // 초기화
        endTime = null;

        screen.classList.remove("now");
        screen.classList.add("waiting");
        screen.textContent = "클릭해서 시작하세요";
    }
});




//
//  +)
// function a() {
//     function b(){       // 이건 상관없는 선언// 호출 안했으니까
//         function c(){
//             console.log("c");
//         }
//         c();
//         console.log("b");
//     }
//     b();        // a 다음이라고라?
//     console.log("a");
// }
//
// a();  // a 호출하면 호출!스택에 a -> b -> c -> console.log(c)
// // 출력은 c -> b -> a



// 자바스크립트에서 재귀를 쓰면 스택오버플로우여도 재귀 돌아가게 하는 방법 있는데 사용 못함(꼬리 재귀)
// 근데 꼼수 있기는 하다 (비동기로 호출스택 비우기)
//
// function f() {
//     setTimeout(function () {
//         f();
//     }, 0);
// }
//
// f();
