import Link from "next/link";
import SectionReveal from "./SectionReveal";

export default function Projects() {
    const projects = [
        {
            title: "ACCPS",
            subtitle: "AI Content Copyright System",
            tech: ["Next.js", "FastAPI", "Sepolia", "Remix", "Scikit-Learn"],
            desc: "Blockchain-based product authentication and counterfeit detection using lightweight TF-IDF and perceptual hashing.",
            link: "https://github.com/Byte-Sized-Brain/accps",
            demoLink: "https://accps.vercel.app/"
        },
        {
            title: "Emotisense",
            subtitle: "AI-Powered Emotion Analysis",
            tech: ["React", "Node.js", "Python", "BERT", "ViT"],
            desc: "An AI-based emotion detection system using BERT (text) and Vision Transformer (ViT, images). Fine-tuned models on benchmark datasets.",
            link: "#" // Placeholder
        },
        {
            title: "Wanderly",
            subtitle: "Smart Travel Companion",
            tech: ["Next.js", "Flask", "SQLite", "Solidity"],
            desc: "AI-driven travel platform with adaptive itinerary generation and blockchain-based memories. Voice-first trip planning included.",
            link: "#" // Placeholder
        },
        {
            title: "EduVault",
            subtitle: "Decentralized Academic Records",
            tech: ["React", "Solidity", "Ether.js", "IPFS"],
            desc: "A secure, blockchain-based platform for storing and verifying academic records, changing credential verification preventing fraud.",
            link: "https://github.com/naomiiAP/eduvault",
            demoLink: "https://eduvault-woad.vercel.app/"
        },
        {
            title: "AgriAssist",
            subtitle: "Smart Farming Assistant",
            tech: ["MobileNetV2", "NLP", "Yield Prediction"],
            desc: "Multilingual farming assistant with crop disease detection, yield prediction, and voice-enabled chatbot for accessibility.",
            link: "#" // Placeholder
        }
    ];

    return (
        <section id="projects" className="py-20 px-4 bg-black border-t-4 border-maze-blue">
            <SectionReveal>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-ghost-red mb-16 text-center">
                        PROJECTS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, idx) => (
                            <div key={idx} className="relative group bg-gray-900 border-4 border-maze-blue p-6 rounded-xl hover:shadow-[0_0_15px_rgba(33,33,222,0.6)] transition-all transform hover:-translate-y-2">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 mb-4" />

                                <h3 className="font-arcade text-xl text-pacman-yellow mb-2 mt-2">{project.title}</h3>
                                <h4 className="font-vt323 text-lg text-ghost-pink mb-4">{project.subtitle}</h4>

                                <p className="font-vt323 text-gray-300 mb-6 min-h-[80px]">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-arcade text-ghost-cyan bg-blue-900/30 px-2 py-1 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="flex-1 text-center font-arcade text-sm bg-ghost-red text-black py-3 rounded hover:bg-white hover:text-red-600 transition-colors"
                                    >
                                        SOURCE
                                    </Link>
                                    {project.demoLink && (
                                        <Link
                                            href={project.demoLink}
                                            target="_blank"
                                            className="flex-1 text-center font-arcade text-sm border-2 border-ghost-cyan text-ghost-cyan py-3 rounded hover:bg-ghost-cyan hover:text-black transition-colors flex items-center justify-center"
                                        >
                                            DEMO
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
