import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building2, Save } from 'lucide-react';

interface CompanyData {
  name: string;
  bio: string;
  about_us: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  hero_title: string;
  hero_subtitle: string;
  logo_url: string;
}

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const { data: companyInfo, isLoading: isLoadingCompany } = useCompanyInfo();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CompanyData>({
    name: '',
    bio: '',
    about_us: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    hero_title: '',
    hero_subtitle: '',
    logo_url: ''
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (companyInfo) {
      setFormData({
        name: companyInfo.name || '',
        bio: companyInfo.bio || '',
        about_us: companyInfo.about_us || '',
        email: companyInfo.email || '',
        phone: companyInfo.phone || '',
        address: companyInfo.address || '',
        website: companyInfo.website || '',
        hero_title: companyInfo.hero_title || '',
        hero_subtitle: companyInfo.hero_subtitle || '',
        logo_url: companyInfo.logo_url || ''
      });
    }
  }, [companyInfo]);

  const updateCompanyMutation = useMutation({
    mutationFn: async (data: CompanyData) => {
      if (companyInfo?.id) {
        const { error } = await supabase
          .from('company_info')
          .update(data)
          .eq('id', companyInfo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('company_info')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-info'] });
      toast({
        title: 'Success!',
        description: 'Company information updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update company information.',
        variant: 'destructive',
      });
      console.error('Update error:', error);
    },
  });

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyMutation.mutate(formData);
  };

  if (loading || isLoadingCompany) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your company information and website content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your company's basic details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Business St, City, State 12345"
                />
              </div>
            </CardContent>
          </Card>

          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Homepage Hero Section</CardTitle>
              <CardDescription>
                Customize the main headline and subtitle on your homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={formData.hero_title}
                  onChange={(e) => handleInputChange('hero_title', e.target.value)}
                  placeholder="Welcome to Our Company"
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero_subtitle"
                  value={formData.hero_subtitle}
                  onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                  placeholder="We provide exceptional services and solutions for your business needs."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Company Content</CardTitle>
              <CardDescription>
                Update your company bio and detailed about us section.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Company Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="A brief description of your company that appears on the homepage."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="about_us">About Us (Full Story)</Label>
                <Textarea
                  id="about_us"
                  value={formData.about_us}
                  onChange={(e) => handleInputChange('about_us', e.target.value)}
                  placeholder="Tell your complete company story for the About page."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={updateCompanyMutation.isPending}
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateCompanyMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;