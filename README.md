# ChatPocket

ChatPocket is a lightweight Windows and Android companion for using the official ChatGPT website and keeping a separate local conversation archive.

## ChatGPT experience

- **Windows:** Open ChatGPT in a dedicated app window, sign in to your own account, and use the official website's real interface, account history, and available subscription features.
- **Android:** Open ChatGPT in a browser tab from the app. This does not require Google Play Services, but it does require a compatible browser.
- ChatPocket does not ask for your ChatGPT password or copy private session tokens.

The ChatGPT window/tab uses the official website. Your account history appears there when you sign in. ChatPocket's separate local archive does **not** automatically import or mirror that history. There is no official supported ChatGPT account-history sync API implemented in this project yet.

## Local archive features

- Save, edit, rename, search, and delete conversation text or notes locally.
- Export an item as Markdown, TXT, or HTML; print/save as PDF through the print dialog.
- Import TXT, Markdown, HTML, or a ChatPocket JSON backup.
- Export the complete archive as JSON.
- Dark and light appearance.
- Local-first storage with no ChatPocket server.

## Downloads

Open the repository's **Actions** tab and select the latest successful **Build ChatPocket** run. Download:
- `ChatPocket-Windows-x64` for the Windows installer.
- `ChatPocket-Android-APK` for Android.

The Android artifact is currently a debug APK and may show an Android install warning. The first Windows build targets x64 Windows.

## Local development

Requires Node.js 22 or newer.

    npm install
    npm run web

Windows installer:

    npm run dist:win

Android requires Android SDK tooling and a compatible JDK:

    npm run build
    npx cap add android
    npx cap sync android
    cd android
    ./gradlew assembleDebug

## Privacy notes

The official ChatGPT site handles its own sign-in and account history. ChatPocket's archive text is stored in localStorage inside the app's web view and is not uploaded to a ChatPocket server. LocalStorage is not encrypted storage. Anyone with access to your unlocked device account may be able to access the archive. Export backups are plain files, so keep them private and back up important entries before clearing app data or uninstalling.
