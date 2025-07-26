import { useCompanyInfo } from '@/hooks/useCompanyInfo';
import { Building2, Users, Target, Heart } from 'lucide-react';

const About = () => {
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
            About {companyInfo?.name || 'Our Company'}
          </h1>
          {companyInfo?.bio && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {companyInfo.bio}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      {companyInfo?.about_us && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {companyInfo.about_us}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">People First</h3>
              <p className="text-muted-foreground">
                We believe in putting people at the center of everything we do, creating meaningful relationships and lasting partnerships.
              </p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every project, delivering high-quality solutions that exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with honesty, transparency, and integrity, building trust through our actions and commitments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;