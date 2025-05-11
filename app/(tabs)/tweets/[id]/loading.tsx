export default function Loading() {
    return (
        <div className="w-full p-6 animate-pulse">
            <div className="px-5">
                <div className="flex flex-col gap-3 *:rounded-2xl">
                    <div className="bg-neutral-700 h-5 w-40" />
                    <div className="bg-neutral-700 h-5 w-full" />
                    <div className="bg-neutral-700 h-5 w-20" />
                    <div className="bg-neutral-700 h-5 w-40" />
                    <div className="bg-neutral-700 h-5 w-full" />
                </div>
            </div>
            <div className="divider"></div>
            {[...Array(2)].map((_, index) => (
                <div key={index} className="h-28 bg-gray-200 rounded-2xl mb-5">
                    <div className="h-full px-5 py-3 flex flex-row items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-neutral-700" />
                        <div className="*:rounded-2xl flex flex-col justify-center gap-2">
                            <div className="bg-neutral-700 h-5 w-50" />
                            <div className="bg-neutral-700 h-5 w-70" />
                            <div className="bg-neutral-700 h-5 w-20" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
