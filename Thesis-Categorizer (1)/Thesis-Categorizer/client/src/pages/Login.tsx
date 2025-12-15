import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuthStore, UserRole } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail } from "lucide-react";

export function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuthStore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("viewer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password.",
      });
      return;
    }

    // Mock authentication check
    login(email, role);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${role === 'admin' ? 'Administrator' : 'Viewer'}.`,
    });
    
    setLocation(role === 'admin' ? '/admin' : '/catalog');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="viewer" className="w-full mb-6" onValueChange={(v) => setRole(v as UserRole)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="viewer">Student / Viewer</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  className="pl-9" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <div>
            Don't have an account?{" "}
            <Link href="/signup">
              <a className="text-primary hover:underline">Sign up</a>
            </Link>
          </div>
          <div className="text-xs">
            <p>Demo Credentials:</p>
            <p>Any email/password works</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
