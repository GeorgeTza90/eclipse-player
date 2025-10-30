const onGoogleLogin = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (response) => {
            try {
                console.log('Google response:', response); // response.credential = idToken                    
                const data = await googleLogin(response.credential, "web");
                login(data.user, data.token);
            } catch (err) {
                console.error("Google login failed:", err);
                alert(err.message || "Google login failed");
            }
        },
    });

    client.requestAccessToken({ prompt: 'select_account' });
};