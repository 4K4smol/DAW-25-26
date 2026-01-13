export function qs(selector, doc = document) {
    return doc.querySelector(selector);
}

export function qsa(selector, doc = document) {
    return [...doc.querySelectorAll(selector)];
}

export function createEl(alias, options = {}) {
    const element = document.createElement(alias);

    if (options.class) element.className = options.class;
    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;

    if (options.dataset) {
        Object.entries(options.dataset).forEach(([k, v]) => element.dataset[k] = v);
    }

    if (options.attrs) {
        Object.entries(options.attrs).forEach(([k, v]) => element.setAttribute(k, v));
    }

    return element;
}