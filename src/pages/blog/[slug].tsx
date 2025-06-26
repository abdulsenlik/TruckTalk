import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogDetail, { BlogDetailSkeleton } from "@/components/BlogDetail";
import { Blog, fetchBlogBySlug } from "@/utils/blogApi";
import {
  generateBlogPostSEO,
  updateSEOTags,
  cleanupSEOTags,
} from "@/utils/seo";

/**
 * Blog Post Detail Page - displays individual blog post
 * Route: /blog/[slug]
 * Features: SEO optimization, social sharing, structured data
 */
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      loadBlog(slug);
    }

    // Cleanup SEO tags on unmount
    return () => {
      cleanupSEOTags();
    };
  }, [slug]);

  useEffect(() => {
    // Update SEO when blog is loaded
    if (blog) {
      const seoData = generateBlogPostSEO(blog);
      updateSEOTags(seoData);
    }
  }, [blog]);

  const loadBlog = async (blogSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const blogData = await fetchBlogBySlug(blogSlug);

      if (!blogData) {
        setNotFound(true);
        return;
      }

      setBlog(blogData);
    } catch (err) {
      setError("Failed to load blog post. Please try again.");
      console.error("Error loading blog:", err);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to 404 if blog not found
  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => slug && loadBlog(slug)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/blog"
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Back to Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <BlogDetailSkeleton />
        </div>
      </div>
    );
  }

  // Main content
  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blog.title} | TruckTalk Blog</title>
        <meta name="description" content={blog.summary} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <link
          rel="canonical"
          href={`${window.location.origin}/blog/${blog.slug}`}
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.summary} />
        <meta
          property="og:image"
          content={
            blog.cover_image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
          }
        />
        <meta
          property="og:url"
          content={`${window.location.origin}/blog/${blog.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={blog.author} />
        <meta property="article:published_time" content={blog.published_at} />
        <meta property="article:modified_time" content={blog.updated_at} />
        {blog.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.summary} />
        <meta
          name="twitter:image"
          content={
            blog.cover_image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
          }
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.summary,
            image:
              blog.cover_image ||
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
            author: {
              "@type": "Person",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: "TruckTalk",
              url: window.location.origin,
            },
            datePublished: blog.published_at,
            dateModified: blog.updated_at,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${window.location.origin}/blog/${blog.slug}`,
            },
            keywords: blog.tags,
            articleSection: "Truck Driver Education",
            inLanguage: "en-US",
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <BlogDetail blog={blog} />

        {/* Related Content Section */}
        <div className="mt-16 pt-12 border-t">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Continue Your Learning Journey
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to put these concepts into practice? Explore our interactive
              courses designed specifically for truck drivers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Course Cards */}
              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🚦
                </div>
                <h3 className="font-semibold mb-2">Traffic Stop Course</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Master essential phrases and procedures for traffic stops
                </p>
                <a
                  href="/modules"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Start Learning →
                </a>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  📋
                </div>
                <h3 className="font-semibold mb-2">DOT Compliance</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn regulations and documentation requirements
                </p>
                <a
                  href="/modules"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Explore Course →
                </a>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🎯
                </div>
                <h3 className="font-semibold mb-2">Bootcamp Program</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Intensive training for new drivers
                </p>
                <a
                  href="/bootcamp"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Join Bootcamp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
