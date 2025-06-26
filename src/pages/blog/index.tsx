import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogList from "@/components/BlogList";
import { Blog, fetchBlogs } from "@/utils/blogApi";
import {
  generateBlogListSEO,
  updateSEOTags,
  cleanupSEOTags,
} from "@/utils/seo";

/**
 * Blog List Page - displays all published blog posts
 * Route: /blog
 * Features: SEO optimization, filtering, pagination
 */
export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up SEO
    const seoData = generateBlogListSEO();
    updateSEOTags(seoData);

    // Load initial blog posts
    loadInitialBlogs();

    // Cleanup SEO tags on unmount
    return () => {
      cleanupSEOTags();
    };
  }, []);

  const loadInitialBlogs = async () => {
    try {
      setLoading(true);
      const { blogs: initialBlogs } = await fetchBlogs({ limit: 9 });
      setBlogs(initialBlogs);
      setError(null);
    } catch (err) {
      setError("Failed to load blog posts. Please try again.");
      console.error("Error loading initial blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error && !blogs.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">TruckTalk Blog</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadInitialBlogs}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          TruckTalk Blog - English Learning Resources for Truck Drivers
        </title>
        <meta
          name="description"
          content="Discover expert tips, English lessons, and professional guidance for international truck drivers. Learn essential communication skills, DOT regulations, and safety practices."
        />
        <meta
          name="keywords"
          content="truck driver english, trucking blog, DOT regulations, traffic stops, professional driving, commercial driver education"
        />
        <link rel="canonical" href={`${window.location.origin}/blog`} />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="TruckTalk Blog - English Learning Resources for Truck Drivers"
        />
        <meta
          property="og:description"
          content="Discover expert tips, English lessons, and professional guidance for international truck drivers."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
        />
        <meta property="og:url" content={`${window.location.origin}/blog`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TruckTalk Blog - English Learning Resources for Truck Drivers"
        />
        <meta
          name="twitter:description"
          content="Discover expert tips, English lessons, and professional guidance for international truck drivers."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "TruckTalk Blog",
            description:
              "Expert tips, English lessons, and professional guidance for international truck drivers.",
            url: `${window.location.origin}/blog`,
            publisher: {
              "@type": "Organization",
              name: "TruckTalk",
              url: window.location.origin,
            },
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">TruckTalk Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Expert tips, English lessons, and professional guidance for
            international truck drivers. Master the skills you need to succeed
            on American roads.
          </p>
        </header>

        {/* Featured Content Banner */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            🚛 New to Truck Driving in America?
          </h2>
          <p className="text-muted-foreground mb-4">
            Start with our essential guides on traffic stops, DOT regulations,
            and professional English communication.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              Traffic Stops
            </span>
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              DOT Regulations
            </span>
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              English Learning
            </span>
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              Safety Tips
            </span>
          </div>
        </div>

        {/* Blog List Component */}
        <BlogList
          initialBlogs={blogs}
          showSearch={true}
          showTagFilter={true}
          postsPerPage={9}
        />

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-3">
            Ready to Improve Your English Skills?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take your professional communication to the next level with our
            interactive courses designed specifically for truck drivers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/modules"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Explore Courses
            </a>
            <a
              href="/bootcamp"
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Join Bootcamp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
