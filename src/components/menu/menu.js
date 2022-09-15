import Button from '../../dom-components/button'
import './menu.css'

export default function render(parent) {
    const addTriangleButton = Button("add-triangle-button",
        ["button-ui"],
        "Add triangle",
        [{
            'event': 'click',
            'function': () => alert()
        }
        ]
    )

    const addRectButton = Button("add-rectangle-button",
        ["button-ui"],
        "Add rectangle",
        [{
            'event': 'click',
            'function': () => alert()
        }
        ]
    ) 

    const addCircleButton = Button("add-circle-button",
        ["button-ui"],
        "Add circle",
        [{
            'event': 'click',
            'function': () => alert()
        }
        ]
    ) 

    parent.appendChild(addTriangleButton);
    parent.appendChild(addRectButton);
    parent.appendChild(addCircleButton);
}