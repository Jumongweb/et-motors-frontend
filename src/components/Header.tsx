
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E&T Motors
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Reviews
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Pricing
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link to="/browse">Get Started</Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="border-t border-white/20 pt-4 flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
