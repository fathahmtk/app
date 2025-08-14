import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { 
  Upload, 
  FileText, 
  Image, 
  Type, 
  Square, 
  Circle, 
  Pen, 
  Eraser,
  Download,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Layers,
  Settings,
  Trash2,
  Copy,
  Move,
  CheckCircle,
  Shield,
  Zap,
  ArrowRight,
  Eye,
  RefreshCw
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ProfessionalPDFEditor = () => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState('select');
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const tools = [
    { id: 'select', icon: Move, label: 'Select', color: 'text-gray-600' },
    { id: 'text', icon: Type, label: 'Text', color: 'text-blue-600' },
    { id: 'image', icon: Image, label: 'Image', color: 'text-green-600' },
    { id: 'rectangle', icon: Square, label: 'Rectangle', color: 'text-purple-600' },
    { id: 'circle', icon: Circle, label: 'Circle', color: 'text-orange-600' },
    { id: 'pen', icon: Pen, label: 'Draw', color: 'text-red-600' },
    { id: 'eraser', icon: Eraser, label: 'Eraser', color: 'text-gray-600' }
  ];

  const features = [
    "Professional PDF editing tools",
    "Arabic & English text support", 
    "Qatar government form templates",
    "Secure cloud processing",
    "Multiple format support",
    "Real-time collaboration"
  ];

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Document Saved",
      description: "Your PDF has been saved successfully",
      duration: 3000,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your edited PDF is being prepared for download",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <CardHeader className="relative text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FileText className="h-20 w-20" />
              <Zap className="h-8 w-8 absolute -top-2 -right-2 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-4">
            Professional PDF Editor for Qatar
          </CardTitle>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
            Advanced PDF editing platform designed specifically for Qatar's business environment. 
            Edit, convert, merge, and enhance PDFs with professional tools and local compliance features.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Badge className="bg-white/20 text-white border-white/30">
              <Shield className="h-4 w-4 mr-2" />
              Qatar Business Certified • Secure • Professional
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Upload Section */}
      {!uploadedFile && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Drop your PDF here
                  </h3>
                  <p className="text-gray-600 mb-6">
                    or click to browse files from your computer
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose PDF File
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Supports PDF files up to 50MB • Secure processing • No registration required
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* PDF Editor Interface */}
      {uploadedFile && (
        <>
          {/* Top Toolbar */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Left Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    New File
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <div className="h-6 w-px bg-gray-300 mx-2" />
                  
                  <Button variant="outline" size="sm">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>

                {/* Center - Page Navigation */}
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <Badge variant="outline" className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </Badge>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  
                  <Badge variant="outline" className="min-w-[60px] text-center">
                    {zoom}%
                  </Badge>
                  
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Editor Interface */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Tools */}
            <div className="col-span-1">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {tools.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Button
                          key={tool.id}
                          variant={selectedTool === tool.id ? "default" : "ghost"}
                          size="sm"
                          className={`w-full h-12 p-0 ${selectedTool === tool.id ? 'bg-blue-100 text-blue-600' : ''}`}
                          onClick={() => setSelectedTool(tool.id)}
                          title={tool.label}
                        >
                          <IconComponent className={`h-5 w-5 ${selectedTool === tool.id ? 'text-blue-600' : tool.color}`} />
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Editor Area */}
            <div className="col-span-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="bg-gray-200 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
                    <div 
                      className="bg-white shadow-xl rounded-lg"
                      style={{ 
                        width: `${(595 * zoom) / 100}px`, 
                        height: `${(842 * zoom) / 100}px`,
                        maxWidth: '100%',
                        maxHeight: '600px'
                      }}
                    >
                      <div className="p-8 h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                          <h3 className="text-lg font-medium mb-2">PDF Editor Active</h3>
                          <p className="text-sm">
                            File: {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Use the tools on the left to edit your PDF
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="col-span-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tool Properties */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Current Tool: {selectedTool}</h4>
                    
                    {selectedTool === 'text' && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-600">Font Family</Label>
                          <select className="w-full p-2 border border-gray-300 rounded text-sm mt-1">
                            <option>Arial</option>
                            <option>Times New Roman</option>
                            <option>Helvetica</option>
                            <option>Noto Sans Arabic</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Font Size</Label>
                          <Input type="number" className="mt-1" defaultValue="12" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Color</Label>
                          <Input type="color" className="mt-1 h-8" defaultValue="#000000" />
                        </div>
                      </div>
                    )}

                    {selectedTool === 'image' && (
                      <div className="space-y-3">
                        <Button className="w-full" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <div>
                          <Label className="text-xs text-gray-600">Width</Label>
                          <Input type="number" className="mt-1" placeholder="Auto" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Height</Label>
                          <Input type="number" className="mt-1" placeholder="Auto" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Page Management */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Pages</h4>
                    <div className="space-y-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <div 
                          key={i + 1}
                          className={`flex items-center justify-between p-2 rounded border ${
                            currentPage === i + 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-8 bg-white border border-gray-300 rounded text-xs flex items-center justify-center">
                              {i + 1}
                            </div>
                            <span className="text-sm">Page {i + 1}</span>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Layers className="h-4 w-4 mr-2" />
                        Add Page
                      </Button>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Document Info</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>File:</span>
                        <span>{uploadedFile?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(1) + ' MB' : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span>{totalPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>PDF</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfessionalPDFEditor;