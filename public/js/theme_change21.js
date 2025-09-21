$(document).ready(function() {
    // --- PREDEFINED THEMES ---
    const themes = {
        blue: {
            name: { ar: 'الأزرق', en: 'Blue' },
            primaryColor: '#3b82f6',
            secondaryColor: '#1d4ed8',
            backgroundColor: 'aliceblue',
            textColor: '#374151'
        },
        green: {
            name: { ar: 'الأخضر', en: 'Green' },
            primaryColor: '#10b981',
            secondaryColor: '#059669',
            backgroundColor: '#f0fdf4',
            textColor: '#064e3b'
        },
        purple: {
            name: { ar: 'البنفسجي', en: 'Purple' },
            primaryColor: '#8b5cf6',
            secondaryColor: '#7c3aed',
            backgroundColor: '#faf5ff',
            textColor: '#581c87'
        },
        orange: {
            name: { ar: 'البرتقالي', en: 'Orange' },
            primaryColor: '#f59e0b',
            secondaryColor: '#d97706',
            backgroundColor: '#fffbeb',
            textColor: '#92400e'
        },
        red: {
            name: { ar: 'الأحمر', en: 'Red' },
            primaryColor: '#ef4444',
            secondaryColor: '#dc2626',
            backgroundColor: '#fef2f2',
            textColor: '#991b1b'
        }
    };

    // --- LANGUAGE DETECTION ---
    const getCurrentLanguage = () => {
        if (window.frappe && window.frappe.boot && window.frappe.boot.lang) {
            return window.frappe.boot.lang;
        }
        const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
        if (htmlLang) {
            return htmlLang.toLowerCase();
        }
        const hasArabicText = document.body.textContent.match(/[\u0600-\u06FF]/);
        return hasArabicText ? 'ar' : 'en';
    };

    const currentLang = getCurrentLanguage();
    const isRTL = currentLang === 'ar' || currentLang.startsWith('ar');

    // --- LOAD/SAVE THEME ---
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('frappe_theme');
        return savedTheme && themes[savedTheme] ? savedTheme : 'blue';
    };

    const saveTheme = (themeKey) => {
        localStorage.setItem('frappe_theme', themeKey);
    };

    let currentThemeKey = loadTheme();
    let currentTheme = themes[currentThemeKey];

    // --- TRANSLATIONS ---
    const texts = {
        ar: {
            changeTheme: 'تغيير المظهر',
            currentTheme: 'المظهر الحالي'
        },
        en: {
            changeTheme: 'Change Theme',
            currentTheme: 'Current Theme'
        }
    };

    const currentTexts = texts[isRTL ? 'ar' : 'en'];

    // Add fonts
    if (!$('link[href*="Almarai"]').length) {
        $('head').append('<link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;600&display=swap" rel="stylesheet">');
    }

    // --- CREATE THEME BUTTON ---
    const createThemeButton = () => {
        return `
            <div class="theme-changer-container" style="
                position: fixed;
                bottom: 30px;
                left: 10px;
                ${isRTL ? 'left: 20px;' : 'right: 20px;'}
                z-index: 1002;
                font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
                direction: ${isRTL ? 'rtl' : 'ltr'};
            ">
                <button class="theme-btn" style="
                    background: ${currentTheme.primaryColor};
                    color: white;
                    border: none;
                    padding: 12px 16px;
                    border-radius: 12px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <span><i class="fa-solid fa-palette"></i></span>
                </button>
            </div>
        `;
    };

    // --- CREATE THEME DROPDOWN ---
    const createThemeDropdown = () => {
        let themeOptions = '';
        Object.keys(themes).forEach(themeKey => {
            const theme = themes[themeKey];
            const isSelected = currentThemeKey === themeKey;
            themeOptions += `
                <div class="theme-option" data-theme="${themeKey}" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-radius: 12px;
                    margin: 8px;
                    background: ${theme.primaryColor};
                    color: white;
                    font-weight: 600;
                    font-size: 13px;
                    min-height: 80px;
                    text-align: center;
                    position: relative;
                    ${isSelected ? `border: 3px solid ${theme.secondaryColor}; transform: scale(1.05);` : 'border: 3px solid transparent;'}
                ">
                    <div style="margin-bottom: 4px; font-size: 14px;">
                        ${theme.name[isRTL ? 'ar' : 'en']}
                    </div>
                    <div style="font-size: 10px; opacity: 0.8;">
                        ${theme.primaryColor}
                    </div>
                    ${isSelected ? `<div style="position: absolute; top: 4px; right: 4px; background: white; color: ${theme.primaryColor}; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">✓</div>` : ''}
                </div>
            `;
        });

        return `
            <div class="theme-dropdown" style="
                position: absolute;
                bottom: 90px;
                ${isRTL ? 'left: 0;' : 'right: 0;'}
                margin-top: 12px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 12px 30px rgba(0,0,0,0.2);
                border: 2px solid #e5e7eb;
                width: 320px;
                max-height: 450px;
                overflow-y: auto;
                padding: 16px;
                display: none;
                z-index: 1003;
            ">
                <div style="
                    padding: 16px;
                    margin: -16px -16px 16px -16px;
                    background: ${currentTheme.primaryColor}15;
                    border-radius: 16px 16px 0 0;
                    text-align: center;
                    border-bottom: 2px solid ${currentTheme.primaryColor}30;
                ">
                    <div style="font-weight: 700; color: ${currentTheme.primaryColor}; font-size: 18px; margin-bottom: 4px;">
                        ${currentTexts.changeTheme}
                    </div>
                    <div style="font-size: 12px; color: ${currentTheme.textColor}; opacity: 0.7;">
                        ${currentTexts.currentTheme}: ${currentTheme.name[isRTL ? 'ar' : 'en']}
                    </div>
                </div>
                <div style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                ">
                    ${themeOptions}
                </div>
            </div>
        `;
    };

    // --- APPLY DYNAMIC STYLES ---
    const applyThemeStyles = () => {
        // Remove existing theme styles
        $('#theme-styles').remove();
        
        const themeCSS = `
            <style id="theme-styles">
                /* Apply Almarai font only to text elements, NOT icons */
                body, p, h1, h2, h3, h4, h5, h6, span:not([class*="fa"]):not([class*="icon"]), 
                div:not([class*="fa"]):not([class*="icon"]), a:not([class*="fa"]):not([class*="icon"]),
                input, textarea, select, button:not([class*="fa"]):not([class*="icon"]),
                .navbar-brand, .nav-link, .btn, .form-control, .card-title, .card-text,
                .page-title, .page-head .title-text, .sidebar-item-label {
                    font-family: 'Almarai', Arial, sans-serif !important;
                }
                
                /* Preserve FontAwesome and icon fonts */
                [class*="fa-"], [class*="fa "], .fa, 
                [class*="icon-"], [class*="icon "], .icon,
                [class*="octicon-"], [class*="octicon "], .octicon,
                [class*="glyphicon-"], [class*="glyphicon "], .glyphicon,
                .btn [class*="fa"], .btn [class*="icon"] {
                    font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Pro', 'FontAwesome', 'Font Awesome', inherit !important;
                }
                
                .app-logo {
                    max-height: none !important;
                    height: 70px !important;
                }
                
                .navbar {
                    padding: 35px 0px !important;
                    background-color: ${currentTheme.primaryColor} !important;
                    border-bottom: none !important;
                    border-bottom-left-radius: 50px !important;
                    position: fixed !important;
                    width: 100% !important;
                }
                
                .sidebar-toggle-btn {
                    display: none !important;
                }
                
                .layout-side-section {
                    display: none !important;
                }
                
                .page-container {
                    padding-right: 0px !important;
                    padding-top: 90px !important;
                    background: ${currentTheme.backgroundColor} !important;
                }
                
                .page-head {
                    background: ${currentTheme.backgroundColor} !important;
                }
                
                .title-text {
                    color: ${currentTheme.primaryColor} !important;
                }
                
                .user-image {
                    margin: 0px !important;
                }
                
                .layout-main-section-wrapper {
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
                
                .ellipsis {
                    color: ${currentTheme.primaryColor} !important;
                }
                
                .layout-main-section {
                    background: transparent !important;
                    border: none !important;    
                }
                
                .custom-menu {
                    display: none !important;
                }
                
                .shortcut-widget-box {
                    padding: 10px !important;
                    justify-content: center !important;
                    align-items: center !important;
                    transition: transform 0.3s ease !important;
                    border-radius: 8px !important;
                    border: 2px solid ${currentTheme.primaryColor}20 !important;
                    background: white !important;
                }
                
                .shortcut-widget-box:hover {
                    transform: translateY(-3px) !important;
                    background: ${currentTheme.primaryColor}10 !important;
                    border-color: ${currentTheme.primaryColor} !important;
                }
                
                .btn-primary, .btn-primary:not(:disabled):not(.disabled):active {
                    background-color: ${currentTheme.primaryColor} !important;
                    border-color: ${currentTheme.primaryColor} !important;
                }
                
                .btn-secondary {
                    background-color: ${currentTheme.secondaryColor} !important;
                    border-color: ${currentTheme.secondaryColor} !important;
                }
                
                @media (max-width: 480px) {
                    .app-logo {
                        height: 35px !important;
                        max-width: none !important;
                    }
                    .theme-changer-container {
                        ${isRTL ? 'left: 15px !important;' : 'right: 15px !important;'}
                    }
                    
                    .theme-dropdown {
                        width: 280px !important;
                    }
                }
                
                @media (max-width: 1028px) {
                    .page-container {
                        padding-top: 90px !important;
                    }
                }
            </style>
        `;
        
        $('head').append(themeCSS);
    };

    // --- APPLY THEME ---
    const applyTheme = (themeKey) => {
        if (!themes[themeKey]) return;
        
        currentThemeKey = themeKey;
        currentTheme = themes[themeKey];
        saveTheme(themeKey);
        
        // Remove existing elements
        $('.theme-changer-container').remove();
        
        // Re-apply styles and recreate elements
        applyThemeStyles();
        $('body').append(createThemeButton());
        
        // Re-bind events
        bindEvents();
        
        // Show notification
        showNotification(currentTheme.name[isRTL ? 'ar' : 'en']);
        
        console.log(`✅ Theme applied: ${currentTheme.name[isRTL ? 'ar' : 'en']}`);
    };

    // --- BIND EVENTS ---
    const bindEvents = () => {
        // Theme button click
        $('.theme-btn').off('click').on('click', function(e) {
            e.stopPropagation();
            const dropdown = $('.theme-dropdown');
            if (dropdown.length === 0) {
                $('.theme-changer-container').append(createThemeDropdown());
                $('.theme-dropdown').slideDown(200);
                bindDropdownEvents();
            } else {
                dropdown.slideToggle(200);
            }
        });

        // Button hover effects
        $('.theme-btn').hover(
            function() {
                $(this).css({
                    'background': currentTheme.secondaryColor,
                    'transform': 'translateY(-2px)',
                    'box-shadow': `0 6px 20px ${currentTheme.primaryColor}40`
                });
            },
            function() {
                $(this).css({
                    'background': currentTheme.primaryColor,
                    'transform': 'translateY(0px)',
                    'box-shadow': '0 4px 12px rgba(0,0,0,0.15)'
                });
            }
        );
    };

    // --- BIND DROPDOWN EVENTS ---
    const bindDropdownEvents = () => {
        $('.theme-option').off('click').on('click', function() {
            const selectedTheme = $(this).data('theme');
            applyTheme(selectedTheme);
            $('.theme-dropdown').slideUp(200, function() {
                $(this).remove();
            });
        });

        $('.theme-option').hover(
            function() {
                if (!$(this).find('div:contains("✓")').length) {
                    $(this).css({
                        'transform': 'scale(1.08)',
                        'box-shadow': '0 8px 25px rgba(0,0,0,0.25)'
                    });
                }
            },
            function() {
                if (!$(this).find('div:contains("✓")').length) {
                    $(this).css({
                        'transform': 'scale(1)',
                        'box-shadow': 'none'
                    });
                }
            }
        );
    };

    // --- SHOW NOTIFICATION ---
    const showNotification = (themeName) => {
        const notification = `
            <div class="theme-notification" style="
                position: fixed;
                top: 100px;
                ${isRTL ? 'left: 20px;' : 'right: 20px;'}
                background: ${currentTheme.primaryColor};
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
                font-weight: 600;
                font-size: 14px;
                z-index: 1004;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(${isRTL ? '-300px' : '300px'});
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 48px;
            ">
                <span>${isRTL ? 'تم تطبيق مظهر' : 'Theme applied'}: ${themeName}</span>
            </div>
        `;
        
        $('body').append(notification);
        
        setTimeout(() => {
            $('.theme-notification').css('transform', 'translateX(0px)');
        }, 100);
        
        setTimeout(() => {
            $('.theme-notification').css('transform', `translateX(${isRTL ? '-300px' : '300px'})`);
            setTimeout(() => {
                $('.theme-notification').remove();
            }, 300);
        }, 2000);
    };

    // --- CLOSE DROPDOWN ON OUTSIDE CLICK ---
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.theme-changer-container').length) {
            $('.theme-dropdown').slideUp(200, function() {
                $(this).remove();
            });
        }
    });

    // --- KEYBOARD SHORTCUTS ---
    $(document).keydown(function(e) {
        if (e.keyCode === 27) { // ESC key
            $('.theme-dropdown').slideUp(200, function() {
                $(this).remove();
            });
        }
        
        // Quick theme switching with Ctrl + number keys
        if (e.ctrlKey || e.metaKey) {
            const themeKeys = Object.keys(themes);
            const keyCode = e.keyCode;
            
            if (keyCode >= 49 && keyCode <= 53) { // Keys 1-5
                e.preventDefault();
                const themeIndex = keyCode - 49;
                if (themeKeys[themeIndex]) {
                    applyTheme(themeKeys[themeIndex]);
                }
            }
        }
    });

    // --- LANGUAGE CHANGE DETECTION ---
    const handleLanguageChange = () => {
        const newLang = getCurrentLanguage();
        const wasRTL = isRTL;
        const nowRTL = newLang === 'ar' || newLang.startsWith('ar');
        
        if (wasRTL !== nowRTL) {
            console.log(`Language changed, reloading theme changer...`);
            $('.theme-changer-container').remove();
            setTimeout(() => {
                location.reload();
            }, 100);
        }
    };

    // Listen for Frappe language changes
    if (window.frappe) {
        $(document).on('app_ready', handleLanguageChange);
        $(document).on('page-change', handleLanguageChange);
    }

    // --- INITIALIZE ---
    applyThemeStyles();
    $('body').append(createThemeButton());
    bindEvents();

    console.log(`✅ Simple Theme Changer (${isRTL ? 'Arabic RTL' : 'English LTL'}) loaded successfully.`);
    console.log(`🎨 Current theme: ${currentTheme.name[isRTL ? 'ar' : 'en']}`);
    console.log('⌨️ Keyboard shortcuts: Ctrl+1-5 for quick theme switching, ESC to close dropdown');
    console.log('🎯 Available themes:', Object.keys(themes).map(key => themes[key].name[isRTL ? 'ar' : 'en']).join(', '));
});