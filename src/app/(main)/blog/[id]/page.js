import { getPostById, readPosts } from "@/lib/blogStore";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PLACEHOLDER } from "@/utils/image";
import { isPreOptimizedMedia } from "@/lib/media-url";

function estimateReadTime(content) {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function renderContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-playfair italic font-normal text-2xl md:text-3xl text-[#16323C] mt-12 mb-4">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote — collect consecutive > lines
    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      const [quote, attribution] = quoteLines.join("\n").split("\n— ");
      elements.push(
        <blockquote key={i} className="my-10 pl-6 border-l-2 border-[#C07A5A]">
          <p className="font-playfair text-xl md:text-2xl italic text-[#16323C] leading-relaxed">
            {quote.replace(/^"/, "“").replace(/"$/, "”")}
          </p>
          {attribution && (
            <footer className="mt-4 text-[11px] uppercase tracking-[0.14em] text-[#C07A5A] font-semibold font-bricolage">
              — {attribution}
            </footer>
          )}
        </blockquote>
      );
      continue;
    }

    // Inline image: ![caption|url]
    const imgMatch = line.match(/^!\[([^|]*)\|([^\]]+)\]$/);
    if (imgMatch) {
      const [, caption, url] = imgMatch;
      elements.push(
        <figure key={i} className="my-10">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={url || DEFAULT_PLACEHOLDER}
              alt={caption}
              fill
              className="object-cover"
              unoptimized={isPreOptimizedMedia(url || DEFAULT_PLACEHOLDER)}
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-[12px] text-neutral-400 font-bricolage">
              {caption}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-[15px] md:text-base text-[#16323C]/80 leading-[1.8] font-bricolage">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.imageUrl ? [{ url: post.imageUrl }] : [] },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const [post, allPosts] = await Promise.all([
    getPostById(resolvedParams.id),
    readPosts(),
  ]);

  if (!post) return notFound();

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const nextPost = allPosts[(currentIndex + 1) % allPosts.length] !== post
    ? allPosts[(currentIndex + 1) % allPosts.length]
    : null;

  return (
    <article className="bg-white">
      {/* Hero image — full width, tall */}
      <div className="relative w-full" style={{ height: "calc(100vh - var(--navbar-h))" }}>
        <Image
          src={post.imageUrl?.startsWith("http") ? post.imageUrl : DEFAULT_PLACEHOLDER}
          alt={post.title}
          fill
          className="object-cover"
          priority
          unoptimized={isPreOptimizedMedia(post.imageUrl?.startsWith("http") ? post.imageUrl : DEFAULT_PLACEHOLDER)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16 md:py-20">
        {/* Eyebrow */}
        {post.category && (
          <p className="font-bricolage text-[11px] uppercase tracking-[0.18em] text-[#C07A5A] font-semibold text-center mb-4">
            {post.category}
          </p>
        )}

        {/* Title */}
        <h1 className="font-playfair italic font-normal text-4xl md:text-5xl text-[#16323C] leading-[1.1] text-center mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <p className="text-center text-[13px] text-[#16323C]/60 font-bricolage mb-8 md:mb-10">
          By {post.author} &nbsp;·&nbsp; {post.date} &nbsp;·&nbsp; {estimateReadTime(post.content)}
        </p>

        <hr className="border-neutral-100 mb-8 md:mb-10" />

        {/* Body */}
        <div className="space-y-6">
          {renderContent(post.content)}
        </div>

        {/* Next story */}
        {nextPost && (
          <div className="mt-20 pt-8 border-t border-neutral-100 flex justify-end">
            <Link
              href={`/blog/${nextPost.id}`}
              className="font-bricolage text-[13px] text-neutral-400 hover:text-neutral-800 transition-colors"
            >
              Next Story: <span className="text-neutral-800 font-medium">{nextPost.title}</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
