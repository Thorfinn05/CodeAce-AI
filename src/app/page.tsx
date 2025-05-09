"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Code, Zap, TrendingUp, Users, MessageSquareQuote, Bot } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-accent" />,
      title: "AI-Powered Feedback",
      description: "Receive instant, intelligent feedback on your code's logic, style, and efficiency.",
    },
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Interactive Code Editor",
      description: "Practice in a rich code editor with support for multiple languages.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Personalized Roadmap",
      description: "Visualize your learning journey and get recommendations on what to learn next.",
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Adaptive Quizzes",
      description: "Test your knowledge with quizzes that adapt to your skill level (Coming Soon).",
    },
  ];

  const testimonials = [
    {
      name: "Alex P.",
      role: "CS Student",
      quote: "CodeCoach helped me understand data structures way faster than my textbooks!",
      avatar: "https://picsum.photos/id/1005/100/100",
      dataAiHint: "student person"
    },
    {
      name: "Sarah L.",
      role: "Aspiring Developer",
      quote: "The AI feedback is like having a senior dev guide me. It's incredible for self-learners.",
      avatar: "https://picsum.photos/id/1011/100/100",
      dataAiHint: "developer woman"
    },
    {
      name: "Mike B.",
      role: "Hobbyist Coder",
      quote: "I love the variety of problems and tracking my progress. Super motivating!",
      avatar: "https://picsum.photos/id/1027/100/100",
      dataAiHint: "coder man"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Master Coding with Your <span className="text-accent">AI Mentor</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            CodeCoach provides personalized guidance, intelligent feedback, and a structured path to help you become a proficient programmer.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg" asChild>
              <Link href="/practice">Try CodeCoach Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="shadow-lg" asChild>
              <Link href="/auth/signup">Sign Up Now</Link>
            </Button>
          </div>
           <div className="mt-16">
            <Image 
              src="https://picsum.photos/seed/codecoach-hero/1200/600" 
              alt="Code Editor Interface" 
              width={1000} 
              height={500} 
              className="rounded-xl shadow-2xl mx-auto"
              data-ai-hint="code editor"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why CodeCoach?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Unlock your coding potential with features designed for effective learning and rapid improvement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Loved by Aspiring Coders</h2>
           <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Hear what our users say about their journey with CodeCoach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg rounded-2xl flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <MessageSquareQuote className="h-8 w-8 text-accent mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4 pt-0">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                    data-ai-hint={testimonial.dataAiHint} 
                  />
                  <div>
                    <CardTitle className="text-md">{testimonial.name}</CardTitle>
                    <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Coding Skills?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Join CodeCoach today and start your personalized journey to coding mastery.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg text-lg px-8 py-6" asChild>
            <Link href="/auth/signup">Start Learning for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
