import { Layout } from "@/components/layout/Layout";
import { WordToHtmlConverter } from "@/components/tools/WordToHtmlConverter";
import { Code2, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function WordToHtml() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tools">Tools</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Word to HTML</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            <Code2 className="h-4 w-4" />
            Online Tools
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Word to HTML Converter
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert your text content to clean HTML code. Choose from regular, blog, or shoppable 
            output formats based on your needs.
          </p>
        </div>

        {/* Converter Tool */}
        <div className="terminal-bg p-6 lg:p-8">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--syntax-yellow))]/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-2 text-sm text-muted-foreground font-mono flex items-center gap-2">
              <FileText className="h-4 w-4" />
              converter.html
            </span>
          </div>
          <WordToHtmlConverter />
        </div>

        {/* Format Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold mb-2 text-primary">Regular Output</h3>
            <p className="text-sm text-muted-foreground">
              Clean, semantic HTML with proper heading hierarchy and paragraph tags. 
              Perfect for general web content.
            </p>
          </div>
          <div className="p-6 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold mb-2 text-secondary">Blog Output</h3>
            <p className="text-sm text-muted-foreground">
              Article-wrapped HTML with metadata support. Optimized for CMS platforms 
              and blog publishing systems.
            </p>
          </div>
          <div className="p-6 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold mb-2 text-accent">Shoppable Output</h3>
            <p className="text-sm text-muted-foreground">
              E-commerce ready HTML with Schema.org markup. Includes product structure 
              and add-to-cart placeholders.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
