'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { semanticSearch } from '@/app/actions';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        value={query}
        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
        placeholder="Search AI tools by task, category, or name..."
        className="pl-12 py-6 text-lg border-border/50 focus:border-accent focus:ring-accent/20 bg-card backdrop-blur-sm font-sans transition-all duration-200 shadow-sm"
      />
      <Button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => semanticSearch(query)}
      >
        Search
      </Button>
    </div>
  );
}