import Input from "../../dom-components/input/input";
import Button from "../../dom-components/button/button";
import Div from "../../dom-components/div/div";
import Label from "../../dom-components/label/label";

export default function RotateForm(props){
    const form = Div({
        'id': 'rotate-form',
        'classNames': ['vertical-flex-container']
    });

    let duration = 0;

    const durInput = Input({
        'id': 'rotation-duration-input',
        'type': 'number',
        'value': duration,
        'eventListeners': [{
            'change': (e) => duration = e.target.value
        }]
    });

    const submit = Button({
        'classNames': ['ui-button'],
        'innerHTML': 'Add animation',
        'eventListeners': [{
            'click': () => {props.onSubmit({duration})}
        }]
    })

    form.append(Label({
        'for': 'rotation-duration-input',
        'innerHTML': 'Duration:'
    }))
    form.append(durInput);
    form.append(submit);

    return form;
}