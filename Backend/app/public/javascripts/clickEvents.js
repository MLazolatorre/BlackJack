const request = require('./service/ajaxRequest');

let me;
let players;
let tables;

$(document).ready(function () {

  var amount;
  var money = $("#money");
  var reserve = 10000;

  $("#deal_but").click(function () {

    var element = $("#deck");
    var des = $("#slot_2").position();
    var init = $("#deck").position();
    element.animate({left: des.left + element.width / 2 - init.left + "px", top: des.top - init.top + "px"}, 1000);

  });


  $("#bet-btn").click(function () {
    amount = prompt("quelle est votre mise?");
    var test = isNaN(amount);
    if (test == true || amount < 1 || amount > 9999) {
      alert("veuillez entrer une valeur numérique comprise entre 1 et 9999!");
    }
    else {
      document.getElementById("amount-bet").innerHTML = amount + "$";
    }

  })

  $("#validate-btn").click(function () {
    var tokens = $(".bet-div");
    tokens.animate({left: "+=40px", top: "-=200px"}, 1000);

    money.innerHTML = reserve - amount;
    reserve = reserve - amount;

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
      window.location.replace("/blackJack/table");
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
      window.location.replace("/blackJack/table");
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