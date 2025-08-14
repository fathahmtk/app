import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { FileText, Calculator, MapPin, Building2 } from "lucide-react";
import DocumentEditor from "./components/DocumentEditor";
import AccountingTools from "./components/AccountingTools";
import QatarGuide from "./components/QatarGuide";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <CardHeader className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Building2 className="h-16 w-16" />
            </div>
            <CardTitle className="text-4xl font-bold mb-4">
              Qatar Business & Life Hub
            </CardTitle>
            <CardDescription className="text-amber-100 text-lg max-w-2xl mx-auto">
              Your comprehensive platform for professional document editing, Qatar business tools, 
              and local insights - all in one place
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-white shadow-lg">
            <TabsTrigger 
              value="editor" 
              className="flex items-center gap-2 text-lg font-medium py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <FileText className="h-5 w-5" />
              Document Editor
            </TabsTrigger>
            <TabsTrigger 
              value="accounting" 
              className="flex items-center gap-2 text-lg font-medium py-3 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <Calculator className="h-5 w-5" />
              Accounting Tools
            </TabsTrigger>
            <TabsTrigger 
              value="guide" 
              className="flex items-center gap-2 text-lg font-medium py-3 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <MapPin className="h-5 w-5" />
              Qatar Guide
            </TabsTrigger>
          </TabsList>

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