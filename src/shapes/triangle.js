import Konva from 'konva'

export default function Triangle(p1, p2, p3) {
    let shape = new Konva.Shape({
        sceneFunc: function (context, shape) {
            context.beginPath();
            context.moveTo(0, -(p1.y - p2.y));
            context.lineTo((p2.x - p1.x), 0);
            context.lineTo(p3.x - p1.x, -(p1.y - p2.y));
            context.closePath();

            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
        },
        x: p1.x,
        y: p1.y,
        width: Math.abs(p3.x - p1.x),
        height: Math.abs(p2.y - p1.y),
        fill: '#00D2FF',
        strokeWidth: 0,
        draggable: true,
    });

    // shape.getSelfRect = function () {
    //     return {
    //         x: p1.x,
    //         y: p1.y,
    //         width: p3.x - p1.x,
    //         height: p2.y - p1.y
    //     }
    // };
    return shape;
}