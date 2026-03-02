export type StepInputType = "text" | "number" | "options";

export interface ChatFlowStep {
  key: string;
  question: string;
  type: StepInputType;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

export const purchaseFlow: ChatFlowStep[] = [
  {
    key: "state",
    question: "Which state is the property located in?",
    type: "options",
    options: [
      { label: "California", value: "CA" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "New York", value: "NY" },
      { label: "Illinois", value: "IL" },
      { label: "Georgia", value: "GA" },
      { label: "North Carolina", value: "NC" },
      { label: "Arizona", value: "AZ" },
      { label: "Colorado", value: "CO" },
      { label: "Other", value: "OTHER" },
    ],
  },
  {
    key: "property_value",
    question: "What is the estimated purchase price of the property?",
    type: "number",
    min: 50000,
    max: 5000000,
  },
  {
    key: "down_payment",
    question: "How much are you planning to put down?",
    type: "options",
    options: [
      { label: "Less than 5%", value: "<5%" },
      { label: "5% – 10%", value: "5-10%" },
      { label: "10% – 20%", value: "10-20%" },
      { label: "More than 20%", value: ">20%" },
    ],
  },
  {
    key: "income",
    question: "What is your approximate annual gross household income?",
    type: "number",
    min: 10000,
    max: 5000000,
  },
  {
    key: "monthly_debt",
    question:
      "What is your total monthly debt payment (credit cards, auto, student loans, etc.)?",
    type: "number",
    min: 0,
    max: 50000,
  },
  {
    key: "credit_score",
    question: "What is your estimated credit score?",
    type: "number",
    min: 550,
    max: 850,
  },
  {
    key: "employment_status",
    question: "What best describes your current employment status?",
    type: "options",
    options: [
      { label: "W-2 Employee", value: "w2" },
      { label: "Self-Employed", value: "self_employed" },
      { label: "Retired", value: "retired" },
      { label: "Other", value: "other" },
    ],
  },
  {
    key: "purchase_timeline",
    question: "What is your ideal purchase timeline?",
    type: "options",
    options: [
      { label: "0–3 months", value: "0-3" },
      { label: "3–6 months", value: "3-6" },
      { label: "6–12 months", value: "6-12" },
      { label: "12+ months", value: "12+" },
    ],
  },
  {
    key: "property_type",
    question: "What type of property are you looking to buy?",
    type: "options",
    options: [
      { label: "Single-Family Home", value: "single_family" },
      { label: "Condo / Townhome", value: "condo_townhome" },
      { label: "Multi-Unit (2–4)", value: "multi_unit" },
      { label: "Other", value: "other" },
    ],
  },
  {
    key: "property_usage",
    question: "How will you use the property?",
    type: "options",
    options: [
      { label: "Primary Residence", value: "primary" },
      { label: "Second Home", value: "second_home" },
      { label: "Investment Property", value: "investment" },
    ],
  },
  {
    key: "first_time_buyer",
    question: "Are you a first-time homebuyer?",
    type: "options",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
];

export const refinanceFlow: ChatFlowStep[] = [
  {
    key: "state",
    question: "Which state is the property located in?",
    type: "options",
    options: [
      { label: "California", value: "CA" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "New York", value: "NY" },
      { label: "Illinois", value: "IL" },
      { label: "Georgia", value: "GA" },
      { label: "North Carolina", value: "NC" },
      { label: "Arizona", value: "AZ" },
      { label: "Colorado", value: "CO" },
      { label: "Other", value: "OTHER" },
    ],
  },
  {
    key: "property_value",
    question: "What is the current estimated value of your property?",
    type: "number",
    min: 50000,
    max: 5000000,
  },
  {
    key: "current_loan_balance",
    question: "Approximately how much do you still owe on your current mortgage?",
    type: "number",
    min: 10000,
    max: 5000000,
  },
  {
    key: "current_interest_rate",
    question: "What is your current mortgage interest rate (as a percentage)?",
    type: "number",
    min: 1,
    max: 15,
  },
  {
    key: "income",
    question: "What is your approximate annual gross household income?",
    type: "number",
    min: 10000,
    max: 5000000,
  },
  {
    key: "monthly_debt",
    question:
      "What is your total monthly debt payment (credit cards, auto, student loans, etc.)?",
    type: "number",
    min: 0,
    max: 50000,
  },
  {
    key: "cash_out_amount",
    question:
      "If you’re looking to take cash out, how much would you like to access?",
    type: "number",
    min: 0,
    max: 2000000,
  },
  {
    key: "credit_score",
    question: "What is your estimated credit score?",
    type: "number",
    min: 550,
    max: 850,
  },
  {
    key: "employment_status",
    question: "What best describes your current employment status?",
    type: "options",
    options: [
      { label: "W-2 Employee", value: "w2" },
      { label: "Self-Employed", value: "self_employed" },
      { label: "Retired", value: "retired" },
      { label: "Other", value: "other" },
    ],
  },
  {
    key: "property_type",
    question: "What type of property are you refinancing?",
    type: "options",
    options: [
      { label: "Single-Family Home", value: "single_family" },
      { label: "Condo / Townhome", value: "condo_townhome" },
      { label: "Multi-Unit (2–4)", value: "multi_unit" },
      { label: "Other", value: "other" },
    ],
  },
  {
    key: "property_usage",
    question: "How do you use the property?",
    type: "options",
    options: [
      { label: "Primary Residence", value: "primary" },
      { label: "Second Home", value: "second_home" },
      { label: "Investment Property", value: "investment" },
    ],
  },
];

