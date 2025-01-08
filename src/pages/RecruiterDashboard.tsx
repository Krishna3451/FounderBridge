import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BsBuilding, BsCurrencyDollar, BsPencil, BsBriefcase } from "react-icons/bs";
import { HiOutlineDocumentText, HiOutlineUsers } from "react-icons/hi";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, query, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Candidate {
  id: string;
  name: string;
  experience: string;
  techStack: string[];
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
}

interface RecruiterProfile {
  companyName: string;
  companyWebsite: string;
  companySize: string;
  fundingStage: string;
  equityRange: string;
  salaryRange: string;
  roleDescription: string;
  techStack: string;
  experienceRequired: string;
  uid: string;
  email: string;
  photoURL: string;
}

interface IdeaPost extends RecruiterProfile {
  cofounderRole: string;
  ideaDescription: string;
  responsibilities: string;
  idealCandidate: string;
}

export const RecruiterDashboard = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewing' | 'accepted' | 'rejected'>('pending');
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<RecruiterProfile | null>(null);
  const [isPostingIdea, setIsPostingIdea] = useState(false);
  const [ideaPost, setIdeaPost] = useState<IdeaPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const uid = location.state?.uid;

        if (!uid) {
          toast({
            title: "Error",
            description: "User ID not found. Please try logging in again.",
            variant: "destructive"
          });
          return;
        }

        // Fetch recruiter profile
        const profileRef = doc(db, 'recruiters', uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile(profileSnap.data() as RecruiterProfile);
        }

        // Fetch candidates (this would be replaced with actual candidate data)
        // For now, using mock data
        setCandidates([
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
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.uid, toast]);

  const handleProfileUpdate = async () => {
    if (!editedProfile || !location.state?.uid) return;

    try {
      const db = getFirestore();
      const profileRef = doc(db, 'recruiters', location.state.uid);
      await updateDoc(profileRef, editedProfile);
      
      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Company profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const validateIdeaPost = (idea: IdeaPost | null): boolean => {
    if (!idea) return false;
    
    return !!(
      idea.cofounderRole &&
      idea.ideaDescription &&
      idea.responsibilities &&
      idea.idealCandidate
    );
  };

  const handlePostIdea = async () => {
    if (!ideaPost || !location.state?.uid) return;

    if (!validateIdeaPost(ideaPost)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const db = getFirestore();
      const ideaRef = collection(db, 'ideas');
      
      await addDoc(ideaRef, {
        ...ideaPost,
        recruiterId: location.state.uid,
        createdAt: new Date().toISOString(),
        status: 'active'
      });
      
      setIsPostingIdea(false);
      toast({
        title: "Success",
        description: "Your idea has been posted successfully",
      });
    } catch (error) {
      console.error('Error posting idea:', error);
      toast({
        title: "Error",
        description: "Failed to post idea. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            onClick={() => {
              setIdeaPost({
                ...profile,
                cofounderRole: '',
                ideaDescription: '',
                responsibilities: '',
                idealCandidate: ''
              });
              setIsPostingIdea(true);
            }}
          >
            <BsBriefcase className="h-4 w-4" />
            Post Idea
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
                  className="hover:bg-primary"
                  onClick={() => {
                    setEditedProfile(profile);
                    setIsEditing(true);
                  }}
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
                    <p className="text-gray-600 mt-1">{profile.companyName}</p>
                    <a 
                      href={profile.companyWebsite} 
                      className="text-primary hover:underline mt-1 block"
                    >
                      {profile.companyWebsite}
                    </a>
                    <p className="text-gray-600 mt-1">Size: {profile.companySize} employees</p>
                    <p className="text-gray-600">Stage: {profile.fundingStage}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <BsCurrencyDollar className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Compensation</h3>
                    <p className="text-gray-600 mt-1">Equity: {profile.equityRange}%</p>
                    <p className="text-gray-600">Salary: ${profile.salaryRange}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/80">
                  <HiOutlineDocumentText className="text-primary text-xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Role Requirements</h3>
                    <p className="text-gray-600 mt-1">{profile.roleDescription}</p>
                    <p className="text-gray-600 mt-2">Experience: {profile.experienceRequired} years</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.techStack.split(',').map((tech, index) => (
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
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Company Name</label>
            <Input
              value={editedProfile?.companyName}
              onChange={(e) => setEditedProfile(prev => prev ? {...prev, companyName: e.target.value} : null)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Company Website</label>
            <Input
              value={editedProfile?.companyWebsite}
              onChange={(e) => setEditedProfile(prev => prev ? {...prev, companyWebsite: e.target.value} : null)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Size</label>
              <Input
                value={editedProfile?.companySize}
                onChange={(e) => setEditedProfile(prev => prev ? {...prev, companySize: e.target.value} : null)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Funding Stage</label>
              <Input
                value={editedProfile?.fundingStage}
                onChange={(e) => setEditedProfile(prev => prev ? {...prev, fundingStage: e.target.value} : null)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Equity Range (%)</label>
              <Input
                value={editedProfile?.equityRange}
                onChange={(e) => setEditedProfile(prev => prev ? {...prev, equityRange: e.target.value} : null)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Salary Range ($)</label>
              <Input
                value={editedProfile?.salaryRange}
                onChange={(e) => setEditedProfile(prev => prev ? {...prev, salaryRange: e.target.value} : null)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Role Description</label>
            <Textarea
              value={editedProfile?.roleDescription}
              onChange={(e) => setEditedProfile(prev => prev ? {...prev, roleDescription: e.target.value} : null)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tech Stack (comma-separated)</label>
            <Input
              value={editedProfile?.techStack}
              onChange={(e) => setEditedProfile(prev => prev ? {...prev, techStack: e.target.value} : null)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Experience Required (years)</label>
            <Input
              value={editedProfile?.experienceRequired}
              onChange={(e) => setEditedProfile(prev => prev ? {...prev, experienceRequired: e.target.value} : null)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleProfileUpdate}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog open={isPostingIdea} onOpenChange={setIsPostingIdea}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <DialogHeader>
          <DialogTitle className="w-full sm:w-auto text-xl px-12 py-8 rounded-xl text-white shadow-lg 
            bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-500
            transform transition-all duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl
            active:scale-95 active:shadow-md
            backdrop-blur-sm" >
            Post a New Idea
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 p-2">
          {/* Company Details Section */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BsBuilding className="text-primary" />
                Company Details
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Name</label>
                  <Input 
                    value={ideaPost?.companyName} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Website</label>
                  <Input 
                    value={ideaPost?.companyWebsite} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company Size</label>
                  <Input 
                    value={ideaPost?.companySize} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Funding Stage</label>
                  <Input 
                    value={ideaPost?.fundingStage} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation Section */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BsCurrencyDollar className="text-primary" />
                Compensation
              </h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Equity Range (%)</label>
                  <Input 
                    value={ideaPost?.equityRange} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Salary Range ($)</label>
                  <Input 
                    value={ideaPost?.salaryRange} 
                    disabled 
                    className="bg-gray-50/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Idea Details Section */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <HiOutlineDocumentText className="text-primary" />
                Idea Details
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Co-founder Role</label>
                <Input
                  value={ideaPost?.cofounderRole}
                  onChange={(e) => setIdeaPost(prev => prev ? {...prev, cofounderRole: e.target.value} : null)}
                  placeholder="e.g., Technical Co-founder, Product Co-founder"
                  className="border-gray-200 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Detailed Idea Description</label>
                <Textarea
                  value={ideaPost?.ideaDescription}
                  onChange={(e) => setIdeaPost(prev => prev ? {...prev, ideaDescription: e.target.value} : null)}
                  placeholder="Describe your idea in detail..."
                  className="h-32 border-gray-200 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Key Responsibilities</label>
                <Textarea
                  value={ideaPost?.responsibilities}
                  onChange={(e) => setIdeaPost(prev => prev ? {...prev, responsibilities: e.target.value} : null)}
                  placeholder="List the key responsibilities..."
                  className="h-24 border-gray-200 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ideal Candidate Profile</label>
                <Textarea
                  value={ideaPost?.idealCandidate}
                  onChange={(e) => setIdeaPost(prev => prev ? {...prev, idealCandidate: e.target.value} : null)}
                  placeholder="Describe your ideal co-founder..."
                  className="h-24 border-gray-200 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements Section */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BsBriefcase className="text-primary" />
                Technical Requirements
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tech Stack</label>
                <Input 
                  value={ideaPost?.techStack} 
                  disabled 
                  className="bg-gray-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Experience Required</label>
                <Input 
                  value={ideaPost?.experienceRequired} 
                  disabled 
                  className="bg-gray-50/50"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsPostingIdea(false)}
              disabled={isSubmitting}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePostIdea}
              disabled={isSubmitting || !validateIdeaPost(ideaPost)}
              className="bg-primary hover:bg-primary/90 text-white px-6"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span>Posting...</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                'Post Idea'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>

  );
};

export default RecruiterDashboard;
