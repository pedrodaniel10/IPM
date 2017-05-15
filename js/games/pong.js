var pong_timeouts = [];
var pong_gameTimeout = 0;
var pong_ballPos = { x: 0.0, y: 0.0 };
var pong_ballVel = { x: 0.0, y: 0.0 };
var pong_computerPos = 0.0;
var pong_userScore = 0;
var pong_computerScore = 0;
var PONG_MAXWIDTH = 487;//337

function preparePongGame() {
    $("#games-pong-btn").click(function () {
        pong_resetGame();
        games_windowAdjust();
        openWindow("pong-game", windowPosition.BOTTOM_RIGHT);
        pong_startGame();
    });

    $("#pong-game .Xbtn").click(function () {
        closeWindow("pong-game");
        while (pong_timeouts.length > 0) {
            clearTimeout(pong_timeouts[0]);
            pong_timeouts.splice(0, 1);
        }
        clearTimeout(pong_gameTimeout);
    });

    $("#user-player").draggable({ axis: "x", containment: "#pong-game-div" });
}

function pong_game() {
    pong_ballPos.x += pong_ballVel.x * 0.002;
    pong_ballPos.y += pong_ballVel.y * 0.002;
    pong_gameTimeout = setTimeout(pong_game, 1);
    pong_wallCollide();
    pong_updateScreen();
}

function pong_resetGame() {
    $("#pong-game .blockerWhiteText").text("Prepare-se!");
    $("#pong-game .blockerWhite").show();
    pong_throwBall();
    pong_computerPos = 0.0;
    pong_updateScreen();
}

function pong_startGame() {
    pong_timeouts.push(setTimeout(function () {
        $("#pong-game .blockerWhiteText").text("3");
        pong_timeouts.push(setTimeout(function () {
            $("#pong-game .blockerWhiteText").text("2");
            pong_timeouts.push(setTimeout(function () {
                $("#pong-game .blockerWhiteText").text("1");
                pong_timeouts.push(setTimeout(function () {
                    $("#pong-game .blockerWhite").hide();
                    pong_gameTimeout = setTimeout(pong_game, 1);
                }, 500));
            }, 500));
        }, 500));
    }, 1000));
}

function pong_updateScreen() {
    $("#pong-ball").css("left", String(pong_ballPos.x * 100) + "%").css("top", String(pong_ballPos.y * 100) + "%");
    $("#pong-computer-score span").text(pong_computerScore);
    $("#pong-user-score span").text(pong_userScore);
}

function pong_throwBall() {
    pong_ballPos.x = 0.5;
    pong_ballPos.y = 0.5;
    /*let initVDir = Math.random() * 4.0 * Math.PI / 3.0;
    if (initVDir > 2.0 * Math.PI / 3.0)
        initVDir += Math.PI / 2.0;
    else
        initVDir += Math.PI / 6.0;*/
    let initVDir = Math.random() * 5.0 * Math.PI / 3.0;
    if (initVDir > 5.0 * Math.PI / 6.0)
        initVDir += Math.PI / 4.0;
    else
        initVDir += Math.PI / 12.0;
    pong_ballVel.x = Math.cos(initVDir);
    pong_ballVel.y = Math.sin(initVDir);
}

function pong_wallCollide() {
    if (pong_ballPos.x <= 0 || pong_ballPos.x >= 1)
        pong_ballVel.x = -pong_ballVel.x;
    else if (pong_ballPos.y <= 0 || pong_ballPos.y >= 1)
        pong_lost();
}

function pong_lost() {
    if (pong_ballPos.y <= 0)
        pong_userScore++;
    else
        pong_computerScore++;
    pong_throwBall();
}