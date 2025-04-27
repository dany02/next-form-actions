import { FireIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function Home() {

    return (
		<div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <FireIcon className="size-16 text-red-400 mx-auto mb-8" />
                <h2 className="text-center mb-10">Welcome to Dana's world!</h2>
				<Link href="/log-in" className="basic-btn block text-center mb-3 leading-12">로그인</Link>
				<Link href="/create-account" className="basic-btn block text-center leading-12">회원가입</Link>
            </div>
        </div>
    );
}
