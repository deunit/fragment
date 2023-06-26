import { z } from "zod";
import type { LayoutServerLoad } from "./$types";

const Settings = z.object({
    editMode: z
        .union([z.literal("inline"), z.literal("toolbar")])
        .default("toolbar"),
    font: z.union([z.literal("mono"), z.literal("sans")]).default("sans"),

});

export const load: LayoutServerLoad = async (event) => {
    let preftoken = event.cookies.get("preftoken");
    let prefs: any;
    if (!preftoken) {
        event.cookies.set(
            "preftoken",
            JSON.stringify({
                editMode: "inline",
            })
        );
    } else {
        prefs = JSON.parse(preftoken);
    }

    return {
        prefs,
    };
};
