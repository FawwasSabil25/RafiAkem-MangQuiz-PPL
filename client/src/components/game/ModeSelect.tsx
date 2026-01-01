import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, ArrowRight, Gamepad2, ArrowLeft, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioControl } from "@/components/ui/audio-control";

export function ModeSelect() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-navy-950 relative overflow-hidden">
            {/* Dither Noise Overlay */}
            <div className="fixed inset-0 dither-noise z-10 pointer-events-none mix-blend-overlay opacity-20" />
            
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-navy-800/10 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-40 border-b border-white/5 bg-navy-950/90 backdrop-blur-xl">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-400 rounded-lg flex items-center justify-center font-bold text-navy-950 text-xl shadow-lg">
                                M
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">MangQuiz</span>
                        </div>
                        
                        {/* Back Button */}
                        <div className="flex items-center gap-2">
                            <AudioControl 
                                variant="navbar" 
                                responsive={true}
                                className="relative"
                            />
                            <Button
                                variant="navy-ghost"
                                onClick={() => navigate("/")}
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Choose Your <span className="gradient-text">Path</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto">
                        Select how you want to play. Challenge friends locally or compete globally.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* 1v1 Battle Mode Card */}
                    <ModeCard
                    title="1v1 Battle"
                    description="Challenge a friend to a head-to-head trivia duel. May the smartest win!"
                    icon={<Swords className="w-10 h-10 text-red-400" />}
                    color="red"
                    onClick={() => navigate("/mode/1v1")}
                    delay={0.2}
                />

                {/* Local Mode Card */}
                <ModeCard
                    title="Local Party"
                    description="Play with 2-4 friends on a single device. Perfect for parties and gatherings."
                    icon={<Gamepad2 className="w-10 h-10 text-emerald-400" />}
                    color="emerald"
                    onClick={() => navigate("/mode/local")}
                    delay={0.3}
                />

                {/* Multiplayer Mode Card */}
                <ModeCard
                    title="Online Multiplayer"
                    description="Join rooms, host games, and compete with players from around the world."
                    icon={<Globe className="w-10 h-10 text-blue-400" />}
                    color="blue"
                    onClick={() => navigate("/mode/multiplayer")}
                    delay={0.4}
                />
                </div>
            </div>
        </div>
    );
}

interface ModeCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: "emerald" | "blue" | "red";
    onClick: () => void;
    delay: number;
}

function ModeCard({ title, description, icon, color, onClick, delay }: ModeCardProps) {
    const colorStyles = {
        emerald: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]",
        blue: "hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.1)]",
        red: "hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.1)]",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onClick}
            className={`
        group cursor-pointer relative overflow-hidden
        bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-8
        transition-all duration-300
        ${colorStyles[color]}
      `}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:bg-white/10 transition-colors">
                {icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                {title}
            </h3>

            <p className="text-slate-400 mb-8 leading-relaxed group-hover:text-slate-300 transition-colors">
                {description}
            </p>

            <div className="flex items-center text-white/40 text-sm font-medium group-hover:text-white transition-colors">
                Select Mode <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    );
}
