export const post = async ({ request }) => {
    // https://api.numeiang.app/users/reset-password
    const res = await fetch('https://api.numeiang.app/users/reset-password', request);

    const json = await res.json();
    const result = JSON.stringify(json);

    return result
};