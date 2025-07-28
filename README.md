# Welcome to your Lovable project

## Project Info

**URL**: https://lovable.dev/projects/a8dbdf73-647b-405c-ad04-4b04bfc6c4ae

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a8dbdf73-647b-405c-ad04-4b04bfc6c4ae) and start prompting.

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

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Getting Started

To work locally:

1. Clone the repository:
    ```sh
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```
2. Install dependencies:
    ```sh
    npm i
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

## Editing Code

You can edit your code using:

- **Lovable**: Visit [Lovable Project](https://lovable.dev/projects/a8dbdf73-647b-405c-ad04-4b04bfc6c4ae) and prompt changes. Changes are committed automatically.
- **Your IDE**: Clone the repo, edit locally, and push changes.
- **GitHub**: Edit files directly in the GitHub UI.
- **GitHub Codespaces**: Launch a codespace for cloud-based editing.

## Deployment

To deploy, open [Lovable](https://lovable.dev/projects/a8dbdf73-647b-405c-ad04-4b04bfc6c4ae), click Share → Publish.

## Custom Domain

You can connect a custom domain:

1. Go to Project > Settings > Domains.
2. Click Connect Domain.

[Step-by-step guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Project Structure

```
public/
  favicon.ico
  placeholder.svg
  robots.txt
src/
  App.css
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
  components/
    Navigation.tsx
    ui/
  hooks/
    use-mobile.tsx
    use-toast.ts
    useAuth.tsx
    useCompanyInfo.tsx
  integrations/
    supabase/
  lib/
    utils.ts
  pages/
supabase/
  config.toml
  migrations/
```

## License

See [LICENSE](LICENSE) for details.
