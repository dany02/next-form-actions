export default function Loading() {
    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <div className="animate-pulse max-w-2xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow-sm">
                    <div className="flex justify-between items-center mb-4">
						<div className="w-40 h-10 bg-neutral-700 rounded-2xl"/>
                    </div>

                    <div className="space-y-3 *:rounded-2xl">
						<div className="bg-neutral-700 h-15 w-full"/>
						<div className="bg-neutral-700 h-5 w-50"/>
						<div className="bg-neutral-700 h-5 w-50"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
