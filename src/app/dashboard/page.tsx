"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus, Trash2, Download, Printer, Eye, FileDown } from "lucide-react";
import ModernTemplate from "@/components/ModernTemplate";
import ClassicTemplate from "@/components/ClassicTemplate";
import { generatePDF } from "@/lib/pdf";

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

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState<"modern" | "classic">("modern");
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
  });

  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string>("");

  useEffect(() => {
    // Prevent redirect loop and ensure client-side execution
    if (typeof window === 'undefined') return;
    
    console.log("Dashboard useEffect running, current path:", window.location.pathname);
    const userData = localStorage.getItem("user");
    console.log("User data from localStorage:", userData);
    
    if (!userData) {
      console.log("No user data found, redirecting to login");
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        router.push("/login");
      }
      return;
    }
    try {
      const userObj = JSON.parse(userData);
      console.log("Parsed user object:", userObj);
      setUser(userObj);
      loadResumeData(userObj.id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      if (!window.location.pathname.includes('/login')) {
        router.push("/login");
      }
    }
  }, [router]);

  const loadResumeData = async (userId: string) => {
    try {
      const response = await fetch(`/api/resumes?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.resume) {
          setTemplate(data.resume.template || "modern");
          setPersonalInfo(data.resume.personalInfo || personalInfo);
          setExperience(data.resume.experience || []);
          setEducation(data.resume.education || []);
          setSkills(data.resume.skills || "");
        }
      }
    } catch (error) {
      console.error("Error loading resume data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          template,
          personalInfo,
          experience,
          education,
          skills,
        }),
      });

      if (response.ok) {
        // Show success message
      }
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setSaving(false);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setExperience([...experience, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const filename = `${personalInfo.name || 'resume'}-resume.pdf`;
    const success = await generatePDF('resume-preview', filename);
    if (!success) {
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 no-print">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Resume Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create your professional resume
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={saveResume} disabled={saving}>
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6 no-print">
            <Card>
              <CardHeader>
                <CardTitle>Template Selection</CardTitle>
                <CardDescription>Choose your resume template</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={template} onValueChange={(value: "modern" | "classic") => setTemplate(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Template</SelectItem>
                    <SelectItem value="classic">Classic Template</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={personalInfo.name}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          value={personalInfo.website}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                        <Input
                          id="linkedin"
                          value={personalInfo.linkedin}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Work Experience</CardTitle>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">Experience {experience.indexOf(exp) + 1}</h3>
                          <Button
                            onClick={() => removeExperience(exp.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    {experience.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        No experience added yet. Click "Add Experience" to get started.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">Education {education.indexOf(edu) + 1}</h3>
                          <Button
                            onClick={() => removeEducation(edu.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>School</Label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={edu.location}
                              onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>GPA (Optional)</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    {education.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        No education added yet. Click "Add Education" to get started.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                      Enter your skills separated by commas (e.g., JavaScript, React, Node.js)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      rows={4}
                      placeholder="Enter your skills here..."
                    />
                    {skills && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium">Skills Preview:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skills.split(",").map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:h-screen lg:overflow-hidden">
            <Card className="h-full">
              <CardHeader className="no-print">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-auto">
                <div id="resume-preview" className="bg-white shadow-lg rounded-lg">
                  {template === "modern" ? (
                    <ModernTemplate
                      personalInfo={personalInfo}
                      experience={experience}
                      education={education}
                      skills={skills}
                    />
                  ) : (
                    <ClassicTemplate
                      personalInfo={personalInfo}
                      experience={experience}
                      education={education}
                      skills={skills}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}