import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, Shield, BrainCircuit, ClipboardCheck, BarChart3, Send, ArrowRight, Sparkles, TrendingUp, Lock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const Index = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-20 right-[10%] h-72 w-72 rounded-full bg-accent/10 blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
        <div className="absolute bottom-20 left-[5%] h-96 w-96 rounded-full bg-primary/8 blur-3xl" style={{ animation: "pulse-glow 6s ease-in-out infinite 1s" }} />

        <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-4 py-20 sm:px-6 lg:flex-row lg:px-8 lg:py-24">
          <motion.div className="flex-1 text-center lg:text-left" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
              <Sparkles size={14} />
              AI-Powered Mortgage Intelligence
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
              Get Pre-Qualified
              <br />
              for Your Mortgage{" "}
              <span className="gradient-text bg-gradient-to-r from-accent to-[hsl(200,70%,50%)]">in Minutes</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              AI-powered mortgage insights, instant affordability calculation, and guided application support — all in one place.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground shadow-lg glow-accent hover:shadow-xl hover:brightness-110 transition-all text-base h-12 px-8" id="start-assessment-btn">
                <Link to="/pre-qualification">
                  Start Free Assessment
                  <ArrowRight size={18} className="ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base border-border/60 hover:bg-accent/5 hover:border-accent/40 transition-all">
                <Link to="/calculator">Try Calculator</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
              {[
                { icon: Shield, text: "Bank-level security" },
                { icon: TrendingUp, text: "98% accuracy rate" },
                { icon: Lock, text: "No credit impact" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <badge.icon size={14} className="text-accent" />
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className="flex flex-1 justify-center"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative" style={{ animation: "float 6s ease-in-out infinite" }}>
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl scale-110" />

              {/* Main card */}
              <div className="relative w-72 sm:w-80 lg:w-96 glass rounded-3xl p-6 shadow-2xl glow-accent">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent" />
                    <span className="text-sm font-semibold text-foreground font-display">Dashboard</span>
                  </div>
                  <BarChart3 size={20} className="text-accent" />
                </div>

                {/* Mini chart bars */}
                <div className="flex items-end gap-2 h-32 mb-6 px-2">
                  {[60, 80, 45, 90, 70, 55, 85, 75, 95, 65, 88, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-md gradient-accent opacity-80"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly</p>
                    <p className="text-lg font-bold text-foreground font-display">$2,145</p>
                  </div>
                  <div className="rounded-xl bg-accent/10 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Approved</p>
                    <p className="text-lg font-bold text-accent font-display">98.2%</p>
                  </div>
                </div>
              </div>

              {/* Floating pill */}
              <motion.div
                className="absolute -right-4 top-8 glass rounded-xl px-4 py-2.5 shadow-lg"
                style={{ animation: "float-slow 5s ease-in-out infinite 1s" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Pre-Qualified</span>
                </div>
              </motion.div>

              {/* Floating pill 2 */}
              <motion.div
                className="absolute -left-6 bottom-16 glass rounded-xl px-4 py-2.5 shadow-lg"
                style={{ animation: "float-slow 4s ease-in-out infinite 2s" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-xs font-medium text-foreground">AI Analysis</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Features</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Why Choose MortgageAI?</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Everything you need for smarter, faster mortgage decisions — powered by intelligent technology.</p>
          </motion.div>
          <motion.div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            {[
              { icon: Calculator, title: "Instant Affordability Check", desc: "Calculate what you can afford in seconds with our intelligent estimator powered by real market data.", gradient: "from-accent/15 to-[hsl(190,60%,45%)]/10" },
              { icon: BrainCircuit, title: "AI Mortgage Assistant", desc: "Get personalized guidance through every step, from pre-qualification to finding the best rates.", gradient: "from-primary/15 to-[hsl(250,60%,55%)]/10" },
              { icon: Shield, title: "Secure & Structured", desc: "Bank-level encryption protects your data. The entire process follows industry best practices.", gradient: "from-accent/10 to-primary/10" },
            ].map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <div className="group relative h-full rounded-2xl glass p-8 transition-all duration-500 hover:shadow-xl hover:glow-accent hover:-translate-y-1">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-accent shadow-md">
                      <f.icon size={24} className="text-accent-foreground" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Process</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground">Three simple steps to your mortgage pre-qualification</p>
          </motion.div>
          <motion.div className="mt-16 grid gap-8 sm:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            {[
              { step: "01", icon: Calculator, title: "Calculate Affordability", desc: "Enter your financial details to see what you can afford." },
              { step: "02", icon: ClipboardCheck, title: "Complete Pre-Qualification", desc: "Answer guided questions to build your mortgage profile." },
              { step: "03", icon: Send, title: "Receive Your Estimate", desc: "Get your eligibility estimate and recommended next steps." },
            ].map((s) => (
              <motion.div key={s.step} className="group relative flex flex-col items-center text-center" variants={fadeUp}>
                <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full gradient-primary shadow-lg">
                    <span className="font-display text-2xl font-bold text-primary-foreground">{s.step}</span>
                  </div>
                </div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <s.icon size={20} className="text-accent" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-accent/15 blur-3xl" />
        <motion.div
          className="relative mx-auto max-w-3xl px-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-5xl leading-tight">
            Ready to See What
            <br />
            You Can Afford?
          </h2>
          <p className="mt-5 text-primary-foreground/70 text-lg">Start your journey to homeownership with confidence.</p>
          <Button asChild size="lg" className="mt-10 gradient-accent text-accent-foreground shadow-xl glow-accent hover:shadow-2xl hover:brightness-110 transition-all h-14 px-10 text-base">
            <Link to="/pre-qualification">
              Start Assessment
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Support</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <Accordion type="single" collapsible className="mt-12 space-y-3">
              {[
                { q: "What is mortgage pre-qualification?", a: "Pre-qualification is an initial assessment of your financial situation to estimate how much you may be able to borrow. It's not a formal approval but gives you a clear picture of your budget." },
                { q: "Does this affect my credit score?", a: "No. Our pre-qualification process uses a soft inquiry approach and does not impact your credit score in any way." },
                { q: "How accurate is the estimate?", a: "Our AI-powered estimates are based on industry-standard calculations and the information you provide. Final approval amounts may vary based on a full underwriting review." },
                { q: "What documents are required later?", a: "For formal approval, lenders typically require proof of income, tax returns, bank statements, and identification. Our pre-qualification only needs basic financial information." },
                { q: "Is my data secure?", a: "Absolutely. We use bank-level encryption and never share your personal data with third parties without your explicit consent." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl px-6 border-border/30 overflow-hidden">
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
