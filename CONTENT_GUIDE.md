# Portfolio Content Guide

This guide helps you quickly locate and update content throughout your portfolio. All content is organized in clearly marked sections at the top of each file.

## 📋 Content Checklist

Use this checklist to track what content you've filled in:

### Public Pages
- [ ] **Projects** - Add your real project information
- [ ] **About Page** - Fill in all sections
  - [ ] Professional links (GitHub, LinkedIn, etc.)
  - [ ] Bio/Background (currently has placeholder)
  - [ ] Skills & Technologies
  - [ ] What you're looking for

### Password-Protected Areas
- [ ] **Employer Area** - Professional content for recruiters
  - [ ] Add CV file to `/public/cv/`
  - [ ] Update CV download path
  - [ ] Professional summary
  - [ ] Key highlights/achievements
  - [ ] Contact information
- [ ] **Personal Area** - Blog posts for friends and family
  - [ ] Welcome message
  - [ ] Add blog posts

---

## 🗂️ Quick Reference: Where to Find Content

### 1. Projects Page
**File:** [`app/projects/page.tsx`](app/projects/page.tsx)

**What to update:**
- `PROJECTS` array (line ~67) - Add your projects

**What's included:**
- TypeScript interface defining project structure
- Three example projects as templates
- Instructions for adding new projects
- Optional technology tags

**How to add a project:**
```typescript
{
  title: "Your Project Name",
  description: "Brief description (1-2 sentences) including tech stack and your role",
  status: "Completed", // or "In progress", "Maintained", "Archived"
  href: "https://github.com/yourusername/repo", // or "#" for no link
  technologies: ["React", "TypeScript", "Node.js"], // Optional
}
```

---

### 2. About Page
**File:** [`app/about/page.tsx`](app/about/page.tsx)

**What to update:**
- `PROFESSIONAL_LINKS` (line ~31) - GitHub, LinkedIn, email, etc.
- `BIO_PARAGRAPHS` (line ~50) - Your personal story and background
- `SKILLS` (line ~83) - Technical skills organized by category
- `LOOKING_FOR` (line ~124) - Career goals and preferences

**Tips:**
- **Bio:** 2-4 paragraphs, 300-500 words total
- **Skills:** Organize by Languages, Frameworks, Tools, Concepts
- **Links:** Uncomment the examples and fill in your URLs

**Current status:**
- ✅ Bio has some content (but marked as placeholder structure)
- ❌ Skills section is empty
- ❌ Professional links are empty
- ❌ "What I'm looking for" section is placeholder

---

### 3. Employer Area (Password-Protected)
**File:** [`components/EmployerContent.tsx`](components/EmployerContent.tsx)

**What to update:**

#### CV Download Setup (line ~23)
```typescript
const CV_DOWNLOAD_PATH = "#"; // TODO: Update this
```

**Steps to add CV:**
1. Create folder: `/public/cv/`
2. Add your CV: `/public/cv/firstname-lastname-cv.pdf`
3. Update path: `"/cv/firstname-lastname-cv.pdf"`

**Alternative:** Use external link (Google Drive, personal website)

#### Professional Summary (line ~44)
```typescript
const PROFESSIONAL_SUMMARY = [
  "Your professional summary paragraph 1...",
  "Optional paragraph 2...",
];
```

**Guidelines:**
- 3-5 sentences or 100-150 words
- Include: years of experience, key skills, achievements
- Tone: Professional but personable

#### Key Highlights (line ~65)
```typescript
const KEY_HIGHLIGHTS = [
  "Achievement 1 with measurable impact",
  "Achievement 2 showing technical expertise",
  "Achievement 3 demonstrating leadership",
];
```

**Focus on:**
- Measurable results (percentages, metrics)
- Technical achievements
- Leadership or collaboration examples

#### Contact Information (line ~74)
```typescript
const CONTACT_INFO = {
  email: "your.email@example.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  phone: "+1 (555) 123-4567", // Optional
};
```

---

### 4. Personal Area (Password-Protected)
**File:** [`components/PersonalContent.tsx`](components/PersonalContent.tsx)

**What to update:**

#### Welcome Message (line ~93)
```typescript
const WELCOME_MESSAGE = "Your personal welcome message...";
```

#### Blog Posts (line ~67)
```typescript
const BLOG_POSTS: BlogPost[] = [
  {
    title: "Your Post Title",
    date: "February 11, 2025", // or "2025-02-11"
    content: "Your post content...\n\nUse \\n\\n for paragraph breaks.",
    tags: ["reflection", "learning"], // Optional
  },
];
```

**Content ideas:**
- Personal reflections and life updates
- Learning experiences and insights
- Travel stories or adventures
- Book/movie/music recommendations
- Technical deep-dives
- Creative writing

**Formatting tips:**
- Use `\n\n` to separate paragraphs
- Add tags to organize posts by theme
- Newest posts first in the array

---

## 🎨 Content Writing Tips

### General Guidelines
1. **Be Authentic** - Let your personality show
2. **Be Specific** - Use concrete examples and metrics
3. **Be Concise** - Respect readers' time
4. **Be Current** - Update regularly as you grow

### For Project Descriptions
- ✅ "Built a real-time dashboard using React and Firebase that increased engagement by 40%"
- ❌ "Made a dashboard with some technologies"

### For Professional Summary
- ✅ "Full-stack developer with 3+ years building scalable web applications using React and Node.js"
- ❌ "Developer who knows many programming languages"

### For Skills Section
- ✅ List: "React with TypeScript", "Node.js & Express", "PostgreSQL"
- ❌ Generic: "Frontend", "Backend", "Databases"

---

## 🔍 Finding Content Sections in Code

All content sections are marked with clear comment banners:

```typescript
// ============================================================================
// CONTENT: Section Name
// ============================================================================
```

Look for these banners at the top of each file. All editable content is grouped there, separated from the UI rendering code.

---

## ⚡ Quick Start Workflow

**To fill in all placeholder content:**

1. **Projects** (10-15 min)
   - Open: `app/projects/page.tsx`
   - Replace 3 example projects with your real projects
   - Add links to GitHub repos or live demos

2. **About Page** (20-30 min)
   - Open: `app/about/page.tsx`
   - Fill in professional links
   - Update bio if needed
   - Add skills organized by category
   - Write "what you're looking for" section

3. **Employer Area** (30-45 min)
   - Open: `components/EmployerContent.tsx`
   - Add CV file to `/public/cv/`
   - Write professional summary (3-5 sentences)
   - List 3-5 key achievements with metrics
   - Add contact information

4. **Personal Area** (15+ min)
   - Open: `components/PersonalContent.tsx`
   - Customize welcome message
   - Write your first blog post (or several)

**Total time estimate:** 1.5 - 2 hours to complete all content

---

## 🐛 Troubleshooting

### "CV not yet available" button shows
- Make sure you've created `/public/cv/` folder
- Add your CV PDF to that folder
- Update `CV_DOWNLOAD_PATH` in `components/EmployerContent.tsx`
- Path should be: `"/cv/your-cv-filename.pdf"`

### Project links not working
- Ensure `href` is not set to `"#"`
- Use full URLs: `"https://github.com/username/repo"`
- For external links, make sure they're publicly accessible

### Skills section shows placeholder text
- Open `app/about/page.tsx`
- Find the `SKILLS` object (around line 83)
- Add your skills to the appropriate arrays
- Uncomment the example items and replace with your skills

### Blog posts not showing
- Open `components/PersonalContent.tsx`
- Make sure `BLOG_POSTS` array is not empty
- Each post needs `title`, `date`, and `content` fields
- Uncomment the example posts and replace with your content

---

## 📝 Maintenance

### When to Update
- **Projects:** Add new projects as you complete them
- **About:** Update skills as you learn new technologies
- **CV:** Upload new version when you update your resume
- **Blog:** Add posts whenever you want to share something personal

### Version Control
Remember to commit your content updates:
```bash
git add .
git commit -m "Update portfolio content: projects and about page"
```

---

## 🔗 Related Files

- **Styling:** `app/globals.css` - Global styles and color scheme
- **Layout:** `app/layout.tsx` - Site-wide layout and navigation
- **Authentication:** `lib/auth.ts` - Password protection logic
- **Environment:** `.env.example` - Example environment variables

---

## 💡 Need Help?

If you need to make changes beyond updating content (e.g., adding new pages, changing design, modifying authentication), you may need to edit the component structure and JSX, not just the CONTENT sections.

For structural changes, consider:
- Reviewing Next.js documentation
- Understanding React component architecture
- Checking Tailwind CSS classes for styling
- Testing changes locally before deploying

---

**Last updated:** Created with initial structure - update this date when you make significant changes to the guide.
