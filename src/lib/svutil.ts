import { arrow, computePosition, flip } from "@floating-ui/dom";
import type { Action, ActionReturn } from "svelte/action";

export interface ClickOutsideOptions {
    // selectors that fn will not be fired if they're present in composedPath (like the button that opens the menu)
    selector?: string;
    fn: CallableFunction;
}

export function clickOutside(
    el: HTMLElement,
    options?: ClickOutsideOptions
): ActionReturn {
    function listener(ev: PointerEvent | MouseEvent) {
        const execluded: Element[] = [el];
        if (options?.selector) {
            execluded.push(...document.querySelectorAll(options.selector));
        }
        const eventPath = ev.composedPath();
        if (execluded.every((el) => !eventPath.includes(el))) {
            options?.fn?.();
        }
    }

    document.addEventListener("click", listener);

    return {
        destroy() {
            document.removeEventListener("click", listener);
        },
    };
}

export function validify(el: HTMLInputElement, message?: string) {
    el.addEventListener("invalid", (ev) => {
        ev.preventDefault();
        const validationElement = document.createElement("span");
        validationElement.textContent = message || el.validationMessage;

        insertAfter(el, validationElement);
        computePosition(el, validationElement, {
            placement: "bottom",
            strategy: "fixed",
            middleware: [flip()],
        }).then(({ x, y, middlewareData }) => {
            Object.assign(validationElement.style, {
                left: `${x}px`,
                top: `${y}px`,
                position: "fixed",
                background: "#FF9EAA",
                color: "white",
            });
        });
        el.oninput = ()=>{
            validationElement.remove()
        }
    });
}

function insertAfter(referenceNode: Element, newNode: Element) {
    referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}




export async function IsAppOwner(url: URL | string, fetcher = fetch) {
    const result = await fetcher(url, {
        redirect: "follow",
    });
    return new URL(result.url).host === new URL(url).host && result.ok;
}
