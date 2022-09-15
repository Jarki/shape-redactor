import Canvas from './components/canvas/'
import Menu from './components/menu'
import Div from './dom-components/div'
import './index.css'

const mainContainer = Div(
    'mainContainer', ['main-container']
)

document.body.appendChild(mainContainer);


const menuContainer = Div(
    'menuContainer', ['menu-container', 'vertical-flex-container']
);

let canvasW = 600;
let canvasH = 600;
const canvasContainerID = 'canvasContainer';

const canvasContainer = Div(
    canvasContainerID, ['canvas-container']
)

canvasContainer.style = `width: ${canvasW}, height: ${canvasH}`

mainContainer.appendChild(menuContainer);
mainContainer.appendChild(canvasContainer);

let canvas = new Canvas(canvasContainerID, canvasW, canvasH);

Menu({'parent': menuContainer, canvas});