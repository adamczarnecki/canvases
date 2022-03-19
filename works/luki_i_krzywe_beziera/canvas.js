const canvas = document.querySelector('#main')
const ctx = canvas.getContext("2d");
const clearCanvas = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000'
}
// radiany = Math.PI/180*45
const radi = (x) => Math.PI/180*x

clearCanvas()

ctx.beginPath()

// łuki
ctx.arc(300, 150, 100, radi(45), radi(-120), true)
ctx.stroke()

// // radiany = Math.PI/180*45

// Łuki i krzywe Béziera
ctx.beginPath()
ctx.moveTo(200, 250)
ctx.bezierCurveTo(200, 100, 400, 400, 400, 250)
ctx.stroke()

