var tbody = document.querySelector("#table tbody"); // tbody 같게 된다 (scope 개념)
var dataset = [];   // 이것도 scope문제 때문에 제일 위로
var stopflag = false;   // 펑뜨면 더이상 못 누르도록(플래그 변수)
var openCount = 0;
var codeTable = {
    opened : -1,
    question : -2,
    flag : -3,
    flagX : -4,
    questionX : -5,
    X : 1,
    normalSquare : 0,   //square : 칸 의미
}


document.querySelector("#exec").addEventListener("click", function(){
    // 초기화(클릭하면 계속 테이블 쌓이니까)
    tbody.innerHTML = "";
    document.querySelector("#result").textContent = "";
    dataset = [];
    var openCount = 0;
    stopflag = false;

    var hor = parseInt(document.querySelector("#hor").value);
    var ver = parseInt(document.querySelector("#ver").value);
    var mine = parseInt(document.querySelector("#mine").value);


    // 인덱스 이용하는 방법 외우기* 자주쓰인다
    // 지뢰 위치 뽑기
    var numberCandidate = Array(hor * ver)
        .fill()
        .map(function (e, index) {
            return index;   //0부터 99까지 뽑기
        });
    var shuffle = [];
    while(numberCandidate.length > hor * ver - mine){     //20개만 뽑으려고 80넣음
        var output = numberCandidate.splice(Math.floor(Math.random()* numberCandidate.length), 1)[0];
        shuffle.push(output);
    }



    // 지뢰 테이블 만들기
    //입력받은 hor, ver 값에 따라 동적으로 tr, td 생성

    //var tbody = document.querySelector("#table tbody");  //다른 tbody라서 맨 위로 옮김
    for(var i = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement("tr");
        dataset.push(arr);
        for(var j = 0; j < hor; j++){
            arr.push(codeTable.normalSquare);    // wow 0이라서 주변칸 열었는데 그칸 중에 또 0있어서 8개 열었다고 생각했는데 겹치는 게 있어서 5개 열었다면 시간이 오래걸린다 -> 그래서 모든 데이터 0으로 만들고 열었을 때는 1로 만들기(85줄)
            var td = document.createElement("td");

            // 오른쪽 우클릭하면 깃발(!)나오기 (행과 열 알아서 깃발 꽂도록)
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if(stopflag){
                    return;
                }
                var ancestorTr = e.currentTarget.parentNode;        //열   //e.target이랑 차이(e.currentTarget는 이벤트리스터가 달린 애// e.target은 이벤트가 발생한 애)
                var ancestorTbody = e.currentTarget.parentNode.parentNode;  //행

                //var garo = ancestorTr.children.indexOf(td);  //indexOf 쓰고 싶은데 children이 아니라서 못쓸 때 밑 방법으로! 꼼수
                var garo = Array.prototype.indexOf.call(ancestorTr.children, e.currentTarget);
                //var garo = Array.prototype.indexOf.call(ancestorTr.children, td);  //td 쓰면 클로저 발생이라서 (나중에)
                var sero = Array.prototype.indexOf.call(ancestorTbody.children, ancestorTr);

                // ! -> ? -> 빈칸 or X  : 오른쪽 클릭 총 3번되도록
                if(e.currentTarget.textContent === "" || e.currentTarget.textContent === "X") {
                    e.currentTarget.textContent = "!";  // 화면에서
                    //dataset[sero][garo] = "!";  // 내가 다루는 배열에서도(그래서 리액트를 쓰는 것 : 화면과 데이터 일치시키려고)
                    e.currentTarget.classList.add("flag");

                    if(dataset[sero][garo] === codeTable.X){
                        dataset[sero][garo] = codeTable.flagX;
                    }else{
                        dataset[sero][garo] = codeTable.flag;
                    }
                }
                else if(e.currentTarget.textContent === "!"){
                    e.currentTarget.textContent = "?";
                    e.currentTarget.classList.remove("flag");
                    e.currentTarget.classList.add("question");

                    //dataset[sero][garo] = "?";
                    if(dataset[sero][garo] === codeTable.flagX){
                        dataset[sero][garo] = codeTable.questionX;
                    }else{
                        dataset[sero][garo] = codeTable.question;
                    }
                }
                else if(e.currentTarget.textContent === "?"){
                    e.currentTarget.classList.remove("question");
                    if(dataset[sero][garo] === codeTable.questionX){        // 지뢰(X)인 것은 ! -> ? -> 빈칸 -> X(지뢰)이어야 하니까
                        e.currentTarget.textContent = "X";
                        dataset[sero][garo] = codeTable.X;
                    }
                    else{
                        e.currentTarget.textContent = "";
                        dataset[sero][garo] = codeTable.normalSquare;
                    }
                    //dataset[sero][garo] = 1;  // 데이터는 빈칸일 때 1을 넣어야
                    // 화면상에서만 작동하면 되니까 배열에서 작동은 주석처리
                }
            });
            td.addEventListener("click", function (e) {
                if(stopflag){
                    return;
                }
                // 왼쪽 클릭했을 때 주변 지뢰 개수
                var ancestorTr = e.currentTarget.parentNode;
                var ancestorTbody = e.currentTarget.parentNode.parentNode;
                var garo = Array.prototype.indexOf.call(ancestorTr.children, e.currentTarget);
                var sero = Array.prototype.indexOf.call(ancestorTbody.children, ancestorTr);

                if([codeTable.opened, codeTable.question, codeTable.flag, codeTable.flagX, codeTable.questionX].includes(dataset[sero][garo])){
                    return;
                }
                e.currentTarget.classList.add("opened");    //태그.classList는 (td)태그의 클레스에 접근// add : 추가(opend라는 클래스 추가)//remove: 삭제
                openCount += 1;

                if(dataset[sero][garo] === codeTable.X){
                    e.currentTarget.textContent = "펑!";
                    document.querySelector("#result").textContent = "!!실패!!";
                    stopflag = true;
                }
                else{
                    var surround = [
                        dataset[sero][garo-1],                        ,dataset[sero][garo+1],
                    ];
                    // 배열[] 안에 -1 생기면(가장자리부분) 안되니까 if로 // if(dataset[sero]) 는 가운데니까 당연히 존재하니까
                    if(dataset[sero - 1]){        //concat은 배열과 배열 합쳐서 새로운! 배열을 만든다
                        surround = surround.concat(dataset[sero-1][garo-1], dataset[sero-1][garo], dataset[sero-1][garo+1]);
                    }
                    if(dataset[sero + 1]){
                        surround = surround.concat(dataset[sero+1][garo-1], dataset[sero+1][garo], dataset[sero+1][garo+1]);
                    }
                    var surroundCount = surround.filter(function (v) {
                        return [codeTable.X, codeTable.flagX, codeTable.questionX].includes(v);
                    }).length;
                    e.currentTarget.textContent = surroundCount || "";  // 0일때는 0 출력안되니까(or은 surroundCount 거짓(false, 0, "", NaN, undefined, null)이면 뒤에꺼 "" 이다 라는 뜻이니까)
                    dataset[sero][garo] = codeTable.opened;    // 그리고 주변칸을 열 때 1인 애들 말고 0인 애들만 열도록(131줄)

                    if(surroundCount === 0){
                        // 주변 8칸 동시에 오픈
                        // 주변지뢰개수 찾는 것처럼 주변칸을 배열로 모은다
                        var surroundsquare = [];
                        if(tbody.children[sero-1]){
                            surroundsquare = surroundsquare.concat([
                                tbody.children[sero-1].children[garo-1],
                                tbody.children[sero-1].children[garo],
                                tbody.children[sero-1].children[garo+1],
                            ]);
                        }
                        surroundsquare = surroundsquare.concat([
                            tbody.children[sero].children[garo-1],
                            tbody.children[sero].children[garo+1],
                        ]);
                        if(tbody.children[sero+1]){
                            surroundsquare = surroundsquare.concat([
                                tbody.children[sero+1].children[garo-1],
                                tbody.children[sero+1].children[garo],
                                tbody.children[sero+1].children[garo+1],
                            ]);
                        }
                        // 베열에서 undefined, null, 0, 빈 문자열 제거하는 코드
                        surroundsquare.filter(function (v) {
                            return !!v;
                        }).forEach(function (nextsquare) {
                            var ancestorTr = e.currentTarget.parentNode;
                            var ancestorTbody = e.currentTarget.parentNode.parentNode;
                            var nextgaro = Array.prototype.indexOf.call(ancestorTr.children, nextsquare);
                            var nextsero = Array.prototype.indexOf.call(ancestorTbody.children, ancestorTr);

                            if(dataset[nextsero][nextgaro] !== codeTable.opened) {
                                nextsquare.click();
                            }
                        });
                    }
                }
                if(openCount === hor * ver - mine){
                    stopflag = true;
                    document.querySelector("#result").textContent = "승리";
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기(지뢰 테이블에 지뢰 위치 넣는 것)
    for(var k = 0; k < shuffle.length; k++){    // 60 이라면
        var row = Math.floor(shuffle[k] / ver);  // 6
        var col = shuffle[k] % ver;      // 0
        //console.log(row, col);
        tbody.children[row].children[col].textContent = 'X';    //화면에서
        dataset[row][col] = codeTable.X;                                //내가 다루는 배열에서
    }
});
