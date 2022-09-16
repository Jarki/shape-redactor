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
                'addAnim': () => { animator.addAnim({
                    shape,
                    'anim':{
                        'type': 'rotate',
                        'clockwise': true,
                        'duration': 1000
                    }
                }) },
                'anims': animator.getAnims(shape),
                'removeAnim': (id) => {
                    animator.removeAnim(id);
                }
            })

            props.parent.appendChild(shapeRedactor);
            return;
        }
    });

    const addTriangleButton = Button("add-triangle-button",
        ["button-ui"],
        "Add triangle",
        [{
            'event': 'click',
            'function': () => canvas.addTriangle()
        }
        ]
    )

    const addRectButton = Button("add-rectangle-button",
        ["button-ui"],
        "Add rectangle",
        [{
            'event': 'click',
            'function': () => canvas.addRect()
        }
        ]
    )

    const addCircleButton = Button("add-circle-button",
        ["button-ui"],
        "Add circle",
        [{
            'event': 'click',
            'function': () => {
                canvas.addCircle()
            }
        }
        ]
    );

    const startAnimationButton = Button("start-anim-button",
        ["button-ui"],
        "Start animation",
        [{
            'event': 'click',
            'function': () => {
                animator.start();
            }
        }
        ]
    );

    const stopAnimationButton = Button("stop-anim-button",
        ["button-ui"],
        "Stop animation",
        [{
            'event': 'click',
            'function': () => {
                animator.stop();
            }
        }
        ]
    );

    const saveButton = Button("save-button",
        ["button-ui"],
        "Save composition",
        [{
            'event': 'click',
            'function': () => {
                var tempLink = document.createElement("a");
                var taBlob = new Blob([canvas.toJSON()], { type: 'text/json' });

                tempLink.setAttribute('href', URL.createObjectURL(taBlob));
                tempLink.setAttribute('download', `${nanoid()}.json`);
                tempLink.click();
            }
        }]
    )

    const loadButton = Button("load-button",
        ["button-ui"],
        "Load composition",
        [{
            'event': 'click',
            'function': (e) => {
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
    )
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