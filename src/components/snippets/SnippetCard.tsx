"use client";

import type { Snippet } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, Code } from "lucide-react";
import { formatDistanceToNow } from 'date-fns'; // For relative time

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (snippetId: string) => void;
}

export default function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  const lastUpdated = snippet.updatedAt ? 
    formatDistanceToNow(new Date(snippet.updatedAt instanceof Object && 'toDate' in snippet.updatedAt ? (snippet.updatedAt as any).toDate() : snippet.updatedAt), { addSuffix: true }) 
    : 'N/A';

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl glassmorphic border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-poppins mb-1 line-clamp-2">{snippet.title}</CardTitle>
            <Badge variant="outline" className="text-xs whitespace-nowrap border-accent/50 text-accent bg-accent/10">{snippet.language}</Badge>
        </div>
        {snippet.description && <CardDescription className="text-xs line-clamp-2">{snippet.description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow py-0">
        {/* Basic code preview - not full syntax highlighting here for brevity */}
        <ScrollArea className="h-32 max-h-32 my-2">
        <pre className="text-xs p-3 bg-slate-800 text-slate-200 rounded-md font-mono overflow-auto">
          <code>{snippet.code.substring(0, 200)}{snippet.code.length > 200 ? '...' : ''}</code>
        </pre>
        </ScrollArea>
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {snippet.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-muted/50">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto pt-3 flex justify-between items-center border-t border-primary/10">
        <p className="text-xs text-muted-foreground">Updated: {lastUpdated}</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-accent" onClick={() => onEdit(snippet)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => onDelete(snippet.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
