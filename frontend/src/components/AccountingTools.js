import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  DollarSign,
  FileSpreadsheet,
  Building2,
  Info,
  ExternalLink,
  Star,
  Sparkles,
  Zap
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { mockAccountingData, advancedAccountingTools } from "../data/mockData";

const AccountingTools = () => {
  const { toast } = useToast();
  const [calculatorInputs, setCalculatorInputs] = useState({
    vat: { amount: '', rate: '5' },
    profit: { revenue: '', costs: '', expenses: '' },
    roi: { investment: '', returns: '', period: '1' },
    breakeven: { fixedCosts: '', variableCosts: '', price: '' }
  });

  const [results, setResults] = useState({});

  // VAT Calculator
  const calculateVAT = () => {
    const { amount, rate } = calculatorInputs.vat;
    if (!amount || !rate) {
      toast({
        title: "Missing Input",
        description: "Please enter both amount and VAT rate",
        variant: "destructive"
      });
      return;
    }

    const vatAmount = (parseFloat(amount) * parseFloat(rate)) / 100;
    const totalWithVAT = parseFloat(amount) + vatAmount;

    setResults(prev => ({
      ...prev,
      vat: {
        original: parseFloat(amount),
        vatAmount: vatAmount.toFixed(2),
        total: totalWithVAT.toFixed(2)
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
    const { revenue, costs, expenses } = calculatorInputs.profit;
    if (!revenue || !costs || !expenses) {
      toast({
        title: "Missing Input",
        description: "Please enter revenue, costs, and expenses",
        variant: "destructive"
      });
      return;
    }

    const grossProfit = parseFloat(revenue) - parseFloat(costs);
    const netProfit = grossProfit - parseFloat(expenses);
    const margin = ((netProfit / parseFloat(revenue)) * 100).toFixed(2);

    setResults(prev => ({
      ...prev,
      profit: {
        revenue: parseFloat(revenue),
        grossProfit: grossProfit.toFixed(2),
        netProfit: netProfit.toFixed(2),
        margin: margin
      }
    }));

    toast({
      title: "Profit Calculated",
      description: `Net Profit: QAR ${netProfit.toFixed(2)} (${margin}%)`,
      duration: 3000
    });
  };

  // ROI Calculator
  const calculateROI = () => {
    const { investment, returns, period } = calculatorInputs.roi;
    if (!investment || !returns) {
      toast({
        title: "Missing Input",
        description: "Please enter investment and returns",
        variant: "destructive"
      });
      return;
    }

    const totalROI = ((parseFloat(returns) - parseFloat(investment)) / parseFloat(investment)) * 100;
    const annualizedROI = totalROI / parseFloat(period);

    setResults(prev => ({
      ...prev,
      roi: {
        investment: parseFloat(investment),
        returns: parseFloat(returns),
        totalROI: totalROI.toFixed(2),
        annualizedROI: annualizedROI.toFixed(2)
      }
    }));

    toast({
      title: "ROI Calculated",
      description: `Total ROI: ${totalROI.toFixed(2)}%`,
      duration: 3000
    });
  };

  // Break-even Calculator
  const calculateBreakeven = () => {
    const { fixedCosts, variableCosts, price } = calculatorInputs.breakeven;
    if (!fixedCosts || !variableCosts || !price) {
      toast({
        title: "Missing Input",
        description: "Please enter all break-even parameters",
        variant: "destructive"
      });
      return;
    }

    const contribution = parseFloat(price) - parseFloat(variableCosts);
    const breakevenUnits = parseFloat(fixedCosts) / contribution;
    const breakevenRevenue = breakevenUnits * parseFloat(price);

    setResults(prev => ({
      ...prev,
      breakeven: {
        units: Math.ceil(breakevenUnits),
        revenue: breakevenRevenue.toFixed(2),
        contribution: contribution.toFixed(2)
      }
    }));

    toast({
      title: "Break-even Calculated",
      description: `Break-even: ${Math.ceil(breakevenUnits)} units`,
      duration: 3000
    });
  };

  const updateInput = (calculator, field, value) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [calculator]: {
        ...prev[calculator],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
            <Calculator className="h-7 w-7" />
            Qatar Accounting & Business Tools
          </CardTitle>
          <p className="text-orange-100 mt-2">
            Professional calculators and resources for Qatar businesses
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="calculators" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="calculators">Business Calculators</TabsTrigger>
          <TabsTrigger value="software">Software & Tools</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="space-y-6">
          {/* Qatar Business Info */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <strong>Qatar Business Note:</strong> VAT is currently not implemented in Qatar (as of 2024). 
                  The calculator below is prepared for future use when Qatar implements its planned 5% VAT rate.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VAT Calculator */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  VAT Calculator (5% - Future Use)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vat-amount">Amount (QAR)</Label>
                  <Input
                    id="vat-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={calculatorInputs.vat.amount}
                    onChange={(e) => updateInput('vat', 'amount', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="vat-rate">VAT Rate (%)</Label>
                  <Input
                    id="vat-rate"
                    type="number"
                    value={calculatorInputs.vat.rate}
                    onChange={(e) => updateInput('vat', 'rate', e.target.value)}
                  />
                </div>
                <Button onClick={calculateVAT} className="w-full bg-orange-600 hover:bg-orange-700">
                  Calculate VAT
                </Button>
                
                {results.vat && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><strong>Original:</strong> QAR {results.vat.original}</div>
                      <div><strong>VAT Amount:</strong> QAR {results.vat.vatAmount}</div>
                      <div><strong>Total with VAT:</strong> QAR {results.vat.total}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profit & Loss Calculator */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Profit & Loss Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="revenue">Revenue (QAR)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Total revenue"
                    value={calculatorInputs.profit.revenue}
                    onChange={(e) => updateInput('profit', 'revenue', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="costs">Direct Costs (QAR)</Label>
                  <Input
                    id="costs"
                    type="number"
                    placeholder="Cost of goods sold"
                    value={calculatorInputs.profit.costs}
                    onChange={(e) => updateInput('profit', 'costs', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expenses">Operating Expenses (QAR)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="Operating expenses"
                    value={calculatorInputs.profit.expenses}
                    onChange={(e) => updateInput('profit', 'expenses', e.target.value)}
                  />
                </div>
                <Button onClick={calculateProfitLoss} className="w-full bg-red-600 hover:bg-red-700">
                  Calculate Profit
                </Button>
                
                {results.profit && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><strong>Revenue:</strong> QAR {results.profit.revenue}</div>
                      <div><strong>Gross Profit:</strong> QAR {results.profit.grossProfit}</div>
                      <div><strong>Net Profit:</strong> QAR {results.profit.netProfit}</div>
                      <div><strong>Profit Margin:</strong> {results.profit.margin}%</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ROI Calculator */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-amber-700 flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  ROI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="investment">Initial Investment (QAR)</Label>
                  <Input
                    id="investment"
                    type="number"
                    placeholder="Investment amount"
                    value={calculatorInputs.roi.investment}
                    onChange={(e) => updateInput('roi', 'investment', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="returns">Total Returns (QAR)</Label>
                  <Input
                    id="returns"
                    type="number"
                    placeholder="Total returns"
                    value={calculatorInputs.roi.returns}
                    onChange={(e) => updateInput('roi', 'returns', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period">Time Period (Years)</Label>
                  <Input
                    id="period"
                    type="number"
                    value={calculatorInputs.roi.period}
                    onChange={(e) => updateInput('roi', 'period', e.target.value)}
                  />
                </div>
                <Button onClick={calculateROI} className="w-full bg-amber-600 hover:bg-amber-700">
                  Calculate ROI
                </Button>
                
                {results.roi && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><strong>Investment:</strong> QAR {results.roi.investment}</div>
                      <div><strong>Returns:</strong> QAR {results.roi.returns}</div>
                      <div><strong>Total ROI:</strong> {results.roi.totalROI}%</div>
                      <div><strong>Annualized ROI:</strong> {results.roi.annualizedROI}%</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Break-even Calculator */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Break-even Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fixed-costs">Fixed Costs (QAR)</Label>
                  <Input
                    id="fixed-costs"
                    type="number"
                    placeholder="Monthly fixed costs"
                    value={calculatorInputs.breakeven.fixedCosts}
                    onChange={(e) => updateInput('breakeven', 'fixedCosts', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="variable-costs">Variable Cost per Unit (QAR)</Label>
                  <Input
                    id="variable-costs"
                    type="number"
                    placeholder="Cost per unit"
                    value={calculatorInputs.breakeven.variableCosts}
                    onChange={(e) => updateInput('breakeven', 'variableCosts', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Selling Price per Unit (QAR)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price per unit"
                    value={calculatorInputs.breakeven.price}
                    onChange={(e) => updateInput('breakeven', 'price', e.target.value)}
                  />
                </div>
                <Button onClick={calculateBreakeven} className="w-full bg-green-600 hover:bg-green-700">
                  Calculate Break-even
                </Button>
                
                {results.breakeven && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div><strong>Break-even Units:</strong> {results.breakeven.units}</div>
                      <div><strong>Break-even Revenue:</strong> QAR {results.breakeven.revenue}</div>
                      <div><strong>Contribution per Unit:</strong> QAR {results.breakeven.contribution}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="software" className="space-y-6">
          {/* Business Software List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAccountingData.software.map((software, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-orange-600" />
                    {software.name}
                  </CardTitle>
                  <Badge variant={software.pricing === "Free" ? "secondary" : "outline"}>
                    {software.pricing}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{software.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-500">Key Features:</div>
                    <ul className="text-xs space-y-1">
                      {software.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-gray-600">• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  {software.trial && (
                    <Badge variant="outline" className="mt-3 text-xs">
                      {software.trial}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Templates Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-700">Free Business Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAccountingData.templates.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-gray-800">{template.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {template.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Accounting Software */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Premium Accounting Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedAccountingTools?.businessSoftware?.slice(0, 9).map((software, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                        {software.name}
                      </CardTitle>
                      {software.isFree && (
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          FREE
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{software.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-gray-500">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {software.features?.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Pricing:</span>
                        <span className="text-gray-600 ml-1">{software.pricing}</span>
                      </div>
                      {software.trial && (
                        <div className="text-sm">
                          <span className="font-medium">Trial:</span>
                          <span className="text-gray-600 ml-1">{software.trial}</span>
                        </div>
                      )}
                    </div>
                    {software.website && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => {
                          toast({
                            title: "External Link",
                            description: `Opening ${software.name} website`,
                            duration: 3000
                          });
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Website
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Document Templates */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-purple-700 flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Document Templates & Generators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {advancedAccountingTools?.documentTemplates?.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-purple-50 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800 group-hover:text-purple-700">
                        {template.name}
                      </h4>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <Zap className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Business Tools */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Professional Business Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advancedAccountingTools?.businessTools?.map((tool, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-indigo-300 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-indigo-600" />
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      <ul className="space-y-1">
                        {tool.features?.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                            <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button size="sm" className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700">
                        Use Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
      </Tabs>
    </div>
  );
};

export default AccountingTools;