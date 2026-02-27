import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PreQualification = () => (
  <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Start Your Mortgage Pre-Qualification</h1>
      <p className="mt-3 text-muted-foreground">
        Answer a few structured questions to receive your eligibility estimate.
      </p>
    </div>

    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Pre-Qualification Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-96 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
          <p className="text-muted-foreground">Chatbot embed placeholder (Landbot)</p>
        </div>
      </CardContent>
    </Card>

    <p className="mt-6 text-center text-sm text-muted-foreground">
      This process takes approximately 3–5 minutes.
    </p>
  </main>
);

export default PreQualification;
