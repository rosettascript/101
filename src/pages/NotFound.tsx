import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Static files that should be served directly, not handled by React Router
const STATIC_FILE_EXTENSIONS = ['.xml', '.txt', '.html', '.json', '.ico', '.png', '.jpg', '.svg', '.webmanifest'];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Check if this is a static file request (ends with a static file extension)
    const isStaticFile = STATIC_FILE_EXTENSIONS.some(ext => pathname.endsWith(ext));
    
    if (isStaticFile) {
      // For static files, do a full page reload to let the server handle it
      // This bypasses React Router and allows the web server to serve the file directly
      window.location.replace(pathname);
      return;
    }
    
    // Only log errors for actual 404 routes, not static files
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
