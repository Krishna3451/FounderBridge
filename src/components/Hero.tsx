import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-8">
          Connect with Your Perfect Co-Founder
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-20 max-w-3xl mx-auto">
          Whether you're a founder with a vision or a developer looking for an exciting opportunity,
          find your ideal match and build something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
          <Button 
            size="lg" 
            asChild 
            className="w-full sm:w-auto text-xl px-12 py-8 rounded-xl hover:scale-105 transition-transform"
          >
            <Link to="/signup">I'm a Founder</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/signup">I'm a Developer</Link>
          </Button>
        </div>
        <div className="mt-16 text-sm text-gray-500">
          Join our community of founders and developers building the next generation of startups
        </div>
      </div>
    </div>
  );
};
