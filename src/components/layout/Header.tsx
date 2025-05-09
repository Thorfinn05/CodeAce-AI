import { FileCode2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <FileCode2 className="h-8 w-8 mr-3 text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">CodeAce</h1>
        {/* Placeholder for User Profile/Auth Buttons */}
        {/* <div className="ml-auto">
          <Button variant="ghost">Login</Button>
        </div> */}
      </div>
    </header>
  );
}
