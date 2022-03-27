<script>
  import { page } from '$app/stores';

  let token = $page.params.token;
  let fields = { newPassword: '', confirmNewPassword: '' };
  let errors = { length: '', match: '' };
  let valid = false;
  let result = null;

  const resetPasswordHandler = async () => {
    const res = await fetch('https://api.numeiang.app/users/reset-password', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'appication/json',
      }),
      body: JSON.stringify({
        password: fields.confirmNewPassword,
      }),
      referrerPolicy: 'no-referrer',
      credentials: 'include' 
    });

    const json = await res.json();
    result = JSON.stringify(json);
  };

  const validatePassword = () => {
    if (fields.newPassword.length < 8 || fields.confirmNewPassword.length < 8)
      errors.length = 'Password must be at least 8 characters long';
    else errors.length = '';

    if (fields.newPassword !== fields.confirmNewPassword)
      errors.match = 'Password does not match';
    else errors.match = '';

    if (
      fields.newPassword.length >= 8 &&
      fields.confirmNewPassword.length >= 8 &&
      fields.newPassword === fields.confirmNewPassword
    )
      valid = true;
  };
</script>

<svelte:head>
  <title>Num Eiang | Reset Password</title>
</svelte:head>

<main>
  <form on:submit|preventDefault={resetPasswordHandler}>
    <h1>Reset password</h1>
    <div>
      <label for="newPassword">New password</label>
      <input
        type="password"
        name="newPassword"
        id="newPassword"
        bind:value={fields.newPassword}
        on:change={validatePassword}
        required
      />
    </div>
    <div>
      <label for="confirmNewPassword">Confirm new password</label>
      <input
        type="password"
        name="confirmNewPassword"
        id="confirmNewPassword"
        bind:value={fields.confirmNewPassword}
        on:change={validatePassword}
        required
      />
    </div>
    <div>
      {#if errors.length !== ''}
        <pre class="error">{errors.length}</pre>
      {/if}
      {#if errors.match !== ''}
        <pre class="error">{errors.match}</pre>
      {/if}
    </div>
    <button type="submit" on:click={resetPasswordHandler} disabled={!valid}>Submit</button>
  </form>

  <code lang="json">{result}</code>
</main>

<style>
</style>
