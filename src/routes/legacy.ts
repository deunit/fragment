let buffer = [];
let root: HTMLElement;
let selecting = false;
let selectingPos = {
    t: 0,
    l: 0
}
let onBold = ()=>{}
let onItalic = ()=>{}

onMount(() => {
    root.addEventListener("input", (ev) => {
        const selection = window.getSelection();
        if (selection?.anchorNode) {
            if (selection.anchorNode instanceof Text) {
                if (selection.anchorNode.textContent?.startsWith("# ")) {
                    const h1 = document.createElement("h1");
                    const content =
                        selection.anchorNode.textContent.slice(2);
                    h1.contentEditable = "true";
                    h1.textContent = content;
                    selection.anchorNode.replaceWith(h1);
                    selection.setPosition(h1, content.length);
                    h1.focus();
                } else if (
                    selection.anchorNode.textContent?.startsWith("## ")
                ) {
                    const h2 = document.createElement("h2");
                    const content =
                        selection.anchorNode.textContent.slice(3);
                    h2.contentEditable = "true";
                    h2.textContent = content;
                    selection.anchorNode.replaceWith(h2);
                    selection.setPosition(h2, content.length);
                    h2.focus();
                }
            }
        }
    });

    window.addEventListener("selectstart", (ev) => {
        const target = ev.target as HTMLElement | Text
        
        const parent = target.parentElement
        console.log(parent);
        if(!parent)return
        const rect = parent.getBoundingClientRect()
        selecting = true
        selectingPos = {
            t: rect.top + rect.height,
            l: rect.left + rect.width
        }
        onBold = ()=>{
            const el = document.createElement('b');
            el.textContent = target.textContent
            target.replaceWith(el)
        }
        
        
        
    });

    window.addEventListener("selectionchange", (ev) => {
        console.log('sc', ev);
    });
})