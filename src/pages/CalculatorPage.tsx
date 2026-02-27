import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalculatorPage = () => {
  const [values, setValues] = useState({
    propertyPrice: "",
    downPayment: "",
    interestRate: "",
    loanTerm: "30",
    annualIncome: "",
    monthlyDebt: "",
  });
  const [results, setResults] = useState<null | {
    loanAmount: number;
    monthlyPayment: number;
    ltv: number;
    dti: number;
  }>(null);

  const update = (key: string, val: string) => setValues((p) => ({ ...p, [key]: val }));

  const calculate = () => {
    const price = parseFloat(values.propertyPrice) || 0;
    const down = parseFloat(values.downPayment) || 0;
    const rate = (parseFloat(values.interestRate) || 0) / 100 / 12;
    const months = parseInt(values.loanTerm) * 12;
    const income = parseFloat(values.annualIncome) || 0;
    const debt = parseFloat(values.monthlyDebt) || 0;

    const loan = price - down;
    const monthly = rate > 0 ? (loan * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : loan / months;
    const ltv = price > 0 ? (loan / price) * 100 : 0;
    const monthlyIncome = income / 12;
    const dti = monthlyIncome > 0 ? ((monthly + debt) / monthlyIncome) * 100 : 0;

    setResults({ loanAmount: loan, monthlyPayment: monthly, ltv, dti });
  };

  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Mortgage Calculator</h1>
        <p className="mt-3 text-muted-foreground">Estimate your monthly payment and affordability</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {[
            { label: "Property Price", key: "propertyPrice", placeholder: "350,000" },
            { label: "Down Payment", key: "downPayment", placeholder: "70,000" },
            { label: "Interest Rate (%)", key: "interestRate", placeholder: "6.5" },
            { label: "Annual Income", key: "annualIncome", placeholder: "120,000" },
            { label: "Monthly Debt", key: "monthlyDebt", placeholder: "500" },
          ].map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                type="number"
                placeholder={field.placeholder}
                value={(values as any)[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label>Loan Term (Years)</Label>
            <Select value={values.loanTerm} onValueChange={(v) => update("loanTerm", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Years</SelectItem>
                <SelectItem value="20">20 Years</SelectItem>
                <SelectItem value="25">25 Years</SelectItem>
                <SelectItem value="30">30 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button id="calculator-calculate-btn" onClick={calculate} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
            Calculate
          </Button>
        </div>

        {/* Results */}
        <div>
          <Card className={`border-border/50 shadow-lg transition-all ${results ? "bg-gradient-to-br from-card to-accent/5" : ""}`}>
            <CardHeader>
              <CardTitle>Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <p className="py-12 text-center text-muted-foreground">Enter your details and click Calculate to see results.</p>
              ) : (
                <div className="space-y-6">
                  {[
                    { label: "Estimated Loan Amount", value: fmt(results.loanAmount) },
                    { label: "Estimated Monthly Payment", value: fmt(results.monthlyPayment) },
                    { label: "Loan-to-Value (LTV)", value: `${results.ltv.toFixed(1)}%` },
                    { label: "Debt-to-Income (DTI)", value: `${results.dti.toFixed(1)}%` },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between rounded-lg border border-border/50 bg-background p-4">
                      <span className="text-sm text-muted-foreground">{r.label}</span>
                      <span className="text-lg font-bold text-foreground">{r.value}</span>
                    </div>
                  ))}
                  <Button asChild id="continue-to-prequal-btn" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    <Link to="/pre-qualification">Continue to Pre-Qualification</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
