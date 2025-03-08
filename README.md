# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0b193fdf-b7b1-4b5c-91f4-787cbce167f8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0b193fdf-b7b1-4b5c-91f4-787cbce167f8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0b193fdf-b7b1-4b5c-91f4-787cbce167f8) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## How to deploy to GitHub Pages

To deploy this project as a static site on GitHub Pages, follow these steps:

1. Ensure you have `gh-pages` installed as a dependency. If not, you can add it by running:
   ```sh
   npm install gh-pages --save-dev
   ```

2. Build the project by running:
   ```sh
   npm run build
   ```

3. Deploy the `dist` directory to GitHub Pages by running:
   ```sh
   npm run deploy
   ```

Your site should now be live on GitHub Pages.

## Detailed Steps for Deploying to GitHub Pages

1. **Configure and Build Your Project:**
   Ensure your `vite.config.ts` is set up with the correct base URL for GitHub Pages:

   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig(({ command }) => ({
     plugins: [react()],
     base: command === 'build' ? '/ai-empowered-visibility-61/' : '/',
   }));
   ```

   Then, build the project:

   ```bash
   npm run build
   ```

2. **Locate the Output Assets:**
   After building, open `dist/index.html` to find the references to the CSS and JavaScript assets. You will typically see something like this:

   ```html
   <link rel="stylesheet" href="/ai-empowered-visibility-61/assets/index-xxxxx.css">
   <script type="module" src="/ai-empowered-visibility-61/assets/index-xxxxx.js"></script>
   ```

3. **Inline the Assets:**
   - Open the referenced CSS file and copy its entire contents into a `<style>` tag in your HTML file.
   - Open the referenced JavaScript file and copy its entire contents into a `<script>` tag at the bottom of your HTML file.
   - Your flattened HTML file might look like this:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>AI Empowered Visibility</title>
       <!-- Inlined CSS -->
       <style>
         /* --- Begin Inlined CSS --- */
         body {
           margin: 0;
           font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
           background-color: #f9fafb;
         }
         .container {
           max-width: 1200px;
           margin: 0 auto;
           padding: 1rem;
         }
         /* ... more styles ... */
         /* --- End Inlined CSS --- */
       </style>
     </head>
     <body>
       <!-- Your root element for React -->
       <div id="root"></div>
       
       <!-- Inlined JavaScript -->
       <script>
         /* --- Begin Inlined JavaScript --- */
         // This JavaScript is the bundled output from Vite.
         (function(){
           "use strict";
           // Bundled modules and runtime initialization code here...
           // ReactDOM.createRoot(document.getElementById("root")).render(
           //   <React.StrictMode>
           //     <App />
           //   </React.StrictMode>
           // );
         })();
         /* --- End Inlined JavaScript --- */
       </script>
     </body>
   </html>
   ```

4. **Test Locally:**
   Open your new static HTML file in a browser to ensure it behaves as expected. All React functionality, including components and styles, should work as in your original Vite build.

5. **Deploy to GitHub Pages:**
   - Commit the flattened HTML file to your GitHub repository.
   - Ensure your repository is set to serve GitHub Pages from the correct branch (typically `gh-pages`) and folder (usually `root` or `docs`).

6. **Update Deployment Settings:**
   - Go to the repository settings on GitHub.
   - Under "Pages," set the source to the branch and folder where your flattened HTML file is located.

This will deploy your application as a static file on GitHub Pages.
