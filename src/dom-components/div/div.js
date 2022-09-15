export default function Div(id, classNames, eventListeners = undefined) {
    let div = document.createElement('div');

    div.setAttribute('id', id);
    div.classList.add(...classNames);

    if (eventListeners) eventListeners.forEach(listener => {
        div.addEventListener(listener.event, listener.function)
    });

    return div;
}
