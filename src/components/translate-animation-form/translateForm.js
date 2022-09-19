import Input from "../../dom-components/input/input";
import Button from "../../dom-components/button/button";
import Div from "../../dom-components/div/div";
import Label from "../../dom-components/label/label";

export default function TranslateForm(props){
    const form = Div({
        'id': 'translate-form',
        'classNames': ['vertical-flex-container']
    });

    let amp = 0;
    let duration = 0;

    const ampInput = Input({
        'id': 'amp-input-translate',
        'type': 'number',
        'value': amp,
        'eventListeners': [{
            'change': (e) => amp = e.target.value
        }]
    });

    const durInput = Input({
        'id': 'duration-input-translate',
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
            'click': () => {props.onSubmit({amp, duration})}
        }]
    })

    form.append(Label({
        'for': 'amp-input-translate',
        'innerHTML': 'Amp'
    }));
    form.append(ampInput);
    form.append(Label({
        'for': 'duration-input-translate',
        'innerHTML': 'Duration'
    }));
    form.append(durInput);
    form.append(submit);

    return form;
}