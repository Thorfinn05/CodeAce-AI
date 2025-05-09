import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Archive } from 'lucide-react'; // Changed Code2 to Zap

export default function AppFooter() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-auto shadow-inner">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Zap className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-primary font-poppins">CodeAce</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Your AI-Powered Coach for mastering the art of code.
            </p>
            <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
              © {new Date().getFullYear()} CodeAce. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center text-sm">
            <h4 className="font-semibold mb-3 text-lg text-foreground font-poppins">Navigate</h4>
            <ul className="space-y-2 text-center">
              <li><Link href="/practice" className="text-muted-foreground hover:text-accent transition-colors">Practice Arena</Link></li>
              <li><Link href="/code-review" className="text-muted-foreground hover:text-accent transition-colors">AI Code Coach</Link></li>
              <li><Link href="/roadmap" className="text-muted-foreground hover:text-accent transition-colors">Learning Roadmap</Link></li>
              <li><Link href="/snippets" className="text-muted-foreground hover:text-accent transition-colors">Snippet Library</Link></li>
              <li><Link href="/#features" className="text-muted-foreground hover:text-accent transition-colors">Features</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold mb-3 text-lg text-foreground font-poppins">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-accent transition-colors"><Github className="h-6 w-6" /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent transition-colors"><Twitter className="h-6 w-6" /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="h-6 w-6" /></Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center md:text-right">
              Built with <span className="text-red-500 animate-pulse">❤️</span> and cutting-edge AI.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
