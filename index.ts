let blueSpeed = 2;
let redSpeed = 1;
let isPlaying = true;

const canvas = document.querySelector("canvas")! as HTMLCanvasElement;
canvas.width=Math.min(window.innerWidth,window.innerHeight);
canvas.height=Math.min(window.innerWidth,window.innerHeight);
const ctx = canvas.getContext("2d")!;
const radius = canvas.width / 4 - 30;
const state = {
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
    const { x, y } = calculateTriangularBasedOnPercentage(state.upperPercent);
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(
        canvas.width / 2 + x * (radius + 30),
        canvas.height / 2 + y * (radius + 30),
        8,
        0,
        Math.PI * 2
    );
    ctx.fill();
}
function drawRedAndLine() {
    const { x, y } = calculateTriangularBasedOnPercentage(state.pointPercent);
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
        canvas.width / 2 + x * radius,
        canvas.height / 2 + y * radius,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + x * radius, canvas.height / 2 + y * radius);
    ctx.lineTo(
        canvas.width / 2 + x * (radius * 2),
        canvas.height / 2 + y * (radius * 2)
    );
    ctx.stroke();
}
function calculateTriangularBasedOnPercentage(percentage: number) {
    const angle = percentage * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return { x, y };
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const interval = 10;

const intervals: any[] = [];
setInterval(() => {
    if(isPlaying) state.pointPercent += (redSpeed * 1000) / interval / 100000;
}, interval);
setInterval(() => {
    if(isPlaying) state.upperPercent += (blueSpeed * 1000) / interval / 100000;
}, interval);


async function main() {
    while (true) {
        draw();
        await sleep(1000 / 60);
    }
}

main();
function drawCircle() {
    ctx.fillStyle = "#000";
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
}

const blueSpan = document.querySelector("#blue-speed")! as HTMLSpanElement;
const redSpan = document.querySelector("#red-speed")! as HTMLSpanElement;

function updateBlue(value: number) {
    blueSpeed = value;
    blueSpan.innerText = `${blueSpeed}`;
}
function updateRed(value: number) {
    redSpeed = value;
    redSpan.innerText = `${redSpeed}`;
}

function reset() {
    state.pointPercent = 0;
    state.upperPercent = 0;
}

function togglePlay() {
    isPlaying = !isPlaying;
}
