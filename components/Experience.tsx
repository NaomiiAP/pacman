import SectionReveal from "./SectionReveal";

export default function Experience() {
    return (
        <section id="experience" className="py-20 px-4 bg-brutal-blue border-b-8 border-black relative">
            <SectionReveal>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-16 text-center uppercase drop-shadow-[4px_4px_0_#000]">
                        EXPERIENCE
                    </h2>

                    <div className="space-y-8">
                        {/* HPE Project Intern */}
                        <div className="brutal-card p-6 md:p-8 bg-white relative">
                            <div className="absolute -top-4 -right-4 bg-brutal-yellow border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000] rotate-3 z-10">
                                <p className="font-bold text-black uppercase">Mar 2026 - Present</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-black text-3xl md:text-4xl uppercase text-black">Project Intern</h3>
                                <h4 className="font-bold text-xl md:text-2xl text-brutal-pink">Hewlett Packard Enterprise</h4>
                            </div>
                            <div className="border-t-4 border-black pt-4">
                                <ul className="list-disc list-inside font-medium text-black space-y-2 text-lg">
                                    <li>Built an internal tool to automate software recipe detection for Hewlett Packard Enterprise's Private Cloud platform, mapping deployed Helm chart versions to component recipes by integrating Kubernetes cluster data, Git history, and a dynamic web UI.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Samsung Research Intern */}
                        <div className="brutal-card p-6 md:p-8 bg-brutal-yellow relative">
                            <div className="absolute -top-4 -right-4 bg-brutal-cyan border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000] -rotate-3 z-10">
                                <p className="font-bold text-black uppercase">Nov 2025 - Mar 2026</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-black text-3xl md:text-4xl uppercase text-black">Research Intern</h3>
                                <h4 className="font-bold text-xl md:text-2xl text-brutal-pink">Samsung R&D Institute</h4>
                            </div>
                            <div className="border-t-4 border-black pt-4">
                                <ul className="list-disc list-inside font-medium text-black space-y-2 text-lg">
                                    <li>Implemented a real-time, GPU-accelerated pipeline to simulate anamorphic lens effects from standard spherical sensor data.</li>
                                    <li>Integrated custom geometric transformation shaders into the imaging stack to enable high-fidelity projection remapping at real-time frame rates.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Fintervue Intern */}
                        <div className="brutal-card p-6 md:p-8 bg-white relative">
                            <div className="absolute -top-4 -right-4 bg-brutal-pink border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000] rotate-2 z-10">
                                <p className="font-bold text-black uppercase">Dec 2024 - Feb 2025</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-black text-3xl md:text-4xl uppercase text-black">Frontend Development Intern</h3>
                                <h4 className="font-bold text-xl md:text-2xl text-brutal-blue">Fintervue (Remote)</h4>
                            </div>
                            <div className="border-t-4 border-black pt-4">
                                <ul className="list-disc list-inside font-medium text-black space-y-2 text-lg">
                                    <li>Designed and developed the frontend of the website of Fintervue.</li>
                                    <li>Worked on an AI powered interviewer and resume analyser.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
