import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Database, 
  ShoppingCart, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  FileText,
  Building,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  Shield,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  Award,
  Zap,
  Target,
  Lightbulb,
  Rocket
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const BusinessServices = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const coreServices = [
    {
      id: 'erpnext',
      icon: Database,
      title: 'ERPNext Implementation',
      description: 'Complete open-source ERP solution with comprehensive modules for modern businesses.',
      features: [
        'Accounting & Financial Management',
        'Human Resources & Payroll',
        'Inventory & Warehouse Management',
        'Project Management & CRM',
        'Manufacturing & Quality Control',
        'Custom Module Development'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      price: 'Starting from QAR 15,000',
      duration: '4-8 weeks implementation'
    },
    {
      id: 'pos',
      icon: ShoppingCart,
      title: 'POS Systems',
      description: 'Qatar VAT compliant Point of Sale systems for various business types.',
      features: [
        'Retail POS with Inventory Management',
        'Restaurant POS with Kitchen Display',
        'Laundry POS with Service Tracking',
        'Service POS for Professional Services',
        'Real-time Sales Analytics',
        'Qatar VAT Compliance & Reporting'
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      price: 'Starting from QAR 8,000',
      duration: '2-4 weeks setup'
    }
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: 'Web & Branding',
      description: 'Professional websites and brand identity solutions',
      features: ['Responsive Web Design', 'E-commerce Development', 'Brand Identity', 'SEO Optimization'],
      price: 'QAR 5,000 - 25,000',
      popular: true
    },
    {
      icon: Smartphone,
      title: 'Mobile & Cloud Apps',
      description: 'Custom mobile applications and cloud solutions',
      features: ['iOS & Android Apps', 'Cloud Infrastructure', 'API Development', 'System Integration'],
      price: 'QAR 20,000 - 50,000',
      popular: false
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies',
      features: ['Social Media Marketing', 'Google Ads Management', 'Content Marketing', 'Analytics & Reporting'],
      price: 'QAR 2,000/month',
      popular: true
    },
    {
      icon: Building,
      title: 'Business Setup & Compliance',
      description: 'Complete business setup and compliance services',
      features: ['Trade License Renewal', 'Company Setup', 'Bookkeeping Services', 'VAT Filing & Compliance'],
      price: 'QAR 3,000 - 8,000',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      company: "Al-Mansouri Trading",
      role: "Managing Director",
      content: "Noor Digital transformed our business with their ERPNext implementation. Our operations are now 50% more efficient.",
      rating: 5,
      image: "🧑‍💼"
    },
    {
      name: "Fatima Hassan",
      company: "Hassan Retail Group",
      role: "Operations Manager",
      content: "The POS system they developed for our retail chain is excellent. VAT compliance is now automated and seamless.",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Mohammed Al-Thani",
      company: "Digital Qatar Solutions",
      role: "CEO",
      content: "Their web development team created an outstanding e-commerce platform. Sales increased by 200% in 6 months.",
      rating: 5,
      image: "👨‍💼"
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "250+", icon: Target },
    { label: "Happy Clients", value: "150+", icon: Users },
    { label: "Years Experience", value: "8+", icon: Award },
    { label: "Success Rate", value: "98%", icon: Star }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll contact you within 2 hours during business hours",
      duration: 5000
    });

    // Reset form
    setContactForm({
      name: '', email: '', phone: '', company: '', service: '', message: ''
    });
  };

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <CardHeader className="relative text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Building className="h-20 w-20" />
              <Rocket className="h-8 w-8 absolute -top-2 -right-2 text-yellow-300 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-4">
            Noor Digital Solutions
          </CardTitle>
          <CardTitle className="text-xl font-medium mb-6 text-blue-200">
            Your Digital Transformation Partner in Qatar
          </CardTitle>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-8">
            From ERP implementation to POS systems, web development to business services - 
            we provide end-to-end digital solutions tailored for Qatar and GCC markets.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="services">Our Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-8">
          {/* Core Services */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Digital Solutions</h3>
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {coreServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id}
                    className={`border-2 ${service.borderColor} ${service.bgColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="inline-flex p-3 rounded-lg bg-white shadow-sm">
                          <IconComponent className={`h-8 w-8 ${service.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </CardTitle>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className={`${service.bgColor} ${service.color} border-${service.color.split('-')[1]}-300`}>
                              {service.price}
                            </Badge>
                            <Badge variant="outline">
                              {service.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className={`h-4 w-4 ${service.color} flex-shrink-0`} />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Quote
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                  >
                    {service.popular && (
                      <Badge className="absolute -top-3 left-4 bg-yellow-500 text-white z-10">
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <Badge variant="outline" className="w-fit mb-4">
                        {service.price}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Portfolio</CardTitle>
              <p className="text-center text-gray-600">Some of our recent successful projects</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Qatar Retail ERP", category: "ERP Implementation", client: "Major Retail Chain" },
                  { title: "Restaurant POS System", category: "POS Development", client: "5-Star Restaurant Group" },
                  { title: "E-commerce Platform", category: "Web Development", client: "Fashion Brand" },
                  { title: "Mobile Banking App", category: "Mobile Development", client: "Financial Institution" },
                  { title: "Digital Marketing Campaign", category: "Marketing", client: "Healthcare Provider" },
                  { title: "Business Setup Services", category: "Consulting", client: "Multiple SMEs" }
                ].map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                        <Lightbulb className="h-12 w-12 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">{project.title}</h4>
                      <Badge variant="outline" className="mb-2">{project.category}</Badge>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">What Our Clients Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-4xl mr-3">{testimonial.image}</div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-gray-500">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="h-6 w-6" />
                  Get in Touch
                </CardTitle>
                <p className="text-gray-600">Ready to transform your business? Let's discuss your project.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={contactForm.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      value={contactForm.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a service</option>
                      <option value="erp">ERPNext Implementation</option>
                      <option value="pos">POS Systems</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="business">Business Setup & Compliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your project requirements..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Office Address</h4>
                      <p className="text-gray-600">Doha, Qatar</p>
                      <p className="text-sm text-gray-500">Business Bay Area</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">+974 XXXX XXXX</p>
                      <p className="text-sm text-gray-500">Available 9 AM - 6 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">info@noordigital.qa</p>
                      <p className="text-sm text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Business Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sunday - Thursday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Quick Response Guarantee
                  </h4>
                  <p className="text-sm text-gray-600">
                    We guarantee a response within 2 hours during business hours. 
                    For urgent matters, please call our direct line.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessServices;