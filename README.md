# ChatPocket

A lightweight, local-first conversation archive for Windows and Android.

## Current MVP
- Save conversation text and notes locally on the device.
- Search saved titles and conversation contents.
- Rename, edit, and delete saved items.
- Export an item as Markdown, TXT, or HTML; print/save as PDF through the print dialog.
- Import TXT, Markdown, HTML, or a ChatPocket JSON backup.
- Export the complete archive as JSON.
- Dark and light appearance.
- Windows installer and Android APK built by GitHub Actions.

## Important limitations
ChatPocket is an independent companion/archive tool, not an official OpenAI client. It does not automatically sync with your ChatGPT account or scrape private session data. Use Open ChatGPT to sign in at the official website, then paste conversations here or import files you exported. Archive content stays in this app's local storage unless you export it. Clearing app data or uninstalling may erase local entries, so export backups regularly.

The first Android build is a debug APK. It does not require Google Play Services. The first Windows build targets x64 Windows.

## Build downloads
Open the repository's Actions tab and select the latest successful Build ChatPocket run. Download the ChatPocket-Windows-x64 artifact for the Windows installer or ChatPocket-Android-APK for Android.

## Local development
Requires Node.js 22 or newer.

    npm install
    npm run web

Windows installer:

    npm run dist:win

Android requires Android Studio/SDK and a compatible JDK:

    npm run build
    npx cap add android
    npx cap sync android
    cd android
    ./gradlew assembleDebug

## Privacy
Archive text is stored in localStorage inside the app's web view. It is not uploaded to a ChatPocket server. This is convenient for a first version, but localStorage is not encrypted storage. Anyone with access to the unlocked device account may be able to access app data. Export backups are plain files and should be kept private.