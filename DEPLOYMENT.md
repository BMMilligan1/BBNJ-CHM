# Deployment Guide

## GitHub Pages Setup

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Initial Setup (One-time)

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Click Save

2. **Verify Workflow Permissions**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions", ensure "Read and write permissions" is selected
   - Enable "Allow GitHub Actions to create and approve pull requests" if needed

### Automatic Deployment

Once configured, deployment happens automatically:
- Every push to the `main` branch triggers the workflow
- The site builds and deploys in approximately 2-3 minutes
- Access your site at: `https://[username].github.io/BBNJ-CHM/`

### Manual Triggering

To manually trigger deployment:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Local Testing

Before deploying, test locally:

```bash
# Build the site
npm run build

# Preview the built site
npx serve dist
```

## Troubleshooting

If deployment fails:

1. **Check workflow status**: Actions tab → Latest workflow run
2. **Verify permissions**: Settings → Actions → General
3. **Check Pages settings**: Settings → Pages → Source should be "GitHub Actions"
4. **Review build logs**: Click on failed workflow for detailed error messages

## PDF Generation

PDFs are not automatically generated during deployment. To include updated PDFs:

```bash
# Generate PDFs locally
npm run pdf:build

# Commit the updated PDF
git add src/BBNJ-CHM.pdf
git commit -m "Update PDF"
git push
```