"use server";
import db from "@/lib/db";
import { checkSearch } from "@/service/searchService";
import { string, z } from "zod";

const formSchema = z.object({
	term : z.string().trim().refine(checkSearch,{message: "Sorry, no results matched your search.", path:["search"]}),
});

export async function searchForm(_:any, formData:FormData){
	const data = {
		term : formData.get("search"),
	};
	const result = await formSchema.spa(data);
	

	if(!result.success){
		return{
			errors: result.error.flatten(),
			success: result.success,
			data: result.data,
		};
	}else{
		return{
			success: result.success,
			data: result.data,
		}
	}
}