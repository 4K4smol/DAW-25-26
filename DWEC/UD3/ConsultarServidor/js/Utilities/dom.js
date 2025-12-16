const $ = function (selector = null) {
    return new class {
        constructor(selector) {
            if (selector) {
                // Check if selector is a single DOM element (nodeType present)
                if (selector.nodeType) {
                    this.nodes = [selector];  // Convert the element into an array
                }
                // Check if selector is a NodeList
                else if (NodeList.prototype.isPrototypeOf(selector)) {
                    this.nodes = selector;  // Use the NodeList as-is
                }
                // Otherwise assume it's a CSS selector string
                else {
                    this.nodes = document.querySelectorAll(selector);
                }
                // Store the first element in the variable 'n'
                this.n = this.nodes[0];
            }
        }

        each(callback) {
            this.nodes.forEach(node => callback(node));
            return this;  // Return 'this' for method chaining
        }

        addClass(classNames) {
            return this.each(node => {
                const classes = classNames.split(",").map(className => className.trim());  // Split and trim classes
                node.classList.add(...classes);  // Add the classes to the element
            });
        }
    }(selector);
}

export default $;