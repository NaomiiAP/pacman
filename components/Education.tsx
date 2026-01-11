import SectionReveal from "./SectionReveal";

export default function Education() {
    const education = [
        {
            school: "Ramaiah Institute of Technology",
            degree: "B.E - Information Science and Engineering",
            score: "CGPA: 9.65/10.00",
            period: "Oct 2023 - Aug 2027",
            location: "Bengaluru"
        }
    ];

    return (
        <section id="education" className="py-20 px-4 bg-black border-t-4 border-maze-blue">
            <SectionReveal>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-arcade text-ghost-orange mb-12 text-center">
                        EDUCATION
                    </h2>

                    <div className="grid gap-8">
                        {education.map((edu, idx) => (
                            <div key={idx} className="bg-gray-900 p-6 rounded-lg border-l-4 border-ghost-orange hover:bg-gray-800 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                    <div>
                                        <h3 className="font-arcade text-lg md:text-xl text-white mb-1">{edu.school}</h3>
                                        <p className="font-vt323 text-ghost-cyan text-lg">{edu.degree}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 text-right">
                                        <span className="font-arcade text-xs bg-ghost-orange text-black px-2 py-1 rounded block md:inline-block">
                                            {edu.period}
                                        </span>
                                    </div>
                                </div>
                                <p className="font-vt323 text-gray-300 text-xl border-t border-gray-700 pt-4 mt-2">
                                    Score: <span className="text-pacman-yellow">{edu.score}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
