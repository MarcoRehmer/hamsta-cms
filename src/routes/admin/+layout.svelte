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

    <div class="user-area">
      <div class="avatar" title="User">
        <!-- anonymous person icon -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <form method="POST" action="/admin/logout">
        <button class="logout">Logout</button>
      </form>
    </div>
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

  .user-area { margin-left: auto; display: flex; align-items: center; gap: .6rem }
  .avatar { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,.06); display: inline-flex; align-items: center; justify-content: center }
  .logout { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.08); padding: .4rem .6rem; border-radius: 6px; cursor: pointer; }

  .admin-main { padding: 2rem 0; background: #f7fafc; min-height: calc(100vh - 56px); }
  .admin-main .container { background: transparent; }

  @media (max-width: 640px) {
    .container { flex-wrap: wrap; }
    .nav { order: 3; width: 100%; }
    .logout { order: 2; }
  }
</style>
