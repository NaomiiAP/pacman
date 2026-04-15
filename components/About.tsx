import SectionReveal from "./SectionReveal";

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-black border-b-4 border-maze-blue relative">
            <SectionReveal>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-pacman-yellow mb-12 text-center text-shadow-neon">
                        WHO AM I?
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-900/50 p-8 rounded-xl border-2 border-ghost-pink">
                        <div className="w-full md:w-2/3 space-y-6">
                            <p className="font-vt323 text-xl md:text-2xl text-gray-300 leading-relaxed">
                                I am <span className="text-ghost-cyan">a Full Stack Developer and AI/ML Engineer</span>.
                            </p>
                            <p className="font-vt323 text-xl md:text-2xl text-gray-300 leading-relaxed">
                                Building intelligent systems with Agentic Systems, RAG, multimodal AI, and scalable full-stack solutions.
                            </p>
                            {/* Badges removed */}
                        </div>

                        <div className="w-full md:w-1/3 flex justify-center">
                            {/* Abstract Pacman representation since we don't have an image yet */}
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 bg-pacman-yellow rounded-full clip-path-pacman animate-chomp"></div>
                                <div className="absolute top-10 right-14 w-4 h-4 bg-black rounded-full text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
