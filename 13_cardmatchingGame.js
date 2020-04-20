var garo = 4;
var sero = 3;

function cardSetting(garo, sero) {
    for(var i = 0; i < garo * sero; i++) {
        var card = document.createElement("div");
        card.classList.add("card");
        //card.className = "card"; // 하나만 추가할 때는 이렇게

        var cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        var cardFront = document.createElement("div");
        cardFront.className = "card-front";
        var cardBack = document.createElement("div");
        cardBack.className = "card-back";

        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        card.addEventListener("click", function () {
            card.classList.toggle("flipped");   // 스위치개념 : 불켜있으면 불끄고, 불꺼있으면 불키는
        });
        document.body.appendChild(card);
    }
}

cardSetting(garo, sero);