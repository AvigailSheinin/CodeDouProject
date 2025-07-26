import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Building2 } from 'lucide-react';

const Contact = () => {
  const { data: companyInfo, isLoading } = useCompanyInfo();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us and let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo?.email && (
              <Card>
                <CardHeader className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyInfo.email}
                  </a>
                </CardContent>
              </Card>
            )}

            {companyInfo?.phone && (
              <Card>
                <CardHeader className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Phone</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </CardContent>
              </Card>
            )}

            {companyInfo?.address && (
              <Card>
                <CardHeader className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Address</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    {companyInfo.address}
                  </p>
                </CardContent>
              </Card>
            )}

            {companyInfo?.website && (
              <Card>
                <CardHeader className="text-center">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Website</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href={companyInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {companyInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {(!companyInfo?.email && !companyInfo?.phone && !companyInfo?.address && !companyInfo?.website) && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription>
                  Contact information will be available soon. Please check back later.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question about our services or want to discuss a potential project, 
            we're here to help and would love to hear from you.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;