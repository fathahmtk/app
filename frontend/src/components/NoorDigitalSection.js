import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  Target, 
  RefreshCw,
  DollarSign,
  PieChart,
  BarChart3,
  Zap,
  Star,
  Users,
  FileText,
  Lightbulb,
  Rocket,
  Globe
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const NoorDigitalSection = () => {
  const { toast } = useToast();
  
  // Advanced Calculator States
  const [vatCalculator, setVatCalculator] = useState({
    amount: '',
    rate: '5',
    type: 'exclusive',
    result: null
  });

  const [profitCalculator, setProfitCalculator] = useState({
    revenue: '',
    cogs: '',
    expenses: '',
    otherIncome: '',
    otherExpenses: '',
    result: null
  });

  const [roiCalculator, setRoiCalculator] = useState({
    investment: '',
    finalValue: '',
    timePeriod: '',
    result: null
  });

  const [breakEvenCalculator, setBreakEvenCalculator] = useState({
    fixedCosts: '',
    variableCost: '',
    sellingPrice: '',
    result: null
  });

  // VAT Calculator Functions
  const calculateVAT = () => {
    const amount = parseFloat(vatCalculator.amount);
    const rate = parseFloat(vatCalculator.rate);

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    let netAmount, vatAmount, totalAmount;

    if (vatCalculator.type === 'exclusive') {
      netAmount = amount;
      vatAmount = (amount * rate) / 100;
      totalAmount = amount + vatAmount;
    } else {
      totalAmount = amount;
      netAmount = amount / (1 + rate / 100);
      vatAmount = totalAmount - netAmount;
    }

    setVatCalculator(prev => ({
      ...prev,
      result: {
        netAmount: netAmount.toFixed(2),
        vatAmount: vatAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      }
    }));

    toast({
      title: "VAT Calculated",
      description: `VAT Amount: QAR ${vatAmount.toFixed(2)}`,
      duration: 3000
    });
  };

  // Profit & Loss Calculator
  const calculateProfitLoss = () => {
    const revenue = parseFloat(profitCalculator.revenue) || 0;
    const cogs = parseFloat(profitCalculator.cogs) || 0;
    const expenses = parseFloat(profitCalculator.expenses) || 0;
    const otherIncome = parseFloat(profitCalculator.otherIncome) || 0;
    const otherExpenses = parseFloat(profitCalculator.otherExpenses) || 0;

    const grossProfit = revenue - cogs;
    const operatingProfit = grossProfit - expenses;
    const netProfit = operatingProfit + otherIncome - otherExpenses;

    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    setProfitCalculator(prev => ({
      ...prev,
      result: {
        grossProfit: grossProfit.toFixed(2),
        operatingProfit: operatingProfit.toFixed(2),
        netProfit: netProfit.toFixed(2),
        grossMargin: grossMargin.toFixed(2),
        operatingMargin: operatingMargin.toFixed(2),
        netMargin: netMargin.toFixed(2)
      }
    }));

    toast({
      title: "Profit Analysis Complete",
      description: `Net Profit: QAR ${netProfit.toFixed(2)} (${netMargin.toFixed(2)}%)`,
      duration: 3000
    });
  };

  // ROI Calculator
  const calculateROI = () => {
    const investment = parseFloat(roiCalculator.investment);
    const finalValue = parseFloat(roiCalculator.finalValue);
    const timePeriod = parseFloat(roiCalculator.timePeriod);

    if (!investment || !finalValue || investment <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid investment amounts",
        variant: "destructive"
      });
      return;
    }

    const totalReturn = finalValue - investment;
    const roiPercentage = (totalReturn / investment) * 100;
    let annualizedROI = null;

    if (timePeriod > 0) {
      annualizedROI = (Math.pow(finalValue / investment, 1 / timePeriod) - 1) * 100;
    }

    setRoiCalculator(prev => ({
      ...prev,
      result: {
        totalReturn: totalReturn.toFixed(2),
        roiPercentage: roiPercentage.toFixed(2),
        annualizedROI: annualizedROI ? annualizedROI.toFixed(2) : null
      }
    }));

    toast({
      title: "ROI Calculated",
      description: `Total ROI: ${roiPercentage.toFixed(2)}%`,
      duration: 3000
    });
  };

  // Break-even Calculator
  const calculateBreakEven = () => {
    const fixedCosts = parseFloat(breakEvenCalculator.fixedCosts);
    const variableCost = parseFloat(breakEvenCalculator.variableCost);
    const sellingPrice = parseFloat(breakEvenCalculator.sellingPrice);

    if (!fixedCosts || !variableCost || !sellingPrice) {
      toast({
        title: "Missing Data",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (sellingPrice <= variableCost) {
      toast({
        title: "Invalid Pricing",
        description: "Selling price must be greater than variable cost",
        variant: "destructive"
      });
      return;
    }

    const contributionMargin = sellingPrice - variableCost;
    const contributionMarginRatio = (contributionMargin / sellingPrice) * 100;
    const breakEvenUnits = fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;

    setBreakEvenCalculator(prev => ({
      ...prev,
      result: {
        contributionMargin: contributionMargin.toFixed(2),
        contributionMarginRatio: contributionMarginRatio.toFixed(2),
        breakEvenUnits: Math.ceil(breakEvenUnits),
        breakEvenRevenue: breakEvenRevenue.toFixed(2)
      }
    }));

    toast({
      title: "Break-even Analysis Complete",
      description: `Break-even: ${Math.ceil(breakEvenUnits)} units`,
      duration: 3000
    });
  };

  const resetCalculator = (calculator) => {
    switch(calculator) {
      case 'vat':
        setVatCalculator(prev => ({ ...prev, amount: '', result: null }));
        break;
      case 'profit':
        setProfitCalculator(prev => ({
          ...prev,
          revenue: '', cogs: '', expenses: '', otherIncome: '', otherExpenses: '', result: null
        }));
        break;
      case 'roi':
        setRoiCalculator(prev => ({
          ...prev,
          investment: '', finalValue: '', timePeriod: '', result: null
        }));
        break;
      case 'breakeven':
        setBreakEvenCalculator(prev => ({
          ...prev,
          fixedCosts: '', variableCost: '', sellingPrice: '', result: null
        }));
        break;
      default:
        break;
    }
  };

  const noorServices = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React/Next.js", "Node.js/FastAPI", "MongoDB/PostgreSQL", "Cloud Deployment"]
    },
    {
      icon: Rocket,
      title: "Digital Marketing",
      description: "Comprehensive marketing solutions to grow your business online",
      features: ["SEO Optimization", "Social Media", "Content Strategy", "Analytics"]
    },
    {
      icon: Lightbulb,
      title: "Business Solutions",
      description: "Custom software solutions tailored to your business needs",
      features: ["ERP Systems", "CRM Integration", "Process Automation", "Data Analytics"]
    },
    {
      icon: Users,
      title: "Consultation",
      description: "Expert guidance for your digital transformation journey",
      features: ["Strategy Planning", "Technology Advisory", "Project Management", "Training"]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Noor Digital Header */}
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <CardHeader className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-yellow-300" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-16 w-16 text-blue-200 opacity-50" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-4">
            Noor Digital Solutions
          </CardTitle>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Empowering Qatar's digital future with innovative solutions, advanced analytics, 
            and comprehensive business tools
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="calculators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger value="calculators" className="text-base">Advanced Calculators</TabsTrigger>
          <TabsTrigger value="services" className="text-base">Our Services</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="space-y-8">
          {/* Professional Calculators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* VAT Calculator */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 flex items-center gap-3">
                  <DollarSign className="h-6 w-6" />
                  Advanced VAT Calculator
                </CardTitle>
                <Badge variant="outline" className="w-fit">Qatar Future Implementation</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> VAT is planned for Qatar. This calculator is ready for implementation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Amount (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={vatCalculator.amount}
                      onChange={(e) => setVatCalculator(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>VAT Rate (%)</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={vatCalculator.rate}
                      onChange={(e) => setVatCalculator(prev => ({ ...prev, rate: e.target.value }))}
                    >
                      <option value="0">0% (Current - No VAT)</option>
                      <option value="5">5% (Planned Rate)</option>
                    </select>
                  </div>

                  <div>
                    <Label>Calculation Type</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={vatCalculator.type}
                      onChange={(e) => setVatCalculator(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="exclusive">Add VAT (VAT Exclusive)</option>
                      <option value="inclusive">Extract VAT (VAT Inclusive)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateVAT} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={() => resetCalculator('vat')} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {vatCalculator.result && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Net Amount:</span>
                      <span>QAR {vatCalculator.result.netAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">VAT Amount:</span>
                      <span>QAR {vatCalculator.result.vatAmount}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Total Amount:</span>
                      <span className="font-bold">QAR {vatCalculator.result.totalAmount}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profit & Loss Calculator */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-green-700 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  Comprehensive P&L Calculator
                </CardTitle>
                <Badge variant="outline" className="w-fit">Advanced Analytics</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Revenue (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Total revenue"
                      value={profitCalculator.revenue}
                      onChange={(e) => setProfitCalculator(prev => ({ ...prev, revenue: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>COGS (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Cost of goods sold"
                      value={profitCalculator.cogs}
                      onChange={(e) => setProfitCalculator(prev => ({ ...prev, cogs: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Operating Expenses (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Operating expenses"
                      value={profitCalculator.expenses}
                      onChange={(e) => setProfitCalculator(prev => ({ ...prev, expenses: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Other Income (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Other income"
                      value={profitCalculator.otherIncome}
                      onChange={(e) => setProfitCalculator(prev => ({ ...prev, otherIncome: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Other Expenses (QAR)</Label>
                  <Input
                    type="number"
                    placeholder="Other expenses"
                    value={profitCalculator.otherExpenses}
                    onChange={(e) => setProfitCalculator(prev => ({ ...prev, otherExpenses: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateProfitLoss} className="flex-1 bg-green-600 hover:bg-green-700">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analyze P&L
                  </Button>
                  <Button onClick={() => resetCalculator('profit')} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {profitCalculator.result && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Gross Profit:</span>
                      <span className={parseFloat(profitCalculator.result.grossProfit) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        QAR {profitCalculator.result.grossProfit} ({profitCalculator.result.grossMargin}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Operating Profit:</span>
                      <span className={parseFloat(profitCalculator.result.operatingProfit) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        QAR {profitCalculator.result.operatingProfit} ({profitCalculator.result.operatingMargin}%)
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Net Profit:</span>
                      <span className={`font-bold ${parseFloat(profitCalculator.result.netProfit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        QAR {profitCalculator.result.netProfit} ({profitCalculator.result.netMargin}%)
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ROI Calculator */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-purple-700 flex items-center gap-3">
                  <PieChart className="h-6 w-6" />
                  ROI & Investment Calculator
                </CardTitle>
                <Badge variant="outline" className="w-fit">Investment Analysis</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>Initial Investment (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Investment amount"
                      value={roiCalculator.investment}
                      onChange={(e) => setRoiCalculator(prev => ({ ...prev, investment: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Final Value (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Current/final value"
                      value={roiCalculator.finalValue}
                      onChange={(e) => setRoiCalculator(prev => ({ ...prev, finalValue: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Time Period (Years)</Label>
                    <Input
                      type="number"
                      placeholder="Investment period"
                      value={roiCalculator.timePeriod}
                      onChange={(e) => setRoiCalculator(prev => ({ ...prev, timePeriod: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateROI} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <PieChart className="h-4 w-4 mr-2" />
                    Calculate ROI
                  </Button>
                  <Button onClick={() => resetCalculator('roi')} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {roiCalculator.result && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Return:</span>
                      <span className={parseFloat(roiCalculator.result.totalReturn) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        QAR {roiCalculator.result.totalReturn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">ROI Percentage:</span>
                      <span className={parseFloat(roiCalculator.result.roiPercentage) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {roiCalculator.result.roiPercentage}%
                      </span>
                    </div>
                    {roiCalculator.result.annualizedROI && (
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Annualized ROI:</span>
                        <span className={`font-bold ${parseFloat(roiCalculator.result.annualizedROI) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {roiCalculator.result.annualizedROI}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Break-even Calculator */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-orange-700 flex items-center gap-3">
                  <Target className="h-6 w-6" />
                  Break-even Analysis
                </CardTitle>
                <Badge variant="outline" className="w-fit">Business Planning</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>Fixed Costs (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Monthly fixed costs"
                      value={breakEvenCalculator.fixedCosts}
                      onChange={(e) => setBreakEvenCalculator(prev => ({ ...prev, fixedCosts: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Variable Cost per Unit (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Cost per unit"
                      value={breakEvenCalculator.variableCost}
                      onChange={(e) => setBreakEvenCalculator(prev => ({ ...prev, variableCost: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Selling Price per Unit (QAR)</Label>
                    <Input
                      type="number"
                      placeholder="Price per unit"
                      value={breakEvenCalculator.sellingPrice}
                      onChange={(e) => setBreakEvenCalculator(prev => ({ ...prev, sellingPrice: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateBreakEven} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Target className="h-4 w-4 mr-2" />
                    Analyze Break-even
                  </Button>
                  <Button onClick={() => resetCalculator('breakeven')} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {breakEvenCalculator.result && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Contribution Margin:</span>
                      <span>QAR {breakEvenCalculator.result.contributionMargin} ({breakEvenCalculator.result.contributionMarginRatio}%)</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Break-even Units:</span>
                      <span className="font-bold">{breakEvenCalculator.result.breakEvenUnits} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Break-even Revenue:</span>
                      <span className="font-bold">QAR {breakEvenCalculator.result.breakEvenRevenue}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-8">
          {/* Noor Digital Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {noorServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardHeader className="text-center py-12">
              <CardTitle className="text-3xl font-bold mb-4">Ready to Transform Your Business?</CardTitle>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Contact Noor Digital Solutions today and let's discuss how we can help you achieve your digital goals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Rocket className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <FileText className="h-5 w-5 mr-2" />
                  View Portfolio
                </Button>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoorDigitalSection;