import slugify from "slugify";
import { z } from "zod";
import { deta } from "../db";
import { nanoid } from "nanoid";



export class NotFoundError extends Error{}

export default class Post {
    static schema = z.object({
        key: z.string(),
        title: z.string().min(1),
        content: z.string().min(1),
        slug: z.string(),
        posted: z.string().default(()=>new Date().toISOString()),
        public: z.boolean().default(true)
    });

    private static createInput = this.schema.omit({
        key: true,
        slug: true,
    });

    static async create(input: Omit<z.infer<typeof Post.createInput>, 'posted' | 'public'>) {
        const object: z.infer<typeof Post.createInput> & { slug: string } = {
            ...Post.createInput.parse(input),
            slug: `${slugify(input.title)}-${nanoid(3)}`,
        };
        const result = await deta.Base("posts").put(object);
        console.log(result);
        
        if (result) {
            return result.slug;
        } else {
            throw new TypeError("Expected object, got null");
        }
    }

    static async get(slug: string){
        const result = await deta.Base("posts").fetch({
            slug
        })
        if(result.items.length < 1){
            throw new NotFoundError("Not found")
        }else{
            return Post.schema.parse(result.items.at(0))
        }
    }

    static async update(key: string, data: Partial<z.infer<typeof Post.schema>>){
        const result = await deta.Base("posts").update(data, key)
        return result
    }


}
