<script lang="ts">
    import { enhance } from "$app/forms";
    import Loading from "$lib/components/loading.svelte";
    import Icon from "$lib/icon.svelte";
    import type { PageData } from "./$types";
    import style from '$lib/style/elements.module.scss'

    let loading = false;
    export let data: PageData;
</script>

<Loading {loading} />

<div class="{style.header}">
    <a href="/">Editor</a>
</div>
<div class="{style.alert}  {style.warning}">
    <div class="{style.title}">
        <Icon name="alert-triangle" />
        Waring
    </div>
    <div class="{style.content}">
        Visibilty has no effect for now, changing it won't prevent anyone you give the link of post from seeing it.
    </div>
</div>
<div class="posts">
    {#each data.posts as post}
        <div class="post">
            <div class="left">
                <a href="/~/{post.slug}">
                    {post.title}
                </a>
                <span class="date">
                    {new Date(post.posted).toDateString()}
                </span>
            </div>

            <form
                action="?/setPublic"
                method="post"
                use:enhance={({}) => {
                    loading = true;

                    return async ({ update }) => {
                        await update({
                            reset: false,
                        });
                        loading = false;
                    };
                }}
            >
                <input type="text" name="key" value={post.key} hidden />
                <input
                    type="text"
                    hidden
                    name="public"
                    checked={!post.public}
                    value={!post.public}
                />
                <button class="publicTrigger">
                    {#if post.public}
                        <Icon name="eye" />
                    {:else}
                        <Icon name="eye-off" />
                    {/if}
                </button>
            </form>
        </div>
    {/each}
</div>

<style lang="scss">
    .posts {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        margin: 0 auto;
        max-width: 80ch;
    }

    .post {
        padding: 0.75rem 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #555;
        border-radius: 6px;

        a {
            color: inherit;
            color: #212121;
        }

        .publicTrigger {
            background: transparent;
            border: 1px solid;
            padding: 4px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
        }

        .left {
            display: flex;
            align-items: center;
            gap: 1rem;

            .date {
                font-size: small;
                font-weight: 300;
                color: #666;
            }
        }
    }
</style>
