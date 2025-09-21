// const waitForLayoutMain = setInterval(() => {
//   // Ensure the .layout-main element is ready before we try to modify it.
//   if (!$('body').length) return;

//   // Check if our custom menu has already been added to prevent duplicates.
//   if ($('#custom-bilingual-menu').length === 0) {

//     // --- LANGUAGE DETECTION ---
//     const getCurrentLanguage = () => {
//       // Check Frappe's language setting
//       if (window.frappe && window.frappe.boot && window.frappe.boot.lang) {
//         return window.frappe.boot.lang;
//       }
//       // Fallback: check HTML lang attribute
//       const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
//       if (htmlLang) {
//         return htmlLang.toLowerCase();
//       }
//       // Fallback: check for Arabic content in the page
//       const hasArabicText = document.body.textContent.match(/[\u0600-\u06FF]/);
//       return hasArabicText ? 'ar' : 'en';
//     };

//     const currentLang = getCurrentLanguage();
//     const isRTL = currentLang === 'ar' || currentLang.startsWith('ar');

//     // --- MENU TRANSLATIONS ---
//     const menuItems = {
//       ar: {
//         home: 'الرئيسية',
//         projects: 'المشاريع',
//         buying: 'المشتريات',
//         selling: 'المبيعات',
//         crm: 'ادارة العملاء',
//         assets: 'الاصول',
//         users: 'المستخدمين',
//         stock: 'المخزن',
//         manufacturing: 'التصنيع'
//       },
//       en: {
//         home: 'Home',
//         projects: 'Projects',
//         buying: 'Purchasing',
//         selling: 'Sales',
//         crm: 'CRM',
//         assets: 'Assets',
//         users: 'Users',
//         stock: 'Stock',
//         manufacturing: 'Manufacturing'
//       }
//     };

//     const currentTexts = menuItems[isRTL ? 'ar' : 'en'];

//     // --- 1. INJECT STYLES & ICONS ---
//     const stylesAndIcons = `
//       <!-- Font Awesome for icons -->
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
//       <!-- Arabic Font -->
//       <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet">
      
//       <style>
//         :root {
//           --menu-primary-color: #3b82f6;
//           --menu-secondary-color: #2563eb;
//           --menu-hover-color: #1d4ed8;
//           --menu-width: 220px;
//           --menu-collapsed-width: 60px;
//           --menu-transition-speed: 0.3s;
//         }

//         .custom-menu {
//           gap: 5px;
//           margin: 5px;
//           display: flex;
//           flex-direction: column;
//           font-family: ${isRTL ? "'Almarai', sans-serif" : "'Inter', 'Segoe UI', sans-serif"};
//           background-color: var(--menu-primary-color);
//           padding: 10px;
//           border-radius: 10px;
//           width: var(--menu-width);
//           transition: width var(--menu-transition-speed) ease, transform var(--menu-transition-speed) ease;
//           position: fixed;
//           top: 70px;
//           ${isRTL ? 'right: 0px;' : 'left: 0px;'}
//           z-index: 1000;
//           box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
//           direction: ${isRTL ? 'rtl' : 'ltr'};
//         }

//         .custom-menu:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
//         }
        
//         .custom-menu.collapsed {
//           width: var(--menu-collapsed-width);
//         }
        
//         .custom-menu a.menu-btn {
//           height: 50px;
//           border-radius: 20px;
//           border: none;
//           padding: 5px;
//           background: transparent;
//           color: white;
//           font-size: 16px;
//           text-align: ${isRTL ? 'right' : 'left'};
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           white-space: nowrap;
//           overflow: hidden;
//           transition: all var(--menu-transition-speed) ease;
//           text-decoration: none;
//           position: relative;
          
//         }

//         .custom-menu a.menu-btn::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
//           border-radius: 20px;
//           opacity: 0;
//           transition: opacity var(--menu-transition-speed) ease;
//         }

//         .custom-menu a.menu-btn:hover::before {
//           opacity: 1;
//         }
        
//         .custom-menu.collapsed a.menu-btn {
//           justify-content: center;
//           flex-direction: row;
//         }
        
//         .custom-menu.collapsed a.menu-btn span {
//           display: none;
//         }
        
//         .custom-menu a.menu-btn i {
//           color: white;
//           min-width: 20px;
//           text-align: center;
//           transition: all var(--menu-transition-speed) ease;
//         }
        
//         .custom-menu a.menu-btn:hover {
//           background-color: black;
//           cursor: pointer;
//           transform: ${isRTL ? 'translateX(-4px)' : 'translateX(4px)'};
//         }

//         .custom-menu a.menu-btn:active {
//           transform: ${isRTL ? 'translateX(-2px) scale(0.98)' : 'translateX(2px) scale(0.98)'};
//         }
        
//         .custom-menu a.menu-btn.active {
//           background: linear-gradient(135deg, white, #f8fafc);
//           color: var(--menu-primary-color);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           transform: ${isRTL ? 'translateX(-4px)' : 'translateX(4px)'};
//         }
        
//         .custom-menu a.menu-btn.active i {
//           color: var(--menu-primary-color);
//         }

//         .custom-menu a.menu-btn.active:hover {
//           background: linear-gradient(135deg, #f8fafc, #e2e8f0);
//           transform: ${isRTL ? 'translateX(-4px)' : 'translateX(4px)'};
//         }
        
//         .collapse-toggle {
//           background: linear-gradient(135deg, var(--menu-secondary-color), var(--menu-hover-color));
//           color: white;
//           border: none;
//           border-radius: 10px;
//           height: 35px;
//           cursor: pointer;
//           margin-bottom: 10px;
//           transition: all var(--menu-transition-speed) ease;
//           font-size: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           overflow: hidden;
//         }

//         .collapse-toggle::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           ${isRTL ? 'right: -100%;' : 'left: -100%;'}
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           transition: ${isRTL ? 'right' : 'left'} 0.5s ease;
//         }

//         .collapse-toggle:hover::before {
//           ${isRTL ? 'right: 100%;' : 'left: 100%;'}
//         }
        
//         .collapse-toggle:hover {
//           background: linear-gradient(135deg, var(--menu-hover-color), #1e40af);
//           transform: scale(1.02);
//         }

//         .collapse-toggle:active {
//           transform: scale(0.98);
//         }

//         /* Collapsed state styling */
//         .custom-menu.collapsed .collapse-toggle {
//           margin-bottom: 10px;
//         }

//         .custom-menu.collapsed a.menu-btn {
//           justify-content: center;
//           padding: 5px;
//         }

//         /* Page container styles */
//         .page-container {
//           transition: margin-${isRTL ? 'right' : 'left'} var(--menu-transition-speed) ease;
//         }

//         .page-container.menu-expanded {
//           margin-${isRTL ? 'right' : 'left'}: 200px;
//         }

//         /* Responsive design */
//         @media (max-width: 1028px) {
//           .custom-menu {
//             display: none !important;
//           }
          
//           .page-container.menu-expanded {
//             margin-${isRTL ? 'right' : 'left'}: 0 !important;
//           }
//         }

//         /* Smooth transitions for all interactive elements */
//         .custom-menu * {
//           transition: inherit;
//         }

//         /* Loading animation */
//         @keyframes slideIn${isRTL ? 'RTL' : 'LTR'} {
//           from {
//             opacity: 0;
//             transform: ${isRTL ? 'translateX(20px)' : 'translateX(-20px)'};
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .custom-menu {
//           animation: slideIn${isRTL ? 'RTL' : 'LTR'} 0.5s ease-out;
//         }

//         /* Hover effect for the entire menu */
//         .custom-menu:hover {
//           box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
//         }

//         /* Language-specific text styling */
//         .custom-menu span {
//           font-weight: ${isRTL ? '500' : '400'};
//           letter-spacing: ${isRTL ? '0' : '0.025em'};
//         }
//       </style>
//     `;

//     // Add styles to head
//     $('head').append(stylesAndIcons);

//     // --- 2. CREATE HTML ELEMENTS ---
//     const menuHtml = `
//       <div class="custom-menu" id="custom-bilingual-menu">
//         <button class="collapse-toggle" id="menuCollapseToggle" aria-label="Toggle Menu">☰</button>
//         <a class="menu-btn" href="/app/home">
//           <i class="fas fa-home"></i>
//           <span>${currentTexts.home}</span>
//         </a>
//         <a class="menu-btn" href="/app/projects">
//           <i class="fas fa-file"></i>
//           <span>${currentTexts.projects}</span>
//         </a>
//         <a class="menu-btn" href="/app/buying">
//           <i class="fas fa-cart-flatbed"></i>
//           <span>${currentTexts.buying}</span>
//         </a>
//         <a class="menu-btn" href="/app/selling">
//           <i class="fas fa-money-bill-1"></i>
//           <span>${currentTexts.selling}</span>
//         </a>
//         <a class="menu-btn" href="/app/crm">
//           <i class="fas fa-users"></i>
//           <span>${currentTexts.crm}</span>
//         </a>
//         <a class="menu-btn" href="/app/assets">
//           <i class="fas fa-wallet"></i>
//           <span>${currentTexts.assets}</span>
//         </a>
//         <a class="menu-btn" href="/app/users">
//           <i class="fas fa-user"></i>
//           <span>${currentTexts.users}</span>
//         </a>
//         <a class="menu-btn" href="/app/stock">
//           <i class="fas fa-building"></i>
//           <span>${currentTexts.stock}</span>
//         </a>
//         <a class="menu-btn" href="/app/manufacturing">
//           <i class="fas fa-city"></i>
//           <span>${currentTexts.manufacturing}</span>
//         </a>
//       </div>
//     `;

//     // --- 3. INJECT THE MENU INTO THE DOM ---
//     $('body').prepend(menuHtml);

//     // --- 4. ATTACH JQUERY EVENT HANDLERS ---
    
//     // Function to update page container margin
//     const updatePageContainerMargin = (isExpanded) => {
//       const pageContainer = $('.page-container');
//       if (pageContainer.length) {
//         if (isExpanded) {
//           pageContainer.addClass('menu-expanded');
//           console.log(`Page container margin set to 200px on ${isRTL ? 'right' : 'left'}`);
//         } else {
//           pageContainer.removeClass('menu-expanded');
//           console.log('Page container margin removed');
//         }
//       }
//     };

//     // Toggle collapse functionality
//     const toggleMenuCollapse = () => {
//       const menu = $('#custom-bilingual-menu');
//       const isCurrentlyCollapsed = menu.hasClass('collapsed');
      
//       menu.toggleClass('collapsed');
      
//       // Update page container margin based on new state
//       updatePageContainerMargin(isCurrentlyCollapsed); // If currently collapsed, we're expanding
      
//       console.log('Menu collapse toggled');
//     };

//     // Handle menu item clicks
//     const handleMenuClick = (event) => {
//       const clickedItem = $(event.currentTarget);
      
//       // Remove active class from all menu items
//       $('.custom-menu a.menu-btn').removeClass('active');
      
//       // Add active class to clicked item
//       clickedItem.addClass('active');
      
//       console.log(`Menu item clicked: ${clickedItem.find('span').text()}`);
//     };

//     // Async function to highlight active link on load
//     const highlightActiveLink = async () => {
//       const currentURL = window.location.href.toLowerCase();
      
//       // Small delay to ensure DOM is ready
//       await new Promise(resolve => setTimeout(resolve, 100));
      
//       $('.custom-menu a.menu-btn').each(function () {
//         const linkHref = this.href.toLowerCase();
//         if (currentURL.startsWith(linkHref)) {
//           $(this).addClass('active');
//           console.log(`Active link highlighted: ${$(this).find('span').text()}`);
//         }
//       });
//     };

//     // Initialize page container margin based on initial menu state
//     const initializePageContainer = () => {
//       const menu = $('#custom-bilingual-menu');
//       const isCollapsed = menu.hasClass('collapsed');
//       updatePageContainerMargin(!isCollapsed); // Menu starts expanded by default
//     };

//     // Language change detection and menu refresh
//     const handleLanguageChange = () => {
//       const newLang = getCurrentLanguage();
//       const wasRTL = isRTL;
//       const nowRTL = newLang === 'ar' || newLang.startsWith('ar');
      
//       if (wasRTL !== nowRTL) {
//         console.log(`Language changed from ${wasRTL ? 'Arabic' : 'English'} to ${nowRTL ? 'Arabic' : 'English'}, reloading menu...`);
//         $('#custom-bilingual-menu').remove();
//         clearInterval(waitForLayoutMain);
//         // Restart the menu injection with new language
//         setTimeout(() => {
//           const newInterval = setInterval(() => {
//             if (!$('body').length) return;
//             if ($('#custom-bilingual-menu').length === 0) {
//               // Re-run the entire menu creation process
//               location.reload(); // Simple approach - reload the page
//             }
//           }, 100);
//         }, 100);
//       }
//     };

//     // Listen for Frappe language changes
//     if (window.frappe) {
//       $(document).on('app_ready', handleLanguageChange);
//       $(document).on('page-change', handleLanguageChange);
//     }

//     // Bind event handlers
//     $('#menuCollapseToggle').on('click', toggleMenuCollapse);
//     $('.custom-menu a.menu-btn').on('click', handleMenuClick);

//     // Keyboard accessibility
//     $('#menuCollapseToggle, .custom-menu a.menu-btn').on('keydown', function(event) {
//       if (event.key === 'Enter' || event.key === ' ') {
//         event.preventDefault();
//         $(this).click();
//       }
//     });

//     // Initialize active link highlighting and page container
//     highlightActiveLink();
//     initializePageContainer();

//     console.log(`✅ Custom Bilingual Menu (${isRTL ? 'Arabic RTL' : 'English LTR'}) with enhanced styling and page container control injected and configured.`);
//     clearInterval(waitForLayoutMain); // Stop the interval from running again.
//   }
// }, 100);

// menu for mobile
// ///////////////////////////////////////
//////////////////////////////////////////
// $(document).ready(function() {
//   // --- LANGUAGE DETECTION ---
//   const getCurrentLanguage = () => {
//     // Check Frappe's language setting
//     if (window.frappe && window.frappe.boot && window.frappe.boot.lang) {
//       return window.frappe.boot.lang;
//     }
//     // Fallback: check HTML lang attribute
//     const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
//     if (htmlLang) {
//       return htmlLang.toLowerCase();
//     }
//     // Fallback: check for Arabic content in the page
//     const hasArabicText = document.body.textContent.match(/[\u0600-\u06FF]/);
//     return hasArabicText ? 'ar' : 'en';
//   };

//   const currentLang = getCurrentLanguage();
//   const isRTL = currentLang === 'ar' || currentLang.startsWith('ar');

//   // --- MENU TRANSLATIONS ---
//   const menuItems = {
//     ar: {
//       title: 'وحدات ERPNext',
//       toggleText: 'القائمة',
//       accounting: 'المحاسبة',
//       selling: 'المبيعات',
//       buying: 'المشتريات',
//       stock: 'المخزون',
//       manufacturing: 'التصنيع',
//       crm: 'إدارة العملاء',
//       projects: 'المشاريع',
//       assets: 'الأصول',
//       quality: 'إدارة الجودة',
//       support: 'الدعم الفني',
//       website: 'الموقع الإلكتروني'
//     },
//     en: {
//       title: 'ERPNext Modules',
//       toggleText: 'Menu',
//       accounting: 'Accounting',
//       selling: 'Sales',
//       buying: 'Purchasing',
//       stock: 'Stock',
//       manufacturing: 'Manufacturing',
//       crm: 'CRM',
//       projects: 'Projects',
//       assets: 'Assets',
//       quality: 'Quality',
//       support: 'Support',
//       website: 'Website'
//     }
//   };

//   const currentTexts = menuItems[isRTL ? 'ar' : 'en'];

//   // Add fonts and icons
//   if (!$('link[href*="Almarai"]').length) {
//     $('head').append('<link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;600&display=swap" rel="stylesheet">');
//   }
//   if (!$('link[href*="font-awesome"]').length) {
//     $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">');
//   }

//   // Create toggle button
//   const toggleButton = `
//     <div class="erp-toggle" style="
//         position: fixed;
//         top: 50%;
//         ${isRTL ? 'right: 0;' : 'left: 0;'}
//         transform: translateY(-50%);
//         z-index: 1001;
//         background: #2563eb;
//         color: white;
//         padding: 12px 6px;
//         border-radius: ${isRTL ? '8px 0 0 8px;' : '0 8px 8px 0;'}
//         cursor: pointer;
//         box-shadow: ${isRTL ? '-3px 0 10px rgba(37, 99, 235, 0.3);' : '3px 0 10px rgba(37, 99, 235, 0.3);'}
//         font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
//         font-weight: 600;
//         font-size: 11px;
//         transition: all 0.3s ease;
//         writing-mode: vertical-${isRTL ? 'rl' : 'lr'};
//         user-select: none;
//         direction: ${isRTL ? 'rtl' : 'ltr'};
//     ">
//         ${currentTexts.toggleText}
//     </div>
//   `;

//   // Create the simple sidebar (width changed to 170px)
//   const erpSidebar = `
//     <div class="erp-sidebar" style="
//         position: fixed;
//         top: 0;
//         ${isRTL ? 'right: -170px;' : 'left: -170px;'}
//         width: 170px;
//         height: 100vh;
//         background: white;
//         box-shadow: ${isRTL ? '-3px 0 15px rgba(0,0,0,0.1);' : '3px 0 15px rgba(0,0,0,0.1);'}
//         font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
//         z-index: 1000;
//         transition: ${isRTL ? 'right' : 'left'} 0.3s ease;
//         border-${isRTL ? 'left' : 'right'}: 1px solid #e5e7eb;
//         direction: ${isRTL ? 'rtl' : 'ltr'};
//     ">
//         <!-- Header -->
//         <div style="
//             background: #2563eb;
//             color: white;
//             padding: 16px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
            
//         ">
//             <h3 style="margin: 0; font-size: 14px; font-weight: 600; text-align: ${isRTL ? 'right' : 'left'};">${currentTexts.title}</h3>
//             <button class="close-btn" style="
//                 background: none;
//                 border: none;
//                 color: white;
//                 font-size: 18px;
//                 cursor: pointer;
//                 padding: 2px 6px;
//                 border-radius: 4px;
//             ">×</button>
//         </div>

//         <!-- Menu Items -->
//         <div style="padding: 8px 0;">
//             <a href="/app/accounting" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-calculator" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.accounting}</span>
//             </a>

//             <a href="/app/selling" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-shopping-cart" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.selling}</span>
//             </a>

//             <a href="/app/buying" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-box" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.buying}</span>
//             </a>

//             <a href="/app/stock" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-warehouse" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.stock}</span>
//             </a>

//             <a href="/app/manufacturing" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-industry" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.manufacturing}</span>
//             </a>

//             <a href="/app/crm" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-users" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.crm}</span>
//             </a>

//             <a href="/app/projects" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-project-diagram" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.projects}</span>
//             </a>

//             <a href="/app/assets" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-building" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.assets}</span>
//             </a>

//             <a href="/app/quality" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-award" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.quality}</span>
//             </a>

//             <a href="/app/support" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-headset" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.support}</span>
//             </a>

//             <a href="/app/website" class="erp-item" style="
//                 display: flex;
//                 align-items: center;
//                 gap: 8px;
//                 padding: 10px 12px;
//                 color: #374151;
//                 text-decoration: none;
//                 transition: all 0.2s ease;
//                 border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
//                 text-align: ${isRTL ? 'right' : 'left'};
//             ">
//                 <i class="fas fa-globe" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
//                 <span style="font-size: 12px; font-weight: 600;">${currentTexts.website}</span>
//             </a>
//         </div>
//     </div>

//     <!-- Overlay -->
//     <div class="sidebar-overlay" style="
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100vw;
//         height: 100vh;
//         background: rgba(0,0,0,0.2);
//         z-index: 999;
//         opacity: 0;
//         visibility: hidden;
//         transition: all 0.3s ease;
//     "></div>
//   `;

//   // Add elements to the page
//   $('body').append(toggleButton + erpSidebar);

//   // Toggle functionality
//   $('.erp-toggle').click(function() {
//     const sidebar = $('.erp-sidebar');
//     const currentPosition = isRTL ? sidebar.css('right') : sidebar.css('left');
//     const isOpen = currentPosition === '0px';
    
//     if (isOpen) {
//       closeSidebar();
//     } else {
//       openSidebar();
//     }
//   });

//   // Close button
//   $('.close-btn').click(function() {
//     closeSidebar();
//   });

//   // Overlay click to close
//   $('.sidebar-overlay').click(function() {
//     closeSidebar();
//   });

//   // Close sidebar when clicking on any menu item link
//   $('.erp-item').click(function() {
//     closeSidebar();
//   });

//   // Open sidebar function (updated for 170px width)
//   function openSidebar() {
//     if (isRTL) {
//       $('.erp-sidebar').css('right', '0px');
//       $('.erp-toggle').css('right', '170px');
//     } else {
//       $('.erp-sidebar').css('left', '0px');
//       $('.erp-toggle').css('left', '170px');
//     }
//     $('.sidebar-overlay').css({
//       'opacity': '1',
//       'visibility': 'visible'
//     });
//   }

//   // Close sidebar function (updated for 170px width)
//   function closeSidebar() {
//     if (isRTL) {
//       $('.erp-sidebar').css('right', '-170px');
//       $('.erp-toggle').css('right', '0px');
//     } else {
//       $('.erp-sidebar').css('left', '-170px');
//       $('.erp-toggle').css('left', '0px');
//     }
//     $('.sidebar-overlay').css({
//       'opacity': '0',
//       'visibility': 'hidden'
//     });
//   }

//   // Menu item hover effects (darker blue background)
//   $('.erp-item').hover(
//     function() {
//       $(this).css({
//         'background-color': '#1d4ed8',
//         'color': 'white',
//         [`border-${isRTL ? 'right' : 'left'}-color`]: '#ffffff'
//       });
//     },
//     function() {
//       $(this).css({
//         'background-color': 'transparent',
//         'color': '#374151',
//         [`border-${isRTL ? 'right' : 'left'}-color`]: 'transparent'
//       });
//     }
//   );

//   // Close button hover effect
//   $('.close-btn').hover(
//     function() {
//       $(this).css('background', 'rgba(255,255,255,0.2)');
//     },
//     function() {
//       $(this).css('background', 'none');
//     }
//   );

//   // Toggle button hover effect (darker blue)
//   $('.erp-toggle').hover(
//     function() {
//       $(this).css('background', '#1d4ed8');
//     },
//     function() {
//       $(this).css('background', '#2563eb');
//     }
//   );

//   // Keyboard shortcut (ESC to close)
//   $(document).keydown(function(e) {
//     if (e.keyCode === 27) {
//       closeSidebar();
//     }
//   });

//   // Language change detection and sidebar refresh
//   const handleLanguageChange = () => {
//     const newLang = getCurrentLanguage();
//     const wasRTL = isRTL;
//     const nowRTL = newLang === 'ar' || newLang.startsWith('ar');
    
//     if (wasRTL !== nowRTL) {
//       console.log(`Language changed from ${wasRTL ? 'Arabic' : 'English'} to ${nowRTL ? 'Arabic' : 'English'}, reloading sidebar...`);
//       $('.erp-sidebar, .erp-toggle, .sidebar-overlay').remove();
//       // Re-initialize with new language
//       setTimeout(() => {
//         location.reload(); // Simple approach - reload the page
//       }, 100);
//     }
//   };

//   // Listen for Frappe language changes
//   if (window.frappe) {
//     $(document).on('app_ready', handleLanguageChange);
//     $(document).on('page-change', handleLanguageChange);
//   }

//   console.log(`✅ Enhanced Bilingual ERP Sidebar (${isRTL ? 'Arabic RTL' : 'English LTR'}) with 170px width and white icons loaded successfully.`);

//  });






$(document).ready(function() {
  // --- THEME SYSTEM INTEGRATION ---
  const getThemeColors = () => {
    // Try to get current theme from localStorage (set by theme changer)
    const savedTheme = localStorage.getItem('frappe_theme') || 'blue';
    
    const themes = {
      blue: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1d4ed8',
        backgroundColor: 'aliceblue',
        textColor: '#374151'
      },
      green: {
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        backgroundColor: '#f0fdf4',
        textColor: '#064e3b'
      },
      purple: {
        primaryColor: '#8b5cf6',
        secondaryColor: '#7c3aed',
        backgroundColor: '#faf5ff',
        textColor: '#581c87'
      },
      orange: {
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        backgroundColor: '#fffbeb',
        textColor: '#92400e'
      },
      red: {
        primaryColor: '#ef4444',
        secondaryColor: '#dc2626',
        backgroundColor: '#fef2f2',
        textColor: '#991b1b'
      }
    };

    return themes[savedTheme] || themes.blue;
  };

  let currentTheme = getThemeColors();

  // --- LANGUAGE DETECTION ---
  const getCurrentLanguage = () => {
    // Check Frappe's language setting
    if (window.frappe && window.frappe.boot && window.frappe.boot.lang) {
      return window.frappe.boot.lang;
    }
    // Fallback: check HTML lang attribute
    const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
    if (htmlLang) {
      return htmlLang.toLowerCase();
    }
    // Fallback: check for Arabic content in the page
    const hasArabicText = document.body.textContent.match(/[\u0600-\u06FF]/);
    return hasArabicText ? 'ar' : 'en';
  };

  const currentLang = getCurrentLanguage();
  const isRTL = currentLang === 'ar' || currentLang.startsWith('ar');

  // --- MENU TRANSLATIONS ---
  const menuItems = {
    ar: {
      title: 'وحدات ERPNext',
      toggleText: 'القائمة',
      accounting: 'المحاسبة',
      selling: 'المبيعات',
      buying: 'المشتريات',
      stock: 'المخزون',
      manufacturing: 'التصنيع',
      crm: 'إدارة العملاء',
      projects: 'المشاريع',
      assets: 'الأصول',
      quality: 'إدارة الجودة',
      support: 'الدعم الفني',
      website: 'الموقع الإلكتروني'
    },
    en: {
      title: 'ERPNext Modules',
      toggleText: 'Menu',
      accounting: 'Accounting',
      selling: 'Sales',
      buying: 'Purchasing',
      stock: 'Stock',
      manufacturing: 'Manufacturing',
      crm: 'CRM',
      projects: 'Projects',
      assets: 'Assets',
      quality: 'Quality',
      support: 'Support',
      website: 'Website'
    }
  };

  const currentTexts = menuItems[isRTL ? 'ar' : 'en'];

  // Add fonts and icons
  if (!$('link[href*="Almarai"]').length) {
    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;600&display=swap" rel="stylesheet">');
  }
  if (!$('link[href*="font-awesome"]').length) {
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">');
  }

  // --- CREATE THEMED ELEMENTS ---
  const createToggleButton = () => {
    return `
      <div class="erp-toggle" style="
          position: fixed;
          top: 50%;
          ${isRTL ? 'right: 0;' : 'left: 0;'}
          transform: translateY(-50%);
          z-index: 1001;
          background: ${currentTheme.primaryColor};
          color: white;
          padding: 12px 6px;
          border-radius: ${isRTL ? '8px 0 0 8px;' : '0 8px 8px 0;'}
          cursor: pointer;
          box-shadow: ${isRTL ? '-3px 0 10px ' + currentTheme.primaryColor + '50;' : '3px 0 10px ' + currentTheme.primaryColor + '50;'}
          font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
          font-weight: 600;
          font-size: 11px;
          transition: all 0.3s ease;
          writing-mode: vertical-${isRTL ? 'rl' : 'lr'};
          user-select: none;
          direction: ${isRTL ? 'rtl' : 'ltr'};
      ">
          ${currentTexts.toggleText}
      </div>
    `;
  };

  const createSidebar = () => {
    return `
      <div class="erp-sidebar" style="
          position: fixed;
          top: 0;
          ${isRTL ? 'right: -170px;' : 'left: -170px;'}
          width: 170px;
          height: 100vh;
          background: ${currentTheme.primaryColor};
          box-shadow: ${isRTL ? '-3px 0 15px rgba(0,0,0,0.1);' : '3px 0 15px rgba(0,0,0,0.1);'}
          font-family: ${isRTL ? "'Almarai', sans-serif;" : "'Inter', 'Segoe UI', sans-serif;"}
          z-index: 1000;
          transition: ${isRTL ? 'right' : 'left'} 0.3s ease;
          border-${isRTL ? 'left' : 'right'}: 1px solid ${currentTheme.secondaryColor};
          direction: ${isRTL ? 'rtl' : 'ltr'};
      ">
          <!-- Header -->
          <div style="
              background: ${currentTheme.secondaryColor};
              color: white;
              padding: 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
          ">
              <h3 style="margin: 0; font-size: 14px; font-weight: 600; text-align: ${isRTL ? 'right' : 'left'};">${currentTexts.title}</h3>
              <button class="close-btn" style="
                  background: none;
                  border: none;
                  color: white;
                  font-size: 18px;
                  cursor: pointer;
                  padding: 2px 6px;
                  border-radius: 4px;
              ">×</button>
          </div>

          <!-- Menu Items -->
          <div style="padding: 8px 0;">
              <a href="/app/accounting" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-calculator" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.accounting}</span>
              </a>

              <a href="/app/selling" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-shopping-cart" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.selling}</span>
              </a>

              <a href="/app/buying" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-box" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.buying}</span>
              </a>

              <a href="/app/stock" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-warehouse" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.stock}</span>
              </a>

              <a href="/app/manufacturing" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-industry" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.manufacturing}</span>
              </a>

              <a href="/app/crm" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-users" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.crm}</span>
              </a>

              <a href="/app/projects" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-project-diagram" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.projects}</span>
              </a>

              <a href="/app/assets" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-building" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.assets}</span>
              </a>

              <a href="/app/quality" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-award" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.quality}</span>
              </a>

              <a href="/app/support" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-headset" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.support}</span>
              </a>

              <a href="/app/website" class="erp-item" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 12px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  border-${isRTL ? 'right' : 'left'}: 3px solid transparent;
                  text-align: ${isRTL ? 'right' : 'left'};
              ">
                  <i class="fas fa-globe" style="font-size: 14px; color: white; min-width: 16px; text-align: center;"></i>
                  <span style="font-size: 12px; font-weight: 600;">${currentTexts.website}</span>
              </a>
          </div>
      </div>

      <!-- Overlay -->
      <div class="sidebar-overlay" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.2);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
      "></div>
    `;
  };

  // --- UPDATE THEME FUNCTION ---
  const updateSidebarTheme = () => {
    currentTheme = getThemeColors();
    
    // Remove existing sidebar
    $('.erp-sidebar, .erp-toggle, .sidebar-overlay').remove();
    
    // Recreate with new theme
    $('body').append(createToggleButton() + createSidebar());
    
    // Re-bind events
    bindEvents();
    
    console.log('🎨 Sidebar theme updated to match current theme');
  };

  // --- BIND EVENTS ---
  const bindEvents = () => {
    // Toggle functionality
    $('.erp-toggle').off('click').on('click', function() {
      const sidebar = $('.erp-sidebar');
      const currentPosition = isRTL ? sidebar.css('right') : sidebar.css('left');
      const isOpen = currentPosition === '0px';
      
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Close button
    $('.close-btn').off('click').on('click', function() {
      closeSidebar();
    });

    // Overlay click to close
    $('.sidebar-overlay').off('click').on('click', function() {
      closeSidebar();
    });

    // Close sidebar when clicking on any menu item link
    $('.erp-item').off('click').on('click', function() {
      closeSidebar();
    });

    // Menu item hover effects
    $('.erp-item').off('mouseenter mouseleave').hover(
      function() {
        $(this).css({
          'background-color': currentTheme.secondaryColor,
          'color': 'white',
          [`border-${isRTL ? 'right' : 'left'}-color`]: '#ffffff'
        });
        $(this).find('i').css('color', 'white');
      },
      function() {
        $(this).css({
          'background-color': 'transparent',
          'color': 'white',
          [`border-${isRTL ? 'right' : 'left'}-color`]: 'transparent'
        });
        $(this).find('i').css('color', 'white');
      }
    );

    // Close button hover effect
    $('.close-btn').off('mouseenter mouseleave').hover(
      function() {
        $(this).css('background', 'rgba(255,255,255,0.2)');
      },
      function() {
        $(this).css('background', 'none');
      }
    );

    // Toggle button hover effect
    $('.erp-toggle').off('mouseenter mouseleave').hover(
      function() {
        $(this).css('background', currentTheme.secondaryColor);
      },
      function() {
        $(this).css('background', currentTheme.primaryColor);
      }
    );
  };

  // Open sidebar function
  function openSidebar() {
    if (isRTL) {
      $('.erp-sidebar').css('right', '0px');
      $('.erp-toggle').css('right', '170px');
    } else {
      $('.erp-sidebar').css('left', '0px');
      $('.erp-toggle').css('left', '170px');
    }
    $('.sidebar-overlay').css({
      'opacity': '1',
      'visibility': 'visible'
    });
  }

  // Close sidebar function
  function closeSidebar() {
    if (isRTL) {
      $('.erp-sidebar').css('right', '-170px');
      $('.erp-toggle').css('right', '0px');
    } else {
      $('.erp-sidebar').css('left', '-170px');
      $('.erp-toggle').css('left', '0px');
    }
    $('.sidebar-overlay').css({
      'opacity': '0',
      'visibility': 'hidden'
    });
  }

  // Keyboard shortcut (ESC to close)
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      closeSidebar();
    }
  });

  // Language change detection and sidebar refresh
  const handleLanguageChange = () => {
    const newLang = getCurrentLanguage();
    const wasRTL = isRTL;
    const nowRTL = newLang === 'ar' || newLang.startsWith('ar');
    
    if (wasRTL !== nowRTL) {
      console.log(`Language changed from ${wasRTL ? 'Arabic' : 'English'} to ${nowRTL ? 'Arabic' : 'English'}, reloading sidebar...`);
      $('.erp-sidebar, .erp-toggle, .sidebar-overlay').remove();
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  };

  // --- THEME CHANGE DETECTION ---
  // Listen for localStorage changes (theme changes)
  let lastTheme = localStorage.getItem('frappe_theme') || 'blue';
  
  const checkThemeChange = () => {
    const newTheme = localStorage.getItem('frappe_theme') || 'blue';
    if (newTheme !== lastTheme) {
      lastTheme = newTheme;
      updateSidebarTheme();
    }
  };

  // Check for theme changes every 500ms
  setInterval(checkThemeChange, 500);

  // Listen for storage events (theme changes in other tabs)
  window.addEventListener('storage', function(e) {
    if (e.key === 'frappe_theme') {
      updateSidebarTheme();
    }
  });

  // Listen for Frappe language changes
  if (window.frappe) {
    $(document).on('app_ready', handleLanguageChange);
    $(document).on('page-change', handleLanguageChange);
  }

  // --- INITIALIZE ---
  $('body').append(createToggleButton() + createSidebar());
  bindEvents();

  console.log(`✅ Theme-Integrated ERP Sidebar (${isRTL ? 'Arabic RTL' : 'English LTR'}) loaded successfully.`);
  console.log(`🎨 Current theme: ${lastTheme}`);
});