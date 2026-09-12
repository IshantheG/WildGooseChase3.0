$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profile = "C:\Users\ishan\WildGooseChase3.0\chrome-profile"

& $chrome `
    --remote-debugging-port=9222 `
    --user-data-dir="$profile" `
    --start-maximized