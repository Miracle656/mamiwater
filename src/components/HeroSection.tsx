import logo from '../assets/Group 27.png';
import { ConnectButton } from '@mysten/dapp-kit';
import coralLogo from '../assets/dapplogo/coral.jpg';
import penguinLogo from '../assets/dapplogo/penguin.jpg';
import warlotLogo from '../assets/dapplogo/warlot.jpg';
import group6Logo from '../assets/dapplogo/Group 6.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
    const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // GSAP floating animations for all decorative elements
        floatingRefs.current.forEach((el, index) => {
            if (el) {
                gsap.to(el, {
                    y: -20,
                    duration: 2 + index * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.2
                });
            }
        });
    }, []);

    const scrollToTrending = () => {
        const trendingSection = document.getElementById('trending-dapps');
        if (trendingSection) {
            trendingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative bg-neo-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-3 border-neo-black">
            {/* Decorative Elements */}
            <div
                ref={el => { floatingRefs.current[0] = el; }}
                className="absolute top-10 left-10 w-16 h-16 bg-neo-pink border-3 border-neo-black shadow-neo hidden lg:block"
            ></div>
            <div
                ref={el => { floatingRefs.current[1] = el; }}
                className="absolute bottom-20 right-20 w-24 h-24 bg-neo-green border-3 border-neo-black shadow-neo-lg rounded-full hidden lg:block"
            ></div>
            <div
                ref={el => { floatingRefs.current[2] = el; }}
                className="absolute top-1/3 right-10 w-12 h-12 bg-neo-yellow border-3 border-neo-black shadow-neo-sm rotate-45 hidden lg:block"
            ></div>

            {/* Floating dApp Logos */}
            <div
                ref={el => { floatingRefs.current[3] = el; }}
                className="absolute top-20 right-32 w-16 h-16 border-3 border-neo-black shadow-neo hidden lg:block overflow-hidden"
            >
                <img src={coralLogo} alt="Coral" className="w-full h-full object-cover" />
            </div>
            <div
                ref={el => { floatingRefs.current[4] = el; }}
                className="absolute bottom-32 left-24 w-16 h-16 border-3 border-neo-black shadow-neo-lg hidden lg:block overflow-hidden rounded-full"
            >
                <img src={penguinLogo} alt="Penguin" className="w-full h-full object-cover" />
            </div>
            <div
                ref={el => { floatingRefs.current[5] = el; }}
                className="absolute top-40 left-32 w-14 h-14 border-3 border-neo-black shadow-neo-sm hidden lg:block overflow-hidden"
            >
                <img src={warlotLogo} alt="Warlot" className="w-full h-full object-cover" />
            </div>
            <div
                ref={el => { floatingRefs.current[6] = el; }}
                className="absolute bottom-40 right-40 w-14 h-14 border-3 border-neo-black shadow-neo hidden lg:block overflow-hidden"
            >
                <img src={group6Logo} alt="Group 6" className="w-full h-full object-cover" />
            </div>

            <div className="relative max-w-5xl mx-auto text-center z-10">
                <div className="inline-block mb-6 px-4 py-2 bg-neo-cyan border-3 border-neo-black shadow-neo-sm font-bold uppercase tracking-widest transform -rotate-2">
                    The Future is Raw
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-neo-black mb-8 tracking-tighter uppercase leading-none relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 opacity-10 pointer-events-none">
                        <img src={logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    Explore <span className="bg-neo-pink px-2 text-white inline-block transform rotate-1 border-3 border-neo-black shadow-neo">dapps</span> &
                    <br />
                    <span className="text-stroke-3 text-transparent bg-clip-text bg-neo-black" style={{ WebkitTextStroke: '3px black', color: 'transparent' }}>Sui Trends</span>
                </h1>

                <p className="text-xl md:text-2xl text-neo-black font-medium mb-12 max-w-3xl mx-auto leading-relaxed border-l-4 border-neo-purple pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                    Discover decentralized apps across the Sui ecosystem.
                    <span className="bg-neo-yellow px-1 mx-1 border-2 border-neo-black">Real-time data.</span>
                    <span className="bg-neo-green px-1 mx-1 border-2 border-neo-black">No fluff.</span>
                    Just raw utility.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="neo-button-wrapper">
                        <ConnectButton className="!bg-neo-yellow !text-neo-black !font-black !border-3 !border-neo-black !shadow-neo !px-10 !py-4 !text-xl !uppercase hover:!translate-x-[-2px] hover:!translate-y-[-2px] hover:!shadow-neo-lg !transition-all !rounded-none" />
                    </div>
                    <button
                        onClick={scrollToTrending}
                        className="px-10 py-4 bg-white border-3 border-neo-black shadow-neo text-neo-black font-bold text-xl uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all"
                    >
                        Explore Now
                    </button>
                </div>

                {/* Marquee Effect */}
                <div className="mt-20 border-y-3 border-neo-black bg-neo-black text-neo-white overflow-hidden py-3">
                    <div className="animate-marquee whitespace-nowrap font-mono font-bold text-lg uppercase tracking-widest">
                        Top Gainers • New Launches • High APY • Trending NFTs • Sui Ecosystem • Top Gainers • New Launches • High APY • Trending NFTs • Sui Ecosystem
                    </div>
                </div>
            </div>
        </div>
    );
}
