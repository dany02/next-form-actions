"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { searchForm } from "./action";
import SearchList from "@/components/search-list";

export default function Search() {
    const [state, dispatch] = useActionState(searchForm, null);

    return (
        <div className="pt-8">
            <form action={dispatch}>
                <div className="grid grid-cols-[3fr_1fr] gap-3.5">
                    <Input
                        iconHtml={<MagnifyingGlassIcon />}
                        name="search"
                        type="text"
                        placeholder="Search Tweets"
                    />
                    <Button text="Search" />
                </div>
            </form>
			<div className="divider"></div>
            <div>
                {!state?.success ? (
                    <p className="text-red-500 text-sm font-medium mt-5">
                        {state?.errors.fieldErrors.term}
                    </p>
                ) : (
                    <SearchList term={state.data.term}/>
                )}
            </div>
        </div>
    );
}
