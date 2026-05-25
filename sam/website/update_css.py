import re

with open('style.css', 'r') as f:
    css = f.read()

# 1. Update Root Variables
old_root = """:root {
    --bg-primary: #0A1428;       /* Deep dark blue (Hero/Footer backdrops) */
    --bg-secondary: #112240;     /* Navy blue highlights */
    --primary-blue: #0066CC;     /* Trustworthy fintech blue */
    --primary-blue-rgb: 0, 102, 204;
    --accent-red: #D90429;       /* Active response crimson */
    --accent-red-hover: #EF233C;
    --light-bg: #F5F7FA;         /* Soft clean light gray */
    --white: #FFFFFF;
    
    /* Text Colors */
    --text-dark: #1E293B;        /* Slate dark blue */
    --text-muted: #64748B;       /* Neutral gray */
    --text-light: #E2E8F0;       /* Off-white */
    
    /* Fonts */
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    
    /* Glassmorphism Styles */
    --glass-bg-light: rgba(255, 255, 255, 0.7);
    --glass-border-light: rgba(255, 255, 255, 0.4);
    --glass-bg-dark: rgba(17, 34, 64, 0.65);
    --glass-border-dark: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.15);
    
    /* Transitions */
    --transition-fast: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}"""

new_root = """:root {
    --bg-primary: #ffffff;       /* Bright fintech white */
    --bg-secondary: #eaf6ff;     /* Soft blue highlights */
    --primary-blue: #0d6efd;     /* Deep fintech blue */
    --primary-blue-rgb: 13, 110, 253;
    --accent-cyan: #4cc9f0;      /* Light cyan */
    --accent-red: #ff4d4d;       /* Subtle red highlights */
    --accent-red-hover: #ff1a1a;
    --light-bg: #f8fafc;         /* Clean light gray */
    --white: #ffffff;
    
    /* Text Colors */
    --text-dark: #0f172a;        /* Slate dark blue */
    --text-muted: #475569;       /* Neutral gray */
    --text-light: #64748b;       /* Slightly lighter text */
    
    /* Fonts */
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-accent: 'Manrope', sans-serif;
    
    /* Glassmorphism Styles */
    --glass-bg-light: rgba(255, 255, 255, 0.85);
    --glass-border-light: rgba(255, 255, 255, 0.6);
    --glass-bg-dark: rgba(255, 255, 255, 0.9);
    --glass-border-dark: rgba(255, 255, 255, 0.7);
    --glass-shadow: 0 15px 35px -5px rgba(13, 110, 253, 0.1);
    
    /* Transitions */
    --transition-fast: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}"""

css = css.replace(old_root, new_root)

# 2. Update Header
css = css.replace('background-color: rgba(10, 20, 40, 0.85);', 'background-color: rgba(255, 255, 255, 0.9);')
css = css.replace('border-bottom: 1px solid rgba(255, 255, 255, 0.05);', 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);')
css = css.replace('color: var(--white);', 'color: var(--text-dark);')

# Fix nav links text color (originally light now needs to be dark)
css = css.replace('.nav-link {\n    color: var(--text-light);', '.nav-link {\n    color: var(--text-muted);')
css = css.replace('.nav-link:hover, .nav-link.active {\n    color: var(--white);\n}', '.nav-link:hover, .nav-link.active {\n    color: var(--primary-blue);\n}')
css = css.replace('background-color: var(--white);', 'background-color: var(--bg-primary);')

# 3. Update Hero Section Theme
old_hero = """.hero-section {
    position: relative;
    background-color: var(--bg-primary);
    min-height: 100vh;
    padding: 150px 0 100px;
    display: flex;
    align-items: center;
    color: var(--white);
    overflow: hidden;
}"""
new_hero = """.hero-section {
    position: relative;
    background: linear-gradient(135deg, #eaf6ff 0%, #ffffff 45%, #dceeff 100%);
    min-height: 100vh;
    padding: 150px 0 100px;
    display: flex;
    align-items: center;
    color: var(--text-dark);
    overflow: hidden;
}"""
css = css.replace(old_hero, new_hero)

# Hero blobs
css = css.replace('opacity: 0.15;', 'opacity: 0.5;')
css = css.replace('background: radial-gradient(circle, var(--accent-red) 0%, transparent 80%);', 'background: radial-gradient(circle, var(--accent-cyan) 0%, transparent 80%);')

# Hero Texts
css = css.replace('color: var(--text-light);\n    margin-bottom: 1.5rem;', 'color: var(--primary-blue);\n    margin-bottom: 1.5rem;\n    background-color: rgba(255,255,255,0.8);')
css = css.replace('background: linear-gradient(135deg, var(--white) 50%, #90caf9 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;', 'color: var(--text-dark);')

# 4. Buttons (Gradient & Glow)
css = re.sub(
    r'\.btn-primary \{([^}]+)\}',
    r'.btn-primary {\1\n    background: linear-gradient(90deg, var(--primary-blue) 0%, var(--accent-cyan) 100%);\n    border: none;\n}',
    css
)
css = re.sub(
    r'\.btn-primary:hover \{([^}]+)\}',
    r'.btn-primary:hover {\1\n    background: linear-gradient(90deg, #0052a3 0%, var(--primary-blue) 100%);\n    box-shadow: 0 8px 25px rgba(76, 201, 240, 0.5);\n}',
    css
)

# 5. Service Cards (Rounded, hover lift, gradient borders)
css = css.replace('border-radius: 16px;', 'border-radius: 20px;')
css = css.replace('border-radius: 24px;', 'border-radius: 24px;')

css = re.sub(
    r'\.glass-card:hover \{([^}]+)\}',
    r'.glass-card:hover {\1\n    border-color: var(--accent-cyan);\n    transform: translateY(-8px);\n}',
    css
)

# Footer background
css = css.replace('.main-footer {\n    background-color: var(--bg-primary);', '.main-footer {\n    background-color: var(--bg-secondary);')

# Preloader
css = css.replace('background-color: var(--bg-primary);', 'background-color: var(--light-bg);')
css = css.replace('color: var(--white);', 'color: var(--primary-blue);')

with open('style.css', 'w') as f:
    f.write(css)

