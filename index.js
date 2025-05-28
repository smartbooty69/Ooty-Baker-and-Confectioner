// JavaScript for mobile sidebar functionality
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    mobileSidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-active');
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = mobileSidebar.classList.contains('is-open') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Close sidebar if a nav item is clicked (optional, good for UX)
document.querySelectorAll('.gimme-sidebar-nav-item a').forEach(item => {
    item.addEventListener('click', () => {
        if (mobileSidebar.classList.contains('is-open')) {
            toggleSidebar();
        }
    });
});

 // Close sidebar if Get Started button is clicked (optional, good for UX)
 document.querySelector('.gimme-get-started-btn-mobile').addEventListener('click', () => {
    if (mobileSidebar.classList.contains('is-open')) {
        toggleSidebar();
    }
});

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

