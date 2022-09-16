export default function GenericComponent(componentName, props) {
    const comp = document.createElement(componentName);

    if (props.id) comp.setAttribute('id', props.id);

    if (props.classNames && Array.isArray(props.classNames)) comp.classList.add(...props.classNames);

    if (props.value) comp.setAttribute('value', props.value);

    if (props.innerHTML) comp.innerHTML = props.innerHTML;

    props.type ? comp.setAttribute('type', props.type) : comp.setAttribute('type', 'text');

    if (props.eventListeners && Array.isArray(props.eventListeners))
        props.eventListeners.forEach(e => comp.addEventListener(
            Object.keys(e)[0], Object.values(e)[0]
        ));

    return comp;
}