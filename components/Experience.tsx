import SectionReveal from "./SectionReveal";

export default function Experience() {
    return (
        <section id="experience" className="py-20 px-4 bg-black relative">
            <SectionReveal>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-pacman-yellow mb-16 text-center">
                        EXPERIENCE
                    </h2>

                    <div className="space-y-12">
                        {/* Samsung Research Intern */}
                        <div className="relative pl-8 md:pl-0">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-[50%] top-0 h-full w-1 bg-maze-blue transform -translate-x-1/2" />

                            <div className="md:flex justify-between items-center group">
                                <div className="hidden md:block w-1/2 pr-12 text-right">
                                    <h3 className="font-arcade text-xl text-ghost-pink">Research Intern</h3>
                                    <h4 className="font-vt323 text-lg text-gray-400">Samsung R&D Institute</h4>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-0 md:left-[50%] w-8 h-8 bg-black border-4 border-pacman-yellow rounded-full z-10 transform md:-translate-x-1/2 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-pacman-yellow rounded-full animate-pulse" />
                                </div>

                                <div className="md:w-1/2 md:pl-12">
                                    <div className="md:hidden mb-2">
                                        <h3 className="font-arcade text-xl text-ghost-pink">Research Intern</h3>
                                        <h4 className="font-vt323 text-lg text-gray-400">Samsung R&D Institute</h4>
                                    </div>
                                    <p className="font-vt323 text-ghost-cyan mb-2">Dec 2025 - Present</p>
                                    <div className="bg-gray-900/80 p-4 rounded border border-gray-700 hover:border-ghost-pink transition-colors">
                                        <ul className="list-disc list-inside font-vt323 text-gray-300 space-y-1">
                                            <li>Working on cutting-edge AI research and development.</li>
                                            <li>Contributing to next-gen software solutions.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fintervue Intern */}
                        <div className="relative pl-8 md:pl-0">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-[50%] top-0 h-full w-1 bg-maze-blue transform -translate-x-1/2" />

                            <div className="md:flex justify-between items-center group">
                                <div className="hidden md:block w-1/2 pr-12 text-right">
                                    <h3 className="font-arcade text-xl text-ghost-pink">Frontend Development Intern</h3>
                                    <h4 className="font-vt323 text-lg text-gray-400">Fintervue (Remote)</h4>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-0 md:left-[50%] w-8 h-8 bg-black border-4 border-pacman-yellow rounded-full z-10 transform md:-translate-x-1/2 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-pacman-yellow rounded-full animate-pulse" />
                                </div>

                                <div className="md:w-1/2 md:pl-12">
                                    <div className="md:hidden mb-2">
                                        <h3 className="font-arcade text-xl text-ghost-pink">Frontend Development Intern</h3>
                                        <h4 className="font-vt323 text-lg text-gray-400">Fintervue (Remote)</h4>
                                    </div>
                                    <p className="font-vt323 text-ghost-cyan mb-2">Dec 2024 - Feb 2025</p>
                                    <div className="bg-gray-900/80 p-4 rounded border border-gray-700 hover:border-ghost-pink transition-colors">
                                        <ul className="list-disc list-inside font-vt323 text-gray-300 space-y-1">
                                            <li>Designed and developed the frontend of the website of Fintervue.</li>
                                            <li>Worked on an AI powered interviewer and resume analyser.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
