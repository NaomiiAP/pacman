import SectionReveal from "./SectionReveal";

export default function Hackathons() {
    const hacks = [
        {
            name: "Google X Deepstation Hackathon",
            place: "1st Place",
            location: "MSRIT Bangalore",
            date: "May 2026",
            color: "bg-brutal-yellow"
        },
        {
            name: "Athernex Hackathon",
            place: "2nd Place",
            location: "BMSCE Bangalore",
            date: "Apr 2026",
            color: "bg-white"
        },
        {
            name: "Hack-A-War Hackathon",
            place: "1st Place",
            location: "MSRIT Bangalore",
            date: "Apr 2026",
            color: "bg-brutal-yellow"
        },
        {
            name: "Smart India Hackathon (SIH) 2024",
            place: "Runner-up",
            location: "LPU Punjab",
            date: "Dec 2024",
            color: "bg-white"
        },
        {
            name: "Mindscape Hackathon",
            place: "2nd Place",
            location: "BNMIT Bangalore",
            date: "Jul 2025",
            color: "bg-white"
        },
        {
            name: "Code-A-Thon Hackathon",
            place: "3rd Place",
            location: "MIT Bangalore",
            date: "Apr 2025",
            color: "bg-brutal-pink"
        },
        {
            name: "Code Red ’25",
            place: "Consolation Prize",
            location: "BMSIT",
            date: "Jan 2025",
            color: "bg-brutal-cyan"
        }
    ];

    return (
        <section id="hackathons" className="py-20 px-4 bg-brutal-red border-b-8 border-black relative">
            <SectionReveal>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-16 text-center uppercase drop-shadow-[4px_4px_0_#fff]">
                        ACHIEVEMENTS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {hacks.map((hack, idx) => (
                            <div key={idx} className={`brutal-card p-6 relative ${hack.color} ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}>
                                <div className="absolute top-0 right-0 px-3 py-1 bg-black text-white font-bold text-sm border-l-4 border-b-4 border-black">
                                    {hack.date}
                                </div>

                                <h3 className="font-black text-2xl text-black mt-6 mb-2 uppercase border-b-4 border-black pb-2">
                                    {hack.name}
                                </h3>

                                <div className="flex items-center gap-2 mb-4 mt-4">
                                    <div className="w-3 h-3 bg-black rounded-full" />
                                    <span className="font-bold text-lg text-black">{hack.location}</span>
                                </div>

                                <div className="font-black text-2xl text-black bg-white inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0_#000]">
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
