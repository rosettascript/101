import { useState } from "react";
import { Copy, Check, FileText, Code, ShoppingBag, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

type OutputFormat = "regular" | "blog" | "shoppable";

export function WordToHtmlConverter() {
  const [inputText, setInputText] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("regular");
  const [copied, setCopied] = useState(false);

  const convertToHtml = (text: string, format: OutputFormat): string => {
    if (!text.trim()) return "";

    const lines = text.split("\n").filter((line) => line.trim());
    let html = "";

    switch (format) {
      case "regular":
        html = lines
          .map((line) => {
            if (line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`;
            if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
            if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
            if (line.startsWith("- ") || line.startsWith("* "))
              return `<li>${line.slice(2)}</li>`;
            return `<p>${line}</p>`;
          })
          .join("\n");
        break;

      case "blog":
        html = `<article class="blog-post">
  <header>
    ${lines[0] ? `<h1 class="post-title">${lines[0]}</h1>` : ""}
    <meta name="date" content="${new Date().toISOString().split("T")[0]}">
  </header>
  <div class="post-content">
    ${lines
      .slice(1)
      .map((line) => {
        if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
        return `<p>${line}</p>`;
      })
      .join("\n    ")}
  </div>
</article>`;
        break;

      case "shoppable":
        html = `<div class="product-content" itemscope itemtype="https://schema.org/Product">
  ${lines[0] ? `<h1 itemprop="name">${lines[0]}</h1>` : ""}
  <div itemprop="description">
    ${lines
      .slice(1)
      .map((line) => {
        if (line.toLowerCase().includes("price"))
          return `<p class="price" itemprop="offers" itemscope itemtype="https://schema.org/Offer"><span itemprop="price">${line}</span></p>`;
        if (line.startsWith("- "))
          return `<li class="feature">${line.slice(2)}</li>`;
        return `<p>${line}</p>`;
      })
      .join("\n    ")}
  </div>
  <button class="add-to-cart">Add to Cart</button>
</div>`;
        break;
    }

    return html;
  };

  const handleCopy = async () => {
    const html = convertToHtml(inputText, outputFormat);
    if (html) {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "HTML copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const outputHtml = convertToHtml(inputText, outputFormat);

  return (
    <div className="space-y-6">
      <Tabs value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="regular" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Regular</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            <span className="hidden sm:inline">Blog</span>
          </TabsTrigger>
          <TabsTrigger value="shoppable" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Shoppable</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Input Text
          </label>
          <Textarea
            placeholder="Paste your text here...&#10;&#10;Use markdown-style formatting:&#10;# Heading 1&#10;## Heading 2&#10;- List item&#10;Regular paragraph"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] font-mono text-sm bg-card border-border resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              HTML Output
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!outputHtml}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="min-h-[300px] p-4 bg-card border border-border rounded-lg overflow-auto text-sm">
            <code className="text-primary/90 whitespace-pre-wrap">
              {outputHtml || "// Output will appear here..."}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
