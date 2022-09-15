import Div from "../../dom-components/div";
import Input from "../../dom-components/input";
import Label from "../../dom-components/label";

export default function ShapeRedactor(props) {
    const shapeRedactor = Div('shape-redactor', ['vertical-flex-container']);

    const colorLabel = Label({
        'for': 'color-input',
        'text': `Change color of ${props.shape}`
    })
    const colorInput = Input({
        'id': 'color-input',
        'type': 'color',
        'value': props.value ? props.value : '#000',
        'eventListeners': [{
            'change': (e) => props.onChange(e.target.value),
        },]
    });

    shapeRedactor.append(colorLabel);
    shapeRedactor.append(colorInput);
    return shapeRedactor;
}