export default function Loading() {
    return (
        <div className="w-d min-h-screen flex justify-center bg-neutral-100">
            <div className="animate-pulse flex flex-col gap-5">
                {[...Array(15)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full h-28 bg-gray-200 rounded-2xl"
                    >
                        <div className="px-5 py-3 flex flex-col justify-center gap-1 *:rounded-2xl">
                            <div className="bg-neutral-700 h-5 w-50" />
                            <div className="bg-neutral-700 h-5 w-70" />
                            <div className="bg-neutral-700 h-5 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
