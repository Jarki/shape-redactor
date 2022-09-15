import Button from '../../dom-components/button'
import random from '../../random'
import './menu.css'

export default function render(props) {
    const canvas = props.canvas;

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