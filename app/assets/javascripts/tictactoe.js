var turn = 0;
var board = ["","","","","","","","",""];
const winCombinations = [

  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]

function attachListeners() {
  $("td").on('click', function(event) {
      doTurn(event.toElement);
    });

  $("#save").on('click', function(){
    $.ajax({
      url: "/games",
      method: "POST",
      data: {
        game: {
          state: board 
        }
      }
    })
  });

  $("#previous").on('click', function(){
    $.ajax({
      url: "/games",
      method: "GET",
      success: function(data) {
        data.games.forEach(function(el) {
        var id = `${el.id}`
        var string = '<a href="games/' + id + '">' +  el.id + "</a><br>"
        $("#games").append(string);
        })
      }
    });
  });


  $("#games").on('click', function(event) {
    var link = event.toElement;
    var id = parseInt($(link).text())
    event.preventDefault();
    $.ajax({
      url: "/games/" + `${id}`,
      method: "GET",
      success: function(resp) {
        board = resp.state;
        for(var i = 0; i < board.length; i++) {
          $(`#${i}`).html(board[i]);
        }        
      }
    });
  })

};

function doTurn(arg) {
  updateState(arg);
  turn += 1;
  checkWinner();
};

function checkWinner() {

  for(var i = 0, j = winCombinations.length; i < j; i++) {
    var combo = winCombinations[i];
    var pos1 = combo[0];
    var pos2 = combo[1];
    var pos3 = combo[2];

    if(turn == 9) {
      message("DRAW!");
    } else if (turn != 9) {
      if(board[pos1] == "X" && board[pos2] == "X" && board[pos3] == "X") {
          return message("Player X Won!");
      } else if (board[pos1] == "O" && board[pos2] == "O" && board[pos3] == "O") {
          return message("Player O Won!");
      } 
    } else {

    }

  };
};

function updateState(arg) {
  var token = player();
  board[parseInt(arg.id)] = token
  $(arg).html(token);
};

function player() {
  if(turn%2 == 0){
    return "X";
  } else {
    return "O";
  }
};

function message(arg) {
  $("#message").html(arg);
  setTimeout(function() { clear(); }, 800);

};

function clear() {
  turn = 0;
  board = ["","","","","","","","",""];;
  for(var i = 0; i < board.length; i++) {
    $(`#${i}`).html(board[i]);
  }
  $("#message").html(""); 
}


$(function() {
  attachListeners();
})