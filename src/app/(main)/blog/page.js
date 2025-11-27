import Hero from "@/components/Hero";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";
import { readPosts } from "@/lib/blogStore";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// A simple component for displaying a blog post card
function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <Card className="rounded-10 !border-0 overflow-hidden bg-neutral-200">
        <div className="relative w-full pt-[65%]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.imageUrl})` }}
          />
        </div>
      </Card>
      <div className="mt-3">
        <h3 className="font-playfair text-lg md:text-xl text-neutral-900 leading-tight group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          {post.author} • {post.date}
        </p>
        <p className="mt-1.5 text-sm text-neutral-700 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await readPosts();
  return (
    <>
      <Hero
        backgroundColor="#ffffff"
        title="Our Blog"
        description="Stories, insights, and updates from the world of Pink Papaya."
        align="center"
        showCta={false}
        tone="light"
      />
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
