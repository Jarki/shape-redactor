import Button from '../../dom-components/button'
import ShapeRedactor from '../shape-redactor/shape-redactor';
import './menu.css'

export default function Menu(props) {
    const canvas = props.canvas;
    let shapeRedactor = undefined;

    canvas.setEventListener('shapeChanged', (shape) => {
        if (shapeRedactor) props.parent.removeChild(shapeRedactor);
        shapeRedactor = undefined;

        if (shape) {
            shapeRedactor = ShapeRedactor({
                'value': shape.getFill(),
                'shape': shape.name(),
                'onChange': (color) => { shape.fill(color) }
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
    )

    props.parent.appendChild(addTriangleButton);
    props.parent.appendChild(addRectButton);
    props.parent.appendChild(addCircleButton);
}