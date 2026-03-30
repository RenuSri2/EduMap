// Google Auth Configuration
const GOOGLE_CLIENT_ID = '223626948771-1om7vtnin8rgilfig8dvm7jiqfsujlhf.apps.googleusercontent.com'; // Replace with actual Client ID

// Career data
let careerData = null;
let currentUser = null;

// Load career data
async function loadCareerData() {
    try {
        const response = await fetch('data/careers.json');
        if (!response.ok) {
            throw new Error('Failed to load career data');
        }
        careerData = await response.json();
        console.log('✓ Career data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading career data:', error);
        showNotification('Failed to load career database. Please refresh the page.', 'error');
        return false;
    }
}

// Initialize Google Sign-In
function initGoogleAuth() {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleSignIn
            });
            
            // Check if user was previously signed in
            const savedUser = localStorage.getItem('edumap_user');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateAuthUI();
            }
        }
    };
}

// Handle Google Sign-In
function handleGoogleSignIn(response) {
    try {
        const credential = response.credential;
        const payload = JSON.parse(atob(credential.split('.')[1]));
        
        currentUser = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            sub: payload.sub
        };
        
        localStorage.setItem('edumap_user', JSON.stringify(currentUser));
        updateAuthUI();
        showNotification(`Welcome, ${currentUser.name}!`, 'success');
    } catch (error) {
        console.error('Sign-in error:', error);
        showNotification('Sign-in failed. Please try again.', 'error');
    }
}

// Sign out
function signOut() {
    currentUser = null;
    localStorage.removeItem('edumap_user');
    sessionStorage.clear();
    updateAuthUI();
    showNotification('Signed out successfully', 'success');
    
    // Redirect to home if on a protected page
    if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    }
}

// Update authentication UI
function updateAuthUI() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) return;
    
    if (currentUser) {
        authSection.innerHTML = `
            <div class="user-profile">
                <img src="${currentUser.picture}" alt="${currentUser.name}" class="user-avatar">
                <span class="user-name">${currentUser.name.split(' ')[0]}</span>
                <button onclick="signOut()" class="signout-btn">Sign Out</button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <div id="google-signin-button" class="google-signin-btn">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                    <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                    <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                    <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                </svg>
                <span>Sign in with Google</span>
            </div>
        `;
        
        // Re-render Google Sign-In button
        setTimeout(() => {
            if (window.google) {
                google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    { 
                        theme: 'outline',
                        size: 'large',
                        text: 'signin_with',
                        shape: 'pill'
                    }
                );
            }
        }, 100);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#7FA99B' : type === 'error' ? '#D97757' : '#6B9AC4'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 EduMap initializing...');
    
    // Initialize Google Auth
    initGoogleAuth();
    
    // Load career data
    const dataLoaded = await loadCareerData();
    if (!dataLoaded) return;
    
    // Check which page and initialize
    if (document.getElementById('schoolForm')) {
        initSchoolForm();
    } else if (document.getElementById('collegeForm')) {
        initCollegeForm();
    } else if (document.getElementById('graduateForm')) {
        initGraduateForm();
    } else if (document.getElementById('career-results')) {
        displayResults();
    }
});

// ============ SCHOOL STUDENT FORM ============
function initSchoolForm() {
    const form = document.getElementById('schoolForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!careerData) {
            showNotification('Career data is still loading. Please wait...', 'error');
            return;
        }
        
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(cb => cb.value);
        const careerDream = document.getElementById('career-dream').value;
        const strength = document.getElementById('strength').value;
        const goal = document.getElementById('goal').value;
        
        if (interests.length === 0) {
            showNotification('Please select at least one interest', 'error');
            return;
        }
        
        const recommendation = determineStreamAndCareers(interests, careerDream, strength, goal);
        sessionStorage.setItem('careerRecommendation', JSON.stringify(recommendation));
        
        showNotification('Generating your personalized roadmap...', 'success');
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 800);
    });
}

function determineStreamAndCareers(interests, careerDream, strength, goal) {
    let stream = '';
    let careers = [];
    let category = '';
    
    // Determine stream based on interests
    if ((interests.includes('math') && interests.includes('physics')) || 
        (interests.includes('math') && interests.includes('chemistry'))) {
        category = 'science_math';
        stream = careerData.school.science_math.stream;
        careers = careerData.school.science_math.careers;
    } else if (interests.includes('biology')) {
        category = 'biology';
        stream = careerData.school.biology.stream;
        careers = careerData.school.biology.careers;
    } else if (interests.includes('accounts') || interests.includes('economics') || interests.includes('business')) {
        category = 'commerce';
        stream = careerData.school.commerce.stream;
        careers = careerData.school.commerce.careers;
    } else if (interests.includes('languages') || interests.includes('arts') || interests.includes('psychology')) {
        category = 'arts';
        stream = careerData.school.arts.stream;
        careers = careerData.school.arts.careers;
    } else {
        // Default based on career dream
        if (careerDream === 'technology' || careerDream === 'engineering') {
            category = 'science_math';
            stream = careerData.school.science_math.stream;
            careers = careerData.school.science_math.careers;
        } else if (careerDream === 'medical') {
            category = 'biology';
            stream = careerData.school.biology.stream;
            careers = careerData.school.biology.careers;
        } else if (careerDream === 'business') {
            category = 'commerce';
            stream = careerData.school.commerce.stream;
            careers = careerData.school.commerce.careers;
        } else {
            category = 'arts';
            stream = careerData.school.arts.stream;
            careers = careerData.school.arts.careers;
        }
    }
    
    return {
        type: 'school',
        stream: stream,
        category: category,
        careers: careers,
        mainCareer: careers[0]
    };
}

// ============ COLLEGE STUDENT FORM ============
function initCollegeForm() {
    const form = document.getElementById('collegeForm');
    const degreeSelect = document.getElementById('degree');
    const branchGroup = document.getElementById('branch-group');
    const branchSelect = document.getElementById('branch');
    
    const branchOptions = {
        'btech': [
            { value: 'cse', text: 'Computer Science & Engineering' },
            { value: 'it', text: 'Information Technology' },
            { value: 'ece', text: 'Electronics & Communication' },
            { value: 'eee', text: 'Electrical & Electronics' },
            { value: 'mech', text: 'Mechanical Engineering' },
            { value: 'civil', text: 'Civil Engineering' }
        ],
        'bsc': [
            { value: 'cs', text: 'Computer Science' },
            { value: 'physics', text: 'Physics' },
            { value: 'chemistry', text: 'Chemistry' },
            { value: 'math', text: 'Mathematics' },
            { value: 'bio', text: 'Biology/Biotechnology' }
        ],
        'bba': [
            { value: 'general', text: 'General Management' },
            { value: 'marketing', text: 'Marketing' },
            { value: 'finance', text: 'Finance' },
            { value: 'hr', text: 'Human Resources' }
        ],
        'ba': [
            { value: 'english', text: 'English' },
            { value: 'psychology', text: 'Psychology' },
            { value: 'economics', text: 'Economics' },
            { value: 'journalism', text: 'Journalism' }
        ]
    };
    
    degreeSelect.addEventListener('change', () => {
        const degree = degreeSelect.value;
        if (degree && branchOptions[degree]) {
            branchGroup.style.display = 'block';
            branchSelect.innerHTML = '<option value="">Select branch...</option>';
            branchOptions[degree].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.text;
                branchSelect.appendChild(opt);
            });
        } else {
            branchGroup.style.display = 'none';
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!careerData) {
            showNotification('Career data is still loading. Please wait...', 'error');
            return;
        }
        
        const degree = degreeSelect.value;
        const branch = branchSelect.value;
        const interest = document.getElementById('interest').value;
        const goal = document.getElementById('goal').value;
        
        const career = getCollegeCareer(degree, branch, interest);
        
        sessionStorage.setItem('careerRecommendation', JSON.stringify({
            type: 'college',
            career: career,
            degree: degree,
            branch: branch,
            goal: goal
        }));
        
        showNotification('Generating your career roadmap...', 'success');
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 800);
    });
}

function getCollegeCareer(degree, branch, interest) {
    // For B.Tech CSE/IT
    if ((degree === 'btech' && (branch === 'cse' || branch === 'it')) || (degree === 'bsc' && branch === 'cs')) {
        const careers = careerData.college.btech_cse;
        
        if (interest === 'ai' || interest === 'ml') {
            return careers[1]; // ML Engineer
        } else if (interest === 'cyber' || interest === 'security') {
            return careers[2]; // Cybersecurity
        } else if (interest === 'mobile') {
            return careers[3]; // Mobile Dev
        } else if (interest === 'devops') {
            return careers[4]; // DevOps
        } else {
            return careers[0]; // Full Stack
        }
    }
    
    // For BBA
    if (degree === 'bba') {
        const careers = careerData.college.bba;
        if (interest === 'product' || interest === 'management') {
            return careers[1]; // Product Manager
        }
        return careers[0]; // Digital Marketing
    }
    
    // Default fallback
    return careerData.college.btech_cse[0];
}

// ============ GRADUATE FORM ============
function initGraduateForm() {
    const form = document.getElementById('graduateForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!careerData) {
            showNotification('Career data is still loading. Please wait...', 'error');
            return;
        }
        
        const degree = document.getElementById('completed-degree').value;
        const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
            .map(cb => cb.value);
        const goal = document.getElementById('career-goal').value;
        const experience = document.getElementById('experience').value;
        
        const career = getGraduateCareer(degree, goal, skills);
        
        sessionStorage.setItem('careerRecommendation', JSON.stringify({
            type: 'graduate',
            career: career,
            experience: experience,
            skills: skills
        }));
        
        showNotification('Creating your job-ready roadmap...', 'success');
        setTimeout(() => {
            window.location.href = 'roadmap.html';
        }, 800);
    });
}

function getGraduateCareer(degree, goal, skills) {
    if (goal === 'software' || goal === 'backend') {
        return careerData.graduate.software[0]; // Backend Engineer
    } else if (goal === 'cloud' || goal === 'devops') {
        return careerData.graduate.software[1]; // Cloud Architect
    } else if (goal === 'product') {
        return careerData.graduate.business[0]; // Product Manager (if available)
    } else if (goal === 'business' || goal === 'analyst') {
        return careerData.graduate.business[0]; // Business Analyst
    } else if (goal === 'govt') {
        return careerData.graduate.govt_job[0]; // UPSC
    }
    
    return careerData.graduate.software[0]; // Default
}

// ============ DISPLAY RESULTS ============
function displayResults() {
    const recommendationData = sessionStorage.getItem('careerRecommendation');
    
    if (!recommendationData) {
        showNotification('No career recommendation found. Please complete the questionnaire.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    const recommendation = JSON.parse(recommendationData);
    
    if (recommendation.type === 'school') {
        displaySchoolResults(recommendation);
    } else {
        displayCareerRoadmap(recommendation.career);
    }
}

function displaySchoolResults(recommendation) {
    const streamCard = document.getElementById('stream-recommendation');
    const streamText = document.getElementById('recommended-stream');
    
    if (streamCard && streamText) {
        streamCard.classList.remove('hidden');
        streamText.textContent = recommendation.stream;
    }
    
    displayCareerRoadmap(recommendation.mainCareer);
    
    if (recommendation.careers.length > 1) {
        const multipleCareers = document.getElementById('multiple-careers');
        if (multipleCareers) {
            multipleCareers.style.display = 'block';
            
            recommendation.careers.slice(1).forEach(career => {
                const careerCard = createCareerCard(career);
                multipleCareers.appendChild(careerCard);
            });
        }
    }
}

function createCareerCard(career) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.cursor = 'pointer';
    card.style.marginTop = '2rem';
    
    card.innerHTML = `
        <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--accent-primary); margin-bottom: 1rem;">
            ${career.title}
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 1.05rem;">
            ${career.description || ''}
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <span class="salary-badge">${career.salary}</span>
        </div>
        <p style="color: var(--text-secondary);">
            <strong>Key Skills:</strong> ${career.skills.slice(0, 4).join(', ')}...
        </p>
        <p class="card-arrow" style="color: var(--accent-primary); margin-top: 1.5rem; font-weight: 600;">
            Click to view detailed roadmap →
        </p>
    `;
    
    card.addEventListener('click', () => {
        displayCareerRoadmap(career);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    return card;
}

function displayCareerRoadmap(career) {
    // Set career title and description
    const titleEl = document.getElementById('career-title');
    if (titleEl) titleEl.textContent = career.title;
    
    const descEl = document.getElementById('career-description');
    if (descEl && career.description) {
        descEl.textContent = career.description;
        descEl.style.display = 'block';
    }
    
    // Set salary
    const salaryEl = document.getElementById('salary-range');
    if (salaryEl) salaryEl.textContent = career.salary;
    
    // Display skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        career.skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
        });
    }
    
    // Display courses
    const coursesContainer = document.getElementById('courses-container');
    if (coursesContainer) {
        coursesContainer.innerHTML = '';
        career.courses.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.className = 'course-item';
            courseItem.textContent = course;
            coursesContainer.appendChild(courseItem);
        });
    }
    
    // Display tools (if available)
    if (career.tools && career.tools.length > 0) {
        const toolsSection = document.getElementById('tools-section');
        const toolsContainer = document.getElementById('tools-container');
        
        if (toolsSection && toolsContainer) {
            toolsSection.style.display = 'block';
            toolsContainer.innerHTML = '';
            
            career.tools.forEach(tool => {
                const toolTag = document.createElement('div');
                toolTag.className = 'tool-tag';
                toolTag.textContent = tool;
                toolsContainer.appendChild(toolTag);
            });
        }
    }
    
    // Display companies (if available)
    if (career.companies && career.companies.length > 0) {
        const companiesSection = document.getElementById('companies-section');
        const companiesContainer = document.getElementById('companies-container');
        
        if (companiesSection && companiesContainer) {
            companiesSection.style.display = 'block';
            companiesContainer.innerHTML = '';
            
            career.companies.forEach(company => {
                const companyItem = document.createElement('li');
                companyItem.className = 'company-item';
                companyItem.textContent = company;
                companiesContainer.appendChild(companyItem);
            });
        }
    }
    
    // Display enhanced roadmap
    const roadmapContainer = document.getElementById('roadmap-container');
    if (roadmapContainer) {
        roadmapContainer.innerHTML = '';
        
        if (career.roadmap && career.roadmap[0] && career.roadmap[0].phase) {
            // Enhanced roadmap with phases
            career.roadmap.forEach((phase, index) => {
                const phaseDiv = createRoadmapPhase(phase, index + 1);
                roadmapContainer.appendChild(phaseDiv);
            });
        } else if (Array.isArray(career.roadmap)) {
            // Simple roadmap (old format)
            career.roadmap.forEach((step, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'roadmap-phase';
                stepDiv.innerHTML = `
                    <div class="phase-header">
                        <div>
                            <div class="phase-title">Step ${index + 1}</div>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7;">${step}</p>
                `;
                roadmapContainer.appendChild(stepDiv);
            });
        }
    }
}

function createRoadmapPhase(phase, phaseNumber) {
    const phaseDiv = document.createElement('div');
    phaseDiv.className = 'roadmap-phase';
    
    let contentHTML = `
        <div class="phase-header">
            <div>
                <div class="phase-title">${phase.phase}</div>
            </div>
            <div class="phase-duration">${phase.duration}</div>
        </div>
        <div class="phase-content">
    `;
    
    // Milestones
    if (phase.milestones || phase.steps) {
        const items = phase.milestones || phase.steps;
        contentHTML += `
            <div class="phase-milestones">
                <h4>Key Milestones</h4>
                <ul>
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Projects
    if (phase.projects) {
        contentHTML += `
            <div class="phase-projects">
                <h4>Projects to Build</h4>
                <ul>
                    ${phase.projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Resources
    if (phase.resources) {
        contentHTML += `
            <div class="phase-resources">
                <h4>Learning Resources</h4>
                <ul>
                    ${phase.resources.map(resource => `<li>${resource}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    contentHTML += '</div>';
    phaseDiv.innerHTML = contentHTML;
    
    return phaseDiv;
}

// Save user progress (if logged in)
function saveUserProgress(recommendation) {
    if (currentUser) {
        const userProgress = {
            user: currentUser.email,
            recommendation: recommendation,
            timestamp: new Date().toISOString()
        };
        
        const allProgress = JSON.parse(localStorage.getItem('edumap_progress') || '[]');
        allProgress.push(userProgress);
        localStorage.setItem('edumap_progress', JSON.stringify(allProgress));
    }
}
