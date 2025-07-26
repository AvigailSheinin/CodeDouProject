import { Button } from '@/components/ui/button';
import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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
            {companyInfo?.hero_title || 'Welcome to Our Company'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {companyInfo?.hero_subtitle || 'We provide exceptional services and solutions for your business needs.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/about">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      {companyInfo?.bio && (
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">About Us</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {companyInfo.bio}
            </p>
            <Button variant="outline" className="mt-8" asChild>
              <Link to="/about">Read Our Full Story</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to work with us? We'd love to hear from you and discuss how we can help your business succeed.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
