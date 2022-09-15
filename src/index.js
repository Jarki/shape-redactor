import Canvas from './components/canvas/'
import Menu from './components/menu'
import Div from './dom-components/div'
import './index.css'

const mainContainer = Div(
    'mainContainer', ['mainContainer']
)

document.body.appendChild(mainContainer);


const menuContainer = Div(
    'menuContainer', ['menuContainer']
);

let canvasW = 600;
let canvasH = 600;
const canvasContainerID = 'canvasContainer';

const canvasContainer = Div(
    'canvasContainer', ['canvasContainer']
)

canvasContainer.style = `width: ${canvasW}, height: ${canvasH}`

mainContainer.appendChild(menuContainer);
mainContainer.appendChild(canvasContainer);

let canvas = new Canvas(canvasContainerID, canvasW, canvasH);

Menu({'parent': menuContainer, canvas});