export default function Loading() {
    return (
        <div className="w-full pt-8 pb-5 px-5">
            <div className="animate-pulse">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="h-28 bg-gray-200 rounded-2xl mb-5"
                    >
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
        </div>
    );
}
