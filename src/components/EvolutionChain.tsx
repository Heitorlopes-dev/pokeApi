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
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                Evolution Chain
            </h3>

            <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4">
                {evolutions.map((evo, index) => (
                    <React.Fragment key={evo.id}>
                        {/* Pokemon Node */}
                        <Link
                            to={`/pokemon/${evo.name.toLowerCase()}`}
                            className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
                                <img
                                    src={evo.image}
                                    alt={evo.name}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <span className="font-semibold text-slate-700">{evo.name}</span>
                        </Link>

                        {/* Arrow (except for the last item) */}
                        {index < evolutions.length - 1 && (
                            <div className="flex text-slate-300 mx-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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
