export default function Input(props) {
    const i = document.createElement('input')

    if (props.id) i.setAttribute('id', props.id);

    if (props.classNames) i.classList.add(props.classNames);

    if (props.value) i.setAttribute('value', props.value);

    props.type ? i.setAttribute('type', props.type) : i.setAttribute('type', 'text');

    if (props.eventListeners && Array.isArray(props.eventListeners))
        props.eventListeners.forEach(e => i.addEventListener(
            Object.keys(e)[0], Object.values(e)[0]
        ));

    return i;
}