import Div from "../../dom-components/div/div";
import Button from "../../dom-components/button/button";
import Input from "../../dom-components/input/input";

export default function ShapeRedactor(props){
    const shapeRedactor = Div('shape-redactor', ['vertical-flex-container']);
    const colorInput = Input({
        'id': 'color-input',
        'type': 'color',
        'value': props.value ? props.value : '#000',    
        'eventListeners': [{
            'change': (e) => props.onChange(e.target.value),
        },]
    });

    shapeRedactor.append(colorInput);
    return shapeRedactor;
}