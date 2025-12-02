import { useOutletContext } from 'react-router-dom';
import type { Category } from '../types';

import FeaturedDApps from '../components/FeaturedDApps';
import DailyLaunches from '../components/DailyLaunches';
import DAppCard from '../components/DAppCard';
import TrendingDashboard from '../components/TrendingDashboard';
import HeroSection from '../components/HeroSection';
import DisplayName from '../components/DisplayName';
import { TrendingUp, Loader2, Copy, Check } from 'lucide-react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useDApps } from '../hooks/useDApps';
import { useState } from 'react';

interface OutletContextType {
    selectedCategory: Category | 'all';
}

export default function HomePage() {
    const { selectedCategory } = useOutletContext<OutletContextType>();
    const account = useCurrentAccount();
    const { data: dapps, isLoading, error } = useDApps();
    const [copied, setCopied] = useState(false);

    const displayDApps = dapps || [];

    const filteredDApps = selectedCategory === 'all'
        ? displayDApps
        : displayDApps.filter(dapp => dapp.category === selectedCategory);

    const trendingDApps = filteredDApps
        .sort((a, b) => b.metrics.users24h - a.metrics.users24h)
        .slice(0, 9);

    const copyAddress = () => {
        if (account?.address) {
            navigator.clipboard.writeText(account.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section - Only show when not connected */}
            {!account && (
                <div className="mb-12">
                    <HeroSection />
                </div>
            )}

            {/* Welcome Section - Show when connected */}
            {account && (
                <div className="mb-12 py-6">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-neo-black">
                            Welcome, <DisplayName name={account.address} className="inline" />
                        </h1>
                        <button
                            onClick={copyAddress}
                            className="p-2 border-2 border-neo-black bg-white hover:bg-neo-yellow transition-colors shadow-neo-sm hover:shadow-neo active:shadow-none"
                            title="Copy address"
                        >
                            {copied ? (
                                <Check className="w-5 h-5 text-green-600" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <p className="text-lg font-medium text-gray-600">
                        Resume your journey
                    </p>
                </div>
            )}

            {/* Trending Dashboard Cards */}
            <TrendingDashboard dapps={displayDApps} />

            {/* Featured Section */}
            <div className="mb-12">
                <FeaturedDApps dapps={displayDApps} />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Trending dApps Section */}
                    <div id="trending-dapps" className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-neo-pink border-3 border-neo-black shadow-neo flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-neo-black" />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-neo-black">Trending dApps</h2>
                            </div>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-12 h-12 animate-spin text-neo-black" />
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 mb-6 font-bold">
                                Error loading dApps: {error.message}
                            </div>
                        )}

                        {/* DApps Grid - Adjusted for better card width */}
                        {!isLoading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {trendingDApps.map((dapp, index) => (
                                    <DAppCard key={dapp.id} dapp={dapp} rank={index + 1} />
                                ))}
                            </div>
                        )}

                        {!isLoading && !error && filteredDApps.length === 0 && (
                            <div className="text-center py-12 bg-neo-white border-3 border-neo-black rounded-none shadow-neo">
                                <p className="text-gray-500 font-bold uppercase">No dApps found in this category</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar (Daily Launches) */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <DailyLaunches dapps={displayDApps} />
                </div>
            </div>
        </div>
    );
}
