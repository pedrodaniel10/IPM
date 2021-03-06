tictactoe_boardStatus = {
    UNPLAYED : 101,
    XPLAYED : 201,
    OPLAYED : 301,
}
tictactoe_winType = {
    ROW : 102,
    COLUMN : 202,
    DIAGONAL_POS : 302,
    DIAGONAL_NEG : 402
}

var tictactoe_board = [[0,0,0],[0,0,0],[0,0,0]];

var tictactoe_user = 0;
var tictactoe_computer = 0;
var tictactoe_status = { _won: false,
    _type: tictactoe_winType.ROW,
    _pos: 0,
    _winner: tictactoe_boardStatus.UNPLAYED };
var tictactoe_xTurn;
var tictactoe_timeouts = [];
//var moves = 0, x, y, rand;

function prepareTicTacToeGame() {
    $("#games-tic-tac-toe-btn").click(function () {
        tictactoe_resetGame();
        games_windowAdjust();

        $("#tic-tac-toe-game .blockerWhiteText").text("Seja o primeiro a fazer 3 marcas em linha, coluna ou diagonal.");
        $("#tic-tac-toe-game .blockerWhite").show();
        $("#tic-tac-toe-play-btn").show();
        $("#tic-tac-toe-rematch-btn").hide();

        openWindow("tic-tac-toe-game", windowPosition.BOTTOM_RIGHT);
    });

    $("#tic-tac-toe-game .Xbtn").click(function () {
        closeWindow("tic-tac-toe-game");
        while (tictactoe_timeouts.length > 0) {
            clearTimeout(tictactoe_timeouts[0]);
            tictactoe_timeouts.splice(0, 1);
        }
    });

    $("#tic-tac-toe-reset-btn").click(function () {
        tictactoe_user = 0;
        tictactoe_computer = 0;
        $("#tic-tac-toe-game .Xbtn").click();
        $("#games-tic-tac-toe-btn").click();
    });

    $("#tic-tac-toe-game .hitbox").click(function () {
        let xPos = parseInt($(this).attr("id").substr(7, 1));
        let yPos = parseInt($(this).attr("id").substr(8, 1));
        tictactoe_userPlay(xPos, yPos);
    });

    $("#tic-tac-toe-play-btn, #tic-tac-toe-rematch-btn").click(tictactoe_startGame);
}

function tictactoe_resetGame() {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        tictactoe_board[i][j] = tictactoe_boardStatus.UNPLAYED;

    tictactoe_status._won = false;
    tictactoe_xTurn = true;
    moveIndex = 0;

    tictactoe_updateScreen();
}

function tictactoe_startGame() {
    tictactoe_resetGame();
    $("#tic-tac-toe-game .blockerWhite").hide();
}

function tictactoe_userPlay(xPos, yPos) {
    if (tictactoe_xTurn && tictactoe_board[xPos][yPos] === tictactoe_boardStatus.UNPLAYED) {
        tictactoe_board[xPos][yPos] = tictactoe_boardStatus.XPLAYED;
        tictactoe_xTurn = false;
        tictactoe_checkWin();
        if (!tictactoe_status._won)
            tictactoe_computerPlay();
    }
}

function tictactoe_computerPlay() {
    tictactoe_timeouts.push(setTimeout(function () {
        let smartPlay = tictactoe_semiCrossed(tictactoe_boardStatus.OPLAYED);
        if (smartPlay.x === -1)
            smartPlay = tictactoe_semiCrossed(tictactoe_boardStatus.XPLAYED);
        if (smartPlay.x === -1){
            let tieCount = 0;
            for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
                let xPos = Math.floor((i % 9) / 3);
                let yPos = i % 3;

                if (tictactoe_board[xPos][yPos] === tictactoe_boardStatus.UNPLAYED) {
                    if (Math.random() < 0.2) {
                        tictactoe_board[xPos][yPos] = tictactoe_boardStatus.OPLAYED;
                        break;
                    }
                }
                else if (tieCount === i) {
                    if (i >= 9) {
                        tictactoe_status._won = true;
                        tictactoe_status._winner = tictactoe_boardStatus.UNPLAYED;
                        break;
                    }
                    else {
                        tieCount++;
                    }
                }
            }
        }
        else {
            tictactoe_board[smartPlay.x][smartPlay.y] = tictactoe_boardStatus.OPLAYED;
        }
        tictactoe_xTurn = true;
        tictactoe_checkWin();
    }, 50));
}

function tictactoe_checkWin() {
    tictactoe_crossed();
    if (tictactoe_status._won) {
        switch (tictactoe_status._winner) {
            case tictactoe_boardStatus.XPLAYED:
                tictactoe_user++;
                $("#tic-tac-toe-game .blockerWhiteText").text("Você ganhou! :)");
                break;
            case tictactoe_boardStatus.OPLAYED:
                tictactoe_computer++;
                $("#tic-tac-toe-game .blockerWhiteText").text("Você perdeu! :(");
                break;
            case tictactoe_boardStatus.UNPLAYED:
                $("#tic-tac-toe-game .blockerWhiteText").text("Foi empate!");
                break;
            default:
                console.log("Erro ao decidir vencedor.");
        }
        tictactoe_timeouts.push(setTimeout(function () {
            $("#tic-tac-toe-game .blockerWhite").fadeIn(1000);
            $("#tic-tac-toe-play-btn").hide();
            $("#tic-tac-toe-rematch-btn").fadeIn(1000);
        }, 100));
    }
    tictactoe_updateScreen();
}

function tictactoe_crossed() {
    if (tictactoe_status._won)
        return;
    // linhas
    for (let i = 0; i < 3; i++)
        if (tictactoe_board[i][0] === tictactoe_board[i][1] &&
                tictactoe_board[i][1] === tictactoe_board[i][2] &&
                tictactoe_board[i][0] !== tictactoe_boardStatus.UNPLAYED) {
            tictactoe_status._won = true;
            tictactoe_status._type = tictactoe_winType.ROW;
            tictactoe_status._pos = i;
            tictactoe_status._winner = tictactoe_board[i][0];
            return;
        }

    // colunas
    for (let i = 0; i < 3; i++)
        if (tictactoe_board[0][i] === tictactoe_board[1][i] &&
                tictactoe_board[1][i] === tictactoe_board[2][i] &&
                tictactoe_board[0][i] !== tictactoe_boardStatus.UNPLAYED) {
            tictactoe_status._won = true;
            tictactoe_status._type = tictactoe_winType.COLUMN;
            tictactoe_status._pos = i;
            tictactoe_status._winner = tictactoe_board[0][i];
            return;
        }

    // diagonais
    if (tictactoe_board[0][2] === tictactoe_board[1][1] &&
            tictactoe_board[1][1] === tictactoe_board[2][0] &&
            tictactoe_board[0][2] !== tictactoe_boardStatus.UNPLAYED) {
        tictactoe_status._won = true;
        tictactoe_status._type = tictactoe_winType.DIAGONAL_POS;
        tictactoe_status._winner = tictactoe_board[0][2];
    }
    else if (tictactoe_board[0][0] == tictactoe_board[1][1] &&
            tictactoe_board[1][1] === tictactoe_board[2][2] &&
            tictactoe_board[0][0] !== tictactoe_boardStatus.UNPLAYED) {
        tictactoe_status._won = true;
        tictactoe_status._type = tictactoe_winType.DIAGONAL_NEG;
        tictactoe_status._winner = tictactoe_board[0][0];
    }
    else {
        tictactoe_status._won = false;
    }
}

function tictactoe_semiCrossed(crossedBy) {
    // linhas
    for (let i = 0; i < 3; i++) {
        if (tictactoe_board[i][1] === tictactoe_board[i][2] &&
                tictactoe_board[i][0] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[i][1] === crossedBy) {
            return { x: i, y: 0 };
        }
        else if (tictactoe_board[i][0] === tictactoe_board[i][2] &&
                tictactoe_board[i][1] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[i][0] === crossedBy) {
            return { x: i, y: 1 };
        }
        else if (tictactoe_board[i][0] === tictactoe_board[i][1] &&
                tictactoe_board[i][2] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[i][0] === crossedBy) {
            return { x: i, y: 2 };
        }
    }

    // colunas
    for (let i = 0; i < 3; i++) {
        if (tictactoe_board[1][i] === tictactoe_board[2][i] &&
                tictactoe_board[0][i] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[1][i] === crossedBy) {
            return { x: 0, y: i };
        }
        else if (tictactoe_board[0][i] === tictactoe_board[2][i] &&
                tictactoe_board[1][i] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[0][i] === crossedBy) {
            return { x: 1, y: i };
        }
        else if (tictactoe_board[0][i] === tictactoe_board[1][i] &&
                tictactoe_board[2][i] === tictactoe_boardStatus.UNPLAYED &&
                tictactoe_board[0][i] === crossedBy) {
            return { x: 2, y: i };
        }
    }

    // diagonais
    if (tictactoe_board[1][1] === tictactoe_board[2][2] &&
            tictactoe_board[0][0] === tictactoe_boardStatus.UNPLAYED &&
            tictactoe_board[1][1] === crossedBy) {
        return { x: 0, y: 0 };
    }
    else if (tictactoe_board[1][1] === tictactoe_boardStatus.UNPLAYED &&
            ((tictactoe_board[0][0] === tictactoe_board[2][2] &&
            tictactoe_board[0][0] === crossedBy) ||
            (tictactoe_board[0][2] === tictactoe_board[2][0] &&
            tictactoe_board[0][2] === crossedBy))) {
        return { x: 1, y: 1 };
    }
    else if (tictactoe_board[0][0] === tictactoe_board[1][1] &&
            tictactoe_board[2][2] === tictactoe_boardStatus.UNPLAYED &&
            tictactoe_board[0][0] === crossedBy) {
        return { x: 2, y: 2 };
    }
    else if (tictactoe_board[1][1] === tictactoe_board[2][0] &&
            tictactoe_board[0][2] === tictactoe_boardStatus.UNPLAYED &&
            tictactoe_board[1][1] === crossedBy) {
        return { x: 0, y: 2 };
    }
    else if (tictactoe_board[0][2] === tictactoe_board[1][1] &&
            tictactoe_board[2][0] === tictactoe_boardStatus.UNPLAYED &&
            tictactoe_board[0][2] === crossedBy) {
        return { x: 2, y: 0 };
    }

    return { x: -1, y: -1 };
}

function tictactoe_updateScreen() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            switch (tictactoe_board[i][j]) {
                case tictactoe_boardStatus.UNPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "none").addClass("btn");
                    break;
                case tictactoe_boardStatus.XPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "url(\"images/games/tic-tac-toe-x-blue.png\")").removeClass("btn");
                    break;
                case tictactoe_boardStatus.OPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "url(\"images/games/tic-tac-toe-o-red.png\")").removeClass("btn");
                    break;
                default:
                    console.log("Erro ao decidir estado de célula.");
            }
            if (!tictactoe_xTurn || tictactoe_status._won)
                $("#hitbox-"+String(i)+String(j)).removeClass("btn");
        }
    }

    if (tictactoe_status._won && tictactoe_status._winner !== tictactoe_boardStatus.UNPLAYED) {
        switch (tictactoe_status._type) {
            case tictactoe_winType.ROW:
                $('#reta-horizontal').css("top", String((tictactoe_status._pos * 22) + 13) + "%").show();
                break;
            case tictactoe_winType.COLUMN:
                $('#reta-vertical').css("left", String((tictactoe_status._pos * 22) + 11) + "%").show();
                break;
            case tictactoe_winType.DIAGONAL_POS:
                $('#reta-diagonal-positivo').show();
                break;
            case tictactoe_winType.DIAGONAL_NEG:
                $('#reta-diagonal-negativo').show();
                break;
            default:
                console.log("Erro ao decidir estado ganho.");
        }
    }
    else {
        $('#reta-horizontal').hide();
        $('#reta-vertical').hide();
        $('#reta-diagonal-positivo').hide();
        $('#reta-diagonal-negativo').hide();
    }

    $("#tic-tac-toe-computer-score span").text(tictactoe_computer);
    $("#tic-tac-toe-user-score span").text(tictactoe_user);
}
