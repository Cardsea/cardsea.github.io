// Fun emojis that float up the screen
const emojis = ['✨', '🚀', '💻', '🎮'];
let emojiCount = 0;
let scrollPosition = 0;

// Create emoji container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'emoji-container';
    document.body.prepend(container);
});

// Track scroll position
window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
});

function createFloatingEmoji() {
    if (emojiCount > 5) return; // Limit number of floating emojis
    
    const container = document.querySelector('.emoji-container');
    if (!container) return;
    
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.setProperty('--delay', (Math.random() * 0.5) + 's');
    container.appendChild(emoji);
    
    emoji.style.opacity = '1';
    
    // Remove emoji after animation
    setTimeout(() => {
        emoji.style.opacity = '0';
        setTimeout(() => emoji.remove(), 300);
        emojiCount--;
    }, 5000);
    
    emojiCount++;
}

// Create floating emojis periodically
setInterval(createFloatingEmoji, 3000);

// Cookie functions
function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Settings management
let currentSettings = {
    theme: 'light'
};

function loadSettings() {
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        currentSettings.theme = savedTheme;
    }
    applySettings();
}

function saveSettings() {
    setCookie('theme', currentSettings.theme);
}

function applySettings() {
    document.body.className = currentSettings.theme;
}

// Initialize settings
loadSettings();

// Create settings menu
function createSettingsMenu() {
    const settingsButton = document.createElement('button');
    settingsButton.className = 'settings-button';
    settingsButton.innerHTML = '⚙️';
    settingsButton.setAttribute('aria-label', 'Settings');
    
    const settingsMenu = document.createElement('div');
    settingsMenu.className = 'settings-menu';
    settingsMenu.innerHTML = `
        <div class="settings-content">
            <h2>Settings</h2>
            <div class="settings-section">
                <h3>Theme</h3>
                <div class="theme-options">
                    <label>
                        <input type="radio" name="theme" value="light" ${currentSettings.theme === 'light' ? 'checked' : ''}>
                        Light
                    </label>
                    <label>
                        <input type="radio" name="theme" value="dark" ${currentSettings.theme === 'dark' ? 'checked' : ''}>
                        Dark
                    </label>
                </div>
            </div>
            <div class="settings-section">
                <h3>Data</h3>
                <button id="deleteCookies" class="delete-cookies">Delete All Cookies</button>
            </div>
            <div class="settings-buttons">
                <button class="apply-settings">Apply</button>
                <button class="close-settings">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(settingsButton);
    document.body.appendChild(settingsMenu);
    
    // Toggle settings menu
    settingsButton.addEventListener('click', () => {
        settingsMenu.classList.toggle('show');
    });

    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsMenu.contains(e.target) && !settingsButton.contains(e.target)) {
            settingsMenu.classList.remove('show');
        }
    });

    // Add event listeners
    const closeButton = settingsMenu.querySelector('.close-settings');
    const applyButton = settingsMenu.querySelector('.apply-settings');
    const themeInputs = settingsMenu.querySelectorAll('input[name="theme"]');

    closeButton.addEventListener('click', () => {
        settingsMenu.classList.remove('show');
    });

    applyButton.addEventListener('click', () => {
        const newTheme = settingsMenu.querySelector('input[name="theme"]:checked').value;
        currentSettings.theme = newTheme;
        saveSettings();
        applySettings();
        settingsMenu.classList.remove('show');
    });

    // Update settings object when radio buttons change
    themeInputs.forEach(input => {
        input.addEventListener('change', () => {
            currentSettings.theme = input.value;
        });
    });
}

// Easter egg for Konami code
let konamiIndex = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let explosionTimeout;

function createExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    document.body.appendChild(explosion);

    // Remove explosion after animation
    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

function handleKeyPress(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Konami code entered successfully
            document.body.style.cursor = 'crosshair';
            document.addEventListener('click', (e) => {
                createExplosion(e.clientX, e.clientY);
            });
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createSettingsMenu();
    document.addEventListener('keydown', handleKeyPress);
});

// Fun hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const container = document.querySelector('.emoji-container');
        if (!container) return;

        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const emojiElement = document.createElement('div');
        emojiElement.className = 'floating-emoji';
        emojiElement.textContent = emoji;
        emojiElement.style.left = (Math.random() * 100) + 'vw';
        emojiElement.style.setProperty('--delay', '0s');
        container.appendChild(emojiElement);
        
        setTimeout(() => {
            emojiElement.style.opacity = '0';
            setTimeout(() => emojiElement.remove(), 300);
        }, 5000);
    });
});

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize project links
    document.querySelectorAll('.project-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 100);
        });
    });

    // Initialize cookie consent
    initializeCookieConsent();

    // Initialize code copy buttons
    initializeCodeCopyButtons();
});

// Initialize cookie consent functionality
function initializeCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    if (cookieConsent) {
        const acceptButton = cookieConsent.querySelector('.accept-cookies');
        const declineButton = cookieConsent.querySelector('.decline-cookies');

        if (acceptButton) {
            acceptButton.addEventListener('click', () => {
                setCookie('cookieConsent', 'accepted', 365);
                hideCookieConsent(cookieConsent);
            });
        }

        if (declineButton) {
            declineButton.addEventListener('click', () => {
                setCookie('cookieConsent', 'declined', 365);
                hideCookieConsent(cookieConsent);
            });
        }
    }
}

// Hide cookie consent popup
function hideCookieConsent(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    setTimeout(() => {
        element.remove();
    }, 300);
}

// Initialize code copy buttons
function initializeCodeCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.setAttribute('aria-label', 'Copy code');
        button.setAttribute('title', 'Copy to clipboard');
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.innerHTML = `<path d="M320 96h-48V80c0-26.51-21.49-48-48-48h-96c-26.51 0-48 21.49-48 48v96c0 26.51 21.49 48 48 48h16v48c0 35.35 28.65 64 64 64h96c35.35 0 64-28.65 64-64V160c0-35.35-28.65-64-64-64zm-144-16c0-8.82 7.18-16 16-16h96c8.82 0 16 7.18 16 16v16H176V80zm144 208c0 17.64-14.36 32-32 32h-96c-17.64 0-32-14.36-32-32v-48h48c26.51 0 48-21.49 48-48v-16h32c17.64 0 32 14.36 32 32v80z"/>`;
        button.appendChild(svg);
        
        button.addEventListener('click', async () => {
            try {
                const code = block.querySelector('code').textContent;
                await navigator.clipboard.writeText(code);
                button.classList.add('copied');
                setTimeout(() => {
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.classList.add('failed');
                setTimeout(() => {
                    button.classList.remove('failed');
                }, 2000);
            }
        });
        
        block.appendChild(button);
    });
}

// Cookie Consent and Welcome Message
document.addEventListener('DOMContentLoaded', () => {
    // Create and show cookie consent popup if not already accepted
    if (!getCookie('cookieConsent')) {
        const consentPopup = document.createElement('div');
        consentPopup.className = 'cookie-consent';
        consentPopup.innerHTML = `
            <p>🍪 Om nom nom! This website uses cookies to make your experience sweeter! Can we use them to remember your preferences?</p>
            <div class="cookie-buttons">
                <button class="accept-cookies">Yes, I love cookies!</button>
                <button class="decline-cookies">No thanks</button>
            </div>
        `;
        document.body.appendChild(consentPopup);

        // Add fade-in effect with slight delay
        setTimeout(() => consentPopup.classList.add('show'), 1000);

        // Handle cookie consent buttons
        consentPopup.querySelector('.accept-cookies').addEventListener('click', () => {
            setCookie('cookieConsent', 'accepted', 365);
            setCookie('visited', 'true', 365);
            consentPopup.style.opacity = '0';
            consentPopup.style.transform = 'translateY(20px)';
            setTimeout(() => consentPopup.remove(), 300);
            updateWelcomeMessage(true);
        });

        consentPopup.querySelector('.decline-cookies').addEventListener('click', () => {
            setCookie('cookieConsent', 'declined', 365);
            consentPopup.style.opacity = '0';
            consentPopup.style.transform = 'translateY(20px)';
            setTimeout(() => consentPopup.remove(), 300);
            updateWelcomeMessage(false);
        });
    }

    // Update welcome message based on visit status
    function updateWelcomeMessage(canUseCookies) {
        const welcomeElement = document.querySelector('.welcome-message');
        if (!welcomeElement) return;

        if (canUseCookies && getCookie('cookieConsent') === 'accepted') {
            const hasVisited = getCookie('visited');
            if (hasVisited) {
                welcomeElement.textContent = 'Welcome back! 🎉';
            } else {
                welcomeElement.textContent = 'Welcome! 👋';
                setCookie('visited', 'true', 365);
            }
        } else {
            welcomeElement.textContent = 'Welcome! 👋';
        }
    }

    // Initial welcome message update
    updateWelcomeMessage(getCookie('cookieConsent') === 'accepted');
});

// Add rainbow and sparkle animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { background: #ff0000; }
        20% { background: #ff00ff; }
        40% { background: #0000ff; }
        60% { background: #00ffff; }
        80% { background: #00ff00; }
        100% { background: #ff0000; }
    }

    .floating-emoji {
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 1000;
        animation: float-with-scroll 5s linear forwards;
        animation-delay: var(--delay);
        opacity: 0;
        top: -50px;
    }

    @keyframes float-with-scroll {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(calc(100vh + 50px - var(--scroll-offset))) rotate(360deg);
            opacity: 0;
        }
    }

    .konami-sparkle {
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle-motion 3s ease-out forwards;
        animation-delay: var(--delay);
        opacity: 0;
    }

    @keyframes sparkle-motion {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(var(--vx) * 300),
                calc(var(--vy) * 300)
            ) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 