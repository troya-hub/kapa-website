import { useState, useEffect } from "preact/hooks";

interface CalculatorInputs {
  designRequests: number;
  hoursPerDesign: number;
  designerRate: number;
  revisionsPerProject: number;
  hoursPerRevision: number;
}

interface CalculationResults {
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
  });

  const [results, setResults] = useState<CalculationResults>({
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
    const totalMonthlyCost = designCosts + revisionCosts;
    const monthlySavings = totalMonthlyCost - KAPA99_MONTHLY_COST;
    const annualSavings = monthlySavings * 12;

    setResults({
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
        </div>
      </div>
    </div>
  );
}
