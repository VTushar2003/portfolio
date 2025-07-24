import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import CursorAnimation from "./components/cursor-animation";
import MinimalistNavigation from "./components/minimalist-navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          </div>
        }>
          <CursorAnimation />
          <MinimalistNavigation />
          <Toaster />
          <Router />
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
