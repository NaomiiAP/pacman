import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiFastapi, SiFlask, SiNumpy, SiPandas, SiSolidity, SiFigma, SiMysql, SiMongodb } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import SectionReveal from "./SectionReveal";

export default function Skills() {
    const customSkills = [
        {
            category: "Web Development",
            color: "bg-brutal-cyan",
            items: [
                { name: "HTML", icon: <FaHtml5 /> },
                { name: "CSS", icon: <FaCss3Alt /> },
                { name: "JavaScript", icon: <FaJs /> },
                { name: "TypeScript", icon: <SiTypescript /> },
                { name: "React.js", icon: <FaReact /> },
                { name: "Node.js", icon: <FaNodeJs /> },
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "FastAPI", icon: <SiFastapi /> },
                { name: "Flask", icon: <SiFlask /> }
            ]
        },
        {
            category: "Libraries & Tools",
            color: "bg-brutal-pink",
            items: [
                { name: "NumPy", icon: <SiNumpy /> },
                { name: "Pandas", icon: <SiPandas /> },
                { name: "Matplotlib", icon: null }
            ]
        },
        {
            category: "Languages",
            color: "bg-brutal-yellow",
            items: [
                { name: "Python", icon: <FaPython /> },
                { name: "C", icon: null },
                { name: "C++", icon: <TbBrandCpp /> },
                { name: "Dart", icon: null },
                { name: "Solidity", icon: <SiSolidity /> }
            ]
        },
        {
            category: "Web Design",
            color: "bg-brutal-green",
            items: [
                { name: "Figma", icon: <SiFigma /> },
                { name: "Canva", icon: null }
            ]
        },
        {
            category: "Databases",
            color: "bg-brutal-blue text-white",
            items: [
                { name: "MySQL", icon: <SiMysql /> },
                { name: "MongoDB", icon: <SiMongodb /> }
            ]
        },
        {
            category: "Other",
            color: "bg-white",
            items: [
                { name: "Git", icon: <FaGitAlt /> },
                { name: "REST APIs", icon: null },
                { name: "Problem Solving", icon: null },
                { name: "Blockchain", icon: null }
            ]
        },
    ];

    return (
        <section id="skills" className="py-20 px-4 bg-[var(--background)] border-b-8 border-black relative">
            <SectionReveal>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-16 text-center uppercase drop-shadow-[4px_4px_0_#22d3ee]">
                        SKILLS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {customSkills.map((section, idx) => (
                            <div key={idx} className={`brutal-card p-6 ${section.color}`}>
                                <h3 className="font-black text-2xl mb-6 flex items-center gap-3 uppercase border-b-4 border-black pb-2">
                                    {section.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {section.items.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="flex items-center gap-2 font-bold text-sm md:text-base bg-white text-black px-3 py-2 border-2 border-black shadow-[2px_2px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0px_0px_0_#000] transition-all cursor-default"
                                        >
                                            {skill.icon && <span className="text-xl">{skill.icon}</span>}
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
