import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin, 
  Building2, 
  Utensils, 
  Car, 
  Home, 
  Briefcase,
  Phone,
  Clock,
  Star,
  ExternalLink
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { mockQatarData } from "../data/mockData";

const QatarGuide = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: MapPin },
    { id: "business", name: "Business", icon: Building2 },
    { id: "dining", name: "Dining", icon: Utensils },
    { id: "transport", name: "Transport", icon: Car },
    { id: "housing", name: "Housing", icon: Home },
    { id: "services", name: "Services", icon: Briefcase }
  ];

  const quickAccess = [
    { name: "Qatar ID Services", category: "Government", urgent: true },
    { name: "Emergency Services", category: "Emergency", urgent: true },
    { name: "Hamad Medical City", category: "Healthcare", urgent: false },
    { name: "Qatar Airways", category: "Travel", urgent: false },
    { name: "Karwa Taxi", category: "Transport", urgent: false },
    { name: "Qatar Rail (Metro)", category: "Transport", urgent: false }
  ];

  const handleQuickAccess = (serviceName) => {
    toast({
      title: "Service Information",
      description: `Opening ${serviceName} details...`,
      duration: 3000
    });
  };

  const filteredPlaces = mockQatarData.places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
            <MapPin className="h-7 w-7" />
            Qatar Daily Life Guide
          </CardTitle>
          <p className="text-red-100 mt-2">
            Your comprehensive guide to living and working in Qatar
          </p>
        </CardHeader>
      </Card>

      {/* Quick Access */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-red-700 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quick Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickAccess.map((service, index) => (
              <Button
                key={index}
                variant="outline"
                className={`justify-start h-auto p-4 ${
                  service.urgent ? 'border-red-300 hover:bg-red-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleQuickAccess(service.name)}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="text-xs text-gray-500">{service.category}</div>
                  {service.urgent && (
                    <Badge variant="destructive" className="mt-1 text-xs">
                      Essential
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="places" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="places">Places & Services</TabsTrigger>
          <TabsTrigger value="tips">Living Tips</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Info</TabsTrigger>
        </TabsList>

        <TabsContent value="places" className="space-y-6">
          {/* Search and Filter */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search places, services, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-1"
                      >
                        <IconComponent className="h-4 w-4" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{place.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {place.category}
                    </Badge>
                  </div>
                  {place.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                  
                  {place.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4" />
                      {place.location}
                    </div>
                  )}
                  
                  {place.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Phone className="h-4 w-4" />
                      {place.phone}
                    </div>
                  )}
                  
                  {place.hours && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4" />
                      {place.hours}
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap">
                    {place.tags?.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {place.website && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={() => toast({
                        title: "External Link",
                        description: `Opening ${place.website}`,
                        duration: 3000
                      })}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Website
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No places found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockQatarData.livingTips.map((tip, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">{tip.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-gray-700">
                        <span className="font-medium">• </span>
                        {tipItem}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockQatarData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-800 mb-2">{contact.service}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-600" />
                        <span className="font-mono text-lg">{contact.number}</span>
                      </div>
                      <div className="text-gray-600">{contact.description}</div>
                      {contact.available && (
                        <Badge variant="outline" className="mt-2">
                          {contact.available}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-amber-700">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-700">
                <p>• Always carry your Qatar ID and passport when traveling within Qatar</p>
                <p>• Download the Metrash2 app for government services</p>
                <p>• Keep emergency contacts saved in both English and Arabic</p>
                <p>• Familiarize yourself with your nearest hospital and police station</p>
                <p>• Register with your embassy upon arrival in Qatar</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QatarGuide;