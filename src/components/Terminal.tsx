import React, { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { links } from '../constants/websites';



export default function Terminal() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [gKeyPressed, setGKeyPressed] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        terminalRef.current?.focus();
    }, []);

    const navigateToLink = (index: number) => {
        window.open(links[index].url, '_blank');
    };

    const handleKeyDown = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
        if (searchMode) {
            if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'Return') {
                e.preventDefault();
                window.open(`https://google.com/search?q=${searchQuery}`, '_blank');
                setSearchMode(false);
                setSearchQuery('');
            }
            if (e.key === 'Escape') {
                setSearchMode(false);
                setSearchQuery('');
            }
            return;
        }

        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, links.length - 1));
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
                break;
            case 'Enter':
            case 'Return':
                e.preventDefault();
                navigateToLink(selectedIndex);
                break;
            case '/':
                e.preventDefault();
                setSearchMode(true);
                break;
            case 'g':
                e.preventDefault();
                if (gKeyPressed) {
                    setSelectedIndex(0);
                    setGKeyPressed(false);
                } else {
                    setGKeyPressed(true);
                }
                break;
            case 'G':
                e.preventDefault();
                setSelectedIndex(links.length - 1);
                break;
        }
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;
            
            if (e.key === 'j' || 
                e.key === 'k' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowDown' || 
                e.key === '/' || 
                e.key === 'Enter' || 
                e.code === 'Enter' || 
                e.code === 'Return' ||
                e.key === 'g' ||
                e.key === 'G'
            ) {
                e.preventDefault();
                handleKeyDown(e);
            }
        };

        const gKeyTimeout = setTimeout(() => {
            setGKeyPressed(false);
        }, 500);

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
            clearTimeout(gKeyTimeout);
        };
    }, [selectedIndex, searchMode, gKeyPressed]);

    useEffect(() => {
        if (searchMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchMode]);

    return (
        <div 
            ref={terminalRef}
            className="text-teal-300/90 font-mono p-6"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{ outline: 'none' }}
        >
            <div>
                <div className="mb-6 flex items-center">
                    <span className="text-blue-300/90">user</span>
                    <span className="text-teal-300/80">@</span>
                    <span className="text-blue-300/90">arch</span>
                    <span className="text-teal-300/80">:</span>
                    <span className="text-indigo-300/90">~</span>
                    <span className="text-teal-300/80">$</span>
                    <span className="ml-2 w-2 h-5 bg-teal-300/80 animate-caret"></span>
                </div>

                <div className="mb-6 space-y-2">
                    {links.map((link, index) => (
                        <div 
                            key={link.name}
                            onClick={() => navigateToLink(index)}
                            className={`py-2 px-3 rounded transition-colors duration-150 cursor-pointer ${
                                selectedIndex === index 
                                    ? 'bg-blue-900/40 text-teal-200 border border-blue-800/50' 
                                    : 'hover:bg-blue-900/20 text-blue-300/80'
                            }`}
                        >
                            <span className="text-teal-300/70">{index + 1}. </span>
                            <span className="font-medium">{link.name}</span>
                            <span className="text-indigo-300/60"> - {link.description}</span>
                        </div>
                    ))}
                </div>

                {searchMode && (
                    <div className="flex items-center mb-6">
                        <span className="mr-2 text-teal-300/80">/</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 text-blue-200 placeholder-blue-400/40"
                            placeholder="Search Google..."
                        />
                    </div>
                )}

                <div className="mt-16 text-indigo-300/50 text-sm space-y-1">
                    <div>Navigation: <span className="text-teal-300/70">j/k</span> or <span className="text-teal-300/70">↑/↓</span></div>
                    <div>Open link: <span className="text-teal-300/70">Enter</span></div>
                    <div>Google Search: <span className="text-teal-300/70">/</span></div>
                    <div>Top: <span className="text-teal-300/70">gg</span></div>
                    <div>Bottom: <span className="text-teal-300/70">G</span></div>
                    <div>Exit search: <span className="text-teal-300/70">Esc</span></div>
                </div>
            </div>
        </div>
    );
} 
