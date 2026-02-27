import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, DollarSign, Percent, Home, Wallet, CreditCard, Clock } from "lucide-react";
import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
};

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

  const fields = [
    { label: "Property Price", key: "propertyPrice", placeholder: "350,000", icon: Home },
    { label: "Down Payment", key: "downPayment", placeholder: "70,000", icon: Wallet },
    { label: "Interest Rate (%)", key: "interestRate", placeholder: "6.5", icon: Percent },
    { label: "Annual Income", key: "annualIncome", placeholder: "120,000", icon: DollarSign },
    { label: "Monthly Debt", key: "monthlyDebt", placeholder: "500", icon: CreditCard },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="mb-14 text-center" initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Tools</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Mortgage Calculator</h1>
          <p className="mt-4 text-muted-foreground text-lg">Estimate your monthly payment and affordability in seconds</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Inputs */}
          <motion.div className="space-y-5" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="glass rounded-2xl p-8 space-y-5">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <field.icon size={14} className="text-accent" />
                    {field.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    value={(values as any)[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    className="h-12 rounded-xl bg-background/60 border-border/50 focus:border-accent focus:ring-accent/20"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  Loan Term (Years)
                </Label>
                <Select value={values.loanTerm} onValueChange={(v) => update("loanTerm", v)}>
                  <SelectTrigger className="h-12 rounded-xl bg-background/60 border-border/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button id="calculator-calculate-btn" onClick={calculate} className="w-full h-12 gradient-accent text-accent-foreground shadow-md glow-accent hover:shadow-lg hover:brightness-110 transition-all text-base rounded-xl" size="lg">
                Calculate
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial="hidden" animate="visible" variants={{ hidden: fadeUp.hidden, visible: { ...fadeUp.visible, transition: { duration: 0.5, ease: easing, delay: 0.2 } } }}>
            <div className={`glass rounded-2xl shadow-xl transition-all duration-500 overflow-hidden ${results ? "glow-accent" : ""}`}>
              <div className="px-8 py-6 border-b border-border/30">
                <h3 className="font-display text-xl font-semibold text-foreground">Results Summary</h3>
              </div>
              <div className="p-8">
                {!results ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                      <DollarSign size={28} className="text-muted-foreground/40" />
                    </div>
                    <p className="text-muted-foreground">Enter your details and click Calculate to see results.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { label: "Estimated Loan Amount", value: fmt(results.loanAmount), color: "text-foreground" },
                      { label: "Estimated Monthly Payment", value: fmt(results.monthlyPayment), color: "text-accent" },
                      { label: "Loan-to-Value (LTV)", value: `${results.ltv.toFixed(1)}%`, color: "text-foreground" },
                      { label: "Debt-to-Income (DTI)", value: `${results.dti.toFixed(1)}%`, color: results.dti > 43 ? "text-destructive" : "text-accent" },
                    ].map((r, i) => (
                      <motion.div
                        key={r.label}
                        className="flex items-center justify-between rounded-xl border border-border/30 bg-background/50 p-5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-sm text-muted-foreground">{r.label}</span>
                        <span className={`font-display text-xl font-bold ${r.color}`}>{r.value}</span>
                      </motion.div>
                    ))}
                    <Button asChild id="continue-to-prequal-btn" className="w-full h-12 gradient-primary text-primary-foreground shadow-md hover:shadow-lg transition-all text-base rounded-xl mt-4" size="lg">
                      <Link to="/pre-qualification">
                        Continue to Pre-Qualification
                        <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
