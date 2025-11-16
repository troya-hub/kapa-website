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
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Left: Input Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-5 lg:p-6">
          <h2 className="text-lg font-semibold text-night-blue mb-4">Your Current Workflow</h2>

          <div className="space-y-3">
            {/* Design Requests */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Monthly Design Requests
              </label>
              <input
                type="number"
                value={inputs.designRequests}
                onChange={(e) => handleInputChange("designRequests", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="20"
                min="0"
              />
            </div>

            {/* Hours per Design */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Hours Per Design
              </label>
              <input
                type="number"
                value={inputs.hoursPerDesign}
                onChange={(e) => handleInputChange("hoursPerDesign", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="3"
                min="0"
                step="0.5"
              />
            </div>

            {/* Designer Rate */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Designer Rate ($/hour)
              </label>
              <input
                type="number"
                value={inputs.designerRate}
                onChange={(e) => handleInputChange("designerRate", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="50"
                min="0"
              />
            </div>

            {/* Revisions */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Revisions Per Project
              </label>
              <input
                type="number"
                value={inputs.revisionsPerProject}
                onChange={(e) => handleInputChange("revisionsPerProject", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="2"
                min="0"
              />
            </div>

            {/* Hours per Revision */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Hours Per Revision
              </label>
              <input
                type="number"
                value={inputs.hoursPerRevision}
                onChange={(e) => handleInputChange("hoursPerRevision", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="1"
                min="0"
                step="0.5"
              />
            </div>

            {/* Software Costs */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Software Costs ($/month)
              </label>
              <input
                type="number"
                value={inputs.softwareCosts}
                onChange={(e) => handleInputChange("softwareCosts", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="100"
                min="0"
              />
            </div>

            {/* Overhead Hours */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Overhead Hours (per month)
              </label>
              <input
                type="number"
                value={inputs.overheadHours}
                onChange={(e) => handleInputChange("overheadHours", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="10"
                min="0"
              />
            </div>

            {/* Stock Photos */}
            <div>
              <label className="block text-sm font-medium text-night-blue mb-1.5">
                Stock Assets ($/month)
              </label>
              <input
                type="number"
                value={inputs.stockPhotoCosts}
                onChange={(e) => handleInputChange("stockPhotoCosts", e.currentTarget.value)}
                className="w-full px-3 py-2 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent transition-all text-sm"
                placeholder="50"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:sticky lg:top-8 space-y-4">
          {/* Comparison Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-5 lg:p-6">
            <h2 className="text-lg font-semibold text-night-blue mb-4">The Numbers</h2>

            {/* Your Cost */}
            <div className="mb-5">
              <p className="text-xs text-neutral-60 mb-1.5">You currently spend</p>
              <p className="text-4xl font-bold text-night-blue">
                ${results.totalMonthlyCost.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-50 mt-1">per month</p>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-20 my-5"></div>

            {/* Our Price */}
            <div>
              <p className="text-xs text-neutral-60 mb-1.5">Switch to unlimited for</p>
              <p className="text-4xl font-bold text-pumpkin">
                ${KAPA99_MONTHLY_COST}
              </p>
              <p className="text-xs text-neutral-50 mt-1">per month, unlimited designs</p>
            </div>
          </div>

          {/* Savings - HERO (Standalone, not in white card) */}
          {results.monthlySavings > 0 && (
            <div className="bg-gradient-to-br from-pumpkin to-dark-pumpkin rounded-2xl shadow-xl p-6 lg:p-8 text-center">
              <p className="text-white/80 text-xs mb-3 uppercase tracking-wide font-semibold">You Save</p>
              <p className="text-white text-6xl lg:text-7xl font-black mb-2 leading-none">
                ${results.monthlySavings.toLocaleString()}
              </p>
              <p className="text-white/90 text-base mb-5">every month</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white text-3xl lg:text-4xl font-black mb-1">
                  ${results.annualSavings.toLocaleString()}
                </p>
                <p className="text-white/80 text-sm">per year</p>
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-5 lg:p-6 text-center">
            <h3 className="text-xl font-bold text-night-blue mb-2">Ready to save?</h3>
            <p className="text-neutral-60 text-sm mb-4">Start your free trial today</p>
            <a
              href="/pricing"
              className="block w-full bg-pumpkin hover:bg-dark-pumpkin text-white text-center font-bold text-base py-3.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg mb-2"
            >
              Start Your Free Trial →
            </a>
            <p className="text-xs text-neutral-50">
              15-day free trial • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
