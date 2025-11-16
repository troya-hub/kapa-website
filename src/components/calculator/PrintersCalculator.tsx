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

        {/* Right: Clean Results */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            {/* Current Cost */}
            <div className="text-center mb-12">
              <p className="text-neutral-60 text-base mb-3">You currently spend</p>
              <p className="text-6xl font-bold text-neutral-80">
                ${results.totalMonthlyCost.toLocaleString()}
              </p>
              <p className="text-neutral-50 text-sm mt-2">per month</p>
            </div>

            {/* Our Price */}
            <div className="text-center mb-12 pb-12 border-b-2 border-neutral-10">
              <p className="text-neutral-60 text-base mb-3">Switch to unlimited for</p>
              <p className="text-5xl font-bold text-night-blue">
                ${KAPA99_MONTHLY_COST}
              </p>
              <p className="text-neutral-50 text-sm mt-2">per month, unlimited designs</p>
            </div>

            {/* Savings - THE HERO */}
            {results.monthlySavings > 0 ? (
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-10 text-center mb-8">
                <p className="text-white text-lg mb-4 opacity-90">You save</p>
                <p className="text-white text-8xl font-black mb-3 leading-none">
                  ${results.monthlySavings.toLocaleString()}
                </p>
                <p className="text-white text-xl mb-6 opacity-90">every month</p>

                <div className="pt-6 border-t border-white/30">
                  <p className="text-white text-5xl font-black mb-2">
                    ${results.annualSavings.toLocaleString()}
                  </p>
                  <p className="text-white opacity-90">per year</p>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-10 rounded-2xl p-10 text-center mb-8">
                <p className="text-neutral-60 text-lg">Adjust the calculator to see your savings</p>
              </div>
            )}

            {/* CTA */}
            <a
              href="/pricing"
              className="block w-full bg-pumpkin hover:bg-dark-pumpkin text-white text-center font-bold text-xl py-5 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg mb-3"
            >
              Start Your Free Trial →
            </a>
            <p className="text-center text-sm text-neutral-50">
              15-day free trial • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
