import { nanoid } from 'nanoid'
import Button from '../../dom-components/button'
import ShapeRedactor from '../shape-redactor/shape-redactor';
import Input from '../../dom-components/input/input';
import Animation from '../../animation/animation';
import './menu.css'

export default function Menu(props) {
    const canvas = props.canvas;
    let shapeRedactor = undefined;
    let animator = new Animation(props.canvas.getLayer());

    canvas.setEventListener('shapeChanged', (shape) => {
        if (shapeRedactor) props.parent.removeChild(shapeRedactor);
        shapeRedactor = undefined;

        if (shape) {
            shapeRedactor = ShapeRedactor({
                'value': shape.getFill(),
                'shape': shape.name(),
                'onChange': (color) => { shape.fill(color) },
                'onRemove': () => { shape.destroy(); canvas.setActiveShape(undefined) },
                'addAnim': (data) => {
                    animator.addAnim({
                        shape,
                        'anim': {
                            ...data,
                        }
                    })
                },
                'anims': animator.getAnims(shape),
                'removeAnim': (id) => {
                    animator.removeAnim(id);
                }
            })

            props.parent.appendChild(shapeRedactor);
            return;
        }
    });

    const addTriangleButton = Button({
        "id": "add-triangle-button",
        "classNames": ["button-ui"],
        "innerHTML": "Add triangle",
        "eventListeners": [{
            'click': () => canvas.addTriangle()
        }
        ]
    });

    const addRectButton = Button({
        "id": "add-rectangle-button",
        "classNames": ["button-ui"],
        "innerHTML": "Add rectangle",
        "eventListeners": [{
            'click': () => canvas.addRect()
        }
        ]
    });

    const addCircleButton = Button({
        "id": "add-circle-button",
        "classNames": ["button-ui"],
        "innerHTML": "Add circle",
        "eventListeners": [{
            'click': () => {
                canvas.addCircle()
            }
        }
        ]
    });

    const startAnimationButton = Button({
        "id": "start-anim-button",
        "classNames": ["button-ui"],
        "innerHTML": "Start animation",
        "eventListeners": [{
            'click': () => {
                animator.start();
            }
        }
        ]
    });

    const stopAnimationButton = Button({
        "id": "stop-anim-button",
        "classNames": ["button-ui"],
        "innerHTML": "Stop animation",
        "eventListeners": [{
            'click': () => {
                animator.stop();
            }
        }
        ]
    });

    const saveButton = Button({
        "id": "save-button",
        "classNames": ["button-ui"],
        "innerHTML": "Save composition",
        "eventListeners": [{
            'click': () => {
                var tempLink = document.createElement("a");
                var taBlob = new Blob([canvas.toJSON()], { type: 'text/json' });

                tempLink.setAttribute('href', URL.createObjectURL(taBlob));
                tempLink.setAttribute('download', `${nanoid()}.json`);
                tempLink.click();
            }
        }]
    });

    const loadButton = Button({
        "id": "load-button",
        "classNames": ["button-ui"],
        "innerHTML": "Load composition",
        "eventListeners": [{
            'click': (e) => {
                let file = document.querySelector('#file-input');

                if (!file.value.length) return;

                let reader = new FileReader();

                reader.onload = (event) => {
                    canvas.fromJSON(JSON.parse(event.target.result))
                }
                file = file.files[0]
                reader.readAsText(file);
            }
        }]
    });
    const fileInput = Input({
        "id": "file-input",
        "type": "file"
    })

    props.parent.appendChild(addTriangleButton);
    props.parent.appendChild(addRectButton);
    props.parent.appendChild(addCircleButton);
    props.parent.appendChild(startAnimationButton);
    props.parent.appendChild(stopAnimationButton);
    props.parent.appendChild(saveButton);
    props.parent.appendChild(loadButton);
    props.parent.appendChild(fileInput);
}