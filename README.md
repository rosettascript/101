# RosettaScript Studio

## Project info

RosettaScript Studio provides powerful developer tools to convert, automate, and build. From Word to HTML converters to database visualization—we've got you covered.

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

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

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Setup Steps:**

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push to trigger deployment:**
   - Push your code to the `main` or `master` branch
   - The GitHub Actions workflow will automatically build and deploy your site
   - Your site will be available at: `https://<username>.github.io/<repository-name>/`

3. **For custom domain or root domain:**
   - If deploying to `username.github.io` (user/organization page), update the `GITHUB_PAGES_BASE` in `.github/workflows/deploy.yml` to `/` instead of `/${{ github.event.repository.name }}/`

**Manual deployment:**
```sh
npm run deploy
```

The workflow will automatically run on every push to the main branch, or you can trigger it manually from the Actions tab.
