import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, FileText } from "lucide-react";
import { Thesis } from "@/lib/store";

interface ThesisCardProps {
  thesis: Thesis;
}

export function ThesisCard({ thesis }: ThesisCardProps) {
  return (
    <Link href={`/thesis/${thesis.id}`} className="block h-full transition-transform hover:-translate-y-1 hover:shadow-md outline-none focus-visible:ring-2 ring-primary rounded-xl cursor-pointer">
      <Card className="h-full flex flex-col overflow-hidden border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge 
              variant="secondary" 
              className={thesis.category === 'Frontend Development' ? "bg-blue-100 text-blue-700 hover:bg-blue-100/80" : "bg-teal-100 text-teal-700 hover:bg-teal-100/80"}
            >
              {thesis.category}
            </Badge>
            <span className="flex items-center text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
              <Calendar className="mr-1 h-3 w-3" />
              {thesis.year}
            </span>
          </div>
          <CardTitle className="line-clamp-2 text-lg leading-tight mt-2 text-primary font-heading">
            {thesis.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {thesis.abstract}
          </p>
        </CardContent>
        <CardFooter className="border-t bg-muted/10 pt-3 pb-3">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1.5 h-3.5 w-3.5" />
              <span className="truncate max-w-[150px]">{thesis.authors.join(", ")}</span>
            </div>
            {thesis.fileName && (
              <div className="flex items-center" title="PDF Available">
                <FileText className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
