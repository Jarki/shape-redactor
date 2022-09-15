import Konva from 'konva'
import Triangle from '../../shapes/triangle';

export default class Canvas {
    constructor(container, w = 500, h = 500) {
        this.stage = new Konva.Stage({
            container: container,   // id of container <div>
            width: w,
            height: h
        });

        let layer = new Konva.Layer();
        this.stage.add(layer);
        this.currentLayer = layer;

        let tr = new Konva.Transformer();
        this.transformer = tr;
        this.currentLayer.add(tr);

        this.stage.on('click', (e) => { e.target.constructor.name === "Stage" ? tr.nodes([]) : "" })
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

    addTriangle() {
        let trianglePoints = [
            {"x": this.stage.width() / 2 - 50, "y": this.stage.height() / 2 + 30},
            {"x": this.stage.width() / 2, "y": this.stage.height() / 2 - 30},
            {"x": this.stage.width() / 2 + 50, "y": this.stage.height() / 2 + 30},
        ];

        let triangle = new Triangle(...trianglePoints);

        triangle.on('click', () => {
            this.transformer.nodes([triangle])
        });

        this.currentLayer.add(triangle);
    }

    addRect() {
        let rect = new Konva.Rect({
            x: this.stage.width() / 2,
            y: this.stage.height() / 2,
            width: 70,
            height: 70,
            fill: '#00D2FF',
            draggable: true
        });

        rect.on('click', () => {
            this.transformer.nodes([rect])
        });

        this.currentLayer.add(rect);
    }

    addCircle() {
        let circle = new Konva.Circle({
            x: this.stage.width() / 2,
            y: this.stage.height() / 2,
            radius: 35,
            fill: '#00D2FF',
            draggable: true
        });

        circle.on('click', () => {
            this.transformer.nodes([circle])
        });

        this.currentLayer.add(circle);
    }


}
