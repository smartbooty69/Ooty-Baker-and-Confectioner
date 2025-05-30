// JavaScript for mobile sidebar functionality
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    const isOpen = mobileSidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Mobile Products Submenu Toggle
const mobileProductsToggle = document.getElementById('mobileProductsToggle');
const mobileProductsSubmenu = document.getElementById('mobileProductsSubmenu');
const mobileProductsIcon = document.getElementById('mobileProductsIcon');

if (mobileProductsToggle && mobileProductsSubmenu && mobileProductsIcon) {
    mobileProductsToggle.addEventListener('click', () => {
        const isOpen = mobileProductsSubmenu.classList.toggle('is-open');
        if (isOpen) {
            mobileProductsSubmenu.style.maxHeight = mobileProductsSubmenu.scrollHeight + 'px';
            mobileProductsIcon.textContent = '−'; // Minus sign
        } else {
            mobileProductsSubmenu.style.maxHeight = '0';
            mobileProductsIcon.textContent = '+';
        }
    });
}

// Close sidebar if a nav item (excluding submenu toggle) or submenu item is clicked
document.querySelectorAll('.gimme-sidebar-nav-item a, .mobile-submenu a').forEach(item => {
    item.addEventListener('click', () => {
        if (mobileSidebar.classList.contains('is-open')) {
            // Only close if it's not the submenu toggle itself
            if (!item.closest('.sidebar-nav-toggle')) {
                toggleSidebar();
            }
        }
    });
});

// Desktop dropdown functionality
const desktopProductsToggle = document.getElementById('desktopProductsToggle');
const desktopProductsDropdown = document.getElementById('desktopProductsDropdown');
const dropdownContainer = document.querySelector('.nav-item-dropdown-container');

// Mouse enter event for the container
dropdownContainer.addEventListener('mouseenter', () => {
    desktopProductsDropdown.style.display = 'block';
});

// Mouse leave event for the container
dropdownContainer.addEventListener('mouseleave', () => {
    desktopProductsDropdown.style.display = 'none';
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        desktopProductsDropdown.style.display = 'none';
    }
});

// Mobile Treatments Submenu Toggle
const mobileTreatmentsToggle = document.getElementById('mobileTreatmentsToggle');
const mobileTreatmentsSubmenu = document.getElementById('mobileTreatmentsSubmenu');
const mobileTreatmentsIcon = document.getElementById('mobileTreatmentsIcon');

if (mobileTreatmentsToggle && mobileTreatmentsSubmenu && mobileTreatmentsIcon) {
    mobileTreatmentsToggle.addEventListener('click', () => {
        const isOpen = mobileTreatmentsSubmenu.classList.toggle('is-open');
        if (isOpen) {
            mobileTreatmentsSubmenu.style.maxHeight = mobileTreatmentsSubmenu.scrollHeight + 'px';
            mobileTreatmentsIcon.textContent = '−'; // Minus sign
        } else {
            mobileTreatmentsSubmenu.style.maxHeight = '0';
            mobileTreatmentsIcon.textContent = '+';
        }
    });
}

// Close sidebar if a nav item (excluding submenu toggle) or submenu item is clicked
document.querySelectorAll('.sidebar-nav-item a, .mobile-submenu a, .get-started-btn-mobile').forEach(item => {
    item.addEventListener('click', () => {
        if (mobileSidebar.classList.contains('is-open')) {
            // Only close if it's not the submenu toggle itself
            if (!item.closest('.sidebar-nav-toggle')) {
                toggleSidebar();
            }
        }
    });
});

// Desktop dropdown accessibility (focus management)
const desktopTreatmentsToggle = document.getElementById('desktopTreatmentsToggle');
const desktopTreatmentsDropdown = document.getElementById('desktopTreatmentsDropdown');

if(desktopTreatmentsToggle && desktopTreatmentsDropdown) {
    desktopTreatmentsToggle.addEventListener('click', function(event) {
        // Prevent default if it's a link with href="#"
        if (this.getAttribute('href') === '#') {
            event.preventDefault();
        }
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        desktopTreatmentsDropdown.style.display = isExpanded ? 'none' : 'block';
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(event) {
        if (!desktopTreatmentsToggle.contains(event.target) && !desktopTreatmentsDropdown.contains(event.target)) {
            desktopTreatmentsToggle.setAttribute('aria-expanded', 'false');
            desktopTreatmentsDropdown.style.display = 'none';
        }
    });

    // Keyboard navigation for desktop dropdown
    desktopTreatmentsDropdown.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            desktopTreatmentsToggle.setAttribute('aria-expanded', 'false');
            desktopTreatmentsDropdown.style.display = 'none';
            desktopTreatmentsToggle.focus();
        }
    });
}

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

setInterval(nextSlide, 4000);

document.addEventListener("DOMContentLoaded", function() {
    console.log("Carousel script started!"); // 1. Check if the script runs at all

    const wrappers = document.querySelectorAll(".wrapper");
    console.log(wrappers.length + " carousel wrappers found."); // 2. Check if it finds your carousels

    wrappers.forEach((wrapper, index) => {
        const carousel = wrapper.querySelector(".carousel");
        const arrowBtns = wrapper.querySelectorAll(".arrow-btn");
        const firstCard = carousel.querySelector(".card__article");

        console.log("Initializing carousel #" + (index + 1)); // 3. Check if it loops through each one

        if (!firstCard) {
            console.error("Carousel #" + (index + 1) + " has no cards. Skipping.");
            return;
        }

        // Calculate the full width to scroll. The '16' is the 'gap' value from your CSS.
        const firstCardWidth = firstCard.offsetWidth + 16;
        console.log("Card width for carousel #" + (index + 1) + " calculated as: " + firstCardWidth); // 4. Check the width calculation

        if (arrowBtns.length === 0) {
            console.error("Carousel #" + (index + 1) + " has no '.arrow-btn' elements. Check your HTML!");
        }

        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // 5. This message should appear every time you click an arrow
                console.log("Arrow clicked!");

                const direction = btn.getAttribute("data-direction");
                if (direction === "left") {
                    carousel.scrollLeft -= firstCardWidth;
                } else {
                    carousel.scrollLeft += firstCardWidth;
                }
            });
        });

        // Add scroll event listener to toggle left and right fades
        carousel.addEventListener('scroll', () => {
            // Toggle left fade
            if (carousel.scrollLeft > 0) {
                wrapper.classList.add('has-scrolled');
            } else {
                wrapper.classList.remove('has-scrolled');
            }

            // Toggle right fade
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 10) { // 10px threshold for smoother transition
                wrapper.classList.add('reached-end');
            } else {
                wrapper.classList.remove('reached-end');
            }
        });

        // Drag functionality (included for completeness)
        let isDragging = false, startX, startScrollLeft;
        const dragStart = (e) => { isDragging = true; carousel.classList.add("dragging"); startX = e.pageX; startScrollLeft = carousel.scrollLeft; };
        const dragging = (e) => { if (!isDragging) return; e.preventDefault(); carousel.scrollLeft = startScrollLeft - (e.pageX - startX); };
        const dragStop = () => { isDragging = false; carousel.classList.remove("dragging"); };
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("mouseleave", dragStop);
    });
});

