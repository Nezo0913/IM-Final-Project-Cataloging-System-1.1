import { useState, useMemo } from "react";
import { useThesisStore, Category } from "@/lib/store";
import { ThesisCard } from "@/components/thesis/ThesisCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function Catalog() {
  const { theses } = useThesisStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [yearFilter, setYearFilter] = useState<string>("All");

  // Dynamic years generation (2020 to current + 1)
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearsArr = [];
    const startYear = 2020;
    const endYear = currentYear + 1;
    
    for (let y = endYear; y >= startYear; y--) {
      yearsArr.push(y);
    }
    return yearsArr;
  }, [currentYear]);

  const filteredTheses = useMemo(() => {
    return theses.filter((t) => {
      const matchesSearch = 
        t.title.toLowerCase().includes(search.toLowerCase()) || 
        t.authors.some(a => a.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
      const matchesYear = yearFilter === "All" || t.year.toString() === yearFilter;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [theses, search, categoryFilter, yearFilter]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setYearFilter("All");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-primary">Thesis Catalog</h1>
            <p className="text-muted-foreground mt-1">Browse and filter academic theses.</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as Category | "All")}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Frontend Development">Frontend Dev</SelectItem>
                <SelectItem value="Web Development">Web Dev</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-32 space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="All">All Years</SelectItem>
                {years.map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon" onClick={clearFilters} title="Clear Filters">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {filteredTheses.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground">No theses found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">Clear filters</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTheses.map((thesis) => (
              <ThesisCard key={thesis.id} thesis={thesis} />
            ))}
          </div>
        )}
    </div>
  );
}
