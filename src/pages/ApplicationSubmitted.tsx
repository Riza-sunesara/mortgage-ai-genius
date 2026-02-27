import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ApplicationSubmitted = () => {
  const refId = `#MRT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-lg border-border/50 shadow-lg">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 size={48} className="text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Application Submitted Successfully</h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">Reference ID: {refId}</p>
          <p className="mt-4 text-muted-foreground">
            Our team will review your submission and contact you shortly.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/calculator">Recalculate Mortgage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ApplicationSubmitted;
