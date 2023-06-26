import Post, { NotFoundError } from "$lib/models/post";
import { error, type Actions, type ServerLoad } from "@sveltejs/kit";
import { zfd } from "zod-form-data";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    try {
        const slug = event.params.slug as string;
        const result = Post.get(slug);
        return {
            post: result,
        };
    } catch (err) {
        if (err instanceof NotFoundError) {
            throw error(404, err.message);
        } else {
            throw error(500, err as any);
        }
    }
};

const SavePayload = zfd.formData({
    title: zfd.text(),
    content: zfd.text(),
    key: zfd.text(),
});

export const actions: Actions = {
    async save(event) {
        const raw = await event.request.formData();
        const {key, ...data} = SavePayload.parse(raw);
        console.log(await Post.update(key, data));
        
    },
};
