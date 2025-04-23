import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function SuccessMessage() {
    return (
        <div className="flex items-center mt-2.5 p-3.5 text-black rounded-2xl bg-green-500">
            <CheckBadgeIcon className="size-7 stroke-2 mr-4" />
            Welcome Back!
        </div>
    );
}
