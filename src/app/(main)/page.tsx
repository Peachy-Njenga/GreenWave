import TrendsSidebar from "@/components/TrendsSidebar";
import Post from "@/components/posts/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";

export default async function Home() {
  return (
    <main className="min-w-0 w-full gap-4 flex">
      <div className="w-full min-w-0 space-y-5">
      <PostEditor/>
      <Tabs>
        <TabsList>
          <TabsTrigger  value="for-you">
            For you
          </TabsTrigger>
          <TabsTrigger value="following">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
    <ForYouFeed/>
        </TabsContent>
        <TabsContent value="following">
          <FollowingFeed/>
        </TabsContent>

      </Tabs>
      </div>
      <TrendsSidebar />
      
    </main>
  );
}
