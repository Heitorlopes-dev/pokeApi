export function FloatingScrollButtons() {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition flex justify-center items-center font-bold text-xl h-12 w-12"
                aria-label="Scroll to top"
            >
                &uarr;
            </button>
            <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition flex justify-center items-center font-bold text-xl h-12 w-12"
                aria-label="Scroll to bottom"
            >
                &darr;
            </button>
        </div>
    );
}
