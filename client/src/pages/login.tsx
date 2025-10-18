import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, type LoginUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Music2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import warlockImage from "@assets/stock_images/bc_rich_warlock_guit_f2a440e9.jpg";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Check for verification success parameter
  const searchParams = new URLSearchParams(window.location.search);
  const isVerified = searchParams.get('verified') === 'true';

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      setIsSubmitting(true);
      setNeedsVerification(false);
      
      const response = await apiRequest("POST", "/api/auth/login", data);

      const result = await response.json();

      if (response.ok) {
        // Set user data directly from login response instead of immediately refetching
        queryClient.setQueryData(["/api/auth/user"], result.user);
        
        // Small delay to ensure session is saved before any other requests
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        }, 100);
        
        toast({
          title: "Welcome back!",
          description: "Successfully logged in",
        });
        
        // Trigger transition animation
        setIsTransitioning(true);
        
        // Navigate after animation
        setTimeout(() => {
          setLocation("/");
        }, 600);
      } else {
        if (result.requiresVerification) {
          setNeedsVerification(true);
          setUserEmail(result.email || "");
        }
        
        toast({
          title: "Login failed",
          description: result.message || "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // Parse error message that contains JSON (format: "403: {json}")
      if (error.message && typeof error.message === 'string') {
        const match = error.message.match(/^\d+:\s*(\{.*\})$/);
        if (match) {
          try {
            const result = JSON.parse(match[1]);
            
            if (result.requiresVerification) {
              setNeedsVerification(true);
              setUserEmail(result.email || "");
            }
            
            toast({
              title: "Login failed",
              description: result.message || "Invalid username or password",
              variant: "destructive",
            });
            return;
          } catch (parseError) {
            // Failed to parse JSON, fall through to network error
          }
        }
      }
      
      // Check if this is a response error with verification data (alternative format)
      if (error?.response) {
        try {
          const result = await error.response.json();
          
          if (result.requiresVerification) {
            setNeedsVerification(true);
            setUserEmail(result.email || "");
          }
          
          toast({
            title: "Login failed",
            description: result.message || "Invalid username or password",
            variant: "destructive",
          });
          return;
        } catch (parseError) {
          // Failed to parse response, fall through to network error
        }
      }
      toast({
        title: "Network error", 
        description: "Please check your connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerification = async () => {
    try {
      const response = await apiRequest("POST", "/api/auth/resend-verification", { email: userEmail });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Verification email sent",
          description: "Please check your inbox for the verification link",
        });
      } else {
        toast({
          title: "Failed to send email",
          description: result.message || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast({
        title: "Network error",
        description: "Please check your connection and try again",
        variant: "destructive",
      });
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
      {/* BC Rich Warlock Background with enhanced visibility */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${warlockImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5) contrast(1.3) sepia(0.3) saturate(1.2)'
          }}
        />
      </div>
      
      {/* Dark gold accent glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl opacity-20" 
          style={{ background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 60%)' }} />
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
              <Music2 className="h-8 w-8 text-black" />
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
            Guitar Dice
          </CardTitle>
          <p className="text-center text-sm" style={{ color: '#D4AF37' }}>Welcome back, guitarist</p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {isVerified && (
            <Alert className="mb-3 text-sm py-2 border-green-200 bg-green-50 text-green-800">
              <div className="h-4 w-4 text-green-600">✓</div>
              <AlertDescription className="text-xs">
                Email verified! You can log in.
              </AlertDescription>
            </Alert>
          )}
          
          {needsVerification && (
            <Alert className="mb-3 text-sm py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Verify email first.{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal underline text-xs"
                  onClick={resendVerification}
                  data-testid="button-resend-verification"
                >
                  Resend
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
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
                          placeholder="Password" 
                          className="pr-10 h-10"
                          data-testid="input-password"
                          {...field} 
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
                data-testid="button-login"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 10px rgba(0,0,0,0.5)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{isSubmitting ? "Signing in..." : "Sign in"}</span>
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-400">No account? </span>
            <Link href="/signup">
              <Button variant="link" className="p-0 h-auto font-semibold hover:underline" style={{ color: '#D4AF37' }} data-testid="link-signup">
                Sign up
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
}