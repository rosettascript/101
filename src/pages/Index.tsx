import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Terminal, 
  Code2, 
  Download, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Online Tools",
    description: "Convert Word to HTML with multiple output formats",
    link: "/tools",
    color: "text-primary",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Scripts and utilities for Windows, PERN setup, and more",
    link: "/downloads",
    color: "text-secondary",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Tutorials, tips, and developer resources",
    link: "/blogs",
    color: "text-accent",
  },
  {
    icon: GraduationCap,
    title: "School Projects",
    description: "Ready-to-use project templates for students",
    link: "/school-projects",
    color: "text-[hsl(var(--syntax-orange))]",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Optimized tools that save you hours of work",
  },
  {
    icon: Shield,
    title: "No Account Needed",
    description: "Use all tools instantly without signing up",
  },
  {
    icon: Sparkles,
    title: "Developer Focused",
    description: "Built by developers, for developers",
  },
];

const codeSnippet = `// Welcome to RosettaScript
const tools = {
  convert: "Word → HTML",
  automate: "Windows Scripts",
  build: "PERN Projects",
  visualize: "PSQL Manager"
};

export default tools;`;

export default function Index() {
  return (
    <Layout>
      <SEO
        title="Home"
        description="RosettaScript provides powerful developer tools to convert, automate, and build. From Word to HTML converters to database visualization—we've got you covered."
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono">
                <Terminal className="h-4 w-4" />
                Developer Tools Made Simple
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Code Smarter,{" "}
                <span className="text-gradient">Build Faster</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                RosettaScript provides powerful tools to convert, automate, and build. 
                From Word to HTML converters to database visualization—we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="glow-primary">
                  <Link to="/tools">
                    Try Online Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/downloads">
                    <Download className="mr-2 h-4 w-4" />
                    Download Tools
                  </Link>
                </Button>
              </div>
            </div>

            {/* Code Preview */}
            <div className="terminal-bg p-1">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--syntax-yellow))]/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">tools.ts</span>
              </div>
              <pre className="p-4 overflow-auto">
                <code className="text-sm font-mono">
                  {codeSnippet.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-muted-foreground select-none">{i + 1}</span>
                      <span className={
                        line.startsWith("//") ? "text-muted-foreground" :
                        line.includes("const") ? "text-secondary" :
                        line.includes(":") ? "text-[hsl(var(--syntax-orange))]" :
                        line.includes("export") ? "text-accent" :
                        "text-foreground"
                      }>
                        {line}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From online converters to downloadable tools, find everything to boost your productivity
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group">
                  <CardHeader className="pb-2">
                    <feature.icon className={`h-8 w-8 ${feature.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight) => (
              <Card 
                key={highlight.title} 
                className="text-center p-5 bg-card/50 border-border hover:border-primary/30 transition-all group"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <highlight.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mt-3">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Try our online tools instantly or download our utilities for your local machine.
          </p>
          <Button asChild size="lg">
            <Link to="/tools">
              Start Converting Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
