import { useThesisStore, Thesis } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useLocation } from "wouter";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminDashboard() {
  const { theses, deleteThesis } = useThesisStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    deleteThesis(id);
    toast({
      title: "Thesis deleted",
      description: "The thesis record has been permanently removed.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage thesis records and system content.</p>
        </div>
        <Link href="/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add New Thesis
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {theses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No theses found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              theses.map((thesis) => (
                <TableRow key={thesis.id}>
                  <TableCell className="font-medium max-w-[300px] truncate" title={thesis.title}>
                    <div className="flex flex-col">
                      <span>{thesis.title}</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline-block md:hidden">
                        {thesis.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={thesis.authors.join(", ")}>
                    {thesis.authors.join(", ")}
                  </TableCell>
                  <TableCell>{thesis.year}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      thesis.category === 'Frontend Development' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {thesis.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/thesis/${thesis.id}`}>
                        <Button variant="ghost" size="icon" title="View Details">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/edit/${thesis.id}`}>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the thesis titled "{thesis.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(thesis.id)} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
