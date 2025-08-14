import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { FileText, Calculator, MapPin, Building2, Sparkles } from "lucide-react";
import DocumentEditor from "./components/DocumentEditor";
import AccountingTools from "./components/AccountingTools";
import QatarGuide from "./components/QatarGuide";
import NoorDigitalSection from "./components/NoorDigitalSection";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
          <CardHeader className="text-center py-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Building2 className="h-20 w-20" />
                <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-yellow-300" />
              </div>
            </div>
            <CardTitle className="text-5xl font-bold mb-6 tracking-tight">
              Qatar Business & Life Hub
            </CardTitle>
            <CardDescription className="text-amber-100 text-xl max-w-3xl mx-auto leading-relaxed">
              Your comprehensive platform for professional document editing, Qatar business tools, 
              and local insights - Powered by Noor Digital Solutions
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="noor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-16 bg-white shadow-xl rounded-xl">
            <TabsTrigger 
              value="noor" 
              className="flex items-center gap-2 text-lg font-medium py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <Sparkles className="h-5 w-5" />
              Noor Digital
            </TabsTrigger>
            <TabsTrigger 
              value="editor" 
              className="flex items-center gap-2 text-lg font-medium py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg"
            >
              <FileText className="h-5 w-5" />
              Document Editor
            </TabsTrigger>
            <TabsTrigger 
              value="accounting" 
              className="flex items-center gap-2 text-lg font-medium py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg"
            >
              <Calculator className="h-5 w-5" />
              Accounting Tools
            </TabsTrigger>
            <TabsTrigger 
              value="guide" 
              className="flex items-center gap-2 text-lg font-medium py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <MapPin className="h-5 w-5" />
              Qatar Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="noor" className="mt-0">
            <NoorDigitalSection />
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