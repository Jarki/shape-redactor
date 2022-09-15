export default function Button(id, classNames, value, eventListeners = undefined) {
    let b = document.createElement('button');

    b.setAttribute('id', id);

    if (!Array.isArray(classNames)) {
        console.error("classNames should be an array");
        return;
    }
    b.classList.add(...classNames);
    b.innerHTML = value;

    if (eventListeners) eventListeners.forEach(listener => {
        b.addEventListener(listener.event, listener.function)
    });

    return b;
}