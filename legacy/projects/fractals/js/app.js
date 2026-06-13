const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colors = {
    black: 'black',
    purple: '#5b4565',
    red: 'red'
};

const firstDot = {
    x: canvas.width/2,
    y: canvas.height/2
};

const dots = [firstDot];

const dotRadius = 3;

const triangleEdges = [
    {x: 30, y: canvas.height - 30},
    {x: canvas.width / 2, y: 30},
    {x: canvas.width - 30, y: canvas.height - 30}
];

console.log(triangleEdges);

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

setInterval(function() {
    drawEverything();
}, 1);

function drawTriangle() {
    for (let i = 0; i < 3; i++) {
        drawCircle(triangleEdges[i].x, triangleEdges[i].y, dotRadius, colors.purple);
    }
}

function drawEverything() {
    ctx.fillStyle = colors.black;
    drawRect(0, 0, canvas.width, canvas.height, colors.black);
    drawTriangle();
    addDot();
    for (let i = 0; i < dots.length; i++) {
        let currentDot = dots[i];
        drawCircle(currentDot.x, currentDot.y, dotRadius, colors.purple);
    }
}

function drawRect(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.fill();
}

function addDot() {
    let num = getRandomArbitrary(0, 3);
    let lastDot = dots[dots.length - 1];
    let x = (lastDot.x + triangleEdges[num].x) / 2;
    let y = (lastDot.y + triangleEdges[num].y) / 2;
    let newDot = {x: x, y: y};
    dots.push(newDot);
}

function mod(num) {
    return num > 0 ? num : -num;
}
