import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { Blog, formatBlogDate, calculateReadingTime } from "@/utils/blogApi";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

/**
 * BlogCard component displays a preview of a blog post
 * Used in the blog list page to show blog post summaries
 */
export default function BlogCard({ blog, className = "" }: BlogCardProps) {
  const readingTime = calculateReadingTime(blog.content);
  const formattedDate = formatBlogDate(blog.published_at);

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 h-full ${className}`}
    >
      <Link to={`/blog/${blog.slug}`} className="block h-full">
        {/* Cover Image */}
        {blog.cover_image && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {tag.replace("-", " ")}
                </Badge>
              ))}
              {blog.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{blog.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Summary */}
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {blog.summary}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {/* Author */}
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Published Date */}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={blog.published_at}>{formattedDate}</time>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

/**
 * BlogCardSkeleton component for loading states
 */
export function BlogCardSkeleton() {
  return (
    <Card className="h-full">
      <div className="aspect-video bg-muted animate-pulse rounded-t-lg" />
      <CardHeader className="pb-3">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-muted animate-pulse rounded" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
