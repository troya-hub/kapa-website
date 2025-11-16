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
        <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">
          <h2 className="text-lg font-medium text-night-blue mb-6 tracking-tight">Your Current Workflow</h2>

          <div className="space-y-4">
            {/* Design Requests */}
            <div>
              <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                Monthly Design Requests
              </label>
              <input
                type="number"
                value={inputs.designRequests}
                onChange={(e) => handleInputChange("designRequests", e.currentTarget.value)}
                className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                placeholder="20"
                min="0"
              />
            </div>

            {/* Hours and Rate - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Hours/Design
                </label>
                <input
                  type="number"
                  value={inputs.hoursPerDesign}
                  onChange={(e) => handleInputChange("hoursPerDesign", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="3"
                  min="0"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Rate/Hour
                </label>
                <input
                  type="number"
                  value={inputs.designerRate}
                  onChange={(e) => handleInputChange("designerRate", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="50"
                  min="0"
                />
              </div>
            </div>

            {/* Revisions - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Revisions/Project
                </label>
                <input
                  type="number"
                  value={inputs.revisionsPerProject}
                  onChange={(e) => handleInputChange("revisionsPerProject", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="2"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Hours/Revision
                </label>
                <input
                  type="number"
                  value={inputs.hoursPerRevision}
                  onChange={(e) => handleInputChange("hoursPerRevision", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="1"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">

            {/* Comparison - Side by Side */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div className="text-center">
                <p className="text-xs text-neutral-50 mb-1.5 uppercase tracking-wider">Your Cost</p>
                <p className="text-3xl font-semibold text-night-blue tracking-tight">
                  ${results.totalMonthlyCost.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-40 mt-0.5">per month</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-pumpkin mb-1.5 uppercase tracking-wider font-medium">Our Price</p>
                <p className="text-3xl font-semibold text-pumpkin tracking-tight">
                  ${KAPA99_MONTHLY_COST}
                </p>
                <p className="text-xs text-neutral-40 mt-0.5">unlimited</p>
              </div>
            </div>

            {/* Savings - Elegant, not screaming */}
            {results.monthlySavings > 0 && (
              <>
                <div className="h-px bg-neutral-10 my-6"></div>

                <div className="text-center py-4">
                  <p className="text-xs text-neutral-50 mb-3 tracking-wider uppercase font-medium">You Save</p>
                  <div className="mb-5">
                    <p className="text-5xl font-bold text-pumpkin tracking-tight leading-none">
                      ${results.monthlySavings.toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-50 mt-1.5">per month</p>
                  </div>

                  <div className="bg-pumpkin/5 border border-pumpkin/20 rounded-2xl px-5 py-4">
                    <p className="text-2xl font-bold text-night-blue tracking-tight">
                      ${results.annualSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-50 mt-1 uppercase tracking-wider">Annual Savings</p>
                  </div>
                </div>

                <div className="h-px bg-neutral-10 my-6"></div>

                {/* CTA - Understated */}
                <div className="text-center">
                  <a
                    href="/pricing"
                    className="inline-block bg-pumpkin hover:bg-dark-pumpkin text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-pumpkin/20 hover:shadow-xl hover:shadow-pumpkin/30"
                  >
                    Start 15-day free trial
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
