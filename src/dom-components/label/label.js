export default function Label(props) {
    const l = document.createElement('label');

    if (props.for) l.setAttribute('for', props.for);
    if (props.id) l.setAttribute('for', props.id);
    if (props.classNames) l.classList.add(...props.classNames);

    if (props.text) l.innerHTML = props.text;

    return l;
}