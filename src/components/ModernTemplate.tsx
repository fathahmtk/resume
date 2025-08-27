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

interface ModernTemplateProps {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string;
}

export default function ModernTemplate({
  personalInfo,
  experience,
  education,
  skills,
}: ModernTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const skillsList = skills.split(",").filter(skill => skill.trim() !== "");

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black">
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  📧 {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  📱 {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  📍 {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  🔗 {personalInfo.website}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  💼 {personalInfo.linkedin}
                </span>
              )}
            </div>
          </div>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl text-blue-600">👤</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-lg text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-lg text-gray-700">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.location}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {skillsList.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
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