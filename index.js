"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var blueSpeed = 2;
var redSpeed = 1;
var isPlaying = true;
var canvas = document.querySelector("canvas");
canvas.width = Math.min(window.innerWidth, window.innerHeight);
canvas.height = Math.min(window.innerWidth, window.innerHeight);
var ctx = canvas.getContext("2d");
var radius = canvas.width / 4 - 30;
var state = {
    pointPercent: 0,
    upperPercent: 0,
};
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawCircle();
    drawRedAndLine();
    drawBlue();
}
function drawBlue() {
    var _a = calculateTriangularBasedOnPercentage(state.upperPercent), x = _a.x, y = _a.y;
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(canvas.width / 2 + x * (radius + 30), canvas.height / 2 + y * (radius + 30), 8, 0, Math.PI * 2);
    ctx.fill();
}
function drawRedAndLine() {
    var _a = calculateTriangularBasedOnPercentage(state.pointPercent), x = _a.x, y = _a.y;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(canvas.width / 2 + x * radius, canvas.height / 2 + y * radius, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + x * radius, canvas.height / 2 + y * radius);
    ctx.lineTo(canvas.width / 2 + x * (radius * 2), canvas.height / 2 + y * (radius * 2));
    ctx.stroke();
}
function calculateTriangularBasedOnPercentage(percentage) {
    var angle = percentage * Math.PI * 2;
    var x = Math.cos(angle);
    var y = Math.sin(angle);
    return { x: x, y: y };
}
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var interval = 10;
var intervals = [];
setInterval(function () {
    if (isPlaying)
        state.pointPercent += (redSpeed * 1000) / interval / 100000;
}, interval);
setInterval(function () {
    if (isPlaying)
        state.upperPercent += (blueSpeed * 1000) / interval / 100000;
}, interval);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    draw();
                    return [4 /*yield*/, sleep(1000 / 60)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
main();
function drawCircle() {
    ctx.fillStyle = "#000";
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
}
var blueSpan = document.querySelector("#blue-speed");
var redSpan = document.querySelector("#red-speed");
function updateBlue(value) {
    blueSpeed = value;
    blueSpan.innerText = "" + blueSpeed;
}
function updateRed(value) {
    redSpeed = value;
    redSpan.innerText = "" + redSpeed;
}
function reset() {
    state.pointPercent = 0;
    state.upperPercent = 0;
}
function togglePlay() {
    isPlaying = !isPlaying;
}
