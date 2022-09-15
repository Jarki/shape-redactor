import { nanoid } from 'nanoid'
import Button from '../../dom-components/button'
import ShapeRedactor from '../shape-redactor/shape-redactor';
import Input from '../../dom-components/input/input';
import './menu.css'

export default function Menu(props) {
    const canvas = props.canvas;
    let shapeRedactor = undefined;

    canvas.setEventListener('shapeChanged', (shape) => {
        if (shapeRedactor) props.parent.removeChild(shapeRedactor);
        shapeRedactor = undefined;

        if (shape) {
            shapeRedactor = ShapeRedactor({
                'value': shape.getFill(),
                'shape': shape.name(),
                'onChange': (color) => { shape.fill(color) }
            })

            props.parent.appendChild(shapeRedactor);
            return;
        }
    });

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

    const saveButton = Button("save-button",
        ["button-ui"],
        "Save composition",
        [{
            'event': 'click',
            'function': () => {
                var tempLink = document.createElement("a");
                var taBlob = new Blob([canvas.toJSON()], { type: 'text/json' });

                tempLink.setAttribute('href', URL.createObjectURL(taBlob));
                tempLink.setAttribute('download', `${nanoid()}.json`);
                tempLink.click();
            }
        }]
    )

    const loadButton = Button("load-button",
        ["button-ui"],
        "Load composition",
        [{
            'event': 'click',
            'function': (e) => {
                let file = document.querySelector('#file-input');
                
                if (!file.value.length) return;

                let reader = new FileReader();

                reader.onload = (event) => {
                    canvas.fromJSON(JSON.parse(event.target.result))
                }
                file = file.files[0]
                console.log(file)
                reader.readAsText(file);
            }
        }]
    )
    const fileInput = Input({
        "id": "file-input",
        "type": "file"
    })

    props.parent.appendChild(addTriangleButton);
    props.parent.appendChild(addRectButton);
    props.parent.appendChild(addCircleButton);
    props.parent.appendChild(saveButton);
    props.parent.appendChild(loadButton);
    props.parent.appendChild(fileInput);
}