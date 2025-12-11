import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Terminal, Database, Server, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const tools = [
  {
    id: "microsoft-script",
    title: "Microsoft Script",
    description: "A collection of powerful automation scripts for Windows machines. Automate repetitive tasks, manage files, and streamline your workflow.",
    icon: Terminal,
    version: "2.1.0",
    size: "4.2 MB",
    platform: "Windows",
    features: [
      "File batch operations",
      "System cleanup utilities",
      "Registry management",
      "Task scheduling helpers",
      "Network diagnostics",
    ],
    color: "text-secondary",
  },
  {
    id: "pern-script-setup",
    title: "PERN Script Setup",
    description: "Complete setup wizard for PERN stack projects. Automatically configures PostgreSQL, Express, React, and Node.js with best practices.",
    icon: Server,
    version: "1.5.0",
    size: "12.8 MB",
    platform: "Cross-platform",
    features: [
      "One-command project setup",
      "Pre-configured ESLint & Prettier",
      "Docker compose templates",
      "Database migration scripts",
      "API boilerplate code",
    ],
    color: "text-primary",
  },
  {
    id: "psql-manager",
    title: "PSQL Manager",
    description: "A visual PostgreSQL database manager. Browse tables, run queries, and visualize your database structure with an intuitive interface.",
    icon: Database,
    version: "3.0.2",
    size: "28.5 MB",
    platform: "Windows, macOS, Linux",
    features: [
      "Visual schema designer",
      "Query editor with syntax highlighting",
      "Data export (CSV, JSON, SQL)",
      "Connection manager",
      "Performance monitoring",
    ],
    color: "text-accent",
  },
];

export default function Downloads() {
  const handleDownload = (toolName: string) => {
    toast({
      title: "Download Started",
      description: `${toolName} is being downloaded...`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-mono mb-4">
            <Download className="h-4 w-4" />
            Downloadable Tools
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Developer Tools & Scripts
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download our collection of productivity tools. Each tool is designed to help 
            you work more efficiently and focus on what matters.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.id} className="bg-card/50 border-border hover:border-primary/30 transition-all flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted/50 ${tool.color}`}>
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    v{tool.version}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-sm">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Platform:</span> {tool.platform}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Size:</span> {tool.size}
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Features:</span>
                    <ul className="space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleDownload(tool.title)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Requirements */}
        <div className="mt-16 terminal-bg p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            System Requirements
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-secondary">Microsoft Script</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Windows 10 or later</li>
                <li>• PowerShell 5.1+</li>
                <li>• 50 MB free disk space</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">PERN Script Setup</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Node.js 18+</li>
                <li>• npm or yarn</li>
                <li>• PostgreSQL 14+</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent">PSQL Manager</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Windows/macOS/Linux</li>
                <li>• 4 GB RAM minimum</li>
                <li>• 100 MB free disk space</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
