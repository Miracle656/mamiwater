import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatNumber, formatCurrency } from '../utils';
import type { DApp } from '../types';

interface FeaturedDAppsProps {
    dapps: DApp[];
}

export default function FeaturedDApps({ dapps }: FeaturedDAppsProps) {
    // Filter featured dApps from real data
    const featured = dapps.filter(dapp => dapp.isFeatured).slice(0, 3);

    if (featured.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-neo-orange p-2 border-2 border-neo-black shadow-neo-sm">
                    <Flame className="w-6 h-6 text-neo-black" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Featured dApps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map((dapp) => (
                    <Link
                        key={dapp.id}
                        to={`/dapp/${dapp.id}`}
                        className="group relative neo-box neo-box-hover overflow-hidden block bg-white"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 h-32 bg-neo-black border-b-3 border-neo-black">
                            {dapp.bannerUrl && (
                                <img
                                    src={dapp.bannerUrl}
                                    alt={dapp.name}
                                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="relative pt-20 px-6 pb-6">
                            <div className="w-16 h-16 bg-neo-white border-3 border-neo-black shadow-neo mb-4 flex items-center justify-center text-3xl relative z-10 overflow-hidden">
                                {dapp.iconUrl ? (
                                    <img src={dapp.iconUrl} alt={dapp.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>💧</span>
                                )}
                            </div>

                            <h3 className="text-2xl font-black mb-2 uppercase group-hover:text-neo-purple transition-colors">
                                {dapp.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-600 mb-6 line-clamp-2 border-l-2 border-neo-black pl-3">
                                {dapp.tagline}
                            </p>

                            <div className="flex items-center justify-between text-sm bg-neo-white border-2 border-neo-black p-3 shadow-neo-sm">
                                <div>
                                    <div className="text-gray-500 font-bold uppercase text-xs">Users</div>
                                    <div className="font-black">{formatNumber(dapp.metrics.users24h)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500 font-bold uppercase text-xs">Volume</div>
                                    <div className="font-black">{formatCurrency(dapp.metrics.volume24h)}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
