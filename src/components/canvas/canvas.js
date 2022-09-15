import Konva from 'konva'

export default class Canvas{
    constructor(container, w=500, h=500){
        this.stage = new Konva.Stage({
            container: container,   // id of container <div>
            width: w,
            height: h
        });
    }

    addLayer(){
        let layer = new Konva.Layer();

        this.stage.add(layer);
        return layer;
    }

    addCircle(layer, x, y){
        let circle = new Konva.Circle({
            container:'container',
            x: this.stage.width() / 2,
            y: this.stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });
        
        layer.add(circle);
    }
}
