import { IsAppOwner, deta } from "$lib/db";
import Post from "$lib/models/post";
import type { Actions, ServerLoad } from "@sveltejs/kit";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const load: ServerLoad = async (event) => {
   
    return {
        posts: (await deta.Base("posts").fetch()).items
            .map((i) => Post.schema.parse(i))
            .map((item) => ({
                title: item.title,
                slug: item.slug,
                posted: item.posted,
                public: item.public,
                key: item.key,
            })),
    };
};

const SetPublicPayload = zfd.formData({
    public: zfd.json(
        z.union([
            z.string().transform((s) => (s === "true" ? true : false)),
            z.boolean(),
        ])
    ),

    key: zfd.text(),
});

export const actions: Actions = {
    async setPublic(event) {
        try {
            const raw = await event.request.formData();
            const data = SetPublicPayload.parse(raw);
            const result = await deta.Base("posts").update(
                {
                    public: data.public,
                },
                data.key
            );
            return {
                success: true
            }
        } catch (error) {
            console.log('RRR', error);

            return {
                success: false,
                error: `${error}`
            }
        }
    },
};
