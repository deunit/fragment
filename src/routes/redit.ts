type EditorNode = HTMLElement | Text;

function getElementProps(el: HTMLElement | Text, root: HTMLElement) {
    const parent = el.parentElement;
    if (!parent) {
        console.log(null);
        return null;
    }
    if (parent.isSameNode(root)) {
        console.log("same");

        return {
            b: false,
            i: false,
            h1: false,
            a: false,
        };
    } else {
        console.log(parent);
    }
}

export class REdit {
    get #events() {
        return [
            ["input", this.root, this.#onInput],
            ["selectstart", window, this.#onSelection],
        ] satisfies [
            string,
            HTMLElement | Window,
            EventListenerOrEventListenerObject
        ][];
    }

    constructor(public root: HTMLElement) {
        if (root.contentEditable !== "true") root.contentEditable = "true";

        for (const [name, target, fn] of this.#events) {
            target.addEventListener(name, fn);
        }
    }

    #onSelection(event: Event) {
        getElementProps(event.target as EditorNode, this.root);
    }

    #onInput(event: Event) {
        const selection = window.getSelection()
        if(!selection)return;
        const result = parse(selection.anchorNode?.textContent)
        if(result){
            selection.anchorNode.replaceWith(result)
        }
    }

    destroy() {
        for (const [name, target, fn] of this.#events) {
            target.removeEventListener(name, fn);
        }
    }
}

const expressions = [
    (test: string) => {
        const result = /^(#{1,5}) ([^#]*)/.exec(test);
        if (result) {
            let element: HTMLHeadingElement;
            switch (result[1].length) {
                case 1:
                    element = document.createElement("h1");
                    break;
                case 2:
                    element = document.createElement("h2");
                    break;
                case 3:
                    element = document.createElement("h3");
                    break;
                case 4:
                    element = document.createElement("h4");
                    break;
                case 5:
                    element = document.createElement("h5");
                    break;
                default:
                    element = document.createElement("h1");
                    break;
            }
            element.contentEditable = 'true'
            element.textContent = test.slice(result[1].length+1)
            return element
        }
        return null
    },
];

function parse(text: string) {
    for (const expression of expressions) {
        const result = expression(text)
        if(result instanceof HTMLElement)return result
    }
    return new Text(text)
}
