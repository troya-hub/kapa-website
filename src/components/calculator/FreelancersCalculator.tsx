import { useState, useEffect } from "preact/hooks";

interface CalculatorInputs {
  clientsServed: number;
  chargePerClient: number;
  designSpending: number;
  clientsTurnedAway: number;
}

interface CalculationResults {
  currentRevenue: number;
  currentMargin: number;
  currentMarginPercent: number;
  flatFeeMargin: number;
  flatFeeMarginPercent: number;
  turnedAwayRevenue: number;
  annualProfitDifference: number;
}

const KAPA99_MONTHLY_COST = 499;

export default function FreelancersCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    clientsServed: 10,
    chargePerClient: 1500,
    designSpending: 10000,
    clientsTurnedAway: 3,
  });

  const [results, setResults] = useState<CalculationResults>({
    currentRevenue: 0,
    currentMargin: 0,
    currentMarginPercent: 0,
    flatFeeMargin: 0,
    flatFeeMarginPercent: 0,
    turnedAwayRevenue: 0,
    annualProfitDifference: 0,
  });

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const calculateResults = () => {
    const currentRevenue = inputs.clientsServed * inputs.chargePerClient;
    const currentMargin = currentRevenue - inputs.designSpending;
    const currentMarginPercent = currentRevenue > 0 ? (currentMargin / currentRevenue) * 100 : 0;

    // With us: design costs halve (not go to zero)
    const designCostsWithUs = inputs.designSpending / 2;
    const flatFeeMargin = currentRevenue - designCostsWithUs;
    const flatFeeMarginPercent = currentRevenue > 0 ? (flatFeeMargin / currentRevenue) * 100 : 0;

    const turnedAwayRevenue = inputs.clientsTurnedAway * inputs.chargePerClient;

    const monthlyProfitDifference = flatFeeMargin - currentMargin;
    const annualProfitDifference = monthlyProfitDifference * 12;

    setResults({
      currentRevenue,
      currentMargin,
      currentMarginPercent,
      flatFeeMargin,
      flatFeeMarginPercent,
      turnedAwayRevenue,
      annualProfitDifference,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Input Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">
          <h2 className="text-lg font-medium text-night-blue mb-6 tracking-tight">Your Agency Numbers</h2>

          <div className="space-y-4">
            {/* Clients Served */}
            <div>
              <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                Clients You Serve
              </label>
              <input
                type="number"
                value={inputs.clientsServed}
                onChange={(e) => handleInputChange("clientsServed", e.currentTarget.value)}
                className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                placeholder="10"
                min="0"
              />
            </div>

            {/* Charge and Spending - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Charge/Client
                </label>
                <input
                  type="number"
                  value={inputs.chargePerClient}
                  onChange={(e) => handleInputChange("chargePerClient", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="1500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                  Design Costs
                </label>
                <input
                  type="number"
                  value={inputs.designSpending}
                  onChange={(e) => handleInputChange("designSpending", e.currentTarget.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                  placeholder="10000"
                  min="0"
                />
              </div>
            </div>

            {/* Clients Turned Away */}
            <div>
              <label className="block text-xs font-medium text-neutral-50 mb-2 uppercase tracking-wider">
                Clients Turned Away
              </label>
              <input
                type="number"
                value={inputs.clientsTurnedAway}
                onChange={(e) => handleInputChange("clientsTurnedAway", e.currentTarget.value)}
                className="w-full px-3 py-2.5 bg-white border-2 border-neutral-20 rounded-xl focus:outline-none focus:border-pumpkin transition-all font-medium text-night-blue"
                placeholder="3"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8">

            {/* Margin Comparison - Side by Side */}
            <div className="grid grid-cols-2 gap-5 mb-4">
              <div className="text-center">
                <p className="text-xs text-neutral-50 mb-1.5 uppercase tracking-wider">Current Margin</p>
                <p className="text-3xl font-semibold text-night-blue tracking-tight">
                  ${results.currentMargin.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-40 mt-0.5">{results.currentMarginPercent.toFixed(0)}% margin</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-pumpkin mb-1.5 uppercase tracking-wider font-medium">With Us</p>
                <p className="text-3xl font-semibold text-pumpkin tracking-tight">
                  ${results.flatFeeMargin.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-40 mt-0.5">{results.flatFeeMarginPercent.toFixed(0)}% margin</p>
              </div>
            </div>

            {/* Elegant explanation */}
            <p className="text-center text-sm text-neutral-60 mb-6 italic">
              With our unlimited designs, agencies typically reduce design costs by ~50%
            </p>

            {/* Side by Side: Missing Revenue + Profit Increase */}
            {(results.turnedAwayRevenue > 0 || results.annualProfitDifference > 0) && (
              <>
                <div className="h-px bg-neutral-10 my-6"></div>

                <div className="grid grid-cols-2 gap-5 mb-6">
                  {/* Revenue You're Missing */}
                  {results.turnedAwayRevenue > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-neutral-50 mb-3 tracking-wider uppercase font-medium">Revenue Missing</p>
                      <p className="text-3xl font-bold text-pumpkin tracking-tight leading-none mb-1">
                        ${results.turnedAwayRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-40 mb-4">per month</p>
                      <div className="bg-pumpkin/5 border border-pumpkin/20 rounded-xl px-4 py-3">
                        <p className="text-xl font-bold text-night-blue tracking-tight">
                          ${(results.turnedAwayRevenue * 12).toLocaleString()}
                        </p>
                        <p className="text-xs text-neutral-50 mt-0.5">per year</p>
                      </div>
                    </div>
                  )}

                  {/* Profit Increase */}
                  {results.annualProfitDifference > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-neutral-50 mb-3 tracking-wider uppercase font-medium">Profit Increase</p>
                      <p className="text-3xl font-bold text-pumpkin tracking-tight leading-none mb-1">
                        ${(results.annualProfitDifference / 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-40 mb-4">per month</p>
                      <div className="bg-pumpkin/5 border border-pumpkin/20 rounded-xl px-4 py-3">
                        <p className="text-xl font-bold text-night-blue tracking-tight">
                          ${results.annualProfitDifference.toLocaleString()}
                        </p>
                        <p className="text-xs text-neutral-50 mt-0.5">per year</p>
                      </div>
                    </div>
                  )}
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
