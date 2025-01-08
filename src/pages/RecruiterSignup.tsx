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
import { BsBuilding, BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";

export const RecruiterSignup = () => {
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
            Find Your Next Tech Co-founder
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Connect with talented developers who can bring your vision to life. FounderBridge helps you find the perfect technical match for your startup.
          </p>
          <div className="space-y-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Access a pool of pre-vetted developers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Find developers who match your tech stack</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Fast-track your startup's technical growth</p>
            </div>
          </div>
         
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-none shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Recruiter Profile
              </h2>
              <p className="mt-2 text-center text-gray-600">
                Let's create your recruiter profile to find talented developers
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-primary/10 rounded-lg">
                    <BsBuilding className="text-primary" />
                  </span>
                  Company Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="e.g., Tech Innovations Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input id="companyWebsite" placeholder="e.g., https://example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingStage">Funding Stage</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="bootstrap">Bootstrapped</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="seriesA">Series A</SelectItem>
                      <SelectItem value="seriesB">Series B</SelectItem>
                      <SelectItem value="seriesC">Series C+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Equity and Compensation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-primary/10 rounded-lg">
                    <BsCurrencyDollar className="text-primary" />
                  </span>
                  Equity & Compensation
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="equityRange">Equity Range (%)</Label>
                    <Input id="equityRange" placeholder="e.g., 0.5-2.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range ($)</Label>
                    <Input id="salaryRange" placeholder="e.g., 80k-120k" />
                  </div>
                </div>
              </motion.div>

              {/* Role Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-primary/10 rounded-lg">
                    <HiOutlineDocumentText className="text-primary" />
                  </span>
                  Role Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Role Description</Label>
                  <textarea 
                    id="roleDescription"
                    className="w-full min-h-[100px] p-3 border rounded-md"
                    placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Required Tech Stack</Label>
                  <Input id="techStack" placeholder="e.g., React, Node.js, Python" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceRequired">Experience Required</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select required experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
                Create Profile
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecruiterSignup;