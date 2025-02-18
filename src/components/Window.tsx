import React from 'react';

interface WindowProps {
    children: React.ReactNode;
    title: string;
}

export default function Window({ children, title }: WindowProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-8 z-50">
            <div className="bg-[#1b1e28]/95 rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border border-blue-900/30 backdrop-blur-sm">
                <div className="bg-[#171922]/95 px-6 py-8 flex items-center border-b border-blue-900/20 relative">
                    <div className="flex gap-2 z-10">
                        <div className="w-3 h-3 rounded-full bg-rose-400/80 hover:bg-rose-500/80 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-500/80 transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400/80 hover:bg-emerald-500/80 transition-colors"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-300/70 text-sm font-medium">
                            {title}
                        </span>
                    </div>
                </div>
                
                <div className="p-6 bg-[#171922]/95">
                    {children}
                </div>
            </div>
        </div>
    );
} 
