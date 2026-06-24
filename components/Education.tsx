import SectionReveal from "./SectionReveal";

export default function Education() {
    const education = [
        {
            school: "Ramaiah Institute of Technology",
            degree: "B.E - Information Science and Engineering",
            score: "CGPA: 9.63/10.00",
            period: "Oct 2023 - Aug 2027",
            location: "Bengaluru"
        }
    ];

    return (
        <section id="education" className="py-20 px-4 bg-brutal-green border-b-8 border-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:20px_20px] pointer-events-none"></div>
            <SectionReveal>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-black mb-16 text-center uppercase drop-shadow-[4px_4px_0_#fff]">
                        EDUCATION
                    </h2>

                    <div className="grid gap-8">
                        {education.map((edu, idx) => (
                            <div key={idx} className="brutal-card p-8 bg-white border-8 border-black">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h3 className="font-black text-2xl md:text-3xl text-black uppercase mb-2">{edu.school}</h3>
                                        <p className="font-bold text-xl text-black bg-brutal-yellow inline-block px-2 border-2 border-black -rotate-1 shadow-[2px_2px_0_#000]">{edu.degree}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <span className="font-bold text-lg bg-black text-white px-4 py-2 uppercase border-2 border-black shadow-[4px_4px_0_#fff]">
                                            {edu.period}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-8 pt-6 border-t-8 border-black">
                                    <p className="font-black text-2xl text-black uppercase">
                                        Score: 
                                    </p>
                                    <span className="text-3xl font-black bg-brutal-pink text-black px-4 py-1 border-4 border-black rotate-2 shadow-[4px_4px_0_#000]">{edu.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionReveal>
        </section>
    );
}
