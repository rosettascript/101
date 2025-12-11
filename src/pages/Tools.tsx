import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FileCode, ArrowRight, Braces, Binary, Link as LinkIcon, Palette, Fingerprint, Regex, Hash, KeyRound, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    id: "word-to-html",
    title: "Word to HTML Converter",
    description: "Convert text content to clean HTML code with multiple output formats including regular, blog, and shoppable options.",
    icon: FileCode,
    path: "/tools/word-to-html",
    color: "text-primary",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, minify, and validate JSON data with customizable indentation and syntax highlighting.",
    icon: Braces,
    path: "/tools/json-formatter",
    color: "text-secondary",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to plain text with UTF-8 support.",
    icon: Binary,
    path: "/tools/base64",
    color: "text-accent",
  },
  {
    id: "url-encoder",
    title: "URL Encoder/Decoder",
    description: "Encode special characters for URLs or decode URL-encoded strings for readable text.",
    icon: LinkIcon,
    path: "/tools/url-encoder",
    color: "text-[hsl(var(--syntax-cyan))]",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats with a live color preview.",
    icon: Palette,
    path: "/tools/color-converter",
    color: "text-[hsl(var(--syntax-orange))]",
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate random UUID v4 identifiers. Create single or multiple UUIDs with optional hyphen formatting.",
    icon: Fingerprint,
    path: "/tools/uuid-generator",
    color: "text-[hsl(var(--syntax-yellow))]",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test and debug regular expressions with live matching, syntax highlighting, and capture group extraction.",
    icon: Regex,
    path: "/tools/regex-tester",
    color: "text-[hsl(var(--syntax-purple))]",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hash values from text input.",
    icon: Hash,
    path: "/tools/hash-generator",
    color: "text-[hsl(var(--syntax-green))]",
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens. View header, payload, signature, and expiration times.",
    icon: KeyRound,
    path: "/tools/jwt-decoder",
    color: "text-[hsl(var(--syntax-cyan))]",
  },
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds.",
    icon: Clock,
    path: "/tools/timestamp-converter",
    color: "text-[hsl(var(--syntax-orange))]",
  },
];

export default function Tools() {
  return (
    <Layout>
      <SEO
        title="Developer Tools"
        description="A collection of free online developer tools. Word to HTML converter, JSON formatter, Base64 encoder, URL encoder, color converter, and UUID generator."
      />
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            <Code2 className="h-4 w-4" />
            Online Tools
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Developer Tools
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of useful online tools to help you with your development workflow. 
            Select a tool below to get started.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={tool.id} to={tool.path}>
              <Card 
                className="h-full bg-card/50 border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <tool.icon className={`h-10 w-10 ${tool.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Open Tool <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Have a tool suggestion? Let us know!
          </p>
        </div>
      </div>
    </Layout>
  );
}
