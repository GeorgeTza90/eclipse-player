use tauri::{AppHandle, Emitter};
use tauri_plugin_oauth::start;
use tauri_plugin_opener::OpenerExt;

const GOOGLE_CLIENT_ID: &str = "819729741703-d1lorkik1vt0sfl05p281ostt68bgceo.apps.googleusercontent.com";

#[tauri::command]
async fn start_google_login(app: AppHandle) -> Result<(), String> {
    let app_handle = app.clone();
    
    let port = start(move |url| {
        let _ = app_handle.emit("oauth-callback", url);
    })
    .map_err(|err| err.to_string())?;

    let redirect_uri = format!("http://localhost:{}", port);
    let scope = "openid email profile";

    let auth_url = format!(
        "https://accounts.google.com/o/oauth2/v2/auth?client_id={}&redirect_uri={}&response_type=code&scope={}&access_type=offline&prompt=select_account",
        GOOGLE_CLIENT_ID, redirect_uri, scope
    );

    app.opener()
        .open_url(auth_url, None::<&str>)
        .map_err(|err| err.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_oauth::init())
        .invoke_handler(tauri::generate_handler![start_google_login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}