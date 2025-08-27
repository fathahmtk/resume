interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface ClassicTemplateProps {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string;
}

export default function ClassicTemplate({
  personalInfo,
  experience,
  education,
  skills,
}: ClassicTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const skillsList = skills.split(",").filter(skill => skill.trim() !== "");

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="border-t-2 border-gray-800 pt-8">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wide">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-700">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </p>
                </div>
                <p className="text-md text-gray-700 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wide">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
                <p className="text-md text-gray-700 mb-1">{edu.school}</p>
                <p className="text-sm text-gray-600">{edu.location}</p>
                {edu.gpa && (
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {skillsList.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase mb-4 tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-gray-700 text-gray-700 text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}