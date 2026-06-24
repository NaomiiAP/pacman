import SectionReveal from "./SectionReveal";

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-brutal-pink border-b-8 border-black relative">
            <SectionReveal>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-12 text-center uppercase drop-shadow-[4px_4px_0_#fff]">
                        WHO AM I?
                    </h2>

                    <div className="flex flex-col md:flex-row items-stretch gap-8 brutal-card p-8 md:p-12 bg-white">
                        <div className="w-full md:w-2/3 space-y-6 flex flex-col justify-center">
                            <p className="font-bold text-2xl md:text-3xl text-black leading-tight">
                                I am <span className="bg-brutal-cyan px-2 py-1 border-2 border-black inline-block -rotate-1 shadow-[4px_4px_0_#000]">a Full Stack Developer</span> and <span className="bg-brutal-yellow px-2 py-1 border-2 border-black inline-block rotate-1 shadow-[4px_4px_0_#000]">AI/ML Engineer</span>.
                            </p>
                            <p className="font-bold text-xl md:text-2xl text-black leading-relaxed">
                                Building intelligent systems with Agentic Systems, RAG, multimodal AI, and scalable full-stack solutions. I love clean code, bold designs, and pushing the boundaries of what's possible on the web.
                            </p>
                        </div>

                        <div className="w-full md:w-1/3 flex justify-center items-center border-t-4 md:border-t-0 md:border-l-4 border-black pt-8 md:pt-0 md:pl-8">
                            {/* Abstract brutalist shape avatar */}
                            <div className="relative w-48 h-48 bg-brutal-yellow border-8 border-black shadow-[8px_8px_0_#000] rotate-3 hover:-rotate-3 transition-transform duration-300">
                                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-black rounded-full"></div>
                                <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-black rounded-full"></div>
                                <div className="absolute bottom-1/4 left-1/4 right-1/4 h-4 bg-black"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
