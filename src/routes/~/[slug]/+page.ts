import { browser } from "$app/environment";
import { IsAppOwner } from "$lib/svutil";
import type { Load } from "@sveltejs/kit";



export const load: Load = async (event)=>{
    const u = new URL(event.url)
    u.pathname = '/'    
    return{
        isOwner: await IsAppOwner(u) && browser,
        ...event.data
    }
}