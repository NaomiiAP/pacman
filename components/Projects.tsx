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
            demoLink: "https://accps.vercel.app/",
            color: "bg-brutal-pink"
        },
        {
            title: "Emotisense",
            subtitle: "AI-Powered Emotion Analysis",
            tech: ["React", "Node.js", "Python", "BERT", "ViT"],
            desc: "An AI-based emotion detection system using BERT (text) and Vision Transformer (ViT, images). Fine-tuned models on benchmark datasets.",
            link: "#",
            color: "bg-white"
        },
        {
            title: "Wanderly",
            subtitle: "Smart Travel Companion",
            tech: ["Next.js", "Flask", "SQLite", "Solidity"],
            desc: "AI-driven travel platform with adaptive itinerary generation and blockchain-based memories. Voice-first trip planning included.",
            link: "#",
            color: "bg-brutal-yellow"
        },
        {
            title: "EduVault",
            subtitle: "Decentralized Academic Records",
            tech: ["React", "Solidity", "Ether.js", "IPFS"],
            desc: "A secure, blockchain-based platform for storing and verifying academic records, changing credential verification preventing fraud.",
            link: "https://github.com/naomiiAP/eduvault",
            demoLink: "https://eduvault-woad.vercel.app/",
            color: "bg-brutal-cyan"
        },
        {
            title: "AgriAssist",
            subtitle: "Smart Farming Assistant",
            tech: ["MobileNetV2", "NLP", "Yield Prediction"],
            desc: "Multilingual farming assistant with crop disease detection, yield prediction, and voice-enabled chatbot for accessibility.",
            link: "#",
            color: "bg-brutal-green"
        }
    ];

    return (
        <section id="projects" className="py-20 px-4 bg-[var(--background)] border-b-8 border-black">
            <SectionReveal>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-16 text-center uppercase drop-shadow-[4px_4px_0_#f472b6]">
                        PROJECTS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, idx) => (
                            <div key={idx} className={`relative brutal-card p-6 flex flex-col h-full ${project.color}`}>
                                <h3 className="font-black text-3xl text-black mb-2 uppercase">{project.title}</h3>
                                <h4 className="font-bold text-xl text-black mb-4 border-b-4 border-black pb-2">{project.subtitle}</h4>

                                <p className="font-medium text-black mb-6 flex-grow text-lg">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-sm font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0_#000] px-2 py-1">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto pt-4 border-t-4 border-black">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="flex-1 text-center font-black uppercase text-sm border-2 border-black bg-white text-black py-2 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition-all"
                                    >
                                        SOURCE
                                    </Link>
                                    {project.demoLink && (
                                        <Link
                                            href={project.demoLink}
                                            target="_blank"
                                            className="flex-1 text-center font-black uppercase text-sm border-2 border-black bg-brutal-yellow text-black py-2 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] transition-all"
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
