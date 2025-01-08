import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BsBuilding, BsCurrencyDollar, BsPencil, BsBriefcase } from "react-icons/bs";
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

interface Candidate {
  id: string;
  name: string;
  experience: string;
  techStack: string[];
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
}

export const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewing' | 'accepted' | 'rejected'>('pending');

  // Mock data
  const recruiterProfile = {
    companyName: "Tech Innovations Inc.",
    companyWebsite: "https://example.com",
    companySize: "11-50",
    fundingStage: "Seed",
    equityRange: "0.5-2.0",
    salaryRange: "80k-120k",
    roleDescription: "Looking for a full-stack developer with experience in modern web technologies...",
    techStack: ["React", "Node.js", "Python"],
    experienceRequired: "3-5"
  };

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "John Doe",
      experience: "4 years",
      techStack: ["React", "Node.js", "MongoDB"],
      appliedDate: "2024-01-08",
      status: 'pending'
    },
    {
      id: "2",
      name: "Jane Smith",
      experience: "5 years",
      techStack: ["TypeScript", "React", "AWS"],
      appliedDate: "2024-01-07",
      status: 'reviewing'
    }
  ];

  const filteredCandidates = candidates.filter(candidate => candidate.status === activeTab);

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
            Recruiter Dashboard
          </h1>
          <Button 
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            <BsBriefcase className="h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <Card className="lg:col-span-1 border-none shadow-xl bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Company Profile
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
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <BsBuilding className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Company Details</h3>
                    <p className="text-gray-600 mt-1">{recruiterProfile.companyName}</p>
                    <a 
                      href={recruiterProfile.companyWebsite} 
                      className="text-primary hover:underline mt-1 block"
                    >
                      {recruiterProfile.companyWebsite}
                    </a>
                    <p className="text-gray-600 mt-1">Size: {recruiterProfile.companySize} employees</p>
                    <p className="text-gray-600">Stage: {recruiterProfile.fundingStage}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <BsCurrencyDollar className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Compensation</h3>
                    <p className="text-gray-600 mt-1">Equity: {recruiterProfile.equityRange}%</p>
                    <p className="text-gray-600">Salary: ${recruiterProfile.salaryRange}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <HiOutlineDocumentText className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Role Requirements</h3>
                    <p className="text-gray-600 mt-1">{recruiterProfile.roleDescription}</p>
                    <p className="text-gray-600 mt-2">Experience: {recruiterProfile.experienceRequired} years</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {recruiterProfile.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidates Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="border-none shadow-xl bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                    <HiOutlineUsers className="text-primary" />
                    Applied Candidates
                  </h2>
                  <div className="flex gap-2">
                    {(['pending', 'reviewing', 'accepted', 'rejected'] as const).map((status) => (
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
                            {filteredCandidates.length}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Candidate Cards */}
                <div className="space-y-4">
                  {filteredCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 hover:border-primary/50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">Experience: {candidate.experience}</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 min-w-[200px]">
                          <p className="text-gray-500">Applied: {candidate.appliedDate}</p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="hover:bg-primary hover:text-white transition-colors"
                            >
                              View Profile
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white p-8 rounded-lg shadow-xl text-center border border-gray-100"
                    >
                      <p className="text-gray-500">No candidates found in {activeTab} status.</p>
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

export default RecruiterDashboard;
