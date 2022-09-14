import Canvas from './components/canvas/'
import random from './random'

const createEl = () => {
    let el = document.createElement('div');
    el.setAttribute('id', 'container');
    el.innerHTML = "Hello :)";

    return el;
}

document.body.appendChild(createEl());

let canvasW = 600;
let canvasH = 600;

let canvas = new Canvas('container', canvasW, canvasH);
let layer = canvas.addLayer();
canvas.addCircle(layer, random(canvasW), random(canvasH));