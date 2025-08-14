import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { FileText, Calculator, MapPin, Building2, Sparkles, Upload, Zap } from "lucide-react";
import DocumentEditor from "./components/DocumentEditor";
import AccountingTools from "./components/AccountingTools";
import QatarGuide from "./components/QatarGuide";
import NoorDigitalSection from "./components/NoorDigitalSection";
import ProfessionalPDFEditor from "./components/ProfessionalPDFEditor";
import BusinessServices from "./components/BusinessServices";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <CardHeader className="relative text-center py-20">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Building2 className="h-24 w-24" />
                <Sparkles className="h-12 w-12 absolute -top-3 -right-3 text-yellow-300 animate-pulse" />
                <Zap className="h-8 w-8 absolute -bottom-2 -left-2 text-blue-200 animate-bounce" />
              </div>
            </div>
            <CardTitle className="text-6xl font-bold mb-6 tracking-tight">
              Qatar Business & Life Hub
            </CardTitle>
            <CardTitle className="text-2xl font-medium mb-4 text-yellow-200">
              Powered by Noor Digital Solutions
            </CardTitle>
            <CardDescription className="text-amber-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Your complete digital transformation platform featuring professional PDF editing, 
              advanced accounting tools, Qatar business insights, and comprehensive digital services
            </CardDescription>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm">
              <div className="bg-white/20 rounded-lg p-3">
                <FileText className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">PDF Editor</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Calculator className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Accounting Tools</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Qatar Guide</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Sparkles className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">Digital Services</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Main Tabs */}
        <Tabs defaultValue="noor" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 h-16 bg-white shadow-xl rounded-xl">
            <TabsTrigger 
              value="noor" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <Sparkles className="h-4 w-4" />
              Noor Digital
            </TabsTrigger>
            <TabsTrigger 
              value="pdf-editor" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg"
            >
              <Upload className="h-4 w-4" />
              PDF Editor
            </TabsTrigger>
            <TabsTrigger 
              value="editor" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg"
            >
              <FileText className="h-4 w-4" />
              Doc Editor
            </TabsTrigger>
            <TabsTrigger 
              value="accounting" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg"
            >
              <Calculator className="h-4 w-4" />
              Accounting
            </TabsTrigger>
            <TabsTrigger 
              value="guide" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <MapPin className="h-4 w-4" />
              Qatar Guide
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex flex-col items-center gap-1 text-sm font-medium py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-900 data-[state=active]:text-white rounded-lg"
            >
              <Building2 className="h-4 w-4" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="noor" className="mt-0">
            <NoorDigitalSection />
          </TabsContent>

          <TabsContent value="pdf-editor" className="mt-0">
            <ProfessionalPDFEditor />
          </TabsContent>

          <TabsContent value="editor" className="mt-0">
            <DocumentEditor />
          </TabsContent>

          <TabsContent value="accounting" className="mt-0">
            <AccountingTools />
          </TabsContent>

          <TabsContent value="guide" className="mt-0">
            <QatarGuide />
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            <BusinessServices />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;