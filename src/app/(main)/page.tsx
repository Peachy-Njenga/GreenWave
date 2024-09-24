import TrendsSidebar from "@/components/TrendsSidebar";
import Post from "@/components/posts/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import ForYouFeed from "./ForYouFeed";

export default async function Home() {
  return (
    <main className="min-w-0 w-full gap-4 flex">
      <div className="w-full min-w-0 space-y-5">
      <PostEditor/>
      <ForYouFeed/>
      </div>
      <TrendsSidebar />
      
    </main>
  );
}
