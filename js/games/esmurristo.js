var esmurristo_players;
var esmurristo_timeleft;
var esmurristo_timeouts = [];

function prepareEsmurristoGame() {
    $("#games-esmurristo-btn").click(function () {
        esmurristo_resetGame();
        games_windowAdjust();
        openWindow("esmurristo-game", windowPosition.BOTTOM_RIGHT);

        $("#esmurristo-game .blockerWhiteText").text("Jogue contra o tempo! Clique o maior número de vezes em 5 segundos.");
        $("#esmurristo-game .blockerWhite").show();
        $("#esmurristo-play-btn").show();
        $("#esmurristo-rematch-btn").hide();
    });

    $("#esmurristo-game .Xbtn").click(function () {
        closeWindow("esmurristo-game");
        while (esmurristo_timeouts.length > 0) {
            clearTimeout(esmurristo_timeouts[0]);
            esmurristo_timeouts.splice(0, 1);
        }
    });

    $("#esmurristo-btn").click(function () {
        if (esmurristo_timeleft > 0) {
            esmurristo_players[0]++;
            esmurristo_simulatePlayers(0.1);
            esmurristo_updateScreen();
        }
    });

    $("#esmurristo-rematch-btn, #esmurristo-play-btn").click(esmurristo_startGame);
}

function esmurristo_resetGame() {
    esmurristo_players = [0, 0, 0, 0];
    esmurristo_timeleft = 100;
    $("#esmurristo-game .blockerWhiteText").text("À espera de jogadores...");
    $("#esmurristo-game .blockerWhite").show();
    esmurristo_hidePontuacao();
    esmurristo_updateScreen();
}

function esmurristo_startGame() {
    esmurristo_resetGame();
    $("#esmurristo-play-btn").hide();
    $("#esmurristo-rematch-btn").hide();
    esmurristo_timeouts.push(setTimeout(function () {
        $("#esmurristo-game .blockerWhiteText").text("Prepare-se!");
        esmurristo_timeouts.push(setTimeout(function () {
            $("#esmurristo-game .blockerWhiteText").text("3");
            esmurristo_timeouts.push(setTimeout(function () {
                $("#esmurristo-game .blockerWhiteText").text("2");
                esmurristo_timeouts.push(setTimeout(function () {
                    $("#esmurristo-game .blockerWhiteText").text("1");
                    esmurristo_timeouts.push(setTimeout(function () {
                        $("#esmurristo-game .blockerWhite").hide();
                        esmurristo_timeouts.push(setTimeout(esmurristo_timerUpdate, 100));
                    }, 500));
                }, 500));
            }, 500));
        }, 1000));
    }, 2000));
}

function esmurristo_endGame() {
    let won = 2; // 2 - ganhou, 1 - empatou, 0 - perdeu
    for (let i = 1; i < esmurristo_players.length; i++) {
        if (esmurristo_players[i] > esmurristo_players[0]) {
            won = 0;
            break;
        }
        else if (esmurristo_players[i] === esmurristo_players[0] && won > 0) {
            won = 1;
        }
    }
    if (won === 2)
        $("#esmurristo-game .blockerWhiteText").text("Você ganhou! :)");
    else if (won === 1)
        $("#esmurristo-game .blockerWhiteText").text("Foi empate!");
    else
        $("#esmurristo-game .blockerWhiteText").text("Você perdeu! :(");
    $("#esmurristo-game .blockerWhite").show();
    esmurristo_showPontuacao();

    esmurristo_timeouts.push(setTimeout(function () {
        $("#esmurristo-rematch-btn").show();
    }, 500));
}

function esmurristo_updateScreen() {
    for (let i = 0; i < esmurristo_players.length; i++)
        $("#esmurristo-player" + String(i+1) + "-score span").text(esmurristo_players[i]);
    $("#esmurristo-count-score span").text(esmurristo_players[0]);
    $("#esmurristo-time-left-time").text((esmurristo_timeleft / 10).toFixed(1));
    if (Math.floor(esmurristo_timeleft / 10) === 1)
        $("#esmurristo-time-left-s").text("");
    else
        $("#esmurristo-time-left-s").text("s");
}

function esmurristo_timerUpdate() {
    esmurristo_timeleft--;
    if (esmurristo_timeleft > 0) {
        esmurristo_timeouts.push(setTimeout(esmurristo_timerUpdate, 100));
        esmurristo_simulatePlayers(0.55);
    }
    else {
        if (esmurristo_timeleft < 0)
            esmurristo_timeleft = 0;
        esmurristo_endGame();
    }
    esmurristo_updateScreen();
}

function esmurristo_simulatePlayers(chance) {
    for (let i = 1; i < esmurristo_players.length; i++)
        if (Math.random() < chance)
            esmurristo_players[i]++;
}

function esmurristo_showPontuacao() {
    $("#esmurristo-player1-score, #esmurristo-player2-score, #esmurristo-player3-score, #esmurristo-player4-score").css("z-index", '2').removeClass("esmurristo-player-won");
    let winners = [];
    for (let i = 0; i < esmurristo_players.length; i++) {
        if (winners.length === 0 || esmurristo_players[i] === esmurristo_players[winners[0]])
            winners.push(i);
        else if (esmurristo_players[i] > esmurristo_players[winners[0]])
            winners = [i];
    }
    for (let i = 0; i < winners.length; i++)
        $("#esmurristo-player" + String(winners[i] + 1) + "-score").addClass("esmurristo-player-won");
        //$("#esmurristo-player" + String(winners[i] + 1) + "-score").css("background-color", "#009ee1").css("color", "white");
}

function esmurristo_hidePontuacao() {
    $("#esmurristo-player1-score, #esmurristo-player2-score, #esmurristo-player3-score, #esmurristo-player4-score").css("z-index", '0');
    $(".esmurristo-score").removeClass("esmurristo-player-won");
    //$(".esmurristo-score").css("background-color", "auto").css("color", "auto");
}
