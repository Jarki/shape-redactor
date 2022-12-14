import Konva from 'konva'
import Triangle from '../../shapes/triangle';

export default class Canvas {
    constructor(container, w = 500, h = 500) {
        this.stage = new Konva.Stage({
            container: container,   // id of container <div>
            width: w,
            height: h
        });
        this.container = container;

        let layer = new Konva.Layer();
        this.stage.add(layer);
        this.currentLayer = layer;

        this.#setUpStage();

        this.eventListeners = {
            'shapeChanged': () => { },
        };
    }

    getLayer(){
        return this.stage.children[0];
    }

    #setUpStage(){
        let tr = new Konva.Transformer();
        tr.nodes([]);
        this.transformer = tr;
        this.currentLayer.add(tr);

        this.activeShape = undefined

        this.stage.on('click', (e) => { e.target.constructor.name === "Stage" ? this.setActiveShape(undefined) : "" });
    }

    setEventListener(event, func) {
        if (!(event in this.eventListeners)) {
            console.error("Error: no such event");
            return;
        }

        this.eventListeners[event] = func;
    }

    getSize() {
        return {
            'w': this.stage.width(),
            'h': this.stage.height()
        }
    }

    addLayer() {
        let layer = new Konva.Layer();

        this.stage.add(layer);
        return layer;
    }

    setActiveShape(shape) {
        this.activeShape = shape;

        this.eventListeners['shapeChanged'](this.activeShape);

        if (!shape) {
            this.transformer.nodes([]);
            return;
        }

        this.transformer.nodes([this.activeShape]);
    }

    addTriangle() {
        let trianglePoints = [
            { "x": this.stage.width() / 2 - 50, "y": this.stage.height() / 2 - 60},
            { "x": this.stage.width() / 2, "y": this.stage.height() / 2 },
            { "x": this.stage.width() / 2 + 50, "y": this.stage.height() / 2 - 60 },
        ];

        let triangle = new Triangle(...trianglePoints);

        triangle.on('click', () => {
            this.setActiveShape(triangle)
        });
        triangle.name("triangle");
        triangle.offsetX(50);
        triangle.offsetY(30);

        this.currentLayer.add(triangle);
    }

    addRect() {
        let rect = new Konva.Rect({
            x: this.stage.width() / 2,
            y: this.stage.height() / 2,
            width: 70,
            height: 70,
            fill: '#00D2FF',
            draggable: true,
            name: 'rectangle',
            offsetX: 35,
            offsetY: 35
        });

        rect.on('click', () => {
            this.setActiveShape(rect)
        });

        this.currentLayer.add(rect);
    }

    addCircle() {
        let circle = new Konva.Circle({
            x: this.stage.width() / 2,
            y: this.stage.height() / 2,
            radius: 35,
            fill: '#00D2FF',
            draggable: true,
            name: 'circle',
        });

        circle.on('click', () => {
            this.setActiveShape(circle)
        });
        
        this.currentLayer.add(circle);
    }

    toJSON(){
        return this.stage.toJSON();
    }

    fromJSON(data){
        this.stage = Konva.Node.create(data, this.container);

        this.currentLayer = this.stage.children[0];
        for(let shape of this.currentLayer.children){
            shape.on('click', () => {
                this.setActiveShape(shape)
            });
        }

        this.#setUpStage();
    }
}
