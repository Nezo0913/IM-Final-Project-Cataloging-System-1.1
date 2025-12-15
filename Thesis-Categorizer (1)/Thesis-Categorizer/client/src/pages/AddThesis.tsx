import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useThesisStore, Category } from "@/lib/store";
import { useLocation, useRoute } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  authors: z.string().min(2, "At least one author is required"),
  year: z.string(),
  category: z.enum(["Frontend Development", "Web Development"] as [string, ...string[]]),
  abstract: z.string().min(20, "Abstract must be at least 20 characters"),
  adviser: z.string().optional(),
});

export function AddThesis() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/edit/:id");
  const { addThesis, updateThesis, theses } = useThesisStore();
  const { toast } = useToast();

  const isEditing = !!match;
  const thesisId = params?.id;

  const currentYear = new Date().getFullYear();
  // Generate years from 2020 to currentYear + 1
  const years = Array.from({ length: (currentYear + 1) - 2020 + 1 }, (_, i) => (currentYear + 1 - i).toString());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      authors: "",
      year: currentYear.toString(),
      category: "Frontend Development",
      abstract: "",
      adviser: "",
    },
  });

  // Load data if editing
  useEffect(() => {
    if (isEditing && thesisId) {
      const thesis = theses.find(t => t.id === thesisId);
      if (thesis) {
        form.reset({
          title: thesis.title,
          authors: thesis.authors.join(", "),
          year: thesis.year.toString(),
          category: thesis.category,
          abstract: thesis.abstract,
          adviser: thesis.adviser || "",
        });
      }
    }
  }, [isEditing, thesisId, theses, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Process authors string into array
    const authorsArray = values.authors.split(',').map(a => a.trim()).filter(Boolean);

    const thesisData = {
      title: values.title,
      authors: authorsArray,
      year: parseInt(values.year),
      category: values.category as Category,
      abstract: values.abstract,
      adviser: values.adviser,
      fileName: `thesis_${Date.now()}.pdf`, // Mock file name
    };

    if (isEditing && thesisId) {
      updateThesis(thesisId, thesisData);
      toast({
        title: "Thesis Updated",
        description: "The thesis details have been successfully updated.",
      });
    } else {
      addThesis(thesisData);
      toast({
        title: "Thesis Added",
        description: "The thesis has been successfully added to the catalog.",
      });
    }

    setLocation("/admin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-primary">{isEditing ? "Edit Thesis" : "Add New Thesis"}</h1>
          <p className="text-muted-foreground mt-1">{isEditing ? "Update existing thesis record." : "Submit a new thesis to the repository."}</p>
        </div>

        <Card className="border-border/60 shadow-md">
          <CardHeader>
            <CardTitle>Thesis Details</CardTitle>
            <CardDescription>All fields marked with * are required.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thesis Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the full title of the thesis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Submission *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            {years.map((y) => (
                              <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="authors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author(s) *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe, Jane Smith (comma separated)" {...field} />
                      </FormControl>
                      <FormDescription>Separate multiple authors with commas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adviser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adviser (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Name Surname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abstract *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a brief summary of the thesis..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-6 border-2 border-dashed rounded-lg bg-muted/10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="bg-background p-3 rounded-full mb-2 shadow-sm">
                    <UploadCloud className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-sm font-medium">Upload Thesis Document</h4>
                  <p className="text-xs text-muted-foreground mt-1">PDF files only (Mock upload)</p>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setLocation("/admin")}>Cancel</Button>
                  <Button type="submit">{isEditing ? "Update Thesis" : "Add Thesis to Catalog"}</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
