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
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Input Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
          <h2 className="text-xl font-medium text-night-blue mb-8 tracking-tight">Your Current Workflow</h2>

          <div className="space-y-5">
            {/* Design Requests */}
            <div>
              <label className="block text-sm font-medium text-neutral-60 mb-2">
                Monthly Design Requests
              </label>
              <input
                type="number"
                value={inputs.designRequests}
                onChange={(e) => handleInputChange("designRequests", e.currentTarget.value)}
                className="w-full px-4 py-3 bg-neutral-5 border border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin focus:bg-white transition-all"
                placeholder="20"
                min="0"
              />
            </div>

            {/* Hours per Design */}
            <div>
              <label className="block text-sm font-medium text-neutral-60 mb-2">
                Hours Per Design
              </label>
              <input
                type="number"
                value={inputs.hoursPerDesign}
                onChange={(e) => handleInputChange("hoursPerDesign", e.currentTarget.value)}
                className="w-full px-4 py-3 bg-neutral-5 border border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin focus:bg-white transition-all"
                placeholder="3"
                min="0"
                step="0.5"
              />
            </div>

            {/* Designer Rate */}
            <div>
              <label className="block text-sm font-medium text-neutral-60 mb-2">
                Designer Rate ($/hour)
              </label>
              <input
                type="number"
                value={inputs.designerRate}
                onChange={(e) => handleInputChange("designerRate", e.currentTarget.value)}
                className="w-full px-4 py-3 bg-neutral-5 border border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin focus:bg-white transition-all"
                placeholder="50"
                min="0"
              />
            </div>

            {/* Revisions */}
            <div>
              <label className="block text-sm font-medium text-neutral-60 mb-2">
                Revisions Per Project
              </label>
              <input
                type="number"
                value={inputs.revisionsPerProject}
                onChange={(e) => handleInputChange("revisionsPerProject", e.currentTarget.value)}
                className="w-full px-4 py-3 bg-neutral-5 border border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin focus:bg-white transition-all"
                placeholder="2"
                min="0"
              />
            </div>

            {/* Hours per Revision */}
            <div>
              <label className="block text-sm font-medium text-neutral-60 mb-2">
                Hours Per Revision
              </label>
              <input
                type="number"
                value={inputs.hoursPerRevision}
                onChange={(e) => handleInputChange("hoursPerRevision", e.currentTarget.value)}
                className="w-full px-4 py-3 bg-neutral-5 border border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin focus:bg-white transition-all"
                placeholder="1"
                min="0"
                step="0.5"
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">

            {/* Comparison */}
            <div className="mb-10">
              <p className="text-sm text-neutral-50 mb-3 tracking-wide">You currently spend</p>
              <p className="text-5xl font-semibold text-night-blue tracking-tight mb-1">
                ${results.totalMonthlyCost.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-40">per month</p>
            </div>

            <div className="h-px bg-neutral-10 my-10"></div>

            <div className="mb-10">
              <p className="text-sm text-neutral-50 mb-3 tracking-wide">With unlimited designs</p>
              <p className="text-5xl font-semibold text-night-blue tracking-tight mb-1">
                ${KAPA99_MONTHLY_COST}
              </p>
              <p className="text-sm text-neutral-40">per month</p>
            </div>

            {/* Savings - Elegant, not screaming */}
            {results.monthlySavings > 0 && (
              <>
                <div className="h-px bg-neutral-10 my-10"></div>

                <div className="text-center py-8">
                  <p className="text-sm text-neutral-50 mb-6 tracking-wide uppercase">Your Savings</p>
                  <p className="text-6xl font-semibold text-pumpkin tracking-tight mb-2 leading-none">
                    ${results.monthlySavings.toLocaleString()}
                  </p>
                  <p className="text-base text-neutral-50 mb-10">every month</p>

                  <div className="bg-neutral-5 rounded-2xl px-8 py-6">
                    <p className="text-4xl font-semibold text-night-blue tracking-tight mb-1">
                      ${results.annualSavings.toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-50">per year</p>
                  </div>
                </div>

                <div className="h-px bg-neutral-10 my-10"></div>

                {/* CTA - Understated */}
                <div className="text-center">
                  <a
                    href="/pricing"
                    className="inline-block bg-pumpkin hover:bg-dark-pumpkin text-white font-medium px-8 py-3.5 rounded-full transition-all"
                  >
                    Start 15-day free trial
                  </a>
                  <p className="text-xs text-neutral-40 mt-4">No credit card required</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
