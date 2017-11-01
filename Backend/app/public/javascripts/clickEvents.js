const request = require('./service/ajaxRequest');
const mustache = require('mustache');

let me;
let tables;
let players;
let newCardsId = [];

const cardHeightPx = 101.63;
const cardWidthPx = 70;

const tabletpl = $("#tables").html();
$("#table").remove();

function youLoos() {
  $("#result").show();
  $("#loos").show();
  $("#win").hide();
  restart()
}

function restart() {

  $("#hit-btn").hide();
  $("#stand-btn").hide();


  $("#bet-btn").show();
  $("#validate-btn").show();

  setTimeout(() => {
    newCardsId.forEach((x) => {
      $("#"+x).remove();
    });
    newCardsId = [];
    $("#result").hide();
    $("#loos").hide();
    $("#win").hide();
  }, 5000);

}

function youWin() {
  $("#result").show();
  $("#loos").hide();
  $("#win").show();

  restart()
}

function showMony(credits) {
  document.getElementById("money").innerHTML = "You have " + credits + "$";
}

$(document).ready(function () {

  $("#result").hide();

    var amount;
    var money = $("#money");
    var reserve = 10000;



    $("#hit-btn").click(function () {
        request.hit(me.id, (err, res, body) => {
          let hand;
          if (body.player.result) {
            const array = body.player.result.players;
            hand = array[Object.keys(array).filter((x) => array[x].id === me.id)[0]].hand;
          }
          else {
            hand = body.player.hand;
          }
          hand.forEach((newCard, i) => {
            if (i == hand.length - 1){
              const newId = newCard.suit+newCard.rank+me.id+newCardsId.length;
              newCardsId.push(newId);

              let source = "/images/"+newCard.rank+newCard.suit+".png";
              let elem = document.createElement("img");
              elem.src = source;
              elem.setAttribute("height", `${cardHeightPx}`);
              elem.setAttribute("width", `${cardWidthPx}`);
              elem.setAttribute("alt", "Card");
              elem.setAttribute("id", newId);
              const marginRight = - i * cardWidthPx + i * 15;
              const marginTop = - i * cardHeightPx;
              elem.style.marginRight = marginRight + "px";
              elem.style.marginTop = marginTop + "px";
              $("#slot_2").append(elem);
            }
          });

          console.log(`le tableau d'id card = ${newCardsId}`);

          if (body.player.result) {
            youLoos()
          }
        });
    });


    $("#bet-btn").click(() => {
        amount = prompt("quelle est votre mise?");
        var test = isNaN(amount);
        if (test == true || amount < 1 || amount > 9999) {
            alert("veuillez entrer une valeur numérique comprise entre 1 et 9999!");
        }
        else {
            document.getElementById("amount-bet").innerHTML = amount + "$";
        }
    });

    $("#stand-btn").click(function () {
      request.stand(me.id, (err, res, body) => {
        console.log('quand on stand on ressoi : ');
        console.log(body);

        if (body.success) {
          youWin();
        }
        else {
          youLose();
        }
        showMony(body.player.credits);
      })
    });


    window.login = function () {
        const name = document.getElementById("logId").value;
        const psw = document.getElementById("logPassword").value;
        request.login1(name, psw, (err, res, body) => {
            if (!body.success) {
                document.getElementById("errorLogin").style.display = "block";
            } else {
                getInfo(body);
                console.log("Logs are good, response :");
                console.log(body);
                showTables();
            }
        });
    };

    window.createAccount = function () {
        const name = document.getElementById("newId").value;
        const psw = document.getElementById("newPassword").value;
        request.createAccount(name, psw, (err, res, body) => {
            if (!body.success) {
                document.getElementById("errorCreateAccount").style.display = "block";
            } else {
                getInfo(body);
                showTables();
            }
        });
    };

    function getInfo(body) {
        const player = body.player;

        me = {
            id: body.playerId,
            credits: player.credits,
            name: player.name,
            tableId: player.tableId,
        };

        tables = body.tables;
    }

    function showTables() {
        document.getElementById("log").remove();

        tables.forEach((x) => {
            x.playerId = me.playerId;
            let tpl = mustache.render(tabletpl, x);
            $("#tables").append('<div class="table">' + tpl + '</div>');
        });
    }

    $("#validate-btn").click(function () {
        $("#bet-btn").hide();
        $("#validate-btn").hide();
        $("#waiting-txt").show();

        console.log("on veut parier : %d", amount);

        request.bet(me.id, amount, (err, res, body) => {
            if (!body.success) return;
            body.player.hand.forEach((newCard, i) => {
                const newId = newCard.suit+newCard.rank+me.id+newCardsId.length;
                newCardsId.push(newId);

                let source = "/images/"+newCard.rank+newCard.suit+".png";
                let elem = document.createElement("img");
                elem.src = source;
                elem.setAttribute("height", `${cardHeightPx}`);
                elem.setAttribute("width", `${cardWidthPx}`);
                elem.setAttribute("alt", "Card");
                elem.setAttribute("id", newId);
                const marginRight = - i * cardWidthPx + i * 15;
                const marginTop = - i * cardHeightPx;
                elem.style.marginRight = marginRight + "px";
                elem.style.marginTop = marginTop + "px";
                $("#slot_2").append(elem);
            });
        });
    });

});

window.redirect = function (url) {
    window.location.replace(url + "/" + me.id);
    console.log(url);
};

window.enterTable = function (idTable, idPlayer) {
    console.log('idtable = %d et idplayer = %d', idTable, idPlayer);
    request.joinTable(idPlayer, idTable, (err, res, body) => {
        me = body.player;
        showMony(body.player.credits);
        console.log(body);
    });
};

function allBet() {
    $("#hit-btn").show();
    $("#stand-btn").show();
    $("#waiting-txt").hide();

}

function displayDealer(response) {
  response.dealer.hand.forEach((newCard, i) => {
    const newId = newCard.suit+newCard.rank+me.id+newCardsId.length;
    newCardsId.push(newId);

    let source = "/images/"+newCard.rank+newCard.suit+".png";
    let elem = document.createElement("img");
    elem.src = source;
    elem.setAttribute("height", `${cardHeightPx}`);
    elem.setAttribute("width", `${cardWidthPx}`);
    elem.setAttribute("alt", "Card");
    elem.setAttribute("id", newId);
    const marginRight = - i * cardWidthPx + i * 15;
    const marginTop = - i * cardHeightPx;
    elem.style.marginRight = marginRight + "px";
    elem.style.marginTop = marginTop + "px";
    $("#up_space").append(elem);
  })
}

module.exports = {
    allBet: allBet,
    displayDealer: displayDealer,
}
