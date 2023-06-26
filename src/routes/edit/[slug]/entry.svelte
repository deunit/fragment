<script lang="ts">
    //@ts-ignore
    import ToolBar from "typewriter-editor/lib/Toolbar.svelte";
    import { onMount } from "svelte";
    import Icon from "$lib/icon.svelte";
    import asRoot from "typewriter-editor/lib/asRoot";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import { clickOutside, validify } from "$lib/svutil";
    import newEditor from "$lib/editor";
    import Dropdown from "$lib/components/dropdown.svelte";
    import style from "$lib/style/elements.module.scss";
    import Loading from "$lib/components/loading.svelte";
    import type { PageData } from "./$types";
    import type { Editor } from "typewriter-editor";
    import type { z } from "zod";
    import type Post from "$lib/models/post";

    export let data: PageData & {
        post: z.infer<typeof Post.schema>;
    };

    let pickerOpen = false;

    const colors = [
        {
            code: "#000000",
            ident: "",
            default: true,
        },
        {
            code: "#f43f5e",
            ident: "r",
            default: false,
        },
        {
            code: "#3b82f6",
            ident: "b",
            default: false,
        },
        {
            code: "#22c55e",
            ident: "g",
            default: false,
        },
        {
            code: "#FFA41B",
            ident: "y",
            default: false,
        },
    ] as const;

    //@ts-ignore
    let editor: Editor;
    let loading = false;
    let root: HTMLDivElement;

    onMount(() => {
        editor = newEditor() as Editor;
        queueMicrotask(() => {
            editor.setHTML(data.post.content);
            editor.root.focus();
            editor.root.addEventListener("keydown", () => {
                window.scrollTo({
                    behavior: "instant",
                    left: 0,
                    top: 9999e9,
                });
            });
        });
    });
</script>

<Loading {loading} />

{#if editor}
    <article class="content">
        <a href="/posts">Posts</a>
        <!-- svelte-ignore a11y-missing-content -->
        <div class="header">
            <input
                required
                form="f"
                name="title"
                placeholder="Title"
                value={data.post.title}
                class="title"
                use:validify={"Enter a title"}
            />
            <form
                method="post"
                action="?/save"
                use:enhance={({ formData, formElement, cancel }) => {
                    if (
                        data.post.content === editor.getHTML() &&
                        data.post.title === formData.get("title")
                    ) {
                        //same data prevent next
                        cancel();
                        alert("no need");
                        return;
                    }
                    loading = true;
                    formData.set("content", editor.getHTML());
                    return (o) => {
                        loading = false;
                        if (o.result.type === "success") {
                            //@ts-ignore
                            goto(`/~/${data.post.slug}`);
                        }
                    };
                }}
                id="f"
            >
                <input type="text" name="key" value="{data.post.key}" hidden>
                <button class={style.button}>Save</button>
            </form>
        </div>
        <ToolBar {editor} let:commands let:active>
            <div class="wrapper">
                <div class="toolbar">
                    <button class="btn" on:click={commands.paragraph}>
                        <b>P</b>
                    </button>
                    <button
                        class="btn"
                        on:click={commands.header1}
                        class:active={active.header === 1}
                    >
                        <b>H1</b>
                    </button>
                    <button
                        class="btn"
                        on:click={commands.header2}
                        class:active={active.header === 2}
                    >
                        <b>H2</b>
                    </button>

                    <button
                        class="btn"
                        on:click={commands.bold}
                        class:active={active.bold}
                    >
                        <b>B</b>
                    </button>
                    <button
                        class="btn"
                        on:click={commands.italic}
                        class:active={active.italic}
                    >
                        <b><i>I</i></b>
                    </button>
                    <button
                        class="btn"
                        on:click={commands.code}
                        class:active={active.code}
                    >
                        <Icon name="code" />
                    </button>
                    <Dropdown>
                        <svelte:fragment let:enabled slot="trigger">
                            <!-- <button
                                id="pickerTrigger"
                                on:click={() => enabled.update((e) => !e)}
                                class="trigger btn"
                            >
                                <Icon name="chevron-down" />
                                <button
                                    class="colorLabel"
                                    style="--color: {colors.find(
                                        (c) => c.ident === active.color
                                    )?.code || '#000000'}"
                                />
                            </button> -->
                        </svelte:fragment>

                        <svelte:fragment let:enabled slot="content">
                            <div
                                in:fly
                                out:fly
                                id="picker"
                                class="content"
                                class:active={pickerOpen}
                                use:clickOutside={{
                                    selector: "#pickerTrigger",
                                    fn() {
                                        pickerOpen = false;
                                    },
                                }}
                            >
                                {#each colors as color}
                                    <button
                                        class="colorLabel"
                                        style="--color: {color.code}"
                                        on:click={() => {
                                            editor.commands.addColor({
                                                color: color.ident,
                                            });
                                            pickerOpen = false;
                                        }}
                                    />
                                {/each}
                            </div>
                        </svelte:fragment>
                    </Dropdown>

                    <button
                        class="btn"
                        on:click={commands.bulletList}
                        class:active={active.list === "bullet"}
                    >
                        <Icon name="list" />
                    </button>
                </div>
            </div>
        </ToolBar>
        <div
            use:asRoot={editor}
            style="
        "
            class="content"
            bind:this={root}
        />
    </article>
{/if}

<style lang="scss">
    article {
        max-width: 80ch;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            border: 1px solid #ddd;
            width: fit-content;
            padding: 0.5rem 0.75rem;
            border-radius: 8px;
            button.btn {
                padding: 0.25rem 1rem;
                background: transparent;
                border: 1px solid #ddd;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;

                &.active {
                    border-color: #212;
                }
            }
        }
    }

    .title {
        font-size: x-large;
        border: 0;
        flex: 1;
        font-weight: 300;
        &:focus {
            outline: 0;
        }
        &:empty::after {
            content: "Title";
            color: #ddd;
        }
    }

    :global(.content) {
        direction: auto;
        &:focus {
            outline: 0;
            border: 0;
        }
    }

    .wrapper {
        display: flex;
        overflow-x: auto;
        gap: 1rem;
    }

    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #00000070;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        color: white;
    }

    .colorLabel {
        position: relative;
        width: 16px;
        height: 16px;
        background: var(--color);
        border-radius: 50%;
        display: inline-block;
        border: 0;
    }

    #picker {
        display: flex;
        align-items: center;
        gap: 4px;
    }
</style>
