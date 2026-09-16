# 🦅 Complete Step-by-Step Guide: Connect Your Itachi Website to GitHub

Hello **Harshit**! This guide will take you step-by-step through uploading your **Itachi Uchiha Themed Developer Portfolio (`itachii0007`)** to GitHub, hosting it for **100% free with GitHub Pages**, and displaying it directly on your GitHub profile (`harshit-codes-07`).

---

## 📋 Table of Contents
1. [Information You Need Before Starting](#1-information-you-need-before-starting)
2. [Step 1: Create a New Repository on GitHub](#step-1-create-a-new-repository-on-github)
3. [Step 2: Initialize & Push Code to GitHub](#step-2-initialize--push-code-to-github)
4. [Step 3: Enable GitHub Pages (Make It Live on the Internet)](#step-3-enable-github-pages-make-it-live-on-the-internet)
5. [Step 4: Show Your Website on Your GitHub Profile](#step-4-show-your-website-on-your-github-profile)
6. [Step 5: Understanding Your Domain (`itachii0007`)](#step-5-understanding-your-domain-itachii0007)

---

## 1. Information You Need Before Starting

Here is everything required:
- **Your GitHub Account**: Logged into [github.com/harshit-codes-07](https://github.com/harshit-codes-07).
- **Desired Repository Name**: `itachii0007` (or `harshit-codes-07.github.io` if you want the root domain).
- **Local Project Location**: `C:\Users\harshit\.gemini\antigravity\scratch\itachii0007-portfolio`
- **Git Installed**: Git is already installed on your system!

---

## Step 1: Create a New Repository on GitHub

1. Open your browser and go to [https://github.com/new](https://github.com/new) (or click the **+** icon in the top right corner of GitHub and select **New repository**).
2. Fill in the repository details:
   - **Repository name**: `itachii0007`
   - **Description**: `Itachi Uchiha Developer Portfolio with Live Wallpaper & Shinobi Jutsu Console`
   - **Public / Private**: Select **Public** *(Required for free GitHub Pages)*.
   - **Initialize this repository with**: Leave **Initialize with a README, .gitignore, and license UNCHECKED** (we already created all files for you).
3. Click the green **Create repository** button.
4. Copy the repository URL:
   ```
   https://github.com/harshit-codes-07/itachii0007.git
   ```

---

## Step 2: Initialize & Push Code to GitHub

Open **PowerShell** or **Command Prompt** on your computer and run these commands one by one:

### 1. Go to your project directory:
```powershell
Set-Location "C:\Users\harshit\.gemini\antigravity\scratch\itachii0007-portfolio"
```

### 2. Initialize Git and stage your files:
*(Note: If the command `git` is recognized, use `git`. Otherwise use the full path to git on your PC: `& "C:\Users\harshit\AppData\Local\github-copilot-git-2.53.0-3\cmd\git.exe"`)*

```powershell
git init
git add .
git commit -m "feat: awaken itachi portfolio with live wallpaper and jutsu terminal"
```

### 3. Rename branch to `main`:
```powershell
git branch -M main
```

### 4. Link your local project to your GitHub repository:
```powershell
git remote add origin https://github.com/harshit-codes-07/itachii0007.git
```

### 5. Push the code:
```powershell
git push -u origin main
```
> **Note**: If prompted to log in, choose **Sign in with your browser** or enter your GitHub Personal Access Token.

---

## Step 3: Enable GitHub Pages (Make It Live on the Internet)

Once your code is pushed to GitHub:

1. Open your repository in your browser:  
   `https://github.com/harshit-codes-07/itachii0007`
2. Click on the **Settings** tab (the gear icon with "Settings" along the top bar of the repository).
3. In the left sidebar, scroll down and click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` from the dropdown, and leave the folder as `/(root)`
   - Click **Save**.
5. Wait **60 to 90 seconds**. Refresh the page. You will see a green banner:  
   > *"Your site is live at `https://harshit-codes-07.github.io/itachii0007/`"*

🎉 **Your website is now LIVE on the World Wide Web!**

---

## Step 4: Show Your Website on Your GitHub Profile

You can showcase your website in two prominent spots on your GitHub profile:

### Spot A: In Your Profile Bio Card (Website Link)
1. Go to your profile page: [https://github.com/harshit-codes-07](https://github.com/harshit-codes-07)
2. Click the **Edit profile** button below your avatar on the left side.
3. In the **Website** field, paste your new live site URL:
   ```
   https://harshit-codes-07.github.io/itachii0007/
   ```
4. Click **Save**. Now anyone who views your profile sees a clickable globe icon leading to your website!

---

### Spot B: Inside Your Profile `README.md` (Under "Hi there 👋")
You already have a custom profile README repository (`harshit-codes-07/harshit-codes-07`). Let's add a glowing Itachi website badge and live link right into it:

1. Go to [https://github.com/harshit-codes-07/harshit-codes-07](https://github.com/harshit-codes-07/harshit-codes-07)
2. Click on the pencil icon (✏️ **Edit this file**) on the top right of `README.md`.
3. Add this snippet right under your `PROFILE VIEWS` badge:

```markdown
<!-- ITACHI PORTFOLIO BADGE -->
<p align="left">
  <a href="https://harshit-codes-07.github.io/itachii0007/">
    <img src="https://img.shields.io/badge/🌐_LIVE_WEBSITE-ITACHII0007-e60026?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Portfolio">
  </a>
  <a href="https://harshit-codes-07.github.io/itachii0007/">
    <img src="https://img.shields.io/badge/👁️_SHARINGAN_THEME-ACTIVE-111117?style=for-the-badge&logo=firefoxbrowser&logoColor=ff1744" alt="Sharingan Theme">
  </a>
</p>

> 🦅 **Explore my Shinobi Portfolio & Live Wallpaper at [itachii0007](https://harshit-codes-07.github.io/itachii0007/)**
```

4. Scroll to the bottom, write `feat: add itachii0007 portfolio link`, and click **Commit changes**.
5. Visit your main profile page ([github.com/harshit-codes-07](https://github.com/harshit-codes-07))—your profile now proudly showcases your website badge!

---

## Step 5: Understanding Your Domain (`itachii0007`)

You mentioned your domain will be **`itachii0007`**. Here are the two ways to use it:

### Option 1: Free GitHub Pages Subdomain (Recommended & Free Forever)
- Repository Name: `itachii0007`
- URL: `https://harshit-codes-07.github.io/itachii0007/`
- No costs, zero configuration, SSL certificate (HTTPS) is 100% free and automatic.

### Option 2: Custom Domain (e.g. `itachii0007.com` or `itachii0007.tech`)
If you buy or own a custom domain from Namecheap, GoDaddy, or Cloudflare:
1. In your repository on GitHub, go to **Settings** -> **Pages**.
2. Under **Custom domain**, type your domain name (e.g. `itachii0007.com`) and click **Save**.
3. In your domain registrar DNS settings:
   - Add a `CNAME` record pointing to `harshit-codes-07.github.io`.
4. Check the box for **Enforce HTTPS**.
5. Done! Your website will now open directly at `https://itachii0007.com`!
