import { useRoute, useLocation } from "wouter";
import { useThesisStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  FileText, 
  Download, 
  Trash2, 
  GraduationCap,
  Pencil
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ThesisDetail() {
  const [match, params] = useRoute("/thesis/:id");
  const [, setLocation] = useLocation();
  const { theses, deleteThesis } = useThesisStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  if (!match) return null;

  const thesis = theses.find(t => t.id === params.id);

  if (!thesis) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-muted-foreground">Thesis not found</h2>
        <Button variant="link" onClick={() => setLocation("/catalog")}>
          Return to Catalog
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this thesis?")) {
      deleteThesis(thesis.id);
      toast({
        title: "Thesis Deleted",
        description: "The thesis has been removed from the catalog.",
        variant: "destructive"
      });
      setLocation("/catalog");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:pl-2 transition-all" 
          onClick={() => setLocation("/catalog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  variant="outline" 
                  className={thesis.category === 'Frontend Development' ? "border-blue-200 text-blue-700 bg-blue-50" : "border-teal-200 text-teal-700 bg-teal-50"}
                >
                  {thesis.category}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {thesis.year}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary leading-tight">
                {thesis.title}
              </h1>
            </div>

            <Card className="border-none shadow-none bg-muted/30">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  Abstract
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {thesis.abstract}
                </p>
              </CardContent>
            </Card>

            <div className="md:hidden space-y-4">
              {/* Mobile view of sidebar info */}
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Authors</h4>
                <p>{thesis.authors.join(", ")}</p>
              </div>
              {thesis.adviser && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Adviser</h4>
                  <p>{thesis.adviser}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-border/60 shadow-sm sticky top-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Authors
                  </h3>
                  <div className="space-y-1">
                    {thesis.authors.map((author, i) => (
                      <div key={i} className="font-medium">{author}</div>
                    ))}
                  </div>
                </div>

                {thesis.adviser && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Adviser
                    </h3>
                    <div className="font-medium">{thesis.adviser}</div>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Document</h3>
                  {user ? (
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  ) : (
                     <div className="text-sm text-center p-3 bg-muted rounded-md text-muted-foreground">
                        <span onClick={() => setLocation('/login')} className="text-primary cursor-pointer hover:underline">Log in</span> to download
                     </div>
                  )}
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Added on {new Date(thesis.dateAdded).toLocaleDateString()}
                  </p>
                </div>

                {user?.role === 'admin' && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setLocation(`/edit/${thesis.id}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Thesis
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full" 
                        onClick={handleDelete}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Thesis
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
