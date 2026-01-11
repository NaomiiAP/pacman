import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiFastapi, SiFlask, SiNumpy, SiPandas, SiSolidity, SiFigma, SiMysql, SiMongodb } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import SectionReveal from "./SectionReveal";

export default function Skills() {
    const customSkills = [
        {
            category: "Web Development",
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
            items: [
                { name: "NumPy", icon: <SiNumpy /> },
                { name: "Pandas", icon: <SiPandas /> },
                { name: "Matplotlib", icon: null }
            ]
        },
        {
            category: "Languages",
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
            items: [
                { name: "Figma", icon: <SiFigma /> },
                { name: "Canva", icon: null }
            ]
        },
        {
            category: "Databases",
            items: [
                { name: "MySQL", icon: <SiMysql /> },
                { name: "MongoDB", icon: <SiMongodb /> }
            ]
        },
        {
            category: "Other",
            items: [
                { name: "Git", icon: <FaGitAlt /> },
                { name: "REST APIs", icon: null },
                { name: "Problem Solving", icon: null },
                { name: "Blockchain", icon: null }
            ]
        },
    ];

    return (
        <section id="skills" className="py-20 px-4 bg-black relative">
            <SectionReveal>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-ghost-cyan mb-16 text-center">
                        SKILLS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {customSkills.map((section, idx) => (
                            <div key={idx} className="bg-gray-900 border-2 border-dashed border-gray-700 p-6 rounded-lg hover:border-pacman-yellow transition-colors group">
                                <h3 className="font-arcade text-pacman-yellow text-lg mb-6 flex items-center gap-3">
                                    <span className="text-ghost-pink">{">"}</span> {section.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {section.items.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="flex items-center gap-2 font-vt323 text-lg bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 group-hover:border-ghost-cyan group-hover:text-ghost-cyan transition-all hover:bg-gray-700"
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
