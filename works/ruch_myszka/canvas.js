import { Box } from './box.js'

globalThis.canvas = document.querySelector('#main')
// dostosowywanie rozmiaru canvas
const layout = (event) => {
    const computedStyle = getComputedStyle(canvas.parentNode)
    let elementWidth = canvas.parentNode.clientWidth
    elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
    canvas.height = elementWidth
    canvas.width = elementWidth
    console.log(elementWidth)
}
layout()
window.addEventListener('resize', layout, false)
globalThis.ctx = canvas.getContext("2d");
// CONFIG
globalThis.FPS = 90
globalThis.totalTime = 2000
globalThis.global_r = 40
globalThis.current_r = global_r
let source_x 
let source_y 
// END CONFIG
// create controls:
document.querySelector('section').style.display = 'block'
document.querySelector('section h3').innerText = 'Controls'
const controlsWrapper = document.querySelector('section div')
const chechboxWrapper = document.createElement('div')
chechboxWrapper.style.display = 'grid'
chechboxWrapper.style.gridTemplateColumns = 'repeat(4, 1fr)'
chechboxWrapper.style.gridGap = '0.6em';
[{ name: 'Total Time', value: totalTime, id: 'tt' },
    { name: 'FPS', value: FPS, id: 'fps' },
    { name: 'r = height * ', value: global_r, id: 'r' }
].forEach(x => {
    const slider = document.createElement('label')
    slider.style.gridColumn = '1 / span 4'
    slider.style.display = 'grid'
    slider.style.gridTemplateColumns = 'repeat(4, 1fr)'
    slider.style.gridGap = '0.6em';
    slider.id = x.id
    const span = document.createElement('span')
    span.innerText = x.name
    span.style.gridColumn = '1 / span 1'
    slider.appendChild(span)
    const range = document.createElement('input')
    range.type = 'range'
    range.max = x.value * 2
    range.min = x.value / 10
    range.value = x.value
    range.style.gridColumn = '2 / span 2'
    slider.appendChild(range)
    const output = document.createElement('output')
    output.style.gridColumn = '4 / span 1'
    output.value = x.value
    slider.appendChild(output);
    chechboxWrapper.appendChild(slider);
});
const easings = ['easeOutCubic', 'easeOutExpo', 'easeInOutExpo', 'easeOutBack', 'easeOutBounce', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad']

easings.forEach((x, i) => {
    const div = document.createElement('div')
    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'easings'
    radio.checked = i == 0
    radio.value = x
    const label = document.createElement('label')
    label.for = x
    label.innerText = x
    div.appendChild(radio)
    div.appendChild(label)
    chechboxWrapper.appendChild(div)
})


controlsWrapper.appendChild(chechboxWrapper)
// end controls
const clearCanvas = () => {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000'
}

const resetCanvas = () => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = 'round'
    ctx.fillStyle = '#000'
}

const readGlobals = () => {
    FPS = document.querySelector('#fps input').value
    document.querySelector('#fps output').value = FPS
    totalTime = document.querySelector('#tt input').value
    document.querySelector('#tt output').value = totalTime
    global_r = document.querySelector('#r input').value
    document.querySelector('#r output').value = global_r / 100
    globalThis.easingName = document.querySelector('input[type="radio"]:checked').value
}
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)


readGlobals()
resetCanvas()

const onMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    source_x = (e.clientX - rect.left) / canvas.width
    source_y = (e.clientY - rect.top) / canvas.height
    current_r = Math.max(10, current_r - 1)
}

const mouseOut = (e) => {
    source_x = undefined
    source_y = undefined
}

const isVisible = (x) => {
    return x.currentTime <= x.totalTime
}
canvas.addEventListener('mousemove', onMove, false)
canvas.addEventListener('mouseout', mouseOut, false)
globalThis.allBoxes = []
const loop = (time) => {
    requestAnimationFrame(loop)
    if (time - lastTime >= 1000 / FPS) {
        lastTime = time
        clearCanvas()
        readGlobals()
        for (let i = 0; i < 3; i++) {
            allBoxes.push(new Box(
                source_x,
                source_y,
                current_r / 100,
                randomBetween(0, 360),
                totalTime,
                randomBetween(4, 15),
                [255, randomBetween(0, 240), randomBetween(0, 100)],
                easingName
            ))
        }
        allBoxes.forEach(x => x.oneStep())
        allBoxes = allBoxes.filter(isVisible)
        current_r = Math.min(global_r, current_r + 1)
    }
}
let lastTime = 0
loop()