import { Helmet } from "react-helmet-async";
import { SEOConfig, defaultSEO } from "@/utils/seoConfig";

interface SEOProps extends Partial<SEOConfig> {
  children?: React.ReactNode;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType,
  canonical,
  children 
}: SEOProps) => {
  const seoTitle = title || defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = keywords || defaultSEO.keywords;
  const seoOgImage = ogImage || defaultSEO.ogImage;
  const seoOgType = ogType || defaultSEO.ogType;
  const seoCanonical = canonical || window.location.href;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(", ")} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoOgType} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoOgImage} />
      <meta property="og:site_name" content="Final Wishes Guardian" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoCanonical} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoOgImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Final Wishes Guardian" />
      
      {children}
    </Helmet>
  );
};

export default SEO;
