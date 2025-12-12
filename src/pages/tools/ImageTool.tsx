import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ImageTool } from "@/components/tools/ImageTool";

export default function ImageToolPage() {
  return (
    <Layout>
      <SEO
        title="Image Tool - Compress, Convert, Resize & Generate Favicons"
        description="Free online image tool. Compress images, convert formats (PNG, JPEG, WebP), resize images, and generate favicons. All processing happens in your browser - no server uploads."
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Image Tool</h1>
          <p className="text-muted-foreground">
            Compress, convert, resize images and generate favicons. All processing happens in your browser - your images never leave your device.
          </p>
        </div>
        <ImageTool />
      </div>
    </Layout>
  );
}

