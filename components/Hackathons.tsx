import SectionReveal from "./SectionReveal";

export default function Hackathons() {
    const hacks = [
        {
            name: "Smart India Hackathon (SIH) 2024",
            place: "Runner-up",
            location: "LPU Punjab",
            date: "Dec 2024",
            color: "text-gray-300" // Silver/Runner up
        },
        {
            name: "Mindscape Hackathon",
            place: "2nd Place",
            location: "BNMIT Bangalore",
            date: "Jul 2025",
            color: "text-gray-300"
        },
        {
            name: "Code-A-Thon Hackathon",
            place: "3rd Place",
            location: "MIT Bangalore",
            date: "Apr 2025",
            color: "text-amber-700" // Bronze
        },
        {
            name: "Code Red ’25",
            place: "Consolation Prize",
            location: "BMSIT",
            date: "Jan 2025",
            color: "text-ghost-pink"
        }
    ];

    return (
        <section id="hackathons" className="py-20 px-4 bg-black relative">
            <SectionReveal>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-ghost-cyan mb-12 text-center">
                        ACHIEVEMENTS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hacks.map((hack, idx) => (
                            <div key={idx} className="bg-gray-900/50 border border-ghost-cyan p-6 rounded relative overflow-hidden group hover:bg-gray-900 transition-all">
                                <div className="absolute top-0 right-0 p-2 bg-ghost-cyan text-black font-arcade text-xs">
                                    {hack.date}
                                </div>

                                <h3 className="font-arcade text-lg text-white mt-4 mb-2 group-hover:text-pacman-yellow transition-colors">
                                    {hack.name}
                                </h3>

                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 bg-ghost-red rounded-full animate-ping" />
                                    <span className="font-vt323 text-gray-400">{hack.location}</span>
                                </div>

                                <div className={`font-arcade text-xl ${hack.color} mt-4 border-t border-gray-800 pt-2`}>
                                    {hack.place}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
