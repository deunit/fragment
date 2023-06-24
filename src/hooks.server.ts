import { env } from "$env/dynamic/private";
import { deta } from "$lib/db";
import type { Handle } from "@sveltejs/kit";
import { verify } from "jsonwebtoken";
import { nanoid } from "nanoid";

export const handle: Handle = async ({ event, resolve }) => {

    return resolve(event);
};
