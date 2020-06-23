const clantag = "clantag       ";
var lastTime = 0;
var _getCurTime = 0;

Globals.GetCurtime = function () {
    const curTime = Globals.Curtime();
    if (_getCurTime > curTime) curTime = _getCurTime;
    _getCurTime = curTime;
    return curTime;
}

function onDraw() {
    const now = Math.round(Globals.GetCurtime() * 2);

    if (now === lastTime)
        return;

    lastTime = now;

    const iterator = Math.abs(-clantag.length + (now) % (clantag.length * 2)) + 1;
    const tag = clantag.slice(0, -iterator);

    Local.SetClanTag(tag);
}

Cheat.RegisterCallback("Draw", "onDraw");