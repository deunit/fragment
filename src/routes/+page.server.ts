import type { Actions } from "@sveltejs/kit";
import { z } from "zod";
import { zfd } from "zod-form-data";
import Post from "../lib/models/post";
import { env } from "$env/dynamic/private";

const createParams = zfd.formData({
    content: zfd.text(),
    title: zfd.text(),
});

export const actions: Actions = {
    async create(event) {
        try {            
            const raw = await event.request.formData();
            const result = createParams.parse(raw);
            const slug = await Post.create({
                ...result,
            });

            return {
                ok: true,
                slug: slug,
            };
        } catch (e) {
            return {
                ok: false,
                error: `${e}`,
            };
        }
    },
};
