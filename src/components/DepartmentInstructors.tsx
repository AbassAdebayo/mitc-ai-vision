
type Instructor = {
    name: string;
    role: string;
    image: string;
    alt: string;
};

const instructors: Instructor[] = [
    {
        name: "QAA Abass Adebayo",
        role:
            "Instructor-in-Charge, Software Engineering | Head of Department, Software Engineering / Web Design",
        image: "/images/abass-adebayo.jpg",
        alt: "Portrait of QAA Abass Adebayo",
    },
    {
        name: "QAA Taofeek Adeiye",
        role:
            "Instructor-in-Charge, Web Design (WordPress)",
        image: "/images/taofeek-adeiye.jpg",
        alt: "Portrait of QAA Taofeek Adeiye",
    },
];

export default function DepartmentInstructors() {
    return (
        <section className="instructors-section">
            <p className="instructors-eyebrow">
                MEET THE BRAINS BEHIND THE DEPARTMENT
            </p>

            <h2>Our Departmental Instructors</h2>

            <div className="instructors-grid">
                {instructors.map((instructor) => (
                    <article
                        className="instructor-card"
                        key={instructor.name}
                    >
                        <div className="instructor-photo">
                            <img
                                src={instructor.image}
                                alt={instructor.alt}
                            />
                        </div>

                        <h3>{instructor.name}</h3>
                        <p>{instructor.role}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
