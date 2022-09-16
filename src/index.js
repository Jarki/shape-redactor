import Canvas from './components/canvas/'
import Menu from './components/menu'
import Div from './dom-components/div'
import './index.css'

const mainContainer = Div({
    'id': 'mainContainer',
    'classNames': ['main-container']
});

document.body.appendChild(mainContainer);

const menuContainer = Div({
    'id': 'menuContainer',
    'classNames': ['menu-container', 'vertical-flex-container']
});

let canvasW = 1200;
let canvasH = 600;
const canvasContainerID = 'canvasContainer';

const canvasContainer = Div({
    'id': canvasContainerID,
    'classNames': ['canvas-container']
});

canvasContainer.style = `max-width: ${canvasW}, max-height: ${canvasH}`

mainContainer.appendChild(menuContainer);
mainContainer.appendChild(canvasContainer);

let canvas = new Canvas(canvasContainerID, canvasW, canvasH);

Menu({ 'parent': menuContainer, canvas });