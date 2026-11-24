/* Kathmandu Events — interactive features */
document.addEventListener("DOMContentLoaded", () => {
    // Add a subtle entrance animation to the main content.
    const revealItems = document.querySelectorAll(
        ".event-card, .about-content h2, .about-content p, .contact-content > *, .contact-form"
    );

    revealItems.forEach(item => item.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    // Live event search: filters cards by title, location, date, or description.
    const searchInput = document.querySelector("#eventSearch");
    const eventGrid = document.querySelector(".event-grid");

    if (searchInput && eventGrid) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            eventGrid.querySelectorAll(".event-card").forEach(card => {
                const matches = card.textContent.toLowerCase().includes(searchTerm);
                card.hidden = !matches;
                if (matches) visibleCount++;
            });

            let emptyMessage = eventGrid.querySelector(".no-results");
            if (visibleCount === 0) {
                if (!emptyMessage) {
                    emptyMessage = document.createElement("p");
                    emptyMessage.className = "no-results";
                    emptyMessage.textContent = "No events match your search. Try another keyword.";
                    eventGrid.appendChild(emptyMessage);
                }
            } else if (emptyMessage) {
                emptyMessage.remove();
            }
        });
    }

    // Contact form: validate fields and show a local confirmation.
    // This demo does not send/store the message; a backend or email service is needed for that.
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();
            const status = document.querySelector("#formStatus");

            if (!name || !email || !message) {
                status.textContent = "Please complete all fields before submitting.";
                status.style.color = "#b42318";
                return;
            }

            status.textContent = `Thank you, ${name}! Your message is ready. (Demo only — it has not been sent.)`;
            status.style.color = "#167347";
            contactForm.reset();
        });
    }

    // Back-to-top button appears after the visitor scrolls down.
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.textContent = "↑";
    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        topButton.classList.toggle("visible", window.scrollY > 350);
    }, { passive: true });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
