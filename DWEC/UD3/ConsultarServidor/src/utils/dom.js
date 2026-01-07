const $ = function (selector = null) {
    return new class {
        constructor(selector) {
            if (selector) {
                // DOM element
                if (selector.nodeType) {
                    this.nodes = [selector];
                }
                // NodeList
                else if (NodeList.prototype.isPrototypeOf(selector)) {
                    this.nodes = selector;
                }
                // CSS selector
                else {
                    this.nodes = document.querySelectorAll(selector);
                }

                this.n = this.nodes[0];
            }
        }

        // Devuelve todos los nodos con el selector indicado
        each(callback) {
            this.nodes.forEach(node => callback(node));
            return this;
        }

        addClass(classNames) {
            const classes = classNames
                .split(",")
                .map(c => c.trim());

            return this.each(node => {
                node.classList.add(...classes);
            });
        }

        /**
         * Obtener o establecer data-attributes
         * @param {string} name - nombre del data (sin "data-")
         * @param {*} value - opcional, si se pasa se asigna
         */
        data(name, value) {
            if (!this.n) return undefined;

            // Getter
            if (value === undefined) {
                return this.n.dataset[name];
            }

            // Setter (para todos los nodos)
            return this.each(node => {
                node.dataset[name] = value;
            });
        }

        /**
         * Obtener todos los data-* del primer nodo
         */
        dataAll() {
            if (!this.n) return {};
            return { ...this.n.dataset };
        }

    }(selector);
};

export default $;
