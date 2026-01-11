"use client";

import { useState, useEffect, useCallback } from "react";
import SectionReveal from "./SectionReveal";

const BOARD_SIZE = 15;
const INITIAL_PACMAN = { x: 1, y: 1 };
const INITIAL_GHOSTS = [
    { x: 13, y: 13, color: "bg-ghost-red", name: "blinky" },
    { x: 13, y: 1, color: "bg-ghost-pink", name: "pinky" },
    { x: 1, y: 13, color: "bg-ghost-cyan", name: "inky" },
];

const WALLS = [
    { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
    { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 },
    { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 11, y: 6 },
    { x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 },
    { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 },
    { x: 12, y: 2 }, { x: 12, y: 3 },
    { x: 1, y: 12 }, { x: 2, y: 12 }, { x: 3, y: 12 },
    { x: 7, y: 7 }, { x: 7, y: 8 }, // Center Box
];

export default function PacmanGame() {
    const [pacman, setPacman] = useState(INITIAL_PACMAN);
    const [ghosts, setGhosts] = useState(INITIAL_GHOSTS);
    const [dots, setDots] = useState<{ x: number, y: number }[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");

    // Initialize dots
    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const newDots = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (!WALLS.some(w => w.x === x && w.y === y) && (x !== INITIAL_PACMAN.x || y !== INITIAL_PACMAN.y)) {
                    // 30% chance of dot
                    if (Math.random() > 0.7) newDots.push({ x, y });
                }
            }
        }
        setDots(newDots);
        setPacman(INITIAL_PACMAN);
        setGhosts(INITIAL_GHOSTS);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setDirection("RIGHT");
    };

    const isValidMove = (x: number, y: number) => {
        return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && !WALLS.some(w => w.x === x && w.y === y);
    };

    // Simple Ghost AI
    const moveGhosts = useCallback(() => {
        if (gameOver || gameWon) return;

        setGhosts(currentGhosts => {
            return currentGhosts.map(ghost => {
                // 1. Get possible moves
                const possibleMoves = [
                    { x: ghost.x, y: ghost.y - 1 }, // UP
                    { x: ghost.x, y: ghost.y + 1 }, // DOWN
                    { x: ghost.x - 1, y: ghost.y }, // LEFT
                    { x: ghost.x + 1, y: ghost.y }  // RIGHT
                ].filter(pos => isValidMove(pos.x, pos.y));

                if (possibleMoves.length === 0) return ghost;

                // 2. Chasing Logic (Minimize distance to Pacman)
                // Add a bit of randomness so they don't stack perfectly
                if (Math.random() > 0.3) {
                    const bestMove = possibleMoves.reduce((prev, curr) => {
                        const prevDist = Math.abs(prev.x - pacman.x) + Math.abs(prev.y - pacman.y);
                        const currDist = Math.abs(curr.x - pacman.x) + Math.abs(curr.y - pacman.y);
                        return currDist < prevDist ? curr : prev;
                    });
                    return { ...ghost, x: bestMove.x, y: bestMove.y };
                } else {
                    // Random move
                    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                    return { ...ghost, x: randomMove.x, y: randomMove.y };
                }
            });
        });
    }, [pacman, gameOver, gameWon]);


    const movePacman = useCallback(() => {
        if (gameOver || gameWon) return;

        setPacman(current => {
            let newX = current.x;
            let newY = current.y;

            if (direction === "UP") newY--;
            if (direction === "DOWN") newY++;
            if (direction === "LEFT") newX--;
            if (direction === "RIGHT") newX++;

            if (!isValidMove(newX, newY)) return current;

            // Eat dot
            setDots(currentDots => {
                const dotIndex = currentDots.findIndex(d => d.x === newX && d.y === newY);
                if (dotIndex !== -1) {
                    const newScore = score + 10;
                    setScore(newScore);
                    const newDots = [...currentDots];
                    newDots.splice(dotIndex, 1);
                    if (newDots.length === 0) setGameWon(true);
                    return newDots;
                }
                return currentDots;
            });

            return { x: newX, y: newY };
        });
    }, [direction, gameOver, gameWon, score]);

    // Collision Detection
    useEffect(() => {
        if (ghosts.some(g => g.x === pacman.x && g.y === pacman.y)) {
            setGameOver(true);
        }
    }, [pacman, ghosts]);

    // Game Loop
    useEffect(() => {
        const pacmanInterval = setInterval(movePacman, 300);
        const ghostInterval = setInterval(moveGhosts, 350); // Ghosts move slightly faster now
        return () => {
            clearInterval(pacmanInterval);
            clearInterval(ghostInterval);
        };
    }, [movePacman, moveGhosts]);

    // Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault(); // Prevent scrolling
            }
            if (e.key === "ArrowUp") setDirection("UP");
            if (e.key === "ArrowDown") setDirection("DOWN");
            if (e.key === "ArrowLeft") setDirection("LEFT");
            if (e.key === "ArrowRight") setDirection("RIGHT");
            if (e.key === " ") resetGame();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section id="game" className="py-20 px-4 bg-black border-t-4 border-maze-blue text-center">
            <SectionReveal>
                <h2 className="text-3xl md:text-4xl font-arcade text-pacman-yellow mb-8 blinking">BONUS STAGE: SURVIVE!</h2>
                <p className="font-vt323 text-gray-400 mb-8">Arrows to Move | Space to Restart</p>

                <div className="inline-block bg-black border-4 border-maze-blue p-2 relative">
                    <div className="flex justify-between font-arcade text-white px-2 mb-2 text-sm">
                        <span>SCORE: {score}</span>
                        <span>{gameOver ? <span className="text-red-600 animate-pulse">GAME OVER</span> : gameWon ? <span className="text-green-500 animate-pulse">YOU WON!</span> : "PLAYING"}</span>
                    </div>

                    <div
                        className="grid bg-black relative"
                        style={{
                            gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
                            width: `${BOARD_SIZE * 20}px`
                        }}
                    >
                        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
                            const x = i % BOARD_SIZE;
                            const y = Math.floor(i / BOARD_SIZE);
                            const isWall = WALLS.some(w => w.x === x && w.y === y);
                            const isDot = dots.some(d => d.x === x && d.y === y);
                            const isPacman = pacman.x === x && pacman.y === y;
                            const ghost = ghosts.find(g => g.x === x && g.y === y);

                            return (
                                <div key={i} className="w-5 h-5 flex items-center justify-center">
                                    {isWall && <div className="w-full h-full bg-maze-blue border-[0.5px] border-blue-900" />}
                                    {isDot && !ghost && <div className="w-1.5 h-1.5 bg-ghost-pink rounded-full" />}
                                    {isPacman && !gameOver && (
                                        <div className={`w-4 h-4 bg-pacman-yellow rounded-full animate-chomp pacman-${direction.toLowerCase()}`}>
                                            <div className="pacman-eye" />
                                        </div>
                                    )}
                                    {ghost && (
                                        <div className={`w-4 h-4 ${ghost.color} rounded-t-full relative animate-bounce`}>
                                            <div className="flex justify-center gap-0.5 pt-1">
                                                <div className="w-1 h-1 bg-white rounded-full"><div className="w-0.5 h-0.5 bg-blue-700 rounded-full ml-0.5" /></div>
                                                <div className="w-1 h-1 bg-white rounded-full"><div className="w-0.5 h-0.5 bg-blue-700 rounded-full ml-0" /></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {(gameOver || gameWon) && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 flex-col">
                            <p className={`font-arcade text-3xl mb-4 ${gameWon ? "text-pacman-yellow" : "text-red-600"}`}>
                                {gameWon ? "VICTORY!" : "GAME OVER"}
                            </p>
                            <button onClick={resetGame} className="px-4 py-2 border-2 border-white font-vt323 text-white hover:bg-white hover:text-black transition-colors">
                                PRESS START (SPACE)
                            </button>
                        </div>
                    )}
                </div>

                <style jsx global>{`
         .pacman-up { transform: rotate(-90deg); }
         .pacman-down { transform: rotate(90deg); }
         .pacman-left { transform: rotate(180deg); }
         .pacman-right { transform: rotate(0deg); }
       `}</style>
            </SectionReveal>
        </section>
    );
}
