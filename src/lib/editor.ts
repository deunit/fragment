import { Editor, h } from "typewriter-editor";
import { header, list } from "typewriter-editor/lib/typesetting/lines";
import {
    bold,
    code,
    italic,
    link,
} from "typewriter-editor/lib/typesetting/formats";

export default function newEditor() {
    const editor = new Editor({
        // includeDefaultModules: false
        types: {
            formats: [
                bold,
                code,
                italic,
                link,
                {
                    name: "color",
                    shortcuts: {
                        "Mod+F": "addColor",
                    },

                    selector: "span[c]",
                    commands: (e) => ({
                        addColor: (attrs: any) => {
                            if (attrs && attrs.color !== "")
                                return e.toggleTextFormat(attrs);
                            else {
                                e.toggleTextFormat({ color: null });
                                e.toggleTextFormat({ color: null });
                            }
                        },
                    }),
                    fromDom(node) {
                        return node
                    },
                    render: (attrs, children) => {
                        return h(
                            "span",
                            {
                                c: attrs.color,
                            },
                            children
                        );
                    },
                },
            ],
            lines: [
                {
                    name: "paragraph",
                    selector: "p",
                    commands: (editor) => () =>
                        editor.formatLine({
                            paragraph: true,
                        }),
                    shortcuts: "Mod+0",

                    render: (attributes, children) => {
                        return h(
                            "p",
                            {
                                dir: "auto",
                            },
                            children
                        );
                    },
                },
                {
                    ...header,
                    render: (attributes, children) =>
                        h(
                            `h${attributes.header}`,
                            {
                                dir: "auto",
                            },
                            children
                        ),
                },
                list,
            ],
        },
    });
    return editor
}
