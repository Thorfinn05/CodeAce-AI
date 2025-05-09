import Link from 'next/link';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Code2 className="h-7 w-7 text-primary" />
              <span className="text-xl font-semibold text-primary">CodeCoach</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Your AI-Powered Programming Mentor.
            </p>
            <p className="text-xs text-muted-foreground mt-1 text-center md:text-left">
              © {new Date().getFullYear()} CodeCoach. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center text-sm">
            <h4 className="font-semibold mb-2 text-foreground">Quick Links</h4>
            <ul className="space-y-1 text-center">
              <li><Link href="/practice" className="text-muted-foreground hover:text-primary">Practice</Link></li>
              <li><Link href="/code-review" className="text-muted-foreground hover:text-primary">Code Review</Link></li>
              <li><Link href="/roadmap" className="text-muted-foreground hover:text-primary">Roadmap</Link></li>
              <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold mb-2 text-foreground">Connect With Us</h4>
            <div className="flex space-x-3">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
