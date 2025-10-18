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
import { Eye, EyeOff, Music2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account before logging in.",
      });
      
      // Trigger transition animation
      setIsTransitioning(true);
      
      // Navigate after animation
      setTimeout(() => {
        setLocation("/login");
      }, 600);
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
            Join Guitar Dice
          </CardTitle>
          <p className="text-center text-sm" style={{ color: '#D4AF37' }}>Start your musical journey</p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
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
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
}