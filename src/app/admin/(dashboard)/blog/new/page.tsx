import { ContentType } from "@prisma/client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">New blog post</h1>
        <p className="mt-1 text-slate-600">Draft first, then publish when ready.</p>
      </div>
      <ContentEditor type={ContentType.BLOG} listPath="/admin/blog" />
    </div>
  );
}
