import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Image, 
  Download,
  Save,
  Eye,
  FileText
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { mockResumeData } from "../data/mockData";

const DocumentEditor = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState("");
  const [documentData, setDocumentData] = useState(mockResumeData);
  const fileInputRef = useRef(null);

  // Format text functions
  const formatText = (command) => {
    document.execCommand(command, false, null);
    toast({
      title: "Text Formatted",
      description: `Applied ${command} formatting`,
      duration: 2000,
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && currentSection) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = "Uploaded Image";
        img.className = "max-w-full h-auto rounded-lg my-4 shadow-md";
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(img);
        }
        
        toast({
          title: "Image Added",
          description: "Image has been inserted into the document",
          duration: 3000,
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Select Section First",
        description: "Please click in a text area before adding an image",
        variant: "destructive",
        duration: 3000,
      });
    }
    event.target.value = '';
  };

  // Download as PDF (mock implementation)
  const downloadPDF = () => {
    toast({
      title: "PDF Export Started",
      description: "Your document is being prepared for download...",
      duration: 4000,
    });
    
    // Mock PDF generation delay
    setTimeout(() => {
      toast({
        title: "PDF Ready!",
        description: "Document exported successfully as 'professional_document.pdf'",
        duration: 3000,
      });
    }, 2000);
  };

  // Track current editable section
  const handleSectionFocus = (sectionName) => {
    setCurrentSection(sectionName);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="outline" className="text-sm">
              {currentSection || "No section selected"}
            </Badge>
            <Separator orientation="vertical" className="h-6" />
            
            {/* Formatting Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('bold')}
                className="hover:bg-amber-50"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('italic')}
                className="hover:bg-amber-50"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('underline')}
                className="hover:bg-amber-50"
              >
                <Underline className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => formatText('insertUnorderedList')}
                className="hover:bg-amber-50"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Media & Export Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-green-50 hover:border-green-300"
              >
                <Image className="h-4 w-4 mr-1" />
                Add Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                className="hover:bg-red-50 hover:border-red-300"
              >
                <Download className="h-4 w-4 mr-1" />
                Export PDF
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Document Title */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => handleSectionFocus("Document Title")}
            className="text-3xl font-bold text-gray-800 text-center p-4 rounded-lg border-2 border-transparent hover:border-amber-200 focus:border-amber-400 focus:outline-none transition-all duration-200 min-h-[60px]"
            dangerouslySetInnerHTML={{ __html: documentData.title }}
          />
        </CardContent>
      </Card>

      {/* Profile Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-amber-700 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Profile Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => handleSectionFocus("Profile Summary")}
            className="p-4 rounded-lg border-2 border-transparent hover:border-amber-200 focus:border-amber-400 focus:outline-none transition-all duration-200 min-h-[120px]"
            dangerouslySetInnerHTML={{ __html: documentData.profileSummary }}
          />
        </CardContent>
      </Card>

      {/* Professional Experience */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-orange-700 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => handleSectionFocus("Professional Experience")}
            className="p-4 rounded-lg border-2 border-transparent hover:border-amber-200 focus:border-amber-400 focus:outline-none transition-all duration-200 min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: documentData.experience }}
          />
        </CardContent>
      </Card>

      {/* Education & Skills */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-red-700 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Education & Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            contentEditable
            suppressContentEditableWarning
            onFocus={() => handleSectionFocus("Education & Skills")}
            className="p-4 rounded-lg border-2 border-transparent hover:border-amber-200 focus:border-amber-400 focus:outline-none transition-all duration-200 min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: documentData.educationSkills }}
          />
        </CardContent>
      </Card>

      {/* Save Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-amber-800">
            <Save className="h-5 w-5" />
            <span className="text-sm">
              <strong>Note:</strong> Changes are automatically saved as you type. 
              Use "Export PDF" to download your document.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentEditor;