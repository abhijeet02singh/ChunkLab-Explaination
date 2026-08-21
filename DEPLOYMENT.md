# Vercel Deployment Guide for ChunkLab

This guide will walk you through deploying ChunkLab to Vercel using your GitHub repository.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)
- Your GitHub repository: https://github.com/abhijeet02singh/ChunkLab-Explaination.git

## Step 1: Push Code to GitHub

First, ensure your code is pushed to your GitHub repository:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: add production-ready configuration and documentation"

# Add your remote repository
git remote add origin https://github.com/abhijeet02singh/ChunkLab-Explaination.git

# Push to GitHub (force if needed to overwrite existing)
git push -u origin main
# or if your branch is named differently:
git push -u origin master
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for first deployment)

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select your repository: `ChunkLab-Explaination`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vercel should auto-detect "Vite"
   - **Root Directory**: Leave as `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional)
   - Click "Environment Variables"
   - Add any needed variables:
     - `GEMINI_API_KEY` (if you have one)
     - `NODE_ENV` = `production`
   - Click "Add" for each variable

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at a URL like: `https://chunklab-explaination.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/chunklab
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS instructions provided by Vercel

## Step 4: Environment Variables in Production

If your app needs environment variables:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables:
   - `GEMINI_API_KEY` - Your Gemini API key (if using AI features)
   - `APP_URL` - Your deployed URL (e.g., `https://chunklab-explaination.vercel.app`)
4. Redeploy your project to apply changes

## Step 5: Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"
git push origin main
```

Vercel will automatically:
- Detect the push
- Build your project
- Deploy to a preview URL
- Update production if pushing to main branch

## Troubleshooting

### Build Fails

1. Check the build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify build command: `npm run build`
4. Check TypeScript errors: `npm run lint`

### 404 Errors

The `vercel.json` file includes rewrites to handle client-side routing. If you still see 404s:

1. Ensure `vercel.json` is in your repository root
2. Redeploy after adding the file

### Environment Variables Not Working

1. Ensure variables are set in Vercel Dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

## Vercel Configuration

Your project includes `vercel.json` with:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Rewrites**: SPA routing support
- **Security Headers**: XSS protection, frame options

## Post-Deployment Checklist

- [ ] Visit your deployed URL
- [ ] Test all chunking strategies
- [ ] Verify responsive design on mobile
- [ ] Check browser console for errors
- [ ] Test export functionality
- [ ] Verify environment variables if used
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## Monitoring

Vercel provides:
- Real-time logs
- Analytics
- Performance metrics
- Error tracking

Access these from your project dashboard in Vercel.

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Your Repository: [github.com/abhijeet02singh/ChunkLab-Explaination](https://github.com/abhijeet02singh/ChunkLab-Explaination)

## Quick Reference Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# View project info
vercel inspect
```

## Next Steps

After successful deployment:

1. Share your deployed URL with users
2. Monitor performance in Vercel Dashboard
3. Set up analytics if needed
4. Consider adding a custom domain for branding
5. Set up automated backups if needed
