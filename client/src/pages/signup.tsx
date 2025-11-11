import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type RegisterUser } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Music2, Mail, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(true);

  // Signup form schema with validation
  const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<RegisterUser>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      setIsSubmitting(true);
      
      const response = await apiRequest("POST", "/api/auth/register", data);
      const result = await response.json();
      
      // Store the email for resend functionality
      setUserEmail(data.email);
      
      // Check if verification is required (production) or bypassed (development)
      setRequiresVerification(result.requiresVerification !== false);
      
      // Show success screen instead of redirecting immediately
      setSignupSuccess(true);
      
      toast({
        title: "Account created!",
        description: result.requiresVerification !== false 
          ? "Check your email to verify your account."
          : "You can now log in!",
      });
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Parse error message from the thrown error
      let errorMessage = "An error occurred during signup";
      
      if (error.message) {
        // Extract JSON from error message format "400: {json}"
        const match = error.message.match(/^\d+:\s*(.+)$/);
        if (match) {
          try {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.message || errorMessage;
          } catch {
            // If JSON parsing fails, use the raw message
            errorMessage = match[1] || errorMessage;
          }
        }
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerification = async () => {
    if (!userEmail) return;
    
    try {
      setIsResending(true);
      
      const response = await apiRequest("POST", "/api/auth/resend-verification", { email: userEmail });
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Email sent!",
          description: "Verification email has been resent. Check your inbox and spam folder.",
        });
      } else {
        toast({
          title: "Failed to send email",
          description: result.message || "Please try again in a few moments.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast({
        title: "Error",
        description: "Could not resend verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div 
      className="min-h-[100svh] flex items-start justify-center px-3 py-3 sm:py-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 50%, #0a0a0a 100%)'
      }}
      animate={isTransitioning ? { 
        opacity: 0, 
        scale: 0.95,
        filter: "blur(10px)"
      } : { 
        opacity: 1, 
        scale: 1,
        filter: "blur(0px)"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Animated gradient background mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-3xl animate-pulse" 
          style={{ 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
            animationDuration: '4.5s'
          }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-3xl animate-pulse" 
          style={{ 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
            animationDuration: '5.5s',
            animationDelay: '1s'
          }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] blur-3xl animate-pulse" 
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, transparent 70%)',
            animationDuration: '6.5s',
            animationDelay: '2s'
          }} />
      </div>
      
      {/* Floating musical notes and chords */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute text-5xl top-[15%] right-[12%] animate-float" style={{ color: 'rgba(212, 175, 55, 0.15)', animationDelay: '0s', animationDuration: '9s' }}>♪</div>
        <div className="absolute text-6xl top-[55%] left-[10%] animate-float" style={{ color: 'rgba(212, 175, 55, 0.12)', animationDelay: '2s', animationDuration: '11s' }}>♫</div>
        <div className="absolute text-4xl bottom-[30%] right-[20%] animate-float" style={{ color: 'rgba(212, 175, 55, 0.1)', animationDelay: '4s', animationDuration: '10s' }}>♬</div>
        <div className="absolute text-3xl top-[35%] left-[25%] animate-float font-bold" style={{ color: 'rgba(212, 175, 55, 0.1)', animationDelay: '1s', animationDuration: '8s' }}>Em</div>
        <div className="absolute text-4xl bottom-[20%] left-[35%] animate-float" style={{ color: 'rgba(212, 175, 55, 0.08)', animationDelay: '3s', animationDuration: '12s' }}>♩</div>
        <div className="absolute text-3xl top-[45%] right-[30%] animate-float font-bold" style={{ color: 'rgba(212, 175, 55, 0.12)', animationDelay: '5s', animationDuration: '9s' }}>Am</div>
      </div>
      
      {/* Subtle guitar silhouette overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%, rgba(212, 175, 55, 0.05) 100%)',
            animationDuration: '7s'
          }}
        />
      </div>
      
      <motion.div
        animate={isTransitioning ? { 
          y: -20,
          opacity: 0 
        } : { 
          y: 0,
          opacity: 1 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="w-full max-w-sm shadow-2xl bg-black/95 backdrop-blur-md relative z-10 overflow-hidden" 
          style={{ 
            border: '2px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.15), 0 20px 60px rgba(0, 0, 0, 0.9)'
          }}>
          {/* Gold shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />
          
        <CardHeader className="space-y-2 pb-3 sm:pb-6 pt-4 sm:pt-6 relative">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 flex items-center justify-center shadow-lg relative"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 50%, #D4AF37 100%)',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), inset 0 2px 10px rgba(255,255,255,0.2)'
              }}>
              {signupSuccess ? (
                <CheckCircle2 className="h-8 w-8 text-black" />
              ) : (
                <Music2 className="h-8 w-8 text-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
          </div>
          <CardTitle className="text-lg sm:text-3xl text-center font-bold tracking-tight" 
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
            }}>
            {signupSuccess ? "Check Your Email" : "Join Guitar Dice"}
          </CardTitle>
          <p className="text-center text-sm" style={{ color: '#D4AF37' }}>
            {signupSuccess 
              ? "One more step to rock with us!" 
              : "Start your musical journey"}
          </p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {signupSuccess && requiresVerification ? (
            // Success screen with verification instructions
            <div className="space-y-4">
              {/* Success message */}
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-sm">
                  Account created successfully!
                </AlertDescription>
              </Alert>

              {/* Email sent confirmation with icon */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                <Mail className="h-5 w-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-1">Verification email sent to:</p>
                  <p className="text-sm text-[#D4AF37] font-mono break-all">{userEmail}</p>
                </div>
              </div>

              {/* Clear instructions */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">1.</span>
                  <p>Open your email inbox and look for an email from <span className="font-semibold">Guitar Dice</span></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">2.</span>
                  <p>Click the <span className="font-semibold">"Verify Email Address"</span> button in the email</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">3.</span>
                  <p>Return here and log in to start creating riffs!</p>
                </div>
              </div>

              {/* Spam folder warning */}
              <Alert className="border-amber-500/50 bg-amber-500/10">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-xs">
                  <strong>Can't find the email?</strong> Check your spam or junk folder. 
                  The verification link expires in 24 hours.
                </AlertDescription>
              </Alert>

              {/* Resend button - prominent */}
              <Button
                onClick={resendVerification}
                disabled={isResending}
                className="w-full h-12 font-bold shadow-lg relative overflow-hidden group"
                variant="outline"
                style={{
                  borderColor: '#D4AF37',
                  borderWidth: '2px',
                }}
                data-testid="button-resend-verification"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>

              {/* Continue to login button */}
              <div className="pt-2 border-t border-border">
                <p className="text-center text-xs text-muted-foreground mb-3">
                  Already verified your email?
                </p>
                <Link href="/login">
                  <Button 
                    className="w-full h-11 text-black font-bold shadow-lg relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(0,0,0,0.5)'
                    }}
                    data-testid="button-go-to-login"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">Continue to Login</span>
                  </Button>
                </Link>
              </div>
            </div>
          ) : signupSuccess && !requiresVerification ? (
            // Development mode - no verification needed
            <div className="space-y-4">
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription>
                  Account created! You can log in immediately.
                </AlertDescription>
              </Alert>

              <Link href="/login">
                <Button 
                  className="w-full h-11 text-black font-bold shadow-lg relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(0,0,0,0.5)'
                  }}
                  data-testid="button-go-to-login"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Go to Login</span>
                </Button>
              </Link>
            </div>
          ) : (
            // Original signup form
            <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Username" 
                        className="h-10"
                        data-testid="input-username"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        className="h-10"
                        data-testid="input-email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 characters" 
                          className="pr-10 h-10"
                          data-testid="input-password"
                          {...field}
                          value={field.value || ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-11 mt-2 text-black font-bold shadow-lg relative overflow-hidden group" 
                disabled={isSubmitting}
                data-testid="button-signup"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(0,0,0,0.5)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{isSubmitting ? "Creating..." : "Create account"}</span>
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-400">Have an account? </span>
            <Link href="/login">
              <Button variant="link" className="p-0 h-auto font-semibold hover:underline" style={{ color: '#D4AF37' }} data-testid="link-login">
                Sign in
              </Button>
            </Link>
          </div>
            </>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
}