import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionById,
  getProductsByCollection,
} from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionById(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | VITRAG",
    };
  }

  return {
    title: collection.seoTitle,
    description: collection.seoDescription,
    openGraph: {
      title: collection.seoTitle,
      description: collection.seoDescription,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionById(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = getProductsByCollection(collection.id);

  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/shop" },
            { label: collection.name },
          ]}
        />
      </Container>
      <ProductGrid
        initialProducts={collectionProducts}
        currentCollectionId={collection.id}
        title={collection.name}
        description={collection.description}
      />
    </main>
  );
}
