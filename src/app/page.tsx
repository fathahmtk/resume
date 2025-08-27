import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Zap, Download } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Resume Builder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Create stunning professional resumes with our intuitive builder. 
            Real-time preview, modern templates, and instant PDF export.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <FileText className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Modern Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from professional modern and classic resume templates
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Real-time Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                See your resume update instantly as you type
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>PDF Export</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Download your resume as a professional PDF document
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <CardTitle>User Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Intuitive interface for building your perfect resume
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-lg mx-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Create Account</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign up with your email and password to get started
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Build Resume</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fill in your information and choose your template
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Export & Share</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Download as PDF or print your professional resume
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to Create Your Perfect Resume?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of professionals who have built their resumes with us
        </p>
        <Link href="/register">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Building Now
          </Button>
        </Link>
      </section>
    </main>
  );
}