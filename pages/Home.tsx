import React, { useState, useMemo, useId } from 'react';
import { Filter, ListFilter } from 'lucide-react';
import { DATA } from '../data';
import IdeaCard from '../components/IdeaCard';
import { SparklesCore } from '../components/ui/sparkles';
import { SearchBar } from '../components/ui/search-bar';
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";

interface HomeProps {
  onNavigate: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const filterId = useId();

  const categories = useMemo(() => {
    const cats = new Set(DATA.map(d => d.category));
    return Array.from(cats).sort();
  }, []);

  // Temporary state for the filter popover
  const [tempSelectedCategories, setTempSelectedCategories] = useState<Set<string>>(new Set());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpenPopover = (open: boolean) => {
    if (open) {
      // Initialize temp state with current applied filter
      setTempSelectedCategories(new Set(selectedCategories));
    }
    setIsPopoverOpen(open);
  };

  const handleCheckboxChange = (category: string, checked: boolean | 'indeterminate') => {
    const newSet = new Set(tempSelectedCategories);
    if (checked === true) {
      newSet.add(category);
    } else {
      newSet.delete(category);
    }
    setTempSelectedCategories(newSet);
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategories(new Set(tempSelectedCategories));
    setIsPopoverOpen(false);
  };

  const handleClearFilter = () => {
    setTempSelectedCategories(new Set());
  };

  const filteredData = useMemo(() => {
    return DATA.filter(item => {
      const matchesSearch = item.idea.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(item.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Sparkles */}
      <div className="relative w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden rounded-md min-h-[50vh] md:min-h-[60vh]">
        <div className="w-full absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={1}
          />
        </div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Unlock the <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">AI Economy</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-md bg-slate-950/50 p-2 rounded-lg backdrop-blur-[2px]">
            Discover over 200 proven blueprints to monetize artificial intelligence. <br/>From content creation to data analytics, find your niche today.
          </p>
        </div>
        
        {/* Gradients for visual flair */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-transparent h-24 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 -mt-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-slate-900/95 p-4 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-sm items-center">
          <div className="relative flex-grow w-full z-20">
             <SearchBar 
                placeholder="Search ideas, keywords, or skills..." 
                value={searchTerm}
                onChange={setSearchTerm}
             />
          </div>
          
          <div className="relative z-10 shrink-0">
            <Popover open={isPopoverOpen} onOpenChange={handleOpenPopover}>
              <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    size="lg" 
                    className={`h-[52px] px-6 text-base gap-2 border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:text-white ${selectedCategories.size > 0 ? 'border-indigo-500 text-indigo-400' : 'text-slate-300'}`}
                >
                  <ListFilter size={20} strokeWidth={2} aria-hidden="true" />
                  Filter 
                  {selectedCategories.size > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center bg-indigo-500 text-white text-[10px] h-5 w-5 rounded-full">
                          {selectedCategories.size}
                      </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-slate-700 bg-slate-900 shadow-2xl" align="end" side="bottom">
                <div className="p-4 border-b border-slate-800">
                  <div className="font-medium text-slate-200">Categories</div>
                  <div className="text-xs text-slate-400 mt-1">Select topics to filter by</div>
                </div>
                <form className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar" onSubmit={handleApplyFilter}>
                  {categories.map((cat, i) => (
                    <div className="flex items-center gap-3" key={cat}>
                      <Checkbox 
                        id={`${filterId}-${i}`} 
                        checked={tempSelectedCategories.has(cat)}
                        onCheckedChange={(checked) => handleCheckboxChange(cat, checked)}
                      />
                      <Label htmlFor={`${filterId}-${i}`} className="font-normal text-slate-300 cursor-pointer">
                        {cat}
                      </Label>
                    </div>
                  ))}
                  
                  <div className="pt-4 flex justify-between gap-2 border-t border-slate-800 mt-4">
                    <Button 
                        type="button" 
                        size="sm" 
                        variant="ghost" 
                        onClick={handleClearFilter}
                        className="text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      Clear All
                    </Button>
                    <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                      Apply Filters
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-slate-400 text-sm font-medium">
          <span>Showing {filteredData.length} opportunities</span>
          {selectedCategories.size > 0 && (
              <button 
                  onClick={() => setSelectedCategories(new Set())}
                  className="text-indigo-400 hover:text-indigo-300 text-xs"
              >
                  Clear all filters
              </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(item => (
            <IdeaCard key={item.id} item={item} onClick={onNavigate} />
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No ideas found matching your criteria.</p>
            <button 
               onClick={() => { setSearchTerm(''); setSelectedCategories(new Set()); }}
               className="mt-4 text-indigo-400 hover:text-indigo-300 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;