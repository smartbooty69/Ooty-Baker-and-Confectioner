document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const dropdowns = document.querySelectorAll('.sidebar-menu-dropdown');
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const darkModeSwitch = document.querySelector('.darkmode-switch');

    // Toggle sidebar on mobile
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    // Close sidebar on mobile
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Handle dropdown menus
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.sidebar-menu-dropdown');
        const dropdownContent = dropdown.querySelector('.sidebar-menu-dropdown-content');
        const dropdownIcon = dropdown.querySelector('.dropdown-icon');

        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherContent = otherDropdown.querySelector('.sidebar-menu-dropdown-content');
                    const otherIcon = otherDropdown.querySelector('.dropdown-icon');
                    otherContent.style.height = '0';
                    otherIcon.classList.remove('active');
                }
            });

            // Toggle current dropdown
            const isOpen = dropdownContent.style.height !== '0px' && dropdownContent.style.height !== '';
            dropdownContent.style.height = isOpen ? '0' : `${dropdownContent.scrollHeight}px`;
            dropdownIcon.classList.toggle('active');
        });
    });

    // Handle dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark');
            darkModeSwitch.classList.toggle('active');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark');
            localStorage.setItem('darkMode', isDarkMode);
        });

        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark');
            darkModeSwitch.classList.add('active');
        }
    }

    // Handle sidebar collapse
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
    }

    // Add collapse button to sidebar
    const collapseButton = document.createElement('button');
    collapseButton.className = 'collapse-btn';
    collapseButton.innerHTML = '<i class="bx bx-chevron-left"></i>';
    sidebar.querySelector('.sidebar-container').appendChild(collapseButton);

    collapseButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        
        // Update collapse button icon
        collapseButton.innerHTML = isCollapsed ? 
            '<i class="bx bx-chevron-right"></i>' : 
            '<i class="bx bx-chevron-left"></i>';
    });

    // Handle active menu items
    const menuLinks = document.querySelectorAll('.sidebar-menu > li > a:not(.sidebar-menu-dropdown)');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1280 && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1280) {
                sidebar.classList.remove('active');
            }
        }, 250);
    });
}); 