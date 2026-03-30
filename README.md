# EduMap V2 - Professional Career Guidance Platform

## 🎨 What's New in V2

### Complete Redesign
- **Fresh Light Theme**: Warm, friendly aesthetic with light colors (avoiding AI-generated look)
- **Professional Typography**: Playfair Display + DM Sans for a distinctive, editorial feel
- **Custom Illustrations**: Hand-crafted SVG illustrations for each user category
- **Enhanced UX**: Smooth animations, better spacing, improved readability

### Google Authentication
- **Secure Login**: Sign in with your Google account
- **Progress Tracking**: Save your career exploration journey
- **Personalized Experience**: Customized recommendations based on your profile

### Expanded Content
- **40+ Detailed Career Paths**: Across technology, business, medical, creative, and government sectors
- **Enhanced Roadmaps**: Multi-phase roadmaps with milestones, projects, and resources
- **More Options**: Expanded subject interests, career goals, and specializations
- **Company Lists**: Top hiring companies for each career path
- **Realistic Timelines**: Duration for each phase of the journey

### Better Features
- **Complex Roadmaps**: Detailed phase-by-phase guidance with:
  - Key milestones to achieve
  - Projects to build
  - Learning resources
  - Estimated duration
- **Smart Notifications**: In-app notifications for user actions
- **Improved Form Validation**: Better error handling and user guidance
- **Mobile Responsive**: Optimized for all screen sizes

## 🚀 Quick Start Guide

### Setting Up Google Authentication (Optional but Recommended)

1. **Get Google Client ID**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Google+ API"
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add authorized JavaScript origins: `http://localhost:8000` (for local testing)
   - Copy the Client ID

2. **Update the Code**:
   - Open `js/script.js`
   - Find `const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';`
   - Replace with your actual Client ID

3. **Run Local Server** (Required for Google Auth):
   ```bash
   # Navigate to EDUMAP_V2 folder
   python -m http.server 8000
   
   # Then open in browser:
   http://localhost:8000
   ```

### Without Google Auth (Works Immediately)

1. Extract the ZIP file
2. Open `index.html` in any browser (Firefox recommended)
3. Start exploring career paths!

Note: Google sign-in button will show but won't work without proper Client ID setup.

## 📁 Project Structure

```
EDUMAP_V2/
│
├── index.html              # Home page with 3 categories
├── school.html             # School student questionnaire (14 subjects!)
├── college.html            # College student form (expanded options)
├── graduate.html           # Graduate career planning (30+ goals)
├── roadmap.html            # Enhanced results page
│
├── css/
│   └── style.css           # Complete styling (warm light theme)
│
├── js/
│   └── script.js           # Enhanced logic with Google Auth
│
├── images/
│   ├── school-student.svg  # Custom illustration
│   ├── college-student.svg # Custom illustration
│   └── graduate.svg        # Custom illustration
│
├── data/
│   └── careers.json        # 40+ careers with detailed roadmaps
│
└── README.md               # This file
```

## 🎯 Key Features

### For School Students
- **14 Subject Options**: From Math to Psychology
- **12 Career Types**: Technology to Civil Services
- **8 Strength Categories**: Find your unique advantage
- **Stream Recommendations**: MPC, BiPC, Commerce, Arts
- **Multiple Career Paths**: See all options in your stream

### For College Students
- **6 Degree Types**: B.Tech, B.Sc, BBA, BA, BCA, B.Des
- **Multiple Branches**: 20+ specializations
- **Comprehensive Interests**: 25+ career interests
- **Year-wise Guidance**: Tailored to your current year
- **7 Goal Categories**: From jobs to entrepreneurship

### For Graduates
- **8 Degree Categories**: All major graduation degrees
- **10 Skill Assessments**: Current skills evaluation
- **30+ Career Goals**: Specific job roles and paths
- **Experience-based**: Customized for freshers to 3+ years
- **Timeline Options**: 3 months to 2 years plans

## 🗺️ Enhanced Roadmap Features

Each career roadmap now includes:

### Phase-wise Breakdown
- **Foundation Phase**: Building basics
- **Skill Development**: Core competencies
- **Specialization**: Advanced topics
- **Career Launch**: Job preparation

### For Each Phase
- **Duration**: Realistic time estimates
- **Key Milestones**: What to achieve
- **Projects to Build**: Hands-on practice
- **Learning Resources**: Where to learn
- **Clear Goals**: Specific outcomes

### Additional Information
- **Required Skills**: Complete skill list
- **Recommended Courses**: Top courses and certifications
- **Tools & Technologies**: Software to master
- **Top Companies**: Who's hiring
- **Salary Ranges**: Realistic expectations (India-focused)

## 🎨 Design Philosophy

### Color Palette
- **Primary Background**: Warm cream (#FBF8F3)
- **Accent Primary**: Terracotta (#D97757)
- **Accent Secondary**: Peach (#E8A87C)
- **Accent Green**: Sage (#7FA99B)
- **Accent Blue**: Sky (#6B9AC4)

### Typography
- **Headings**: Playfair Display (Elegant serif)
- **Body**: DM Sans (Modern sans-serif)
- **Combination**: Editorial magazine feel

### Principles
- **Warm & Welcoming**: Friendly, approachable design
- **Professional**: Credible and trustworthy
- **Distinctive**: Unique, not generic AI-style
- **Accessible**: Easy to read and navigate

## 💡 Usage Tips

### Best Practices
1. **Be Honest**: Select what genuinely interests you
2. **Multiple Attempts**: Try different combinations
3. **Save Your Results**: Use print/PDF feature
4. **Explore Options**: Check alternative career paths
5. **Sign In**: Use Google auth to save progress

### Browser Recommendations
- ✅ **Firefox**: Best for local files
- ✅ **Chrome**: Works with local server
- ✅ **Safari**: Generally works well
- ✅ **Edge**: Similar to Chrome

### For Students
- **School**: Focus on interests, not just marks
- **College**: Consider internship opportunities
- **Graduate**: Be realistic about timeline

## 📊 Career Database

### Statistics
- **40+ Career Paths**: Detailed roadmaps
- **150+ Skills Mapped**: Across all careers
- **200+ Course Recommendations**: From free to paid
- **100+ Companies Listed**: Hiring opportunities
- **Multi-phase Roadmaps**: Average 4-5 phases per career

### Sectors Covered
- Technology (Software, AI/ML, Cybersecurity, DevOps)
- Business (Marketing, Product, Consulting, Finance)
- Healthcare (Doctor, Pharmacist, Biotechnology)
- Creative (Design, Content, Media)
- Government (UPSC, SSC, Banking)
- Core Engineering (Aerospace, Mechanical, Electronics)
- And more!

## 🔧 Customization

### Adding New Careers
Edit `data/careers.json`:

```json
{
  "title": "Career Name",
  "description": "What this career involves",
  "skills": ["Skill1", "Skill2", ...],
  "courses": ["Course1", "Course2", ...],
  "tools": ["Tool1", "Tool2", ...],
  "companies": ["Company1", "Company2", ...],
  "salary": "₹X-Y LPA",
  "roadmap": [
    {
      "phase": "Phase Name",
      "duration": "X months/years",
      "milestones": ["Milestone1", ...],
      "projects": ["Project1", ...],
      "resources": ["Resource1", ...]
    }
  ]
}
```

### Changing Colors
Edit CSS variables in `css/style.css`:

```css
:root {
  --bg-primary: #FBF8F3;
  --accent-primary: #D97757;
  --accent-secondary: #E8A87C;
  /* ... etc */
}
```

### Local Storage
- User session: `localStorage.edumap_user`
- Progress: `localStorage.edumap_progress`
- Current session: `sessionStorage.careerRecommendation`

## 🐛 Troubleshooting

### Roadmap Not Generating
- Open browser console (F12)
- Check for JavaScript errors
- Verify careers.json is loading
- Try with Firefox for better local file support

## 📱 Mobile Experience

Fully responsive design works on:
- 📱 Phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🎓 Educational Value

### For Students
- Clear career direction
- Realistic skill expectations
- Structured learning path
- Industry insights

### For Parents
- Understand career options
- Support child's decisions
- Realistic salary expectations
- Educational requirements

### For Educators
- Career counseling tool
- Student guidance resource
- Industry alignment
- Skill gap identification

##  Support

For questions or issues:
1. Check this README thoroughly
2. Review code comments in files
3. Open browser console for errors
4. Check careers.json format

##  License

Educational use. Feel free to modify and enhance!

##  Credits

- **Design**: Custom warm light theme
- **Illustrations**: Hand-crafted SVG graphics
- **Fonts**: Google Fonts (Playfair Display, DM Sans)
- **Icons**: Custom SVG elements
- **Data**: Curated career information

---

**Built with care for students navigating their career journey** 
