import { env } from "$env/dynamic/private";
import { Deta } from "deta";
import { get } from "svelte/store";



export const deta = Deta(env.DETA_PROJECT_KEY || env.DETA_KEY || "_");
