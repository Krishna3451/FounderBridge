import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setSelectedRole = useAuthStore((state) => state.setSelectedRole);
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'candidate' | 'recruiter') => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    navigate('/signin');
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
            FounderBridge
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/signin">
              <Button>
                Login
              </Button>
            </Link>
            <div className="relative">
              <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                Sign Up
              </Button>
              <div className={`absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg transition-all duration-200 ${
                isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                <div className="py-2">
                  <button
                    onClick={() => handleRoleSelect('recruiter')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                  >
                    I'm looking for candidates
                  </button>
                  <button
                    onClick={() => handleRoleSelect('candidate')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                  >
                    I'm looking for a job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
