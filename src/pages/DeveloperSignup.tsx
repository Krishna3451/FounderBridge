import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { BsBriefcase } from "react-icons/bs";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  experience: string;
  skills: string;
  bio: string;
  github: string;
  university: string;
  degree: string;
  graduationYear: string;
}

export const DeveloperSignup = () => {
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    experience: '',
    skills: '',
    bio: '',
    github: '',
    university: '',
    degree: '',
    graduationYear: ''
  });
  
  // Mock opportunities data
  const mockOpportunities = [
    {
      id: 1,
      companyName: "TechStart Innovation",
      role: "Lead Full Stack Developer",
      equity: "3-5%",
      description: "Looking for a technical co-founder to build our MVP. We're disrupting the EdTech space.",
      requirements: ["5+ years experience", "React/Node.js", "System Architecture"],
      terms: "3-month trial period, full-time commitment required",
      funding: "Seed funded - $500K"
    },
    {
      id: 2,
      companyName: "AI Solutions Co",
      role: "Senior AI Engineer",
      equity: "2-4%",
      description: "Building next-gen AI tools for enterprise customers. Series A startup.",
      requirements: ["ML/AI experience", "Python", "Cloud Architecture"],
      terms: "Immediate start, flexible hours",
      funding: "Series A - $2M raised"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSelectChange = (value: string, field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsProfileCreated(true);
    } else {
      alert('Please fill in all fields before submitting');
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (isProfileCreated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            {...fadeIn}
            className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            Matching Opportunities
          </motion.h2>
          <div className="space-y-6">
            {mockOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">
                          {opportunity.companyName}
                        </h3>
                        <p className="text-lg font-medium mt-1">{opportunity.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {opportunity.equity} Equity
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-gray-600">{opportunity.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium">Requirements:</h4>
                      <ul className="list-disc list-inside mt-2 text-gray-600">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Terms:</h4>
                        <p className="text-gray-600">{opportunity.terms}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Funding Status:</h4>
                        <p className="text-gray-600">{opportunity.funding}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          to="/" 
          className="inline-block text-2xl font-extrabold text-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          FounderBridge
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 lg:pr-8"
        >
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome to FounderBridge
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our community of talented developers and find your perfect startup match. We connect passionate engineers with innovative founders.
          </p>
          <div className="space-y-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Access exclusive startup opportunities</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Get matched with founders who value your skills</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Earn competitive equity packages</p>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
            {/* <blockquote className="text-gray-700 italic">
              "FounderBridge helped me find the perfect startup opportunity where I could make a real impact while getting significant equity."
            </blockquote> */}
           
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <Card className="border-none shadow-xl">
              <CardHeader>
                <motion.h2 
                  {...fadeIn}
                  className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                >
                  Developer Profile
                </motion.h2>
                <motion.p 
                  {...fadeIn}
                  transition={{ delay: 0.2 }}
                  className="mt-2 text-center text-gray-600"
                >
                  Let's create your developer profile to find the perfect opportunity
                </motion.p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Personal Information Section */}
                <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-lg">
                      <BsBriefcase className="text-primary" />
                    </span>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select onValueChange={(value) => handleSelectChange(value, 'experience')} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Primary Skills</Label>
                      <Input 
                        id="skills" 
                        placeholder="e.g., React, Node.js, Python" 
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">About You</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-[100px] p-3 border rounded-md"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Professional Information Section */}
                <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-lg">
                      <FaGithub className="text-primary" />
                    </span>
                    Professional Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          github.com/
                        </span>
                        <Input 
                          id="github" 
                          className="rounded-l-none" 
                          placeholder="username" 
                          value={formData.github}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                   

                    
                  </div>
                </motion.div>

                {/* Education Section */}
                <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-lg">
                      <HiOutlineAcademicCap className="text-primary" />
                    </span>
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">College/University</Label>
                      <Input 
                        id="university" 
                        placeholder="e.g., Stanford University" 
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree & Major</Label>
                      <Input 
                        id="degree" 
                        placeholder="e.g., BS Computer Science" 
                        value={formData.degree}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'graduationYear')} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  className="hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isFormValid()}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
                >
                  Create Profile
                </Button>
              </CardFooter>
            </Card>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};