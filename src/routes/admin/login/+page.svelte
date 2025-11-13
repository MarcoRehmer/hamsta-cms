<script lang="ts">
	export let data: any;
</script>

<div class="page-wrap">
	<form method="POST" class="login-form">
		<h1>Admin Login</h1>

		{#if data?.form?.error}
			<p class="error">{data.form.error}</p>
		{/if}

		<label class="field">
			<span class="label">Email</span>
			<input name="email" type="email" required />
		</label>

		<label class="field">
			<span class="label">Password</span>
			<input name="password" type="password" required />
		</label>

		<button class="btn" type="submit">Log in</button>
	</form>
</div>

<style>
	.page-wrap {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.login-form {
		width: 100%;
		max-width: 420px;
		background: var(--background, #fff);
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 10px 30px rgba(12, 18, 30, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.login-form h1 {
		margin: 0 0 .5rem 0;
		font-size: 1.25rem;
		text-align: center;
	}

	.field { display: flex; flex-direction: column; gap: .25rem; }
	.label { font-size: .9rem; color: #333; }

	input[type="email"], input[type="password"] {
		padding: .6rem .75rem;
		border-radius: 6px;
		border: 1px solid #e6e9ef;
		background: #fbfcff;
		font-size: .95rem;
		outline: none;
	}

	input:focus { box-shadow: 0 0 0 3px rgba(41, 128, 255, .08); border-color: #2b7cff; }

	.btn {
		margin-top: .5rem;
		padding: .7rem .9rem;
		border-radius: 6px;
		background: linear-gradient(180deg,#2b7cff,#2563eb);
		color: white;
		border: none;
		font-weight: 600;
		cursor: pointer;
	}

	.btn:active { transform: translateY(1px); }

	.error {
		background: #fff5f5;
		color: #9b1c1c;
		padding: .5rem .75rem;
		border-radius: 6px;
		font-size: .95rem;
	}

	@media (max-width: 520px) {
		.login-form { padding: 1.25rem; }
	}
</style>