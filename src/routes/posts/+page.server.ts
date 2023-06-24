import { deta } from "$lib/db";
import Post from "$lib/models/post";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
    return {
        posts: (await deta.Base("posts").fetch()).items
            .map((i) => Post.schema.parse(i))
            .map((item) => ({
                title: item.title,
                slug: item.slug,
                posted: item.posted,
                public: item.public
            })),
    };
};
