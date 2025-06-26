import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import BlogCard, { BlogCardSkeleton } from "./BlogCard";
import { Blog, fetchBlogs, fetchBlogTags } from "@/utils/blogApi";

interface BlogListProps {
  initialBlogs?: Blog[];
  showSearch?: boolean;
  showTagFilter?: boolean;
  postsPerPage?: number;
}

/**
 * BlogList component displays a list of blog posts with filtering and pagination
 */
export default function BlogList({
  initialBlogs = [],
  showSearch = true,
  showTagFilter = true,
  postsPerPage = 9,
}: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(!initialBlogs.length);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!initialBlogs.length) {
      loadBlogs();
    }
    loadTags();
  }, []);

  // Filter blogs when search term or tag changes
  useEffect(() => {
    if (searchTerm || selectedTag) {
      filterBlogs();
    } else {
      loadBlogs();
    }
  }, [searchTerm, selectedTag]);

  const loadBlogs = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const offset = (page - 1) * postsPerPage;
      const { blogs: newBlogs, count } = await fetchBlogs({
        limit: postsPerPage,
        offset,
        tag: selectedTag || undefined,
      });

      if (append) {
        setBlogs((prev) => [...prev, ...newBlogs]);
      } else {
        setBlogs(newBlogs);
      }

      setHasMore(
        newBlogs.length === postsPerPage &&
          offset + newBlogs.length < (count || 0),
      );
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError("Failed to load blog posts. Please try again.");
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await fetchBlogTags();
      setAvailableTags(tags);
    } catch (err) {
      console.error("Error loading tags:", err);
    }
  };

  const filterBlogs = async () => {
    try {
      setLoading(true);
      const { blogs: filteredBlogs } = await fetchBlogs({
        limit: postsPerPage * currentPage,
        tag: selectedTag || undefined,
      });

      // Apply search filter on client side
      let results = filteredBlogs;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = filteredBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(term) ||
            blog.summary.toLowerCase().includes(term) ||
            blog.tags.some((tag) => tag.toLowerCase().includes(term)),
        );
      }

      setBlogs(results);
      setHasMore(false); // Disable pagination for filtered results
      setError(null);
    } catch (err) {
      setError("Failed to filter blog posts. Please try again.");
      console.error("Error filtering blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadBlogs(currentPage + 1, true);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag(null);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => loadBlogs()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      {(showSearch || showTagFilter) && (
        <div className="space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Tag Filter */}
          {showTagFilter && availableTags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by topic:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {(searchTerm || selectedTag) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Results Count */}
      {!loading && (
        <div className="text-sm text-muted-foreground">
          {blogs.length === 0
            ? "No blog posts found."
            : `Showing ${blogs.length} blog post${blogs.length === 1 ? "" : "s"}`}
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Loading skeletons
            Array.from({ length: postsPerPage }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : // Blog cards
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedTag
              ? "Try adjusting your search or filter criteria."
              : "Check back later for new content."}
          </p>
          {(searchTerm || selectedTag) && (
            <Button onClick={clearFilters} variant="outline">
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && blogs.length > 0 && (
        <div className="text-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            size="lg"
          >
            {loadingMore ? "Loading..." : "Load More Posts"}
          </Button>
        </div>
      )}
    </div>
  );
}
