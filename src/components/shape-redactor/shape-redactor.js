import Div from "../../dom-components/div";
import Input from "../../dom-components/input";
import Label from "../../dom-components/label";
import Button from "../../dom-components/button/button";
import RotateForm from "../rotate-animation-form/rotateForm";
import TranslateForm from "../translate-animation-form/translateForm";

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

    let flexibleRow = Div({
        'classNames': ['flexible-row']
    });

    const translateLabel = Label({
        'for': 'anim-type-translate',
        'innerHTML': 'Translate animation'
    });

    const radioSelectTranslate = Input({
        'id': 'anim-type-translate',
        'name': 'choose-anim-type',
        'type': 'radio',
        'eventListeners': [{
            'change': handleAnimChange
        }]
    });

    flexibleRow.append(translateLabel);
    flexibleRow.append(radioSelectTranslate);
    shapeRedactor.append(flexibleRow);

    flexibleRow = Div({
        'classNames': ['flexible-row']
    });

    const rotateLabel = Label({
        'for': 'anim-type-rotate',
        'innerHTML': 'Rotate animation'
    });

    const radioSelectRotate = Input({
        'id': 'anim-type-rotate',
        'name': 'choose-anim-type',
        'type': 'radio',
        'eventListeners': [{
            'change': handleAnimChange
        }]
    });

    flexibleRow.append(rotateLabel);
    flexibleRow.append(radioSelectRotate);
    shapeRedactor.append(flexibleRow);

    const animSettingsContainer = Div({
        'classNames': ['vertical-flex-container']
    });

    shapeRedactor.append(animSettingsContainer);

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

    function handleAnimChange(e) {
        animSettingsContainer.textContent = '';
        if (e.target.id === 'anim-type-rotate') {
            animSettingsContainer.append(RotateForm({
                'onSubmit': (data) => {
                    props.addAnim({
                        'type': 'rotate',
                        ...data
                    })
                }
            }));
        }
        else if (e.target.id === 'anim-type-translate') {
            animSettingsContainer.append(TranslateForm({
                'onSubmit': (data) => {
                    props.addAnim({
                        'type': 'translate',
                        'axis': 'x',
                        ...data
                    })
                }
            }));
        }
    }

    shapeRedactor.append(colorLabel);
    shapeRedactor.append(colorInput);

    const removeButton = Button({
        "id": "remove-button",
        "classNames": ["button-ui"],
        "innerHTML": "Remove shape",
        "eventListeners": [{
            'click': () => props.onRemove(),
        },
        ]
    });

    shapeRedactor.append(removeButton);
    return shapeRedactor;
}