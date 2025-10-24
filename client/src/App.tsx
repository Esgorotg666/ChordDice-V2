import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { BackgroundProvider } from "@/contexts/background-context";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/home";
import TappingPage from "@/pages/tapping";
import ScalesPage from "@/pages/scales";
import ExercisesPage from "@/pages/exercises";
import ClassroomPage from "@/pages/classroom";
import ReferralsPage from "@/pages/referrals";
import ChatPage from "@/pages/chat";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import VerifyEmailPage from "@/pages/verify-email";
import DeleteAccountPage from "@/pages/deleteAccount";
import AccountDeletionInfoPage from "@/pages/accountDeletionInfo";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tapping" component={TappingPage} />
      <Route path="/scales" component={ScalesPage} />
      <Route path="/exercises" component={ExercisesPage} />
      <Route path="/classroom" component={ClassroomPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/verify-email" component={VerifyEmailPage} />
      <Route path="/delete-account" component={DeleteAccountPage} />
      <Route path="/account-deletion" component={AccountDeletionInfoPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/referrals" component={ReferralsPage} />
      <Route path="/chat" component={ChatPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BackgroundProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </BackgroundProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
