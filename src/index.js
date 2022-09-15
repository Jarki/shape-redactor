import Canvas from './components/canvas/'
import random from './random'
import Menu from './components/menu'
import Div from './dom-components/div'

document.body.appendChild(Div(
    'container', ['container']
));

const menuContainer = Div(
    'menu', 'menu'
);
document.body.appendChild(menuContainer);
Menu(menuContainer);    

let canvasW = 600;
let canvasH = 600;

let canvas = new Canvas('container', canvasW, canvasH);
let layer = canvas.addLayer();
canvas.addCircle(layer, random(canvasW), random(canvasH));