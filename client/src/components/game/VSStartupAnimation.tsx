import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
    id: string;
    name: string;
    isHost: boolean;
}

interface VSStartupAnimationProps {
    player1: Player | null;
    player2: Player | null;
    countdown: number;
    onComplete?: () => void;
}

export function VSStartupAnimation({ player1, player2, countdown, onComplete }: VSStartupAnimationProps) {
    const [showVS, setShowVS] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);

    useEffect(() => {
        // Show VS animation first
        const vsTimer = setTimeout(() => setShowVS(true), 300);
        // Then show countdown
        const countdownTimer = setTimeout(() => setShowCountdown(true), 1500);

        return () => {
            clearTimeout(vsTimer);
            clearTimeout(countdownTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Diagonal Slash Background */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-red-900/20 to-transparent transform -skew-x-12 origin-top-left" />
                <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-900/20 to-transparent transform skew-x-12 origin-top-right" />
            </motion.div>

            {/* Player 1 - Left Side */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
                className="absolute left-[10%] md:left-[15%] flex flex-col items-center"
            >
                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-red-500/30 rounded-full blur-2xl animate-pulse" />
                    {/* Avatar */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-red-400 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-2xl shadow-red-500/30 relative z-10">
                        {player1?.name?.charAt(0).toUpperCase() || "P1"}
                    </div>
                </div>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-2xl md:text-3xl font-black text-white tracking-tight"
                >
                    {player1?.name || "Player 1"}
                </motion.h3>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full"
                >
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                        {player1?.isHost ? "Host" : "Challenger"}
                    </span>
                </motion.div>
            </motion.div>

            {/* VS Text - Center */}
            <AnimatePresence>
                {showVS && (
                    <motion.div
                        initial={{ scale: 3, opacity: 0, rotate: -15 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="relative z-20"
                    >
                        {/* VS Glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                        </div>
                        {/* VS Text Shadow */}
                        <span className="absolute text-8xl md:text-9xl font-black text-slate-800 select-none blur-sm">
                            VS
                        </span>
                        {/* VS Text */}
                        <span className="relative text-8xl md:text-9xl font-black bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent select-none drop-shadow-2xl">
                            VS
                        </span>
                        {/* Diagonal Slash through VS */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent rotate-[-20deg] origin-center"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Player 2 - Right Side */}
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
                className="absolute right-[10%] md:right-[15%] flex flex-col items-center"
            >
                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />
                    {/* Avatar */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-400 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-2xl shadow-blue-500/30 relative z-10">
                        {player2?.name?.charAt(0).toUpperCase() || "P2"}
                    </div>
                </div>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-2xl md:text-3xl font-black text-white tracking-tight"
                >
                    {player2?.name || "Player 2"}
                </motion.h3>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full"
                >
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        {player2?.isHost ? "Host" : "Challenger"}
                    </span>
                </motion.div>
            </motion.div>

            {/* Countdown - Bottom Center */}
            <AnimatePresence>
                {showCountdown && countdown > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 2 }}
                        className="absolute bottom-[15%] flex flex-col items-center"
                    >
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
                            Battle Starts In
                        </span>
                        <motion.div
                            key={countdown}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-amber-500/30 rounded-full blur-2xl" />
                            </div>
                            <span className="relative text-8xl md:text-9xl font-black text-white drop-shadow-2xl">
                                {countdown}
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GO! Text when countdown reaches 0 */}
            <AnimatePresence>
                {showCountdown && countdown === 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        transition={{ type: "spring", damping: 10 }}
                        className="absolute bottom-[15%] flex flex-col items-center"
                    >
                        <span className="text-8xl md:text-9xl font-black bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent drop-shadow-2xl">
                            GO!
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spark Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                            opacity: 1,
                        }}
                        animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: [0, 1, 0],
                            opacity: [1, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.5 + i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                        className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    );
}
