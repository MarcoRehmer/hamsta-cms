<script lang="ts">
  type Post = { id: number; title: string; excerpt: string; status: 'published' | 'draft'; date: string };

  // Demo static data — replace with server load later if desired.
  const posts: Post[] = [
    { id: 1, title: 'Welcome to Hamsta', excerpt: 'This is the first post on the Hamsta blog.', status: 'published', date: '2025-11-01' },
    { id: 2, title: 'Draft: New features', excerpt: 'Notes about upcoming features and roadmap.', status: 'draft', date: '2025-11-10' },
    { id: 3, title: 'How to use Hamsta', excerpt: 'A short guide on using the CMS.', status: 'published', date: '2025-10-21' }
  ];
</script>

<section class="posts-list">
  <h1>Posts</h1>

  <div class="list">
    {#each posts as post}
      <article class="post">
        <a href={`/admin/posts/${post.id}`} class="post-link">
          <div class="meta">
            <span class={`status ${post.status}`}>{post.status}</span>
            <time datetime={post.date}>{post.date}</time>
          </div>
          <h2>{post.title}</h2>
          <p class="excerpt">{post.excerpt}</p>
        </a>
      </article>
    {/each}
  </div>
</section>

<style>
  .posts-list h1 { margin-bottom: .75rem }
  .list { display: grid; gap: .75rem }
  .post { background: #fff; padding: .9rem; border-radius: 8px; box-shadow: 0 6px 18px rgba(12,18,30,.04) }
  .post-link { color: inherit; text-decoration: none; display: block }
  .meta { display: flex; gap: .5rem; align-items: center; font-size: .85rem; color: #666 }
  .status { padding: .15rem .45rem; border-radius: 999px; text-transform: capitalize; font-weight: 600 }
  .status.published { background: #e6fffa; color: #03543f }
  .status.draft { background: #fff7ed; color: #92400e }
  .excerpt { margin: .5rem 0 0 0; color: #444 }
  h2 { margin: .25rem 0 0 0 }
</style>
