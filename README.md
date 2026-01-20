# PDF Margin Tool

A web-based application for adding annotation space to PDF documents for MLR/Regulatory submissions. Built with React and deployed on GitHub Pages.

![PDF Margin Tool](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/react-18.2.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

The PDF Margin Tool automates the process of adding right-side white space to PDF screenshots, creating room for account team annotations during the MLR review process. This tool eliminates manual resizing work and ensures consistent margins across all submission materials.

**Key Features:**
- ✅ Client-side processing - files never leave your browser
- ✅ Drag-and-drop file upload
- ✅ Multiple margin options (TPP/SPP default, custom pixels, custom percentage)
- ✅ Real-time progress tracking
- ✅ Multi-page PDF support
- ✅ No installation required - runs in any modern browser
- ✅ Mobile and tablet compatible

**Live Demo:** [https://YOUR-USERNAME.github.io/pdf-margin-tool](https://YOUR-USERNAME.github.io/pdf-margin-tool)

---

## 📋 Table of Contents

- [For End Users](#for-end-users)
  - [How to Use](#how-to-use)
  - [Margin Settings Guide](#margin-settings-guide)
  - [FAQ](#faq)
- [For Developers](#for-developers)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
  - [Deployment](#deployment)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## For End Users

### How to Use

#### Step 1: Upload Your PDF
- **Option A:** Drag and drop your PDF file into the upload area
- **Option B:** Click the upload area to browse and select your file

#### Step 2: Choose Margin Settings

**TPP/SPP Default (30%)** - *Recommended*
- Automatically adds 30% margin to the right side
- Follows standard TPP/SPP submission guidelines (70/30 layout)
- Best for standard regulatory submissions

**Custom Pixels**
- Enter a specific pixel width (e.g., `375`)
- Use when you have exact dimension requirements
- Common values: 300-500px

**Custom Percentage**
- Enter a percentage of the page width (e.g., `25`)
- Useful for maintaining proportional margins across different page sizes
- Valid range: 0-100%

#### Step 3: Process
1. Click **"Process PDF"**
2. Wait for processing to complete (typically 5-30 seconds depending on file size)
3. Your file will automatically download with "_annotated" added to the filename

#### Step 4: Review & Submit
- Open the downloaded PDF to verify margins
- Upload to SharePoint or your submission folder
- Submit for MLR review

---

### Margin Settings Guide

| Use Case | Recommended Setting | Result |
|----------|-------------------|--------|
| Standard TPP/SPP Desktop (1440px) | TPP/SPP Default (30%) | ~432px margin |
| Mobile Screenshots (390px) | TPP/SPP Default (30%) | ~117px margin |
| Client-Specific Requirements | Custom Pixels | Exact width specified |
| Proportional Across Sizes | Custom Percentage | Consistent ratio |

---

### FAQ

**Q: Is my file uploaded to a server?**  
A: No! All processing happens in your browser. Your files never leave your computer.

**Q: What file size can I process?**  
A: The tool can handle files up to 500MB+, limited only by your browser's memory.

**Q: Can I process multiple PDFs at once?**  
A: Currently, process one file at a time. Batch processing may be added in future versions.

**Q: Does this work on mobile devices?**  
A: Yes! The tool works on iPads, tablets, and smartphones with modern browsers.

**Q: What browsers are supported?**  
A: Chrome, Firefox, Safari, and Edge (latest versions recommended).

**Q: Can I undo the margin addition?**  
A: No, but your original file is never modified. Simply reprocess the original with different settings.

**Q: Why is my file taking a long time to process?**  
A: Large multi-page PDFs (50+ pages) may take 30-60 seconds. Be patient and don't close the browser.

---

## For Developers

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** - For deployment

Check your versions:
```bash
node --version
npm --version
git --version

---

## Installation

### Option 1: Clone This Repository

Before you begin# Clone the repository
git clone https://github.com/YOUR-USERNAME/pdf-margin-tool.git

# Navigate to project directory
cd pdf-margin-tool

# Install dependencies
npm install

# Start development server
npm start

### Option 2: Create From Scratch

# Create new React app
npx create-react-app pdf-margin-tool
cd pdf-margin-tool

# Install dependencies
npm install pdf-lib

# Install deployment tools
npm install --save-dev gh-pages

# Copy source files from this repository
# (App.js, App.css, index.js, and all components)

# Start development server
npm start

---

## Local Development

### Start the development server:

npm start

Opens http://localhost:3000 in your browser
Hot-reload enabled - changes appear automatically
Console shows errors and warnings

### Run tests:

npm test

### Build for production:

npm run build
Creates optimized production build in build/ folder
Minifies and optimizes all assets

---
## Deployment

### Deploy to GitHub Pages

#### 1. Update package.json:

json
Copy code
{
  "homepage": "https://YOUR-GITHUB-USERNAME.github.io/pdf-margin-tool"
}
#### 2. Create GitHub repository:

bash
Copy code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pdf-margin-tool.git
git push -u origin main

#### 3. Deploy:

bash
Copy code
npm run deploy

#### 4. Enable GitHub Pages:

Go to repository Settings → Pages
Source should be set to gh-pages branch
Your app will be live at: https://YOUR-USERNAME.github.io/pdf-margin-tool
#### 5. Update deployment:

bash
Copy code
# After making changes
git add .
git commit -m "Description of changes"
git push origin main
npm run deploy

## Project Structure
pdf-margin-tool/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # (Optional) Custom favicon
├── src/
│   ├── components/
│   │   ├── Header.js       # App header component
│   │   ├── FileUpload.js   # File upload & drag-drop
│   │   ├── MarginSettings.js   # Margin configuration
│   │   ├── ProcessButton.js    # Process action button
│   │   ├── ProgressBar.js      # Processing progress
│   │   ├── InfoSection.js      # Help information
│   │   ├── SuccessModal.js     # Success dialog
│   │   └── Footer.js           # App footer
│   ├── App.js              # Main application logic
│   ├── App.css             # Global styles
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── .gitignore              # Git ignore rules

---

### Technologies Used
Technology	Purpose	Version
React	UI framework	18.2.0
pdf-lib	PDF manipulation	1.17.1
gh-pages	GitHub Pages deployment	6.1.0
CSS3	Styling and animations	-

#### Why pdf-lib?

Zero dependencies
Works entirely in browser (no server needed)
Supports all PDF operations needed
Small bundle size (~500KB)
Active maintenance and community

---

## License
MIT License

Copyright (c) 2024 Relevate Health

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Support
### For End Users
Need help using the tool?

Review the How to Use section
Check the FAQ
Contact your UX team lead

### Found a bug?
Open an issue on GitHub
Include screenshots and error messages
Describe what you were trying to do

## For Developers
### Technical questions?

Open a discussion on GitHub
Tag with appropriate labels
Check existing issues first

###Contact Information:

Project Lead: [Your Name]
Email: [buddy.harris@relevatehealth.com]

## Analytics & Usage
Privacy Notice: This tool processes files entirely in your browser. No analytics, tracking, or data collection is performed. Your files and usage remain completely private.

If you'd like to add optional anonymous usage analytics for improvement purposes, contact the AI COE team.

## Version History

### v1.0.0 (Current)
- Initial release
- Core PDF margin addition functionality
- TPP/SPP default (30%) margin option
- Custom pixel and percentage options
- Drag-and-drop file upload
- Real-time progress tracking
- Success modal with processing details
- Mobile responsive design

Built with ❤️ by the Relevate Health UX & Studio Design Team

Part of the AI Center of Excellence Initiative