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
        <div className="lg:sticky lg:top-8">
          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-6 lg:p-8 mb-6">
            <h2 className="text-xl font-semibold text-night-blue mb-6">Monthly Breakdown</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-60">Design Work</span>
                <span className="font-medium text-night-blue">${results.designCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-60">Revisions</span>
                <span className="font-medium text-night-blue">${results.revisionCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-60">Software</span>
                <span className="font-medium text-night-blue">${results.softwareCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-60">Overhead</span>
                <span className="font-medium text-night-blue">${results.overheadCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-60">Stock Assets</span>
                <span className="font-medium text-night-blue">${results.stockPhotoCosts.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-neutral-20 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-night-blue">Your Total</span>
                <span className="text-3xl font-bold text-night-blue">
                  ${results.totalMonthlyCost.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-neutral-50 mt-1 text-right">per month</p>
            </div>

            <div className="bg-neutral-10 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-60">With our service</span>
                <span className="text-2xl font-bold text-night-blue">${KAPA99_MONTHLY_COST}</span>
              </div>
              <p className="text-xs text-neutral-50 mt-1 text-right">per month, unlimited designs</p>
            </div>

            {results.monthlySavings > 0 && (
              <div className="bg-gradient-to-br from-pumpkin to-dark-pumpkin text-white rounded-xl p-6 text-center">
                <p className="text-sm font-medium mb-2 opacity-90">Your Savings</p>
                <p className="text-4xl font-bold mb-1">${results.monthlySavings.toLocaleString()}</p>
                <p className="text-sm opacity-90">per month</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-2xl font-bold">${results.annualSavings.toLocaleString()}</p>
                  <p className="text-xs opacity-75 mt-1">annually</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-pumpkin to-dark-pumpkin text-white rounded-2xl p-8 lg:p-10 text-center shadow-xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <span className="text-sm font-semibold">Free 14-Day Trial</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3">Start Saving Today</h3>
            <p className="text-base opacity-95 mb-8 max-w-sm mx-auto">
              Unlimited design requests. No contracts. Cancel anytime.
            </p>
            <a
              href="/pricing"
              className="inline-block w-full bg-white text-pumpkin font-bold px-8 py-4 rounded-xl hover:bg-neutral-10 transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              Start Your Free Trial
            </a>
            <p className="text-xs opacity-75 mt-4">No credit card required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
