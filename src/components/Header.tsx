
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-ocean-700 font-playfair">
            JV Holidays
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-ocean-600 transition-colors font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-ocean-600 transition-colors font-medium">
            Destinations
          </a>
          <a href="#" className="text-gray-700 hover:text-ocean-600 transition-colors font-medium">
            Packages
          </a>
          <a href="#" className="text-gray-700 hover:text-ocean-600 transition-colors font-medium">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-ocean-600 transition-colors font-medium">
            Contact
          </a>
        </nav>

        <div className="md:hidden">
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
