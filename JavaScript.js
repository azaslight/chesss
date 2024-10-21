var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var allowMove = true;
var shah = false;
var checkShahbBool = false;
var num = 8;
var color;
var team = false;
var choiceField;
var newField;
var temp_x;
var temp_y;
var new_x;
var new_y;
var choice;
var boardState;

function NewGame() {
    $("input").remove();
    $("img").remove();
    team = false;
    boardState = [[-5, -4, -3, -10, -11, -3, -4, -5],
                  [-1, -1, -1, -1, -1, -1, -1, -1],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [5, 4, 3, 10, 11, 3, 4, 5]];
    choice = false;
    document.getElementById('board').innerHTML = '';
    document.getElementById('board').style.width = num * 80;
    for (var i = num - 1; i >= 0; i--) {
        for (var j = 0; j < num; j++) {
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
                $("#board").append('<div class="DarkField" x="' + j.toString() + '" y="' + i.toString() + '" onclick="ClickField(this);"></div>');
            } else {
                $("#board").append('<div class="LightField" x="' + j.toString() + '" y="' + i.toString() + '" onclick="ClickField(this);"></div>');
            }
        }
    }
    $("div").slice(1, 2).append('<img src="DarkRook.png">');
    $("div").slice(8, 9).append('<img src="DarkRook.png">');
    $("div").slice(2, 3).append('<img src="DarkHorse.png">');
    $("div").slice(7, 8).append('<img src="DarkHorse.png">');
    $("div").slice(3, 4).append('<img src="DarkElefant.png">');
    $("div").slice(6, 7).append('<img src="DarkElefant.png">');
    $("div").slice(4, 5).append('<img src="DarkFerz.png">');
    $("div").slice(5, 6).append('<img src="DarkKing.png">');
    for (var i = 9; i < 17; i++) {
        $("div").slice(i, i + 1).append('<img src="DarkPown.png">');
    }

    $("div").slice(57, 58).append('<img src="LightRook.png">');
    $("div").slice(64, 65).append('<img src="LightRook.png">');
    $("div").slice(58, 59).append('<img src="LightHorse.png">');
    $("div").slice(63, 64).append('<img src="LightHorse.png">');
    $("div").slice(59, 60).append('<img src="LightElefant.png">');
    $("div").slice(62, 63).append('<img src="LightElefant.png">');
    $("div").slice(60, 61).append('<img src="LightFerz.png">');
    $("div").slice(61, 62).append('<img src="LightKing.png">');
    for (var i = 49; i < 57; i++) {
        $("div").slice(i, i + 1).append('<img src="LightPown.png">');
    }
}

function ClickField(field) {
    if (choice) DoStep(field);
    else ChoiceField(field);
}

function ChoiceField(field) {
    choiceField = field;
    temp_x = parseInt($(choiceField).attr("y"));
    temp_y = parseInt($(choiceField).attr("x"));
    if (boardState[temp_x][temp_y] !== 0) {
        if (team && boardState[temp_x][temp_y] > 0 || !team && boardState[temp_x][temp_y] < 0) {
            color = $(choiceField).css("background-color");
            $(choiceField).css("background-color", "#9D3772");
            choice = true;
        }
    }
}

function DoStep(field) {
    newField = field;
    new_x = parseInt($(newField).attr("y"));
    new_y = parseInt($(newField).attr("x"));
    if (temp_x === new_x && temp_y === new_y) {
        $(choiceField).css("background-color", color);
        choice = false;
        return;
    }
    switch (boardState[temp_x][temp_y]) {
        case -5:
        case 5:
            GoRook();
            break;
        case -4:
        case 4:
            GoHorse();
            break;
        case -3:
        case 3:
            GoElefant();
            break;
        case -1:
        case 1:
            GoPown();
            break;
        case -10:
        case 10:
            GoFerz();
            break;
        case -11:
        case 11:
            GoKing();
            break;
    }
}

