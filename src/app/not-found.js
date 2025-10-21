import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center bg-background text-foreground px-6 py-10">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-primary" />
        </div>

        <h1 className="text-6xl font-heading font-bold text-dark mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved. Try
          navigating back to the homepage.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-light py-3 px-6 rounded-md font-medium hover:bg-dark transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </Link>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
