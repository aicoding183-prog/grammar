// =============================
// Search Function
// =============================
function searchWord() {
    const searchInput = document.getElementById("searchBox") || document.getElementById("searchWord");
    const input = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let cards = document.querySelectorAll(".word-card, .card");

    cards.forEach(function(card) {
        let word = "";
        let heading = card.querySelector("h3");

        if (heading) {
            word = heading.textContent.toLowerCase();
        }

        let text = card.textContent.toLowerCase();
        let match = input === "" || word.includes(input) || text.includes(input);

        card.style.display = match ? "block" : "none";
    });
}

// =============================
// Navigation & Theme
// =============================
function initNavigation() {
    document.querySelectorAll(".navbar").forEach(function (navbar) {
        const links = navbar.querySelector(".nav-links");
        if (!links) return;

        if (!navbar.querySelector(".nav-toggle")) {
            const toggle = document.createElement("button");
            toggle.className = "nav-toggle";
            toggle.setAttribute("aria-label", "Toggle navigation");
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            navbar.insertBefore(toggle, links);

            toggle.addEventListener("click", function () {
                links.classList.toggle("open");
                const icon = toggle.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-bars");
                    icon.classList.toggle("fa-xmark");
                }
            });
        }

        links.querySelectorAll("a").forEach(function (link) {
            const href = link.getAttribute("href") || "";
            if (href && window.location.pathname.endsWith(href)) {
                link.classList.add("active");
            }

            link.addEventListener("click", function () {
                if (window.innerWidth <= 768) {
                    links.classList.remove("open");
                }
            });
        });
    });
}

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const button = document.getElementById("darkBtn");
    if (button) {
        const icon = button.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }
}

function initTheme() {
    if (!document.getElementById("darkBtn")) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            const button = document.createElement("button");
            button.id = "darkBtn";
            button.setAttribute("aria-label", "Toggle dark mode");
            button.innerHTML = '<i class="fa-solid fa-moon"></i>';
            navbar.appendChild(button);
        }
    }

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    applyTheme(isDark);

    const button = document.getElementById("darkBtn");
    if (button) {
        button.addEventListener("click", function () {
            const nextDark = !document.body.classList.contains("dark");
            applyTheme(nextDark);
        });
    }
}

// =============================
// Quiz Answer Feedback
// =============================
document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initTheme();

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            scrollTopBtn.classList.toggle("show", window.scrollY > 300);
        });

        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const scoreValue = document.getElementById("scoreValue");
    let score = 0;

    if (scoreValue) {
        scoreValue.textContent = score;
    }

    document.querySelectorAll(".quiz-question").forEach(function (question) {
        const buttons = question.querySelectorAll(".answer");

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                if (button.disabled || question.dataset.answered === "true") return;

                buttons.forEach(function (btn) {
                    btn.disabled = true;
                    btn.classList.remove("correct-highlight", "wrong");
                });

                if (button.classList.contains("correct")) {
                    button.classList.add("correct-highlight");
                    score += 1;
                    if (scoreValue) {
                        scoreValue.textContent = score;
                    }
                } else {
                    button.classList.add("wrong");
                    question.querySelector(".answer.correct").classList.add("correct-highlight");
                }

                question.dataset.answered = "true";
            });
        });
    });
});