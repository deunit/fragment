import { error, type ServerLoad } from "@sveltejs/kit";
import Post, { NotFoundError } from "$lib/models/post";
import type { EntryGenerator } from "./$types";
import { deta } from "$lib/db";
import { env } from "$env/dynamic/private";

export const load: ServerLoad = async (event) => {
    try {
        const slug = event.params.slug as string;
        const post = await Post.get(slug);
        return { post };
    } catch (e) {
        if (e instanceof NotFoundError) {
            throw error(404);
        } else {
            //@ts-ignore
            throw error(500, e.message);
        }
    }
};

// export const prerender = true;
// export const entries = (async () => {
//     const posts = await deta.Base("posts").fetch([]);
//     return posts.items.map((p) => ({
//         slug: p.slug as string,
//     }));
// }) satisfies EntryGenerator;

// export const config = {
//     isr: {
//         expiration: 10,

//         // Random token that can be provided in the URL to bypass the cached version of the asset, by requesting the asset
//         // with a __prerender_bypass=<token> cookie.
//         //
//         // Making a `GET` or `HEAD` request with `x-prerender-revalidate: <token>` will force the asset to be re-validated.
//         bypassToken: env.BYPASSTOKEN,
//     },
// };