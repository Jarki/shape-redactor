import Div from "../../dom-components/div";
import Input from "../../dom-components/input";
import Label from "../../dom-components/label";
import Button from "../../dom-components/button/button";

export default function ShapeRedactor(props) {
    const shapeRedactor = Div('shape-redactor', ['vertical-flex-container']);

    const colorLabel = Label({
        'for': 'color-input',
        'text': `Change color of ${props.shape}`
    });

    const colorInput = Input({
        'id': 'color-input',
        'type': 'color',
        'value': props.value ? props.value : '#000',
        'eventListeners': [{
            'change': (e) => props.onChange(e.target.value),
        },]
    });

    const animButton = Button(
        "add-animation-button",
        ["button-ui"],
        "Add animation",
        [{
            'event': 'click',
            'function': props.addAnim
        }]
    );

    for(let anim of props.anims){
        shapeRedactor.appendChild(Button(
            `remove-anim-button-${anim.id}`,
            ["button-ui"],
            `Remove animation ${anim.type}`,
            [{
                'event': 'click',
                'function': () => props.removeAnim(anim.id)
            }]
        ));
    }

    const removeButton = Button(
        "remove-button",
        ["button-ui"],
        "Remove shape",
        [{
            'event':'click',
            'function': () => props.onRemove(),
        },]
    );

    shapeRedactor.append(colorLabel);
    shapeRedactor.append(colorInput);
    shapeRedactor.append(animButton);
    shapeRedactor.append(removeButton);
    return shapeRedactor;
}