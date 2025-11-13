<script lang="ts">
  import { page } from '$app/stores';
  $: path = $page.url.pathname;
</script>

<header class="admin-header">
  <div class="container">
    <div class="brand">Hamsta</div>
    <nav class="nav">
      <a href="/admin" class:active={path === '/admin'}>Dashboard</a>
      <a href="/admin/posts" class:active={path.startsWith('/admin/posts')}>Posts</a>
      <a href="/admin/pages" class:active={path === '/admin/pages'}>Pages</a>
    </nav>

    <form method="POST" action="/admin/logout">
      <button class="logout">Logout</button>
    </form>
  </div>
</header>

<main class="admin-main">
  <div class="container">
    <slot />
  </div>
</main>

<style>
  .admin-header {
    background: #0f1724;
    color: white;
    padding: .75rem 0;
  }

  .container { max-width: 980px; margin: 0 auto; display: flex; align-items: center; gap: 1rem; padding: 0 1rem; }

  .brand { font-weight: 700; font-size: 1.1rem; }

  .nav { display: flex; gap: 1rem; margin-left: 1rem; }
  .nav a { color: rgba(255,255,255,.85); text-decoration: none; padding: .4rem .6rem; border-radius: 6px; }
  .nav a.active { background: rgba(255,255,255,.06); }

  .logout { margin-left: auto; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.08); padding: .4rem .6rem; border-radius: 6px; cursor: pointer; }

  .admin-main { padding: 2rem 0; background: #f7fafc; min-height: calc(100vh - 56px); }
  .admin-main .container { background: transparent; }

  @media (max-width: 640px) {
    .container { flex-wrap: wrap; }
    .nav { order: 3; width: 100%; }
    .logout { order: 2; }
  }
</style>
