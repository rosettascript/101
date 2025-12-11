import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Download, Code2, Database, Terminal, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const projects = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A responsive portfolio template perfect for showcasing your projects. Includes sections for about, skills, projects, and contact.",
    category: "Web Development",
    difficulty: "Beginner",
    technologies: ["HTML", "CSS", "JavaScript"],
    icon: Globe,
    color: "text-primary",
  },
  {
    id: "todo-app",
    title: "Todo List Application",
    description: "A feature-rich todo app with local storage persistence. Learn CRUD operations and state management.",
    category: "Web Development",
    difficulty: "Beginner",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    color: "text-secondary",
  },
  {
    id: "student-database",
    title: "Student Database Management",
    description: "A PostgreSQL-based student records system. Learn database design, queries, and CRUD operations.",
    category: "Database",
    difficulty: "Intermediate",
    technologies: ["PostgreSQL", "Node.js", "Express"],
    icon: Database,
    color: "text-accent",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "An interactive weather app using external APIs. Practice API integration and data visualization.",
    category: "Web Development",
    difficulty: "Intermediate",
    technologies: ["React", "API Integration", "Charts"],
    icon: Globe,
    color: "text-[hsl(var(--syntax-cyan))]",
  },
  {
    id: "file-organizer",
    title: "File Organizer Script",
    description: "A Python script to automatically organize files by type. Learn file handling and automation.",
    category: "Scripting",
    difficulty: "Beginner",
    technologies: ["Python", "OS Module", "File Handling"],
    icon: Terminal,
    color: "text-[hsl(var(--syntax-orange))]",
  },
  {
    id: "blog-cms",
    title: "Simple Blog CMS",
    description: "A basic content management system for blogs. Full PERN stack implementation with authentication.",
    category: "Web Development",
    difficulty: "Advanced",
    technologies: ["PostgreSQL", "Express", "React", "Node.js"],
    icon: Code2,
    color: "text-primary",
  },
  {
    id: "inventory-system",
    title: "Inventory Management System",
    description: "Track products, manage stock levels, and generate reports. Database-focused project.",
    category: "Database",
    difficulty: "Intermediate",
    technologies: ["PostgreSQL", "Python", "Tkinter"],
    icon: Database,
    color: "text-secondary",
  },
  {
    id: "backup-script",
    title: "Automated Backup Script",
    description: "Windows batch scripts for automated file backups. Learn scheduling and file operations.",
    category: "Scripting",
    difficulty: "Beginner",
    technologies: ["Batch", "PowerShell", "Task Scheduler"],
    icon: Terminal,
    color: "text-[hsl(var(--syntax-yellow))]",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store Template",
    description: "A complete online store template with product listings, cart, and checkout flow.",
    category: "Web Development",
    difficulty: "Advanced",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
    icon: Globe,
    color: "text-accent",
  },
];

const categories = ["All", "Web Development", "Database", "Scripting"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function SchoolProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const handleDownload = (projectTitle: string) => {
    toast({
      title: "Download Started",
      description: `${projectTitle} template is being downloaded...`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--syntax-orange))]/10 text-[hsl(var(--syntax-orange))] text-sm font-mono mb-4">
            <GraduationCap className="h-4 w-4" />
            School Projects
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Project Templates for Students
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready-to-use project templates for your school assignments. Each template includes 
            documentation, source code, and setup instructions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <div className="flex gap-1">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <div className="flex gap-1">
              {difficulties.map((diff) => (
                <Badge
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-card/50 border-border hover:border-primary/30 transition-all flex flex-col animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted/50 ${project.color}`}>
                    <project.icon className="h-6 w-6" />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      project.difficulty === "Beginner"
                        ? "border-primary/50 text-primary"
                        : project.difficulty === "Intermediate"
                        ? "border-secondary/50 text-secondary"
                        : "border-accent/50 text-accent-foreground"
                    }
                  >
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted/50 rounded text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleDownload(project.title)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects match your filters.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDifficulty("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 terminal-bg p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--syntax-orange))]" />
            How to Use These Templates
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-primary">1. Download</h3>
              <p className="text-muted-foreground">
                Click the download button to get the project template as a ZIP file.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-secondary">2. Extract & Read</h3>
              <p className="text-muted-foreground">
                Extract the files and read the README for setup instructions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent">3. Customize</h3>
              <p className="text-muted-foreground">
                Modify the code to fit your requirements and make it your own.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
