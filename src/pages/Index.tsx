import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, Shield, BrainCircuit, ClipboardCheck, BarChart3, Send } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:px-8 lg:py-32">
          <motion.div className="flex-1 text-center lg:text-left" initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Get Pre-Qualified for Your Mortgage{" "}
              <span className="text-accent">in Minutes</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground lg:text-xl">
              AI-powered mortgage insights, instant affordability calculation, and guided application support.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" id="start-assessment-btn">
                <Link to="/pre-qualification">Start Free Assessment</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/calculator">Try Calculator</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-1 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-4 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
                <BarChart3 size={48} className="text-accent" />
                <p className="text-lg font-semibold text-foreground">Smart Dashboard</p>
                <div className="flex gap-2">
                  <div className="h-2 w-16 rounded-full bg-accent/60" />
                  <div className="h-2 w-10 rounded-full bg-primary/40" />
                  <div className="h-2 w-12 rounded-full bg-accent/30" />
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-12 rounded-full bg-primary/30" />
                  <div className="h-2 w-20 rounded-full bg-accent/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground">Why Choose MortgageAI?</h2>
            <p className="mt-3 text-muted-foreground">Everything you need for smarter mortgage decisions</p>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Calculator, title: "Instant Affordability Check", desc: "Calculate what you can afford in seconds with our intelligent estimator." },
              { icon: BrainCircuit, title: "AI Mortgage Assistant", desc: "Get personalized guidance powered by advanced mortgage intelligence." },
              { icon: Shield, title: "Secure & Structured Pre-Qualification", desc: "Your data is encrypted and the process follows industry best practices." },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}>
                <Card className="h-full border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                      <f.icon size={28} className="text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to your mortgage pre-qualification</p>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", icon: Calculator, title: "Calculate Affordability", desc: "Enter your financial details to see what you can afford." },
              { step: "02", icon: ClipboardCheck, title: "Complete Pre-Qualification", desc: "Answer guided questions to build your mortgage profile." },
              { step: "03", icon: Send, title: "Receive Your Estimate", desc: "Get your eligibility estimate and recommended next steps." },
            ].map((s, i) => (
              <motion.div key={s.step} className="flex flex-col items-center text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  {s.step}
                </div>
                <s.icon size={28} className="mb-3 text-accent" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20">
        <motion.div className="mx-auto max-w-3xl px-4 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to See What You Can Afford?</h2>
          <p className="mt-4 text-primary-foreground/80">Start your journey to homeownership today.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/pre-qualification">Start Assessment</Link>
          </Button>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </motion.div>
          <Accordion type="single" collapsible className="mt-10">
            {[
              { q: "What is mortgage pre-qualification?", a: "Pre-qualification is an initial assessment of your financial situation to estimate how much you may be able to borrow. It's not a formal approval but gives you a clear picture of your budget." },
              { q: "Does this affect my credit score?", a: "No. Our pre-qualification process uses a soft inquiry approach and does not impact your credit score in any way." },
              { q: "How accurate is the estimate?", a: "Our AI-powered estimates are based on industry-standard calculations and the information you provide. Final approval amounts may vary based on a full underwriting review." },
              { q: "What documents are required later?", a: "For formal approval, lenders typically require proof of income, tax returns, bank statements, and identification. Our pre-qualification only needs basic financial information." },
              { q: "Is my data secure?", a: "Absolutely. We use bank-level encryption and never share your personal data with third parties without your explicit consent." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default Index;
