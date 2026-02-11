document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    const modeText = document.getElementById("modeText");
    const heroImg = document.getElementById("heroImg"); // hero image

    if (!toggle) return;

    // Load saved theme (default = dark)
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.remove("dark");
        toggle.checked = false;
        modeText.textContent = "☀️ Light";
        if (heroImg) heroImg.src = "/images/character-light.png";
    } else {
        document.body.classList.add("dark");
        toggle.checked = true;
        modeText.textContent = "🌙 Dark";
        if (heroImg) heroImg.src = "/images/character-dark.png";
    }

    // Toggle change
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            // Dark mode
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
            modeText.textContent = "🌙 Dark";
            if (heroImg) heroImg.src = "/images/character-dark.png";
        } else {
            // Light mode
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
            modeText.textContent = "☀️ Light";
            if (heroImg) heroImg.src = "/images/character-light.png";
        }
    });
});
