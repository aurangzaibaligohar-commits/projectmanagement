// ────────────────────────────────────────────────
//  Combined & error-free version – both dashboards
// ────────────────────────────────────────────────

// ── Common / Company-style dashboard config ─────
const companyConfig = {
    dashboard_title: 'My Projects Dashboard',
    company_name:    'FreelanceHub',
    post_button_text: 'Post Project',
    welcome_text:    'Manage your freelance projects and track progress',
    primary_color:   '#ec4899'           // used in mapToCapabilities
};

// ── ProManage / modern dashboard with colors ────
const proConfig = {
    dashboard_title: 'ProManage',
    welcome_message: 'Good morning, John! 👋',
    background_color: '#ffffff',
    surface_color: '#ffffff',
    text_color: '#111827',
    primary_action_color: '#ec4899',
    secondary_action_color: '#f472b6'
};

// We merge them – you decide priority (here: proConfig wins on conflicts)
const defaultConfig = { ...companyConfig, ...proConfig };


// ── Single init call (very important!) ──────────
window.elementSdk.init({
    defaultConfig,

    onConfigChange: (config) => {    // ← removed async – usually safer
        // ── ProManage / color dashboard updates ─────
        const appTitle = document.getElementById('app-title');
        if (appTitle) {
            appTitle.textContent = config.dashboard_title || defaultConfig.dashboard_title;
        }

        const welcomeHeading = document.getElementById('welcome-heading');
        if (welcomeHeading) {
            welcomeHeading.textContent = config.welcome_message || defaultConfig.welcome_message;
        }

        // Colors
        const bgColor       = config.background_color       || defaultConfig.background_color;
        const surfaceColor  = config.surface_color          || defaultConfig.surface_color;
        const textColor     = config.text_color             || defaultConfig.text_color;
        const primaryColor  = config.primary_action_color   || defaultConfig.primary_action_color;
        const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;

        document.body.style.backgroundColor = bgColor;

        document.querySelectorAll('.bg-white').forEach(el => {
            el.style.backgroundColor = surfaceColor;
        });

        document.querySelectorAll('h1, h2, h3, .text-gray-900').forEach(el => {
            el.style.color = textColor;
        });

        document.querySelectorAll('.button-gradient').forEach(el => {
            el.style.backgroundImage = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
        });

        document.querySelectorAll('.from-rose-500').forEach(el => {
            el.style.backgroundImage = `linear-gradient(to right, ${primaryColor})`;
        });

        document.querySelectorAll('.text-rose-600').forEach(el => {
            el.style.color = primaryColor;
        });


        // ── Company / FreelanceHub text updates ─────
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = config.dashboard_title || defaultConfig.dashboard_title;
        }

        const companyName = document.getElementById('company-name');
        if (companyName) {
            companyName.textContent = config.company_name || defaultConfig.company_name;
        }

        const postButton = document.getElementById('post-button-text');
        if (postButton) {
            postButton.textContent = config.post_button_text || defaultConfig.post_button_text;
        }

        const pageSubtitle = document.getElementById('page-subtitle');
        if (pageSubtitle) {
            pageSubtitle.textContent = config.welcome_text || defaultConfig.welcome_text;
        }
    },

    mapToCapabilities: (config) => ({
        recolorables: [
            // ProManage colors
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (v) => window.elementSdk.setConfig({ background_color: v })
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (v) => window.elementSdk.setConfig({ surface_color: v })
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (v) => window.elementSdk.setConfig({ text_color: v })
            },
            {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (v) => window.elementSdk.setConfig({ primary_action_color: v })
            },
            {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (v) => window.elementSdk.setConfig({ secondary_action_color: v })
            },
            // Company primary color (if still needed)
            {
                get: () => config.primary_color || defaultConfig.primary_color || '#ec4899',
                set: (v) => window.elementSdk.setConfig({ primary_color: v })
            }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    }),

    mapToEditPanelValues: (config) => new Map([
        // Both dashboards' editable fields
        ['dashboard_title',    config.dashboard_title    || defaultConfig.dashboard_title],
        ['welcome_message',    config.welcome_message    || defaultConfig.welcome_message],
        ['company_name',       config.company_name       || defaultConfig.company_name],
        ['post_button_text',   config.post_button_text   || defaultConfig.post_button_text],
        ['welcome_text',       config.welcome_text       || defaultConfig.welcome_text],
        // You can add background_color, text_color etc. here too if the editor should show them
    ])
});


// ── Shared interactive parts (navigation + search) ────────────────
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

const searchInput = document.querySelector('input[type="text"]');
if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('ring-2', 'ring-rose-300/50');
    });
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('ring-2', 'ring-rose-300/50');
    });
}
// developer role dashboard script

