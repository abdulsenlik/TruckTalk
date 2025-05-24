import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">TruckTalk</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/modules"
              className="text-sm font-medium hover:text-blue-600"
            >
              Modules
            </Link>
            <Link
              to="/emergency"
              className="text-sm font-medium hover:text-blue-600"
            >
              Emergency
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TruckTalk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn essential English phrases for truck drivers. Master traffic
            stops, emergency situations, and professional communication.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/modules">Start Learning</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/emergency">Emergency Phrases</Link>
            </Button>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Learning Modules</h3>
              <p className="text-gray-600 mb-4">
                Structured lessons for traffic stops and communication
              </p>
              <Button variant="outline" asChild>
                <Link to="/modules">View Modules</Link>
              </Button>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Emergency Phrases</h3>
              <p className="text-gray-600 mb-4">
                Critical phrases for urgent situations
              </p>
              <Button variant="outline" asChild>
                <Link to="/emergency">Emergency Help</Link>
              </Button>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Your Progress</h3>
              <p className="text-gray-600 mb-4">Track your learning journey</p>
              <Button variant="outline" asChild>
                <Link to="/progress">View Progress</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} TruckTalk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHome;
