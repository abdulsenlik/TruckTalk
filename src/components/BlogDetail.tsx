import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { Blog, formatBlogDate, calculateReadingTime } from "@/utils/blogApi";
import { generateSocialShareUrls } from "@/utils/seo";

interface BlogDetailProps {
  blog: Blog;
}

/**
 * BlogDetail component displays the full content of a blog post
 * Includes social sharing, reading time, and structured content
 */
export default function BlogDetail({ blog }: BlogDetailProps) {
  const readingTime = calculateReadingTime(blog.content);
  const formattedDate = formatBlogDate(blog.published_at);
  const shareUrls = generateSocialShareUrls(blog);

  // Convert markdown-style content to HTML (basic conversion)
  const formatContent = (content: string) => {
    return (
      content
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>',
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-2xl font-semibold mt-10 mb-6">$1</h2>',
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>',
        )
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Lists
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
        // Paragraphs
        .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
        // Line breaks
        .replace(/\n/g, "<br />")
    );
  };

  const handleShare = (platform: string) => {
    const urls = shareUrls as any;
    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link to="/blog">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Button>
        </Link>
      </div>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag.replace("-", " ")}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight mb-6">{blog.title}</h1>

        {/* Summary */}
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          {blog.summary}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>By {blog.author}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.published_at}>{formattedDate}</time>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Share:
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("linkedin")}
            className="flex items-center gap-2"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("email")}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className="leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: `<p class="mb-4 leading-relaxed">${formatContent(blog.content)}</p>`,
          }}
        />
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Tags (repeated for SEO) */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Topics:
            </span>
            {blog.tags.map((tag) => (
              <Link key={tag} to={`/blog?tag=${tag}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag.replace("-", " ")}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Back to Blog Link */}
          <Link to="/blog">
            <Button variant="outline">View All Posts</Button>
          </Link>
        </div>

        {/* Author Info */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {blog.author.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold mb-1">{blog.author}</h3>
              <p className="text-sm text-muted-foreground">
                Expert content creator focused on truck driver education and
                professional development.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}

/**
 * BlogDetailSkeleton component for loading states
 */
export function BlogDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button skeleton */}
      <div className="mb-8">
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>

      {/* Cover image skeleton */}
      <div className="aspect-video bg-muted animate-pulse rounded-lg mb-8" />

      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-muted animate-pulse rounded" />
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-4 mb-6">
          <div className="h-10 bg-muted animate-pulse rounded" />
          <div className="h-10 w-3/4 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-6 w-5/6 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-4 mb-6">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-muted animate-pulse rounded"
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}
