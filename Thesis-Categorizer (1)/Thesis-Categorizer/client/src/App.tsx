import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Catalog } from "@/pages/Catalog";
import { ThesisDetail } from "@/pages/ThesisDetail";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AddThesis } from "@/pages/AddThesis";
import NotFound from "@/pages/not-found";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

// Protected Route Wrapper
function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType<any>, adminOnly?: boolean }) {
  const [location, setLocation] = useLocation();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    } else if (adminOnly && user.role !== 'admin') {
      setLocation("/");
    }
  }, [user, adminOnly, setLocation]);

  if (!user || (adminOnly && user.role !== 'admin')) {
    return null; // Or a loading spinner
  }

  return <Component />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/thesis/:id" component={ThesisDetail} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin">
          <ProtectedRoute component={AdminDashboard} adminOnly />
        </Route>
        <Route path="/add">
          <ProtectedRoute component={AddThesis} adminOnly />
        </Route>
        <Route path="/edit/:id">
          <ProtectedRoute component={AddThesis} adminOnly />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
