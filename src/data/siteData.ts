export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  source: 'Google Reviews' | 'RateMyAgent';
  quote: string;
  verified: boolean;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  tagline: string;
  audience: string[];
  keyBenefits: string[];
  processSteps: string[];
  typicalQuestions: { q: string; a: string }[];
}

export const BUSINESS_INFO = {
  name: 'Blueprint Financial Services',
  shortName: 'Blueprint',
  director: 'Karina Bridges',
  directorTitle: 'Owner & Director, Principal Mortgage Broker',
  award: 'Finalist 2024 Professional Services – Local Business Awards',
  phone: '1300 510 591',
  phoneRaw: '1300510591',
  email: 'enquiries@blueprintfinancialservices.com.au',
  address: 'PO Box 672, Coogee NSW 2034',
  locationDisplay: 'Coogee, Sydney NSW',
  abn: '38 650 116 466',
  creditLicence: 'Australian Credit Licence: 389087',
  accreditation: 'MFAA Accredited Broker & AFCA Member',
  serviceHours: 'Monday – Friday: 8:30am – 5:30pm AEST (Weekend appointments by request)',
  guaranteeNote: 'Every home loan managed with our signature 2-Year Review Cycle.',
};

export const NAV_LINKS: NavItem[] = [
  { label: 'Loan Types', href: '#services' },
  { label: 'AI Loan Strategist', href: '#ai-calculator', badge: 'WOW' },
  { label: 'Calculators', href: '#calculators' },
  { label: 'Our Story', href: '#about' },
  { label: 'Learning Hub', href: '#learning-hub' },
  { label: 'Reviews', href: '#reviews' },
];

export const CORE_PILLARS = [
  {
    title: 'One-Step Simplicity',
    description:
      'Share your details once, and we take it from there. We manage all paperwork, negotiations, and lender follow-ups so you can focus on your property aspirations.',
    icon: 'Layers',
  },
  {
    title: 'Rapid Response',
    description:
      "Long waits are a thing of the past in fast-moving Sydney property markets. We are committed to responding within hours, keeping you updated every step of the journey.",
    icon: 'Zap',
  },
  {
    title: 'Continual Care & 2-Year Review',
    description:
      'You are valued far beyond settlement. We actively review your mortgage every two years to ensure your rate remains competitive against market rates.',
    icon: 'ShieldCheck',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Connect & Strategy Call',
    desc: 'Book a friendly, no-obligation 15-minute phone or video consult to explore your property or refinance goals.',
  },
  {
    step: '02',
    title: 'Deep-Dive Assessment',
    desc: 'We analyze your borrowing capacity, deposit, tax structure, and lender policies across 40+ Australian lenders.',
  },
  {
    step: '03',
    title: 'Tailored Recommendation',
    desc: 'We present clear, side-by-side loan options with transparent fee breakdowns, rates, and cash-saving strategies.',
  },
  {
    step: '04',
    title: 'Seamless Approval & Care',
    desc: 'We manage your application from formal pre-approval through to settlement and ongoing 24-month rate reviews.',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Danielle Clarke',
    role: 'First Home Buyer, Sydney',
    rating: 5,
    date: 'Verified Client',
    source: 'Google Reviews',
    quote:
      'Exceptional service. Karina was exceptional throughout the entire process of securing my first home. She made the complex jargon simple, handled every bank requirement quickly, and got me into my dream property.',
    verified: true,
  },
  {
    id: '2',
    author: 'Stanko Zonich',
    role: 'Property Investor',
    rating: 5,
    date: 'Verified Client',
    source: 'Google Reviews',
    quote:
      'Superstar! We have been lucky enough to work with Karina over several years across multiple investment property purchases. Her market knowledge, speed, and loan structuring are unmatched in Sydney.',
    verified: true,
  },
  {
    id: '3',
    author: 'Maria C.',
    role: 'Home Loan Refinance',
    rating: 5,
    date: 'Verified Client',
    source: 'Google Reviews',
    quote:
      'Brilliant service. I refinanced my home loan recently and Karina made the entire process simple and stress-free. She secured a much lower interest rate and saved me hundreds every month.',
    verified: true,
  },
  {
    id: '4',
    author: 'Velibor Trlin',
    role: 'Residential Borrower',
    rating: 5,
    date: 'Verified Client',
    source: 'Google Reviews',
    quote:
      'Excellent customer service and true professionalism with a great outcome. Karina demonstrated genuine commitment to getting us the right loan structure when other brokers found it difficult.',
    verified: true,
  },
];

export const LENDERS = [
  { name: 'Banjo', logoText: 'Banjo' },
  { name: 'Bank Australia', logoText: 'Bank Australia' },
  { name: 'Bank of China', logoText: 'Bank of China' },
  { name: 'Bank of Melbourne', logoText: 'Bank of Melbourne' },
  { name: 'BOQ', logoText: 'BOQ' },
  { name: 'ANZ Bank', logoText: 'ANZ' },
  { name: 'Commonwealth Bank', logoText: 'CBA' },
  { name: 'Westpac', logoText: 'Westpac' },
  { name: 'NAB', logoText: 'NAB' },
  { name: 'Macquarie Bank', logoText: 'Macquarie' },
  { name: 'ING Australia', logoText: 'ING' },
  { name: 'St. George Bank', logoText: 'St.George' },
  { name: 'Suncorp', logoText: 'Suncorp' },
  { name: 'Pepper Money', logoText: 'Pepper' },
  { name: 'Liberty Financial', logoText: 'Liberty' },
  { name: 'AMP Bank', logoText: 'AMP Bank' },
];

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: 'home-loans',
    slug: 'home-loans',
    title: 'Residential Home Loans',
    tagline: 'Tailored home finance designed around your lifestyle & aspirations',
    shortDescription:
      'Customized home loan solutions for owner-occupiers, property upgraders, and families moving into their forever home.',
    audience: ['First time buyers', 'Families upgrading or downsizing', 'Buyers seeking pre-approval for auctions'],
    keyBenefits: [
      'Access to 40+ Australian tier-1 banks and specialty lenders',
      'Fast turnaround pre-approvals for competitive Sydney auctions',
      'Guidance on fixed, variable, and split-loan facilities with 100% offset accounts',
    ],
    processSteps: ['Borrowing power assessment', 'Lender product selection', 'Pre-approval lodgement', 'Settlement support'],
    typicalQuestions: [
      {
        q: 'How much deposit do I need to buy a home in Sydney?',
        a: 'While 20% deposit avoids Lenders Mortgage Insurance (LMI), many lenders approve loans with a 5% to 10% deposit. You may also qualify for government guarantee schemes allowing a 5% deposit with zero LMI.',
      },
      {
        q: 'Why use Blueprint instead of going directly to my bank?',
        a: 'Your bank can only offer their own restricted loan products. Blueprint works for you, comparing products across 40+ lenders to pinpoint the lowest rates, lowest fees, and best credit policies.',
      },
    ],
  },
  {
    id: 'refinance',
    slug: 'refinance',
    title: 'Strategic Refinancing',
    tagline: 'Never set and forget: Unlock lower rates & release equity',
    shortDescription:
      'Review and renegotiate your current mortgage to slash monthly interest payments, consolidate high-interest debts, or cash out equity for renovations.',
    audience: ['Homeowners with loans older than 2 years', 'Borrowers rolling off fixed rates', 'Homeowners funding renovations'],
    keyBenefits: [
      'Free loan health-check comparing your current rate to market specials',
      'Equity release structuring to fund property improvements or deposits',
      'Debt consolidation to merge car loans or credit cards into a low home loan rate',
    ],
    processSteps: ['Existing loan statement review', 'Equity valuation estimate', 'Lender pricing request', 'Discharge & switch'],
    typicalQuestions: [
      {
        q: 'How often should I review my home loan?',
        a: 'At Blueprint, we recommend and perform a dedicated review every 2 years. Lenders routinely offer discounts to new customers while letting existing clients pay a "loyalty tax". We keep them accountable.',
      },
      {
        q: 'Are there costs to refinance my mortgage?',
        a: 'Typical discharge and state registration fees total approximately $300 - $600. However, interest savings often exceed thousands per year, and many lenders offer cashback incentives ($2,000 - $3,000) to cover costs.',
      },
    ],
  },
  {
    id: 'investment-loans',
    slug: 'investment-loans',
    title: 'Investment Property Finance',
    tagline: 'Build wealth and expand your Australian property portfolio',
    shortDescription:
      'Strategic borrowing structures designed to maximize tax effectiveness, cash flow yields, and borrowing power for property investors.',
    audience: ['First-time property investors', 'Experienced portfolio builders', 'Self-Managed Super Fund (SMSF) buyers'],
    keyBenefits: [
      'Interest-only vs Principal & Interest analysis aligned with your accountant',
      'Cross-collateralisation avoidance to keep each asset protected and liquid',
      'Equity release from existing homes to fund 100% of purchase costs',
    ],
    processSteps: ['Portfolio equity audit', 'Tax-effective structure plan', 'Pre-approval acquisition', 'Settlement coordination'],
    typicalQuestions: [
      {
        q: 'Should I choose Interest-Only or Principal & Interest for my investment property?',
        a: 'Interest-only maximizes tax-deductible cash flow and reduces monthly commitments, whereas P&I builds equity. We review your overall strategy and tax position with your accountant before deciding.',
      },
    ],
  },
  {
    id: 'first-home-buyer',
    slug: 'first-home-buyer',
    title: 'First Home Buyer Specialist',
    tagline: 'Step-by-step guidance, grants navigation & zero-LMI schemes',
    shortDescription:
      'We guide first home buyers through grants, NSW stamp duty exemptions, and the Federal First Home Guarantee scheme with zero stress.',
    audience: ['First-time buyers in Sydney and NSW', 'Borrowers with 5% deposits', 'Couples receiving family guarantor support'],
    keyBenefits: [
      'Guidance through NSW First Home Buyer Assistance Scheme (stamp duty exemptions)',
      'Access to the Australian First Home Guarantee (5% deposit without paying LMI)',
      'Family pledge / guarantor loan setup to help you buy sooner without waiting years to save 20%',
    ],
    processSteps: ['Deposit & grant check', 'Budget & pre-approval', 'Contract inspection coordination', 'Formal approval'],
    typicalQuestions: [
      {
        q: 'Can I buy a home in NSW with only a 5% deposit?',
        a: 'Yes. Eligible first home buyers can participate in the Australian Government First Home Guarantee (FHG) where the government guarantees up to 15% of the loan, eliminating LMI fees entirely.',
      },
    ],
  },
  {
    id: 'debt-consolidation',
    slug: 'debt-consolidation',
    title: 'Debt Consolidation',
    tagline: 'Streamline high-interest debts into one simple, manageable repayment',
    shortDescription:
      'Combine multiple high-interest credit cards, personal loans, or car debts into a single, low-rate home loan to free up hundreds in monthly cash flow.',
    audience: ['Borrowers managing multiple monthly repayments', 'Families looking to boost their monthly savings buffer'],
    keyBenefits: [
      'Replace 15% - 22% credit card interest rates with sub-6.5% home loan rates',
      'One single repayment date to simplify household budgeting',
      'Significant immediate boost to household net disposable income',
    ],
    processSteps: ['Debt balance audit', 'Equity check', 'Consolidation restructure', 'Debt payoff confirmation'],
    typicalQuestions: [
      {
        q: 'Will consolidating short-term debts into a 30-year loan cost more?',
        a: 'If you pay over 30 years without adjusting, total interest could rise. Blueprint structures a split sub-account with accelerated payments so you eliminate the debt quickly at the low home loan rate.',
      },
    ],
  },
];

export const HAVEN_ARTICLES = [
  {
    id: 'haven-summer',
    title: 'Welcome to the Summer Edition of Haven',
    subtitle: 'Money, Lifestyle & Home: Tips for Australian Households',
    category: 'Haven Magazine',
    readTime: '4 min read',
    summary:
      'How to navigate festive spending, summer home improvements, and rate forecast insights for the upcoming Australian financial quarter.',
  },
  {
    id: 'haven-spring',
    title: 'Welcome to the Spring Edition of Haven',
    subtitle: 'Buying Off the Plan & Small Gardens, Big Rewards',
    category: 'Haven Magazine',
    readTime: '5 min read',
    summary:
      'Crucial contractual precautions when buying property off-the-plan, plus spring property maintenance tips to increase valuation.',
  },
  {
    id: 'haven-award',
    title: 'Monthly Winner Announcement – Kathryn Wins $500 Bunnings Voucher!',
    subtitle: 'Client Appreciation & Community Giveaways',
    category: 'Community',
    readTime: '2 min read',
    summary:
      'Congratulations to our valued client Kathryn! Every month Blueprint Financial Services rewards our community members with local lifestyle vouchers.',
  },
];
