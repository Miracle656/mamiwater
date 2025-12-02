import { Link } from 'react-router-dom';
import { Search, Rocket, Menu } from 'lucide-react';
import { useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import logo from '../assets/Group 27.png';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="sticky top-0 z-50 bg-neo-white border-b-3 border-neo-black h-20">
            <div className="h-full px-4 flex items-center justify-between">
                {/* Left Section: Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-neo-yellow border-2 border-transparent hover:border-neo-black transition-all"
                    >
                        <Menu className="w-6 h-6 text-neo-black" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 min-w-[200px] group">
                        <div className="w-10 h-10 border-3 border-neo-black shadow-neo-sm flex items-center justify-center group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all overflow-hidden bg-white">
                            <img src={logo} alt="Atlantis Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xl font-black text-neo-black uppercase tracking-tighter font-dungeon">
                            ATLANTIS
                        </span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neo-black pointer-events-none" />
                        <input
                            type="text"
                            placeholder="SEARCH DAPPS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-10 pr-4 bg-neo-white border-2 border-neo-black text-neo-black focus:outline-none focus:shadow-neo transition-all font-bold uppercase placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <button className="md:hidden p-2 hover:bg-neo-cyan border-2 border-transparent hover:border-neo-black transition-all">
                        <Search className="w-6 h-6 text-neo-black" />
                    </button>

                    <Link
                        to="/submit"
                        className="hidden md:flex items-center space-x-2 px-4 py-2 bg-neo-white border-3 border-neo-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all text-sm font-bold text-neo-black uppercase"
                    >
                        <Rocket className="w-4 h-4" />
                        <span>List Project</span>
                    </Link>

                    <div className="h-8 w-1 bg-neo-black hidden md:block" />

                    <div className="flex items-center">
                        <div className="neo-button-wrapper">
                            <ConnectButton connectText="GET STARTED" className="!bg-neo-pink !text-neo-black !font-black !border-2 !border-neo-black !shadow-[4px_4px_0px_0px_#000000] hover:!translate-y-[-2px] hover:!shadow-[6px_6px_0px_0px_#000000] !transition-all !rounded-none !uppercase !px-4 !py-2 !h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
