import Konva from "konva";
import { nanoid } from "nanoid";

export default class Animation {
    constructor(layer) {
        var amplitude = 100;
        var period = 2000;
        // in ms
        var centerX = 100;

        this.anim = new Konva.Animation((frame) => {
            for (let anim of this.animations) {
                anim.anim(frame);
            }
        }, layer);

        this.animations = []
    }

    // example:
    // translation
    // addAnim({
    //     'shape': shape,
    //     'anim': {
    //         'type': 'translate',
    //         'axis': 'x',
    //         'amp': 100,
    //         'diration': 1000
    //     }
    // })
    // rotation
    // 'anim':{
    //     'type': 'rotate',
    //     'clockwise': true,
    //     'duration': 1000
    // }
    addAnim(props) {
        if (props.shape === undefined) {
            console.error("Error: No shape provided");
            return;
        }

        let animFunc = () => { };

        switch (props.anim.type) {
            case 'translate':
                if (props.anim.axis === 'x') {
                    animFunc = (frame) => {
                        props.shape.x(
                            props.anim.amp * Math.sin((frame.time * 2 * Math.PI) / props.anim.duration) + props.shape.x()
                        );
                    };
                }
                else if (props.anim.axis === 'y') {
                    animFunc = (frame) => {
                        anim.shape.y(
                            props.anim.amp * Math.sin((frame.time * 2 * Math.PI) / props.anim.duration) + props.shape.y()
                        );
                    };
                }
                else {
                    console.error("Error: Unrecognized axis");
                    return;
                }
                break;
            case 'rotate':
                var angularSpeed = 360 / props.anim.duration;
                animFunc = (frame) => {
                    var angleDiff = (frame.timeDiff * angularSpeed);
                    props.shape.rotate((-1 + 2 * props.anim.clockwise) * angleDiff);
                }
                break;
            case 'scale':
                // TODO
                break;
            default:
                console.error('Error: No such animation type');
                return;
        }
        this.animations.push({
            id: nanoid(),
            'shape': props.shape,
            'type': props.anim.type,
            'anim': animFunc
        });
    }

    getAnims(shape) {
        return this.animations.filter(a => a.shape.id === shape.id);
    }

    removeAnim(id) {
        this.animations = this.animations.filter(a => a.id !== id);
    }

    start() {
        this.anim.start();
    }

    stop() {
        this.anim.stop();
    }
}