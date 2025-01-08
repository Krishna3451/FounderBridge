import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createJobListing } from "@/lib/user";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";

interface JobFormData {
  role: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  equity: string;
  techStack: string;
  description: string;
  requirements: string;
  responsibilities: string;
}

export const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<JobFormData>({
    role: '',
    location: '',
    type: 'full-time',
    salary: '',
    equity: '',
    techStack: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/auth/recruiter');
        return;
      }

      const jobData = {
        recruiterId: user.uid,
        companyName: '', // Will be filled from user profile
        role: formData.role,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        equity: formData.equity,
        techStack: formData.techStack.split(',').map(tech => tech.trim()),
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        responsibilities: formData.responsibilities.split('\n').filter(resp => resp.trim()),
        status: 'active' as const
      };

      const result = await createJobListing(jobData);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Job listing created successfully!",
          variant: "default"
        });

        setTimeout(() => {
          navigate('/recruiter/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating job listing:', error);
      toast({
        title: "Error",
        description: "Failed to create job listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Post a New Job
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Fill in the details below to create a new job listing
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Senior Full Stack Developer"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA (Remote)"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Employment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange('type', value as JobFormData['type'])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    placeholder="e.g., $120k-160k"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="equity">Equity Range (Optional)</Label>
                  <Input
                    id="equity"
                    placeholder="e.g., 0.5-1.0%"
                    value={formData.equity}
                    onChange={(e) => handleInputChange('equity', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="techStack">Required Tech Stack</Label>
                  <Input
                    id="techStack"
                    placeholder="e.g., React, Node.js, AWS (comma-separated)"
                    value={formData.techStack}
                    onChange={(e) => handleInputChange('techStack', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role and your company..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the requirements (one per line)"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the responsibilities (one per line)"
                    value={formData.responsibilities}
                    onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/recruiter/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit">
                Post Job
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </motion.div>
  );
};

export default PostJob;
