<script>
  import { page } from '$app/stores';
  import '../../app.css';

  import Modal from './Modal.svelte';

  let showModal = false;

  let fields = { newPassword: '', confirmNewPassword: '' };
  let errors = { length: '', match: '' };
  let valid = false;

  const resetPasswordHandler = async () => {
    const token = $page.params.token;

    const res = await fetch('https://api.numeiang.app/users/reset-password/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'appication/json',
      }),
      body: JSON.stringify({
        password: fields.confirmNewPassword,
      }),
      referrerPolicy: 'no-referrer',
      credentials: 'include' 
    });

    // const json = await res.json();
    // result = JSON.stringify(json);

    showModal = true;
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
  <form on:submit|preventDefault={resetPasswordHandler} class="flex flex-col w-96 mx-auto gap-4">
    <h1 class="text-center text-4xl font-bold mt-5">Reset password</h1>
    <div class="flex flex-col">
      <label for="newPassword">New password</label>
      <input
        type="password"
        name="newPassword"
        id="newPassword"
        bind:value={fields.newPassword}
        on:change={validatePassword}
        required
        class="form-input rounded"
      />
    </div>
    <div class="flex flex-col">
      <label for="confirmNewPassword">Confirm new password</label>
      <input
        type="password"
        name="confirmNewPassword"
        id="confirmNewPassword"
        bind:value={fields.confirmNewPassword}
        on:change={validatePassword}
        required
        class="form-input rounded"
      />
    </div>
    <div>
      {#if errors.length !== ''}
        <pre class="error text-red-600">{errors.length}</pre>
      {/if}
      {#if errors.match !== ''}
        <pre class="error text-red-600">{errors.match}</pre>
      {/if}
    </div>
    <button 
      type="submit" 
      disabled={!valid} 
      class="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  </form>

  <Modal bind:showModal>
    <h1 slot="header" class="text-2xl font-bold mb-2 text-center ">Success</h1>
  </Modal>
</main>

<style>
</style>
