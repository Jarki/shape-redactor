import Konva from 'konva'

export default function Triangle(p1, p2, p3) {
    let shape = new Konva.Shape({
        sceneFunc: function (context, shape) {
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.closePath();

            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
        },
        fill: '#00D2FF',
        strokeWidth: 0,
        draggable: true,
    });

    shape.getSelfRect = function () {
        return {
            x: p1.x,
            y: p1.y,
            width: p3.x - p1.x,
            height: p2.y - p1.y
        }
    };
    return shape;
}