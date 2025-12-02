import { getPostById } from "@/lib/blogStore";
import Container from "@/components/Container";
import HeaderContent from "@/components/headerContent";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }) {
  const post = await getPostById(params.id);
  if (!post) {
    return notFound();
  }

  // Split content into paragraphs
  const paragraphs = post.content.split("\n").filter((p) => p.trim() !== "");

  return (
    <>
      <div className="py-24 bg-white">
        <Container className="max-w-4xl mx-auto text-center">
          <HeaderContent
            title={post.title}
            align="center"
            showCta={false}
            titleSize="md"
          />
          <p className="mt-4 text-neutral-500">
            {post.author} • {post.date}
          </p>
        </Container>
      </div>

      <Container className="max-w-5xl mx-auto -mt-16 mb-16">
        <div className="relative w-full pt-[50%] bg-neutral-200 rounded-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-bg={`url(${post.imageUrl})`}
          />
        </div>
      </Container>

      <section className="pb-12 md:pb-16">
        <Container className="prose prose-neutral max-w-3xl mx-auto">
          <div className="mt-8 space-y-6 text-neutral-800">
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
