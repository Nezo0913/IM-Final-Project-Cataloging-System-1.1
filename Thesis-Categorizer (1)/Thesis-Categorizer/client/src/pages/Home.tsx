import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BookOpen, GraduationCap, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store";

export function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 pb-2">
                Department of Computer Science
                <br />
                Thesis Cataloging System
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A centralized repository for undergraduate and graduate theses in Frontend and Web Development.
                Discover, research, and explore years of academic innovation.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/catalog">
                <Button size="lg" className="h-12 px-8">
                  Browse Theses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {!user && (
                <Link href="/signup">
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Comprehensive Archive</h3>
              <p className="text-muted-foreground">
                Access a complete digital library of student theses dating back to 2020, categorized for easy retrieval.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Search</h3>
              <p className="text-muted-foreground">
                Quickly find relevant research by title, author, year, or specific development category.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Academic Excellence</h3>
              <p className="text-muted-foreground">
                Showcasing the best work from our department's students in modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to explore our research?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our community to access full thesis documents and stay updated with the latest submissions.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            {!user ? (
               <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                 <Link href="/login">
                   <Button className="w-full min-[400px]:w-auto" size="lg">Log In</Button>
                 </Link>
                 <Link href="/signup">
                   <Button variant="outline" className="w-full min-[400px]:w-auto" size="lg">Create Account</Button>
                 </Link>
               </div>
            ) : (
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link href="/catalog">
                   <Button className="w-full min-[400px]:w-auto" size="lg">Go to Catalog</Button>
                 </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
