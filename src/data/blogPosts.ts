export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  author?: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "word-to-html-guide",
    title: "Complete Guide to Word to HTML Conversion",
    excerpt: "Learn the best practices for converting Word documents to clean, semantic HTML. We cover regular, blog, and e-commerce formats.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["HTML", "Word", "Conversion"],
    content: `## Introduction

Converting Word documents to HTML is a common task for web developers and content managers. However, the default output from Word processors often includes messy, non-semantic markup that can cause issues with styling and accessibility.

## Why Clean HTML Matters

Clean HTML is essential for:

- **SEO**: Search engines prefer well-structured content
- **Accessibility**: Screen readers rely on semantic markup
- **Maintainability**: Clean code is easier to style and modify
- **Performance**: Less bloated code means faster page loads

## Using Our Converter

Our Word to HTML converter offers three output formats:

### Regular Output

Perfect for general web content. Converts your text to semantic HTML with proper heading hierarchy (h1, h2, h3) and paragraph tags.

\`\`\`html
<article>
  <h1>Your Main Title</h1>
  <p>Your paragraph content here...</p>
</article>
\`\`\`

### Blog Output

Optimized for CMS platforms. Wraps content in an article tag with proper meta information for publishing systems.

### Shoppable Output

E-commerce ready format with Schema.org markup. Includes product structure for better search engine visibility.

## Best Practices

1. **Use heading hierarchy correctly** - Start with H1 for the main title
2. **Keep paragraphs focused** - One idea per paragraph
3. **Use lists for multiple items** - Better for readability
4. **Add alt text for images** - Essential for accessibility

## Conclusion

Clean HTML conversion doesn't have to be difficult. With the right tools, you can transform Word documents into web-ready content in seconds.`,
  },
  {
    id: "pern-stack-setup",
    title: "Setting Up a PERN Stack Project from Scratch",
    excerpt: "A step-by-step guide to configuring PostgreSQL, Express, React, and Node.js for your next full-stack application.",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["PERN", "PostgreSQL", "React", "Node.js"],
    content: `## What is the PERN Stack?

PERN stands for PostgreSQL, Express, React, and Node.js. It's a powerful full-stack JavaScript development stack that's perfect for building modern web applications.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- PostgreSQL 14+ installed
- npm or yarn package manager
- Basic knowledge of JavaScript/TypeScript

## Step 1: Project Structure

Create your project directory and initialize:

\`\`\`bash
mkdir my-pern-app
cd my-pern-app
npm init -y
\`\`\`

## Step 2: Backend Setup

Install Express and PostgreSQL dependencies:

\`\`\`bash
npm install express pg cors dotenv
npm install -D typescript @types/express @types/node
\`\`\`

## Step 3: Database Configuration

Create a \`db.js\` file for your PostgreSQL connection:

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
\`\`\`

## Step 4: Frontend Setup

Create your React application with Vite for fast development:

\`\`\`bash
npm create vite@latest client -- --template react-ts
\`\`\`

## Using Our PERN Setup Script

Our downloadable tool automates all these steps for you, including:

- Project scaffolding
- ESLint and Prettier configuration
- Docker compose files
- Database migration scripts
- API boilerplate

## Conclusion

The PERN stack provides a solid foundation for building scalable web applications. With our setup script, you can get started in minutes instead of hours.`,
  },
  {
    id: "windows-automation-tips",
    title: "10 Windows Automation Scripts Every Developer Needs",
    excerpt: "Boost your productivity with these essential PowerShell and batch scripts for common development tasks.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["Windows", "PowerShell", "Automation"],
    content: `## Why Automate?

As developers, we perform repetitive tasks daily. Automation scripts can save hours of work every week.

## Essential Scripts

### 1. Quick Project Setup

\`\`\`powershell
# Create new project with git and npm init
function New-Project {
  param([string]$name)
  mkdir $name
  cd $name
  git init
  npm init -y
}
\`\`\`

### 2. Clean Node Modules

\`\`\`powershell
# Recursively remove node_modules folders
Get-ChildItem -Path . -Include node_modules -Recurse -Directory | Remove-Item -Recurse -Force
\`\`\`

### 3. Port Killer

\`\`\`powershell
# Kill process running on specific port
function Kill-Port {
  param([int]$port)
  $pid = (Get-NetTCPConnection -LocalPort $port).OwningProcess
  Stop-Process -Id $pid -Force
}
\`\`\`

### 4. Git Cleanup

\`\`\`powershell
# Remove merged branches
git branch --merged | Where-Object { $_ -notmatch "main|master" } | ForEach-Object { git branch -d $_.Trim() }
\`\`\`

### 5. Database Backup

Automate your PostgreSQL backups with scheduled tasks.

## Getting Started

Download our complete automation toolkit from the Downloads page. Each script is documented and ready to use.

## Conclusion

These scripts are just the beginning. Once you start automating, you'll find endless opportunities to streamline your workflow.`,
  },
  {
    id: "postgresql-basics",
    title: "PostgreSQL Basics: Getting Started with Database Management",
    excerpt: "Everything you need to know about PostgreSQL for beginners. From installation to your first queries.",
    date: "2024-01-01",
    readTime: "10 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["PostgreSQL", "Database", "SQL"],
    content: `## What is PostgreSQL?

PostgreSQL is a powerful, open-source relational database system known for its reliability and feature richness.

## Installation

### Windows

Download the installer from the official PostgreSQL website and follow the setup wizard.

### macOS

\`\`\`bash
brew install postgresql@15
brew services start postgresql@15
\`\`\`

### Linux (Ubuntu)

\`\`\`bash
sudo apt update
sudo apt install postgresql postgresql-contrib
\`\`\`

## Basic Commands

### Connecting to PostgreSQL

\`\`\`bash
psql -U postgres
\`\`\`

### Creating a Database

\`\`\`sql
CREATE DATABASE myapp;
\`\`\`

### Creating Tables

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Essential Queries

### INSERT

\`\`\`sql
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
\`\`\`

### SELECT

\`\`\`sql
SELECT * FROM users WHERE name LIKE 'John%';
\`\`\`

## Conclusion

PostgreSQL is an excellent choice for any project requiring a robust database solution. Our PSQL Manager tool can help you visualize and manage your databases more effectively.`,
  },
  {
    id: "html-seo-optimization",
    title: "HTML Structure for Better SEO",
    excerpt: "Understand how proper HTML structure impacts your search engine rankings and learn best practices for semantic markup.",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["SEO", "HTML", "Web Development"],
    content: `## Why HTML Structure Matters for SEO

Search engines rely on HTML structure to understand your content. Proper markup helps crawlers index your pages effectively.

## Semantic HTML Elements

### Use Proper Headings

\`\`\`html
<h1>Main Page Title (only one per page)</h1>
<h2>Section Headings</h2>
<h3>Subsection Headings</h3>
\`\`\`

### Semantic Containers

\`\`\`html
<header>Site header</header>
<nav>Navigation</nav>
<main>Primary content</main>
<article>Self-contained content</article>
<aside>Sidebar content</aside>
<footer>Site footer</footer>
\`\`\`

## Essential Meta Tags

\`\`\`html
<meta name="description" content="Your page description (150-160 chars)">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://yoursite.com/page">
\`\`\`

## Open Graph Tags

\`\`\`html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://yoursite.com/image.jpg">
<meta property="og:type" content="article">
\`\`\`

## Best Practices

1. **One H1 per page** - Clear main topic
2. **Descriptive alt text** - For all images
3. **Internal linking** - Connect related content
4. **Mobile-friendly** - Responsive design
5. **Fast loading** - Optimize assets

## Tools

Use our Word to HTML converter with the Blog output format to automatically generate SEO-friendly markup.`,
  },
  {
    id: "schema-markup-ecommerce",
    title: "Schema Markup for E-commerce: A Developer's Guide",
    excerpt: "Learn how to implement Schema.org structured data for product pages to improve visibility in search results.",
    date: "2023-12-20",
    readTime: "9 min read",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    author: "RosettaScript Team",
    tags: ["Schema.org", "E-commerce", "SEO"],
    content: `## What is Schema Markup?

Schema markup is structured data that helps search engines understand your content and display rich results.

## Product Schema

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "image": "https://example.com/product.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
\`\`\`

## Review Schema

\`\`\`json
{
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "reviewCount": "89"
}
\`\`\`

## Breadcrumb Schema

\`\`\`json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    }
  ]
}
\`\`\`

## Implementation

Add schema markup using JSON-LD in your HTML:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  ...
}
</script>
\`\`\`

## Testing

Use Google's Rich Results Test to validate your markup before deploying.

## Using Our Converter

Our Word to HTML converter's Shoppable output format automatically generates Schema.org markup for product content.`,
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

export const categories = ["All", "Tutorial", "Tips", "Tools"];
