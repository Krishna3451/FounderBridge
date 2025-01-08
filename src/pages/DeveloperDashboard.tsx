import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineBriefcase } from "react-icons/hi";
import { BsPencil, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Navbar } from "@/components/Navbar";
interface Job {
  id: string;
  companyName: string;
  role: string;
  location: string;
  type: string;
  salary: string;
  equity: string;
  techStack: string[];
  description: string;
  postedDate: string;
}

export const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'applied'>('all');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Mock developer data - replace with actual data from your backend
  const developerProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    experience: "4 years",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    bio: "Full-stack developer with a passion for building scalable web applications...",
    github: "https://github.com/johndoe",
    university: "Stanford University",
    degree: "Computer Science",
    graduationYear: "2020"
  };

  // Mock job listings - replace with actual data from your backend
  const jobs: Job[] = [
    {
      id: "1",
      companyName: "Tech Innovations Inc.",
      role: "Senior Full Stack Developer",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      salary: "$120k-160k",
      equity: "0.5-1.0%",
      techStack: ["React", "Node.js", "AWS", "TypeScript"],
      description: "Looking for a senior full-stack developer to join our growing team...",
      postedDate: "2024-01-08"
    },
    {
      id: "2",
      companyName: "Future Finance",
      role: "Frontend Developer",
      location: "New York (Hybrid)",
      type: "Full-time",
      salary: "$100k-130k",
      equity: "0.25-0.5%",
      techStack: ["React", "TypeScript", "GraphQL"],
      description: "Join our fintech startup revolutionizing the banking industry...",
      postedDate: "2024-01-07"
    }
  ];

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'saved') return savedJobs.includes(job.id);
    // Add applied jobs filter when you have that data
    return true;
  });

  return (
    <>
    <Navbar/>    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Developer Dashboard
          </h1>
          <Button 
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <HiOutlineBriefcase className="h-4 w-4" />
            Update Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <Card className="lg:col-span-1 border-none shadow-xl bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Developer Profile
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <BsPencil className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {developerProfile.firstName} {developerProfile.lastName}
                  </h3>
                  <p className="text-gray-600">{developerProfile.email}</p>
                  <p className="text-gray-600">Experience: {developerProfile.experience}</p>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {developerProfile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <HiOutlineAcademicCap className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-gray-600 mt-1">{developerProfile.university}</p>
                    <p className="text-gray-600">{developerProfile.degree}</p>
                    <p className="text-gray-600">Class of {developerProfile.graduationYear}</p>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <FaGithub className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">GitHub Profile</h3>
                    <a 
                      href={developerProfile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-1 block"
                    >
                      {developerProfile.github}
                    </a>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">About</h3>
                  <p className="text-gray-600">{developerProfile.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="border-none shadow-xl bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                    <HiOutlineBriefcase className="text-primary" />
                    Job Opportunities
                  </h2>
                  <div className="flex gap-2">
                    {(['all', 'saved', 'applied'] as const).map((status) => (
                      <Button
                        key={status}
                        variant={activeTab === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(status)}
                        className={`capitalize ${
                          activeTab === status
                            ? 'bg-primary hover:bg-primary/90'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {status}
                        {activeTab === status && (
                          <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                            {filteredJobs.length}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 hover:border-primary/50 transition-all"
                    >
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                            <p className="text-gray-600 mt-1">{job.companyName}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSaveJob(job.id)}
                            className="hover:bg-primary/10"
                          >
                            {savedJobs.includes(job.id) ? (
                              <BsBookmarkFill className="h-5 w-5 text-primary" />
                            ) : (
                              <BsBookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>${job.salary}</span>
                          <span>•</span>
                          <span>{job.equity}% equity</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-600">{job.description}</p>

                        <div className="flex justify-between items-center pt-4">
                          <p className="text-sm text-gray-500">Posted: {job.postedDate}</p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              className="hover:bg-primary hover:text-white transition-colors"
                            >
                              View Details
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredJobs.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white p-8 rounded-lg shadow-xl text-center border border-gray-100"
                    >
                      <p className="text-gray-500">No jobs found in {activeTab} category.</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default DeveloperDashboard;
