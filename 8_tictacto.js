// js 말고 html로 하는게 더 복잡하다고 했는데 그러면 해볼까??
// 1. 노드들 만들기(겉만 보이는 거고)

var body = document.body;

var table = document.createElement("table");
body.appendChild(table);

var h1 = document.createElement("h1");
body.append(h1);

// 2. 이제 시작(속을 컨트롤해야하니까//createNode랑 appendChild 이외를 의미하는데 create하고나서 push를 같은 반복문에 해야되서 다같이 쓴 것)
// 2차원 도형이니까 -> 2차원 배열
// 행(row), 열(col)
var rows = [];      // 함수 다음 코드들 보면 간단하게 rows = [tr, tr, tr] 되는 것
var squares = [];   // 함수 다음 코드들 보면 간단하게 squares = [[ td, td, td], [td, td, td], [td, td, td]] 되는 것
var goStone = "X";  // X랑 O중 X부터 오목알 두기

// 스코프 해결방법2 : 매개변수에 whatIsRow, whatIsCol 넣기
function resultCheck(whatIsRow, whatIsCol) {
    //세 줄이 되었나? //삼목은 노가다로 할 것이다(오목 때 알고리즘 사용할 것이다)
    var full3 = false;  // 스코프 때문에 이 함수 밖에 var full3; 하고 여기에 full3 = false; 이지만
    // 다른 방법 사용해보기 // 마지막에 리턴

    // 그 원소가 있는 행이 3개 되었나
    if (squares[whatIsRow][0].textContent === goStone &&
        squares[whatIsRow][1].textContent === goStone &&
        squares[whatIsRow][2].textContent === goStone) {
        full3 = true;
    }
    // 그 원소가 있는 열이 3개 되었나
    if (squares[0][whatIsCol].textContent === goStone &&
        squares[1][whatIsCol].textContent === goStone &&
        squares[2][whatIsCol].textContent === goStone) {
        full3 = true;
    }
    // 그 원소가 있는 대각선이 3개 되었나
    if (
        squares[0][0].textContent === goStone &&
        squares[1][1].textContent === goStone &&
        squares[2][2].textContent === goStone
    ) {
        full3 = true;
    }
    if (
        squares[0][2].textContent === goStone &&
        squares[1][1].textContent === goStone &&
        squares[2][0].textContent === goStone
    ) {
        full3 = true;
    }
    return full3;   // 여기
};

function reset(tie) {
    if(tie){
       h1.textContent = "무승부";
    }
    else {
        h1.textContent = goStone + '님이 승리';
        setTimeout(function () {
            //게임 한판 끝났으니까 다음판 하도록 초기화
            h1.textContent = "";
            squares.forEach(function (tr) {     //forEach : 배열의 반복문
                tr.forEach(function (td) {
                    td.textContent = "";
                });
            });
            goStone = "X";
        }, 1000);
    }
}

var f1 = function(e){
    // 컴퓨터가 안눌었는데 유저가 누르지 않도록 누름 방지
    if(goStone === "O"){
        return;
    }

    //console.log(e.target);      //클릭된 애 뭔지 // 몇열인지 td
    //console.log(e.target.parentNode);   //클릭된 애 부모 뭔지 // 몇행인지 tr
    //console.log(e.target.parentNode.parentNode); // table
    //console.log(e.target.children);   //클릭된 애 자식 뭔지

    var whatIsRow = rows.indexOf(e.target.parentNode);      // indexOf는 유사배열도 안되고 배열일 때만 사용가능
    console.log("몇 행 : ", whatIsRow);
    var whatIsCol = squares[whatIsRow].indexOf(e.target);
    console.log("몇 열 : ", whatIsCol);

    if(squares[whatIsRow][whatIsCol].textContent != ""){   //칸이 이미 채워져 있는가?
        console.log("이미 채워져있습니다.");
    }
    else {
        //console.log("빈칸 입니다.");
        squares[whatIsRow][whatIsCol].textContent = goStone;

        var whoIsWinner = resultCheck(whatIsRow, whatIsCol);

        // 모든 칸이 다 차있는지 검사
        // 빈 칸 중 하나를 고른다
        var candidateSquare = [];
        squares.forEach(function (tr) {
            tr.forEach(function (td) {
                candidateSquare.push(td);
            });
        });
        // 아무도 안고른 칸들이 골라진다
        candidateSquare = candidateSquare.filter(function (td) {
            return !td.textContent   // textContent 값이 false 아닌 것만 필터링 해서 출력
        });

        if (whoIsWinner) {      // 유저가 이겼을 경우
            reset(false);
        }
        else if(candidateSquare.length === 0){  // 칸을 더이상 선택할 수 없으니까
            reset(true);
        }
        else {
            if (goStone === 'X') {
                goStone = "O";
            }
            // // 두 사람 모두 내가 누르게 했었는데 컴퓨터랑 게임하기 구현하려고 주석처리
            // else {
            //     goStone = "X";
            // }


            // 2초 뒤 컴퓨터의 턴으로
            // 두 사람 모두 내가 누르게 했었는데 컴퓨터랑 게임하기 구현하려고 코드추가
            setTimeout(function () {
                var finalSquare = candidateSquare[Math.floor(Math.random() * candidateSquare.length)];
                finalSquare.textContent = goStone;

                var whatIsRow = rows.indexOf(finalSquare.parentNode);
                console.log("몇 행 : ", whatIsRow);
                var whatIsCol = squares[whatIsRow].indexOf(finalSquare);
                console.log("몇 열 : ", whatIsCol);

                var whoIsWinner =  resultCheck(whatIsRow, whatIsCol);

                if (whoIsWinner) {  // 컴퓨터가 이겼을 경우
                    reset();
                }

                // 턴을 나한테 넘긴다
                goStone = "X";
            }, 2000);

        }
    }
};

for(var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);

    //밑 두 줄 반목문을 따로 만들어서 하면 안되고 지금 같이 돌려야겠지
    rows.push(tr);
    squares.push([]);       // 2차원 배열 이렇게 만드는구나

    //wow 2중 반복하는 이유가 자식이라서 그런 게 아니라 반복문 2번 쓰기 싫어서구나
    for (var j = 0; j < 3; j++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        //두 줄이 한쌍이라고 생각

        squares[i].push(td);  //td가 한줄에 3개씩 , 3줄
        td.addEventListener("click", f1);
    }
}
