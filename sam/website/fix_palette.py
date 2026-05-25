import re

with open('style.css', 'r') as f:
    css = f.read()

# 1. Update Root Variables
old_root = """:root {
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

new_root = """:root {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F8FAFC;
    --primary-blue: #2563EB;
    --sky-blue: #38BDF8;
    --accent-red: #EF4444;
    --success-green: #22C55E;
    --light-bg: #F8FAFC;
    --white: #FFFFFF;
    
    /* Text Colors */
    --text-dark: #0F172A;
    --text-muted: #475569;
    --text-light: #94A3B8;
    
    /* Fonts */
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-accent: 'Manrope', sans-serif;
    
    /* Card Styles */
    --card-bg: #FFFFFF;
    --card-border: rgba(56, 189, 248, 0.3);
    --card-border-hover: #2563EB;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --card-shadow-hover: 0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05);
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}"""
if old_root in css:
    css = css.replace(old_root, new_root)
else:
    # try replacing anything between :root { ... }
    css = re.sub(r':root\s*\{[^}]+\}', new_root, css)

# 2. Update Primary Buttons
css = re.sub(r'\.btn-primary\s*\{[^}]+\}', r'''.btn-primary {
    background: linear-gradient(135deg, var(--primary-blue), var(--sky-blue));
    color: var(--white);
    font-weight: 700;
    border: none;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}''', css)

css = re.sub(r'\.btn-primary:hover\s*\{[^}]+\}', r'''.btn-primary:hover {
    background: linear-gradient(135deg, #1D4ED8, #0EA5E9);
    color: var(--white);
    box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
    transform: translateY(-2px);
}''', css)

# 3. Update Cards (glass-card)
css = re.sub(r'\.glass-card\s*\{[^}]+\}', r'''.glass-card {
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    box-shadow: var(--card-shadow);
    transition: var(--transition-normal);
    color: var(--text-dark);
}''', css)

css = re.sub(r'\.glass-card:hover\s*\{[^}]+\}', r'''.glass-card:hover {
    border-color: var(--card-border-hover);
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
    color: var(--text-dark);
}''', css)

# Ensure text within cards keeps its readability
css = re.sub(r'\.service-card p\s*\{[^}]*\}', '', css) # remove old rule if exists
css += '''\n.glass-card p, .glass-card h3, .glass-card h4, .glass-card span {
    color: inherit;
}
.glass-card p {
    color: var(--text-muted);
}
.glass-card h3, .glass-card h4 {
    color: var(--text-dark);
}
.glass-card:hover p, .glass-card:hover h3, .glass-card:hover h4 {
    color: inherit;
}
.glass-card:hover p {
    color: var(--text-muted);
}
.glass-card:hover h3, .glass-card:hover h4 {
    color: var(--text-dark);
}\n'''

# 4. Update Tabs
css = re.sub(r'\.tab-btn\s*\{[^}]+\}', r'''.tab-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    padding: 0.9rem 1.8rem;
    border-radius: 50px;
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-dark);
    cursor: pointer;
    box-shadow: var(--card-shadow);
    transition: var(--transition-normal);
}''', css)

css = re.sub(r'\.tab-btn:hover\s*\{[^}]+\}', r'''.tab-btn:hover {
    border-color: var(--primary-blue);
    background-color: var(--bg-secondary);
    color: var(--text-dark);
    transform: translateY(-2px);
}''', css)

css = re.sub(r'\.tab-btn\.active\s*\{[^}]+\}', r'''.tab-btn.active {
    background-color: var(--primary-blue);
    color: var(--white);
    border-color: var(--primary-blue);
    box-shadow: 0 6px 15px rgba(37, 99, 235, 0.3);
}''', css)


# Fix hero buttons text color
css = css.replace('.btn-outline {\n    background-color: transparent;\n    border-color: var(--primary-blue);\n    color: var(--primary-blue);\n}', '.btn-outline {\n    background-color: transparent;\n    border-color: var(--primary-blue);\n    color: var(--primary-blue);\n    font-weight: 700;\n}')

# Update any background referencing primary-blue for gradient
# Hero section background gradient
old_hero_bg = 'background: linear-gradient(135deg, #eaf6ff 0%, #ffffff 45%, #dceeff 100%);'
new_hero_bg = 'background: linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 45%, #E0F2FE 100%);'
css = css.replace(old_hero_bg, new_hero_bg)

with open('style.css', 'w') as f:
    f.write(css)

