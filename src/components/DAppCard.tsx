import { useNavigate } from 'react-router-dom';
import type { DApp } from '../types';
import { formatNumber, formatCurrency } from '../utils';
import { TrendingUp, TrendingDown, Users, DollarSign, ArrowUpRight, Sparkles, Info } from 'lucide-react';
import { useMiniApp } from '../context/MiniAppContext';

interface DAppCardProps {
    dapp: DApp;
    rank?: number;
}

export default function DAppCard({ dapp, rank }: DAppCardProps) {
    const { openMiniApp } = useMiniApp();
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openMiniApp(dapp);
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/dapp/${dapp.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="block neo-box neo-box-hover group cursor-pointer relative bg-white w-full"
        >
            {/* Banner Image */}
            <div className="relative h-32 overflow-hidden border-b-3 border-neo-black bg-neo-white">
                {dapp.bannerUrl && (
                    <img
                        src={dapp.bannerUrl}
                        alt={dapp.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                )}
                {dapp.isNew && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-neo-green border-2 border-neo-black shadow-neo-sm text-xs font-bold flex items-center space-x-1 uppercase">
                        <Sparkles className="w-3 h-3" />
                        <span>NEW</span>
                    </div>
                )}
                {rank && (
                    <div className="absolute top-2 left-2 w-8 h-8 bg-neo-yellow border-2 border-neo-black shadow-neo-sm flex items-center justify-center font-bold text-neo-black">
                        #{rank}
                    </div>
                )}

                {/* Info Button (Go to Detail Page) */}
                <button
                    onClick={handleInfoClick}
                    className="absolute bottom-2 right-2 p-1.5 bg-white border-2 border-neo-black shadow-neo-sm text-neo-black hover:bg-neo-pink transition-colors z-10"
                    title="View Details"
                >
                    <Info className="w-4 h-4" />
                </button>
            </div>

            <div className="p-4">
                {/* Icon and Title */}
                <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-neo-white border-2 border-neo-black flex items-center justify-center text-2xl flex-shrink-0 shadow-neo-sm overflow-hidden">
                        {dapp.iconUrl ? (
                            <img src={dapp.iconUrl} alt={dapp.name} className="w-full h-full object-cover" />
                        ) : (
                            <span>💧</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-black text-lg truncate uppercase group-hover:text-neo-purple transition-colors">
                            {dapp.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate font-medium">{dapp.tagline}</p>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-neo-cyan border-2 border-neo-black text-neo-black text-xs font-bold uppercase shadow-neo-sm">
                        {dapp.category}
                    </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-neo-black" />
                        <div>
                            <div className="text-gray-500 text-xs font-bold uppercase">Users 24h</div>
                            <div className="font-bold text-neo-black">{formatNumber(dapp.metrics.users24h)}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="w-4 h-4 text-neo-black" />
                        <div>
                            <div className="text-gray-500 text-xs font-bold uppercase">Volume 24h</div>
                            <div className="font-bold text-neo-black">{formatCurrency(dapp.metrics.volume24h)}</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t-3 border-neo-black">
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <span className="text-neo-black">⭐</span>
                            <span className="font-bold text-neo-black">{dapp.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-neo-black">🔼</span>
                            <span className="font-bold text-neo-black">{formatNumber(dapp.upvotes)}</span>
                        </div>
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-bold ${dapp.rankChange > 0 ? 'text-green-600' : dapp.rankChange < 0 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                        {dapp.rankChange > 0 && <TrendingUp className="w-4 h-4" />}
                        {dapp.rankChange < 0 && <TrendingDown className="w-4 h-4" />}
                        {dapp.rankChange !== 0 && <span>{Math.abs(dapp.rankChange)}</span>}
                    </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-3 flex items-center justify-center bg-neo-black text-neo-white py-1 font-bold uppercase text-sm opacity-0 group-hover:opacity-100 transition-opacity border-2 border-neo-black">
                    <span>Open App</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </div>
    );
}
