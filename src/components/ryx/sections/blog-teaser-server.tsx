import { getAllPosts } from "@/lib/blog";
import { BlogTeaserSection } from "./blog-teaser";

export async function BlogTeaserServer() {
  const posts = getAllPosts().slice(0, 3);
  return <BlogTeaserSection posts={posts} />;
}
