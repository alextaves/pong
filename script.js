var width = 900;
var height = 600;

var draw = SVG('pong').size(width, height)

var background = draw.rect(width, height).fill('#e3e8e6');

var line = draw.line((width/2), 0, (width/2), height)
line.stroke({
	width: 5,
	color: '#fff',
	dasharray: '5, 5'
})

var paddleWidth = 40;
var paddleHeight = 150;

var paddleLeft = draw.rect(paddleWidth, paddleHeight)
paddleLeft.x(0).cy(height/2).fill('#00ff99')

var paddleRight = paddleLeft.clone()
paddleRight.x(width-paddleWidth).fill('#ff0066')

var ballSize = 50;
var ball = draw.circle(ballSize)
ball.center(width/2, height/2).fill('#7f7f7f')

var playerLeft = 0;
var playerRight = 0;

var scoreLeft = draw.text(playerLeft + "").font({
size:32,
family: 'Menlo, sans-serif',
anchor: 'end',
fill: '#fff'
}).move(width/2 -10, 10)

var scoreRight = draw.text(playerRight + "").font({
size:32,
family: 'Menlo, sans-serif',
anchor: 'start',
fill: '#fff'
}).move(width/2 + 10, 10)

var vx = Math.random() * 500 - 250
var vy = Math.random() * 500 - 250

function update(dt) {
ball.dmove(vx * dt, vy * dt)

var cx = ball.cx()
var cy = ball.cy()

if ((vy < 0 && cy <= 0) || (vy > 0 && cy >= height)){
vy = -vy
}
if((vx < 0 && cx <= 0) || (vx > 0 && cx >= width)){
vx = -vx
}

var paddleLeftY = paddleLeft.y()
var paddleRightY = paddleRight.y()

if ((vx < 0 && cx <= paddleWidth && cy > paddleLeftY && cy < paddleLeftY + paddleHeight) || (vx > 0 && cx >= width - paddleWidth && cy > paddleRightY && cy < paddleRightY + paddleHeight)) {
vy = (cy - ((vx < 0 ? paddleLeftY : paddleRightY) + paddleHeight/2)) * 7

vx = -vx * 1.05

}else if((vx < 0 && cx <= 0) || (vx > 0 && cx >= width)) {
if(vx < 0) { ++playerRight }
else { ++playerLeft }
vx = -vx

scoreLeft.text(playerLeft + '')
scoreRight.text(playerRight + '')
}

var playerPaddleY = paddleRight.y()


if(playerPaddleY <= 0 && paddleDirection == -1) {
    paddleRight.cy(paddleHeight/2)
} else if (playerPaddleY >= height - paddleHeight && paddleDirection == 1) {
    paddleRight.y(height-paddleHeight)
}else {
    paddleRight.dy(paddleDirection*paddleSpeed)
}
}

var lastTime, animFrame

function callback(ms) {
if (lastTime) {
	update((ms - lastTime) / 1000)
}
lastTime = ms
animFrame = requestAnimationFrame(callback)
}
callback()



var paddleDirection = 0;
var paddleSpeed = 5

SVGFEMergeNodeElement(document, 'keydown', function(e) {
    paddleDirection = e.keycode == 40 ? 1 : e.keyCode == 38  ? -1 : 0
    e.preventDefault()
})

SVG.on(document, 'keyup', function(e){
    paddleDirection = 0
    e.preventDefault()
})




























