import { supabase } from "@/lib/supabase";

export interface Blog {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover_image?: string;
  author: string;
  published_at: string;
  tags: string[];
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface BlogListParams {
  limit?: number;
  offset?: number;
  tag?: string;
}

/**
 * Fetch all published blog posts with optional filtering and pagination
 */
export async function fetchBlogs(params: BlogListParams = {}) {
  const { limit = 10, offset = 0, tag } = params;

  let query = supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Filter by tag if provided
  if (tag) {
    query = query.contains("tags", [tag]);
  }

  // Apply pagination
  if (limit > 0) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blog posts");
  }

  return { blogs: data as Blog[], count };
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("Error fetching blog by slug:", error);
    throw new Error("Failed to fetch blog post");
  }

  return data as Blog;
}

/**
 * Get all unique tags from published blog posts
 */
export async function fetchBlogTags() {
  const { data, error } = await supabase
    .from("blogs")
    .select("tags")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching blog tags:", error);
    throw new Error("Failed to fetch blog tags");
  }

  // Flatten and deduplicate tags
  const allTags = data.flatMap((blog) => blog.tags || []);
  const uniqueTags = Array.from(new Set(allTags)).sort();

  return uniqueTags;
}

/**
 * Calculate estimated reading time for blog content
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Format date for display
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate blog post excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160,
): string {
  // Remove markdown formatting and HTML tags
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold formatting
    .replace(/\*(.*?)\*/g, "$1") // Remove italic formatting
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
}
