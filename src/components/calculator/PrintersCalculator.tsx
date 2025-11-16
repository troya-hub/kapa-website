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

  const [showResults, setShowResults] = useState(false);

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

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="w-full">
      {/* Calculator Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-night-blue mb-4">
            Calculate Your Hidden Design Costs
          </h2>
          <p className="text-lg text-neutral-60 mb-8">
            Fill in your current design workflow details to see how much you could save with Kapa99's flat-fee
            service.
          </p>

          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Design Requests */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Monthly Design Requests
              </label>
              <input
                type="number"
                value={inputs.designRequests}
                onChange={(e) => handleInputChange("designRequests", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="20"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">How many designs do you need per month?</p>
            </div>

            {/* Hours per Design */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Average Hours Per Design
              </label>
              <input
                type="number"
                value={inputs.hoursPerDesign}
                onChange={(e) => handleInputChange("hoursPerDesign", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="3"
                min="0"
                step="0.5"
              />
              <p className="text-xs text-neutral-50 mt-1">Average time spent on each design</p>
            </div>

            {/* Designer Rate */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Designer Hourly Rate ($)
              </label>
              <input
                type="number"
                value={inputs.designerRate}
                onChange={(e) => handleInputChange("designerRate", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="50"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">Include salary, benefits, and overhead</p>
            </div>

            {/* Revisions */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Average Revisions Per Project
              </label>
              <input
                type="number"
                value={inputs.revisionsPerProject}
                onChange={(e) => handleInputChange("revisionsPerProject", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="2"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">How many rounds of changes per design?</p>
            </div>

            {/* Hours per Revision */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Hours Per Revision
              </label>
              <input
                type="number"
                value={inputs.hoursPerRevision}
                onChange={(e) => handleInputChange("hoursPerRevision", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="1"
                min="0"
                step="0.5"
              />
              <p className="text-xs text-neutral-50 mt-1">Time spent on each revision round</p>
            </div>

            {/* Software Costs */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Monthly Software Costs ($)
              </label>
              <input
                type="number"
                value={inputs.softwareCosts}
                onChange={(e) => handleInputChange("softwareCosts", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="100"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">Adobe, Canva, Figma subscriptions, etc.</p>
            </div>

            {/* Overhead Hours */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Monthly Overhead Hours
              </label>
              <input
                type="number"
                value={inputs.overheadHours}
                onChange={(e) => handleInputChange("overheadHours", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="10"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">Management, emails, coordination time</p>
            </div>

            {/* Stock Photos */}
            <div>
              <label className="block text-sm font-semibold text-night-blue mb-2">
                Monthly Stock Photo Costs ($)
              </label>
              <input
                type="number"
                value={inputs.stockPhotoCosts}
                onChange={(e) => handleInputChange("stockPhotoCosts", e.currentTarget.value)}
                className="w-full px-4 py-3 border border-neutral-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pumpkin focus:border-transparent"
                placeholder="50"
                min="0"
              />
              <p className="text-xs text-neutral-50 mt-1">Stock images, fonts, graphics licenses</p>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <button onClick={handleCalculate} className="button-primary px-8 py-4 text-lg">
              Calculate My Costs
            </button>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="border-t-2 border-neutral-20 pt-8">
              {/* Cost Breakdown */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-night-blue mb-4">Your Monthly Cost Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                    <span className="text-neutral-70">Design Work</span>
                    <span className="font-semibold text-night-blue">
                      ${results.designCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                    <span className="text-neutral-70">Revisions</span>
                    <span className="font-semibold text-night-blue">
                      ${results.revisionCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                    <span className="text-neutral-70">Software Subscriptions</span>
                    <span className="font-semibold text-night-blue">
                      ${results.softwareCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                    <span className="text-neutral-70">Project Management Overhead</span>
                    <span className="font-semibold text-night-blue">
                      ${results.overheadCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-20">
                    <span className="text-neutral-70">Stock Photos & Assets</span>
                    <span className="font-semibold text-night-blue">
                      ${results.stockPhotoCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-neutral-10 px-4 rounded-lg mt-4">
                    <span className="font-bold text-lg text-night-blue">Total Monthly Cost</span>
                    <span className="font-bold text-2xl text-pumpkin">
                      ${results.totalMonthlyCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-gradient-to-br from-pumpkin to-dark-pumpkin text-white rounded-xl p-8 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                  Your Potential Savings with Kapa99
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Your Current Cost</p>
                    <p className="text-4xl font-bold">${results.totalMonthlyCost.toLocaleString()}</p>
                    <p className="text-sm mt-1 opacity-75">per month</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Kapa99 Flat Fee</p>
                    <p className="text-4xl font-bold">${KAPA99_MONTHLY_COST}</p>
                    <p className="text-sm mt-1 opacity-75">per month</p>
                  </div>
                </div>

                {results.monthlySavings > 0 ? (
                  <div className="text-center">
                    <div className="bg-white text-pumpkin rounded-lg p-6 inline-block">
                      <p className="text-sm font-semibold mb-2">YOU COULD SAVE</p>
                      <p className="text-5xl font-bold mb-1">${results.monthlySavings.toLocaleString()}</p>
                      <p className="text-lg">per month</p>
                      <p className="text-2xl font-bold mt-4">
                        ${results.annualSavings.toLocaleString()} annually
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center bg-white/10 backdrop-blur rounded-lg p-6">
                    <p className="text-lg">
                      Even at your current volume, Kapa99 offers unlimited designs for a predictable flat fee of
                      $499/month.
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="bg-night-blue text-white rounded-xl p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Cut Your Design Costs?</h3>
                <p className="text-lg mb-6 opacity-90">
                  See how Kapa99's unlimited design service can transform your print shop's workflow and bottom
                  line.
                </p>
                <a
                  href="/pricing"
                  className="button-primary inline-block px-8 py-4 text-lg"
                >
                  Start free trial
                </a>
                <p className="text-sm mt-4 opacity-75">15-day free trial • No credit card required • Cancel anytime</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
