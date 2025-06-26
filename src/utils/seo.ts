import { Blog } from "./blogApi";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

/**
 * Generate SEO metadata for blog list page
 */
export function generateBlogListSEO(): SEOData {
  const title = "TruckTalk Blog - English Learning Resources for Truck Drivers";
  const description =
    "Discover expert tips, English lessons, and professional guidance for international truck drivers. Learn essential communication skills, DOT regulations, and safety practices.";
  const keywords =
    "truck driver english, trucking blog, DOT regulations, traffic stops, professional driving, commercial driver education";

  return {
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "TruckTalk Blog",
      description: description,
      url: `${window.location.origin}/blog`,
      publisher: {
        "@type": "Organization",
        name: "TruckTalk",
        url: window.location.origin,
      },
    },
  };
}

/**
 * Generate SEO metadata for individual blog post
 */
export function generateBlogPostSEO(blog: Blog): SEOData {
  const title = `${blog.title} | TruckTalk Blog`;
  const description = blog.summary;
  const keywords = blog.tags.join(", ");
  const ogImage =
    blog.cover_image ||
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80";
  const canonicalUrl = `${window.location.origin}/blog/${blog.slug}`;

  return {
    title,
    description,
    keywords,
    ogTitle: blog.title,
    ogDescription: description,
    ogImage,
    ogUrl: canonicalUrl,
    twitterTitle: blog.title,
    twitterDescription: description,
    twitterImage: ogImage,
    canonicalUrl,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.summary,
      image: ogImage,
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
        "@id": canonicalUrl,
      },
      keywords: blog.tags,
      articleSection: "Truck Driver Education",
      inLanguage: "en-US",
    },
  };
}

/**
 * Update document head with SEO metadata
 */
export function updateSEOTags(seoData: SEOData) {
  // Update title
  document.title = seoData.title;

  // Helper function to update or create meta tag
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    let tag = document.querySelector(selector) as HTMLMetaElement;

    if (!tag) {
      tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  };

  // Update basic meta tags
  updateMetaTag("description", seoData.description);
  if (seoData.keywords) {
    updateMetaTag("keywords", seoData.keywords);
  }

  // Update Open Graph tags
  if (seoData.ogTitle) {
    updateMetaTag("og:title", seoData.ogTitle, true);
  }
  if (seoData.ogDescription) {
    updateMetaTag("og:description", seoData.ogDescription, true);
  }
  if (seoData.ogImage) {
    updateMetaTag("og:image", seoData.ogImage, true);
  }
  if (seoData.ogUrl) {
    updateMetaTag("og:url", seoData.ogUrl, true);
  }
  updateMetaTag("og:type", "article", true);

  // Update Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  if (seoData.twitterTitle) {
    updateMetaTag("twitter:title", seoData.twitterTitle);
  }
  if (seoData.twitterDescription) {
    updateMetaTag("twitter:description", seoData.twitterDescription);
  }
  if (seoData.twitterImage) {
    updateMetaTag("twitter:image", seoData.twitterImage);
  }

  // Update canonical URL
  if (seoData.canonicalUrl) {
    let canonicalTag = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", seoData.canonicalUrl);
  }

  // Update structured data
  if (seoData.structuredData) {
    let structuredDataTag = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (!structuredDataTag) {
      structuredDataTag = document.createElement("script");
      structuredDataTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredDataTag);
    }
    structuredDataTag.textContent = JSON.stringify(seoData.structuredData);
  }
}

/**
 * Generate social sharing URLs
 */
export function generateSocialShareUrls(blog: Blog) {
  const url = encodeURIComponent(`${window.location.origin}/blog/${blog.slug}`);
  const title = encodeURIComponent(blog.title);
  const summary = encodeURIComponent(blog.summary);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=trucking,english,education`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    email: `mailto:?subject=${title}&body=${summary}%0A%0A${url}`,
  };
}

/**
 * Clean up SEO tags when component unmounts
 */
export function cleanupSEOTags() {
  // Reset title to default
  document.title = "TruckTalk - English Learning for Truck Drivers";

  // Remove dynamic meta tags
  const dynamicTags = [
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:image"]',
    'meta[property="og:url"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
    'link[rel="canonical"]',
    'script[type="application/ld+json"]',
  ];

  dynamicTags.forEach((selector) => {
    const tag = document.querySelector(selector);
    if (tag) {
      tag.remove();
    }
  });
}
