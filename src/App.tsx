import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import WordToHtml from "./pages/tools/WordToHtml";
import JsonFormatter from "./pages/tools/JsonFormatter";
import Base64 from "./pages/tools/Base64";
import UrlEncoder from "./pages/tools/UrlEncoder";
import ColorConverter from "./pages/tools/ColorConverter";
import UuidGenerator from "./pages/tools/UuidGenerator";
import Downloads from "./pages/Downloads";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import SchoolProjects from "./pages/SchoolProjects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/word-to-html" element={<WordToHtml />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/base64" element={<Base64 />} />
            <Route path="/tools/url-encoder" element={<UrlEncoder />} />
            <Route path="/tools/color-converter" element={<ColorConverter />} />
            <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/school-projects" element={<SchoolProjects />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
