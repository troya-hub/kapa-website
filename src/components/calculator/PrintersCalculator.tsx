import { useState, useEffect } from "preact/hooks";

interface CalculatorInputs {
  designRequests: number;
  hoursPerDesign: number;
  designerRate: number;
  revisionsPerProject: number;
  hoursPerRevision: number;
  softwareCosts: number;
  overheadHours: number;
  stockPhotoCosts: number;
}

interface CalculationResults {
  designCosts: number;
  revisionCosts: number;
  softwareCosts: number;
  overheadCosts: number;
  stockPhotoCosts: number;
  totalMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
}

const KAPA99_MONTHLY_COST = 499;

export default function PrintersCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    designRequests: 20,
    hoursPerDesign: 3,
    designerRate: 50,
    revisionsPerProject: 2,
    hoursPerRevision: 1,
    softwareCosts: 100,
    overheadHours: 10,
    stockPhotoCosts: 50,
  });

  const [results, setResults] = useState<CalculationResults>({
    designCosts: 0,
    revisionCosts: 0,
    softwareCosts: 0,
    overheadCosts: 0,
    stockPhotoCosts: 0,
    totalMonthlyCost: 0,
    monthlySavings: 0,
    annualSavings: 0,
  });

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateCosts();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const calculateCosts = () => {
    const designCosts = inputs.designRequests * inputs.hoursPerDesign * inputs.designerRate;
    const revisionCosts =
      inputs.designRequests * inputs.revisionsPerProject * inputs.hoursPerRevision * inputs.designerRate;
    const overheadCosts = inputs.overheadHours * inputs.designerRate;
    const totalMonthlyCost =
      designCosts + revisionCosts + inputs.softwareCosts + overheadCosts + inputs.stockPhotoCosts;
    const monthlySavings = totalMonthlyCost - KAPA99_MONTHLY_COST;
    const annualSavings = monthlySavings * 12;

    setResults({
      designCosts,
      revisionCosts,
      softwareCosts: inputs.softwareCosts,
      overheadCosts,
      stockPhotoCosts: inputs.stockPhotoCosts,
      totalMonthlyCost,
      monthlySavings,
      annualSavings,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Input Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-night-blue mb-6">Your Current Workflow</h2>

          <div className="space-y-5">
            {/* Design Requests */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Monthly Design Requests
              </label>
              <input
                type="number"
                value={inputs.designRequests}
                onChange={(e) => handleInputChange("designRequests", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="20"
                min="0"
              />
            </div>

            {/* Hours per Design */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Hours Per Design
              </label>
              <input
                type="number"
                value={inputs.hoursPerDesign}
                onChange={(e) => handleInputChange("hoursPerDesign", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="3"
                min="0"
                step="0.5"
              />
            </div>

            {/* Designer Rate */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Designer Rate ($/hour)
              </label>
              <input
                type="number"
                value={inputs.designerRate}
                onChange={(e) => handleInputChange("designerRate", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="50"
                min="0"
              />
            </div>

            {/* Revisions */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Revisions Per Project
              </label>
              <input
                type="number"
                value={inputs.revisionsPerProject}
                onChange={(e) => handleInputChange("revisionsPerProject", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="2"
                min="0"
              />
            </div>

            {/* Hours per Revision */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Hours Per Revision
              </label>
              <input
                type="number"
                value={inputs.hoursPerRevision}
                onChange={(e) => handleInputChange("hoursPerRevision", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="1"
                min="0"
                step="0.5"
              />
            </div>

            {/* Software Costs */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Software Costs ($/month)
              </label>
              <input
                type="number"
                value={inputs.softwareCosts}
                onChange={(e) => handleInputChange("softwareCosts", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="100"
                min="0"
              />
            </div>

            {/* Overhead Hours */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Overhead Hours (per month)
              </label>
              <input
                type="number"
                value={inputs.overheadHours}
                onChange={(e) => handleInputChange("overheadHours", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="10"
                min="0"
              />
            </div>

            {/* Stock Photos */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-2">
                Stock Assets ($/month)
              </label>
              <input
                type="number"
                value={inputs.stockPhotoCosts}
                onChange={(e) => handleInputChange("stockPhotoCosts", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all"
                placeholder="50"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Right: Results (Sticky) */}
        <div className="lg:sticky lg:top-8 space-y-8">
          {/* Simple Comparison - No Boxes */}
          <div className="text-center py-8">
            <p className="text-sm text-neutral-50 mb-4">Your current monthly cost</p>
            <p className="text-6xl lg:text-7xl font-bold text-night-blue mb-2">
              ${results.totalMonthlyCost.toLocaleString()}
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px bg-neutral-20 flex-1"></div>
              <span className="text-sm font-medium text-neutral-40 uppercase tracking-widest">vs</span>
              <div className="h-px bg-neutral-20 flex-1"></div>
            </div>

            <p className="text-sm text-pumpkin mb-3 uppercase tracking-wide font-semibold">Flat Rate</p>
            <p className="text-5xl lg:text-6xl font-bold text-night-blue">
              ${KAPA99_MONTHLY_COST}
            </p>
            <p className="text-neutral-50 mt-2">unlimited everything</p>
          </div>

          {/* HERO: Massive Savings */}
          {results.monthlySavings > 0 && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 opacity-10 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
                <p className="text-white/80 text-lg mb-6 font-medium">You save</p>
                <div className="mb-8">
                  <p className="text-white text-7xl lg:text-8xl font-black mb-2 leading-none">
                    ${results.monthlySavings.toLocaleString()}
                  </p>
                  <p className="text-white/90 text-2xl font-semibold">every month</p>
                </div>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6">
                  <p className="text-white text-5xl lg:text-6xl font-black">
                    ${results.annualSavings.toLocaleString()}
                  </p>
                  <p className="text-white/90 text-lg mt-2 font-medium">per year</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA - Flows Naturally */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pumpkin via-yellow-400 to-pumpkin rounded-2xl blur opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-pumpkin to-dark-pumpkin text-white rounded-2xl p-10 lg:p-12 text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-white text-pumpkin font-bold rounded-full px-5 py-2 mb-6 text-base">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Free 15-Day Trial</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Start Saving Today
              </h3>
              <p className="text-lg opacity-95 mb-10 max-w-md mx-auto leading-relaxed">
                Unlimited design requests. No contracts. Cancel anytime.
              </p>
              <a
                href="/pricing"
                className="inline-block w-full bg-white text-pumpkin font-bold px-10 py-5 rounded-2xl hover:bg-neutral-10 transition-all transform hover:scale-105 active:scale-95 shadow-2xl text-xl mb-4"
              >
                Start Your Free Trial →
              </a>
              <p className="text-sm opacity-90">No credit card required • Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
