<script lang="ts">
  import { page } from '$app/stores';
  $: id = $page.params.id;
</script>

<section>
  <h1>Post {id}</h1>
  <p>TBD DETAIL PAGE</p>
</section>

<style>
  h1 { margin-bottom: .5rem }
</style>
