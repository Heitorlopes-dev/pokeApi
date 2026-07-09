import React from 'react';
import type { EvolutionNode } from '../services/pokemon';
import { Link } from 'react-router-dom';

interface EvolutionChainProps {
    evolutions: EvolutionNode[];
}

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutions }) => {
    if (!evolutions || evolutions.length <= 1) {
        return null;
    }

    return (
        <div className="mt-12 bg-white p-8 rounded-xl shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] border-4 border-slate-900 w-full max-w-5xl">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center uppercase tracking-widest font-retro border-b-4 border-slate-900 pb-4">
                Evolution Chain
            </h3>

            <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4">
                {evolutions.map((evo, index) => (
                    <React.Fragment key={evo.id}>
                        {/* Pokemon Node */}
                        <Link
                            to={`/pokemon/${evo.name.toLowerCase()}`}
                            className="flex flex-col items-center hover:translate-y-[-4px] transition-transform duration-200"
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-200 border-4 border-slate-900 rounded-full flex items-center justify-center mb-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/40"></div>
                                <img
                                    src={evo.image}
                                    alt={evo.name}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md z-10"
                                    loading="lazy"
                                />
                            </div>
                            <span className="font-bold text-slate-900 uppercase tracking-widest font-retro text-lg">{evo.name}</span>
                        </Link>

                        {/* Arrow (except for the last item) */}
                        {index < evolutions.length - 1 && (
                            <div className="flex text-slate-900 mx-2 md:mx-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
