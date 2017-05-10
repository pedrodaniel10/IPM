var timer_global = 0;
var timer_stopped = true;

function timer_init() {
    timer_stopped = false;
    for (let i = 0; i < sessionOrder.length; i++) {
        let ct = getFoodByName(sessionOrder[i]._name)._ctime;
        if (ct > timer_global)
            timer_global = ct;
    }
    timer_global *= 60;
    setTimeout(timer_tick, 1000);
    timer_update();
    $("#timeleft-box").show();
}

function timer_addOrder(order) {
    for (let i = 0; i < order.length; i++) {
        let ct = getFoodByName(order[i]._name)._ctime;
        if (ct*60 > timer_global)
            timer_global = ct*60;
    }
    if (timer_stopped) {
        timer_stopped = false;
        setTimeout(timer_tick, 1000);
    }
}

function timer_tick() {
    timer_global--;
    if (!timer_stopped && timer_global > 0)
        setTimeout(timer_tick, 1000);
    timer_update();
}

function timer_update() {
    if (timer_global === 0) {
        $("#timeleft-box").hide();
        timer_stopped = true;
        return;
    }
    $("#timeleft-circle span").text(formatTime(timer_global));
    $("#timeleft-box span").text(formatTime(timer_global));
}

function formatTime(time) {
    let txt = ":";
    if (time % 60 < 10)
        txt += "0";
    txt += String(time % 60);
    return String(Math.floor(time/60)) + txt;
}