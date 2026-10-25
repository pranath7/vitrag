import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { siteConfig } from "@/lib/config";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | VITRAG",
    };
  }

  // Ensure prices are excluded from social-sharing / ad metadata per campaign policy
  const cleanDescription = (product.seoDescription || product.description)
    .replace(/₹\s*[\d,]+/g, "")
    .replace(/\(MRP\s*[^)]*\)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return {
    title: product.seoTitle,
    description: cleanDescription,
    openGraph: {
      title: product.seoTitle,
      description: cleanDescription,
      images: product.images.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  // JSON-LD Structured Data for Google Shopping / Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `${siteConfig.url}${img.src}`),
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "VITRAG",
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "INR",
      price: (product.price / 100).toFixed(2),
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <main className="bg-[#FFF5E6] min-h-screen pt-3 sm:pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            {
              label: product.category,
              href: `/collections/${product.collectionIds[0] || "dinner-sets"}`,
            },
            { label: product.name },
          ]}
        />
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </Container>
    </main>
  );
}
