import Button from '../../dom-components/button'

export default function render(parent) {
    parent.appendChild(
        Button("add-triangle-button",
            ["button-ui"],
            "Add triangle",
            [{
                'event': 'click',
                'function': () => alert()
            }
            ]
        )
    );
}