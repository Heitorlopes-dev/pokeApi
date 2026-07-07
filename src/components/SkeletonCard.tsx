import Skeleton from 'react-loading-skeleton';

export function SkeletonCard() {
    return (
        <div className="flex flex-col items-center bg-white border-2 border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="self-start mb-2 w-10">
                <Skeleton height={16} />
            </div>
            <div className="mt-2 mb-2 w-28 h-28">
                <Skeleton circle width="100%" height="100%" />
            </div>
            <div className="w-24 mt-2 mb-2">
                <Skeleton height={20} />
            </div>
            <div className="flex gap-2 mt-2">
                <div className="w-16"><Skeleton height={24} borderRadius={9999} /></div>
                <div className="w-16"><Skeleton height={24} borderRadius={9999} /></div>
            </div>
        </div>
    )
}
