"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import { addSnippet, getUserSnippets, updateSnippet, deleteSnippet } from '@/lib/firebase/firestore';
import type { Snippet, SupportedLanguage } from '@/types';
import { availableLanguages } from '@/lib/mock-data';
import { PlusCircle, Edit, Trash2, Filter, Search, Loader2, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SnippetCard from '@/components/snippets/SnippetCard'; // To be created

export default function SnippetLibraryPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<SupportedLanguage | 'all'>('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState<Partial<Snippet> | null>(null); // For add/edit
  const [formState, setFormState] = useState<{title: string, code: string, language: SupportedLanguage, description?: string, tags?: string}>({
    title: '', code: '', language: 'javascript', description: '', tags: ''
  });

  const fetchSnippets = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userSnippets = await getUserSnippets(user.uid);
      setSnippets(userSnippets.sort((a, b) => new Date(b.updatedAt as Date).getTime() - new Date(a.updatedAt as Date).getTime()));
    } catch (error) {
      toast({ title: "Error fetching snippets", description: "Could not load your snippets.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSnippets();
    } else {
      setSnippets([]);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Special handling for select using its name if Radix doesn't provide one on event
    if (e.target instanceof HTMLSelectElement && !name) {
        // This case is tricky with Radix, usually handled by onValueChange directly.
        // Assuming direct state update from Select's onValueChange for 'language'
        return;
    }
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLanguageChange = (value: SupportedLanguage) => {
    setFormState(prev => ({ ...prev, language: value }));
  };

  const openFormForAdd = () => {
    setCurrentSnippet(null);
    setFormState({ title: '', code: '', language: 'javascript', description: '', tags: '' });
    setIsFormOpen(true);
  };

  const openFormForEdit = (snippet: Snippet) => {
    setCurrentSnippet(snippet);
    setFormState({
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      description: snippet.description || '',
      tags: snippet.tags?.join(', ') || ''
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const snippetDataToSave = {
      title: formState.title,
      code: formState.code,
      language: formState.language,
      description: formState.description,
      tags: formState.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
    };

    try {
      if (currentSnippet?.id) { // Editing
        await updateSnippet(user.uid, currentSnippet.id, snippetDataToSave);
        toast({ title: "Snippet Updated", description: "Your code snippet has been saved." });
      } else { // Adding
        await addSnippet(user.uid, snippetDataToSave);
        toast({ title: "Snippet Added", description: "New code snippet saved to your library." });
      }
      setIsFormOpen(false);
      fetchSnippets(); // Refresh list
    } catch (error) {
      toast({ title: "Save Failed", description: "Could not save the snippet.", variant: "destructive" });
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this snippet?")) return;
    try {
      await deleteSnippet(user.uid, snippetId);
      toast({ title: "Snippet Deleted", description: "The snippet has been removed." });
      fetchSnippets(); // Refresh list
    } catch (error) {
      toast({ title: "Delete Failed", description: "Could not delete the snippet.", variant: "destructive" });
    }
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = languageFilter === 'all' || snippet.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  if (isLoading && !user) { // Initial load before user is confirmed
     return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><Loader2 className="h-12 w-12 text-accent animate-spin" /></div>;
  }
  if (!user && !isLoading) {
     return (
      <Card className="text-center p-8 max-w-md mx-auto glassmorphic">
        <CardHeader><CardTitle className="font-poppins">Access Snippet Library</CardTitle></CardHeader>
        <CardContent><CardDescription>Please log in to manage your code snippets.</CardDescription>
        <Button asChild className="mt-4 bg-accent hover:bg-accent/80"><a href="/auth/signin">Sign In</a></Button>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-2xl rounded-2xl glassmorphic border-primary/20">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/10 pb-6">
          <div>
            <CardTitle className="text-3xl font-bold font-poppins flex items-center gap-2">
              <Archive className="h-8 w-8 text-accent"/> Your Snippet Library
            </CardTitle>
            <CardDescription className="text-lg">Save, manage, and quickly access your reusable code fragments.</CardDescription>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openFormForAdd} className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg neon-glow-accent">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Snippet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl glassmorphic">
              <DialogHeader>
                <DialogTitle className="font-poppins text-2xl">{currentSnippet?.id ? 'Edit Snippet' : 'Add New Snippet'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-6 py-4">
                <div>
                  <Label htmlFor="title" className="font-semibold">Title</Label>
                  <Input id="title" name="title" value={formState.title} onChange={handleFormChange} required className="mt-1 bg-background/70 rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="language" className="font-semibold">Language</Label>
                  <Select name="language" value={formState.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full mt-1 bg-background/70 rounded-lg">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="code" className="font-semibold">Code</Label>
                  <Textarea id="code" name="code" value={formState.code} onChange={handleFormChange} required rows={10} className="mt-1 font-mono text-sm code-editor-textarea bg-slate-900 text-slate-100 border-slate-700 dark rounded-lg"/>
                </div>
                <div>
                  <Label htmlFor="description" className="font-semibold">Description (Optional)</Label>
                  <Textarea id="description" name="description" value={formState.description} onChange={handleFormChange} rows={3} className="mt-1 bg-background/70 rounded-lg"/>
                </div>
                 <div>
                  <Label htmlFor="tags" className="font-semibold">Tags (comma-separated, Optional)</Label>
                  <Input id="tags" name="tags" value={formState.tags} onChange={handleFormChange} placeholder="e.g., utility, react, algorithm" className="mt-1 bg-background/70 rounded-lg"/>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="outline" className="rounded-lg">Cancel</Button></DialogClose>
                  <Button type="submit" className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg">Save Snippet</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search snippets by title, description, or tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full rounded-lg bg-background/70"/>
            </div>
            <Select value={languageFilter} onValueChange={(val) => setLanguageFilter(val as SupportedLanguage | 'all')}>
              <SelectTrigger className="w-full md:w-[200px] rounded-lg bg-background/70">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {availableLanguages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading && user ? (
            <div className="text-center py-10"><Loader2 className="h-8 w-8 text-accent animate-spin mx-auto" /> <p>Loading your snippets...</p></div>
          ) : filteredSnippets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map(snippet => (
                <SnippetCard 
                  key={snippet.id} 
                  snippet={snippet} 
                  onEdit={() => openFormForEdit(snippet)} 
                  onDelete={() => handleDeleteSnippet(snippet.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Archive className="h-16 w-16 mx-auto mb-4 opacity-50"/>
              <p className="text-xl mb-2">Your Snippet Library is Empty</p>
              <p>Start adding your valuable code snippets to build your personal knowledge base!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
