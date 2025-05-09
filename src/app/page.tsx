"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Code, Zap, TrendingUp, Bot, PlayCircle, Eye, Sparkles } from 'lucide-react';
import Image from 'next/image';
// Placeholder for Framer Motion, if to be added later
// import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-accent" />,
      title: "Real-Time AI Feedback",
      description: "Instant, intelligent insights on your code's logic, style, and efficiency as you type.",
    },
    {
      icon: <Code className="h-10 w-10 text-accent" />,
      title: "Immersive Code Editor",
      description: "Practice in a sleek, dark-themed editor. (Monaco Editor planned).",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-accent" />,
      title: "Personalized Learning Roadmap",
      description: "Visualize your journey, master topics, and unlock new challenges with a dynamic skill tree.",
    },
    {
      icon: <Bot className="h-10 w-10 text-accent" />,
      title: "AI Code Review Coach",
      description: "Submit your code for an in-depth AI analysis covering bugs, complexity, and improvements.",
    },
  ];

  // Placeholder for testimonials
  const testimonials = [
    {
      name: "DevDynamo",
      role: "Software Engineer",
      quote: "CodeAce's AI feedback is a game-changer. It's like pair programming with a senior dev!",
      avatar: "https://picsum.photos/id/1025/100/100",
      dataAiHint: "developer woman"
    },
    {
      name: "LogicLee",
      role: "CS Graduate",
      quote: "The personalized roadmap helped me focus on my weak areas and land my dream job.",
      avatar: "https://picsum.photos/id/1012/100/100",
      dataAiHint: "coder man"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section - Placeholder for particle effects and advanced animations */}
      <section className="relative py-24 md:py-36 bg-gradient-to-br from-primary/80 via-primary to-primary/90 text-primary-foreground overflow-hidden">
        {/* Placeholder for particle background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight font-poppins
            bg-clip-text text-transparent bg-gradient-to-r from-accent via-teal-300 to-sky-200
          ">
            Code. Learn. Level Up.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight font-poppins">
            Your AI Coach Awaits.
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            CodeAce offers a futuristic environment with personalized AI guidance, real-time feedback, and a structured path to coding mastery.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground shadow-lg neon-glow-accent px-8 py-3 text-lg rounded-xl" asChild>
              <Link href="/auth/signup">Try CodeAce Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 shadow-lg px-8 py-3 text-lg rounded-xl" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
           <div className="mt-20 relative aspect-video max-w-4xl mx-auto">
            {/* Placeholder for Lottie animation or video */}
            <Image 
              src="https://picsum.photos/seed/codeace-hero/1200/675" 
              alt="CodeAce AI Editor Demo" 
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-2xl border-2 border-accent/30 neon-glow-primary"
              data-ai-hint="futuristic code editor"
              priority
            />
            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white/70 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-poppins">Why CodeAce?</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Unlock your coding potential with cutting-edge features designed for effective learning and rapid skill enhancement in a futuristic setting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl glassmorphic overflow-hidden border-primary/20 hover:border-accent/50">
                <CardHeader className="items-center text-center p-8">
                  <div className="p-4 bg-accent/10 rounded-full mb-4">{feature.icon}</div>
                  <CardTitle className="mt-2 text-2xl font-poppins">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-poppins">From Our Ace Coders</h2>
           <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            See how CodeAce is transforming the learning journey for developers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-xl rounded-2xl flex flex-col glassmorphic border-primary/10">
                <CardContent className="pt-8 px-8 flex-grow">
                  <Sparkles className="h-8 w-8 text-accent mb-4" />
                  <p className="text-muted-foreground mb-6 italic text-lg">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4 pt-0 px-8 pb-8 border-t border-primary/10 mt-auto">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={56} 
                    height={56} 
                    className="rounded-full border-2 border-accent"
                    data-ai-hint={testimonial.dataAiHint} 
                  />
                  <div>
                    <CardTitle className="text-lg font-poppins">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-accent/80 via-accent to-accent/90 text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">Ready to Elevate Your Code?</h2>
          <p className="text-lg text-accent-foreground/80 mb-10 max-w-xl mx-auto">
            Join the CodeAce revolution today. Start your personalized journey to coding mastery with your AI coach.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl text-xl px-10 py-4 rounded-xl neon-glow-primary" asChild>
            <Link href="/auth/signup">Begin Your Ascent</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
