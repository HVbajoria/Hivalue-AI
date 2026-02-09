import React, { useState, useMemo, useId } from 'react';
import { Filter, ListFilter } from 'lucide-react';
import { DATA } from '../data';
import IdeaCard from '../components/IdeaCard';
import { HivalueLanding } from '../components/ui/hero-landing-page';
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
      {/* Hero Landing Section */}
      <HivalueLanding />

      <div id="strategies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Enhanced Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/50 shadow-2xl items-center">
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
                    className={`h-[52px] px-6 text-base gap-2 border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all duration-300 ${selectedCategories.size > 0 ? 'border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/20' : 'text-slate-300'}`}
                >
                  <ListFilter size={20} strokeWidth={2} aria-hidden="true" />
                  Filter 
                  {selectedCategories.size > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] h-5 w-5 rounded-full font-bold animate-scale-in">
                          {selectedCategories.size}
                      </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl" align="end" side="bottom">
                <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                  <div className="font-bold text-slate-200">Filter Categories</div>
                  <div className="text-xs text-slate-400 mt-1">Narrow down your search</div>
                </div>
                <form className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar" onSubmit={handleApplyFilter}>
                  {categories.map((cat, i) => (
                    <div className="flex items-center gap-3 hover:bg-slate-800/50 p-2 rounded-lg transition-colors" key={cat}>
                      <Checkbox 
                        id={`${filterId}-${i}`} 
                        checked={tempSelectedCategories.has(cat)}
                        onCheckedChange={(checked) => handleCheckboxChange(cat, checked)}
                      />
                      <Label htmlFor={`${filterId}-${i}`} className="font-normal text-slate-300 cursor-pointer flex-grow">
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
                    <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold">
                      Apply Filters
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-lg font-bold">{filteredData.length}</span>
            <span className="text-slate-400 text-sm">opportunities available</span>
          </div>
          {selectedCategories.size > 0 && (
              <button 
                  onClick={() => setSelectedCategories(new Set())}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                  Clear filters →
              </button>
          )}
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredData.map((item, index) => (
            <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }} className="animate-slide-up">
              <IdeaCard item={item} onClick={onNavigate} />
            </div>
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-6">
              <Filter className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-xl font-semibold text-slate-400 mb-2">No ideas found</p>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button 
               onClick={() => { setSearchTerm(''); setSelectedCategories(new Set()); }}
               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all hover:scale-105"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;