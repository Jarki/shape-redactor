import Div from "../../dom-components/div";
import Input from "../../dom-components/input";
import Label from "../../dom-components/label";
import Button from "../../dom-components/button/button";

export default function ShapeRedactor(props) {
    const shapeRedactor = Div({
        'id': 'shape-redactor', 
        'classNames': ['vertical-flex-container']
    });

    const colorLabel = Label({
        'for': 'color-input',
        'innerHTML': `Change color of ${props.shape}`
    });

    const colorInput = Input({
        'id': 'color-input',
        'type': 'color',
        'innerHTML': props.value ? props.value : '#000',
        'eventListeners': [{
            'change': (e) => props.onChange(e.target.value),
        },]
    });

    const animButton = Button({
        "id": "add-animation-button",
        "classNames": ["button-ui"],
        "innerHTML": "Add animation",
        "eventListeners": [{
            'click': props.addAnim
        }]
    });

    for (let anim of props.anims) {
        shapeRedactor.appendChild(Button({
            "id": `remove-anim-button-${anim.id}`,
            "classNames": ["button-ui"],
            "innerHTML": `Remove animation ${anim.type}`,
            "eventListeners": [{
                'click': () => props.removeAnim(anim.id)
            }]
        }
        ));
}

const removeButton = Button({
    "id": "remove-button",
    "classNames": ["button-ui"],
    "innerHTML": "Remove shape",
    "eventListeners": [{
        'click': () => props.onRemove(),
    },
    ]
}
);

shapeRedactor.append(colorLabel);
shapeRedactor.append(colorInput);
shapeRedactor.append(animButton);
shapeRedactor.append(removeButton);
return shapeRedactor;
}