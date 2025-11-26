import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type RegisterUser } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Music2, User, Mail, Lock, Zap, Star, Sparkles, Guitar } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      await response.json();
      
      toast({
        title: "Account created!",
        description: "You can now log in with your credentials.",
      });
      
      setIsTransitioning(true);
      
      setTimeout(() => {
        setLocation("/login");
      }, 600);
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      let errorMessage = "An error occurred during signup";
      
      if (error.message) {
        const match = error.message.match(/^\d+:\s*(.+)$/);
        if (match) {
          try {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.message || errorMessage;
          } catch {
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

  const features = [
    { icon: Zap, text: "Instant chord progressions" },
    { icon: Star, text: "19 professional scales" },
    { icon: Guitar, text: "Genre-specific riffs" },
  ];

  return (
    <motion.div 
      className="min-h-[100svh] flex items-center justify-center px-4 py-6 relative overflow-hidden"
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
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 50%)' }}
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating musical elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['Am', 'G', 'C', 'D', 'Em', 'F'].map((chord, i) => (
          <motion.div
            key={chord}
            className="absolute text-2xl font-bold"
            style={{ 
              color: 'rgba(212, 175, 55, 0.15)',
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {chord}
          </motion.div>
        ))}
        {['♪', '♫', '♬', '♩'].map((note, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ 
              color: 'rgba(212, 175, 55, 0.12)',
              right: `${10 + (i * 20)}%`,
              bottom: `${15 + (i * 15)}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isTransitioning ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Headline above card */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 30%, #FFF5CC 50%, #FFD700 70%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(212, 175, 55, 0.4)'
            }}>
            Guitar Dice
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Unleash your creativity with random chord progressions
          </p>
        </motion.div>

        <Card className="shadow-2xl bg-black/80 backdrop-blur-xl relative overflow-hidden" 
          style={{ 
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 60px rgba(212, 175, 55, 0.15), 0 25px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(212, 175, 55, 0.2)'
          }}>
          
          {/* Animated border glow */}
          <motion.div 
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ 
              border: '1px solid transparent',
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent) border-box',
            }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 pointer-events-none" />
          
          <CardHeader className="space-y-4 pb-2 pt-6 relative">
            {/* Logo with pulse animation */}
            <motion.div 
              className="flex justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-xl rounded-full"
                  style={{ background: 'rgba(212, 175, 55, 0.4)' }} />
                <div className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl relative"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #FFD700 100%)',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), inset 0 2px 15px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)'
                  }}>
                  <Music2 className="h-10 w-10 text-black drop-shadow-lg" />
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-300" />
                </div>
              </div>
            </motion.div>
            
            <div className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold text-white">
                Create Your Account
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Join thousands of guitarists worldwide
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{ 
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <feature.icon className="h-3.5 w-3.5" style={{ color: '#D4AF37' }} />
                  <span style={{ color: '#D4AF37' }}>{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">Username</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                          <Input 
                            placeholder="Choose a username" 
                            className="h-12 pl-10 bg-black/50 border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
                            data-testid="input-username"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
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
                      <FormLabel className="text-gray-300 text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="h-12 pl-10 bg-black/50 border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
                            data-testid="input-email"
                            {...field} 
                          />
                        </div>
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
                      <FormLabel className="text-gray-300 text-sm font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 6 characters" 
                            className="h-12 pl-10 pr-12 bg-black/50 border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
                            data-testid="input-password"
                            {...field}
                            value={field.value || ""}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500 hover:text-[#D4AF37] transition-colors" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500 hover:text-[#D4AF37] transition-colors" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-2 text-black font-bold text-base shadow-xl relative overflow-hidden group" 
                    disabled={isSubmitting}
                    data-testid="button-signup"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                      border: 'none',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 4px 15px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="h-5 w-5" />
                          </motion.div>
                          Creating your account...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          Start Rocking Now
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black px-3 text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-black/50 border-gray-700 hover:border-[#D4AF37] hover:bg-black/70 transition-all"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-google-signin"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-300">Sign up with Google</span>
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <span className="text-gray-500 text-sm">Already have an account? </span>
              <Link href="/login">
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold hover:underline text-sm" 
                  style={{ color: '#D4AF37' }} 
                  data-testid="link-login"
                >
                  Sign in here
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Free to start
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  No credit card
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom tagline */}
        <motion.p 
          className="text-center mt-4 text-gray-600 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Roll the dice. Find your sound. Create magic.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
