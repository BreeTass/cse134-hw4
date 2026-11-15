const themeToggle = document.querySelector('.theme-toggle');

themeToggle.style.display = 'block';
themeToggle.onclick = swapTheme;

const root = document.querySelector(':root')

if (localStorage.getItem("theme") === "dark") {
    root.classList.add('dark-mode');
}

function swapTheme() {
    if (root.classList.contains('dark-mode')) {
        if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            root.classList.remove('dark-mode');
        } else {
            document.startViewTransition(() => root.classList.remove('dark-mode'));
        }

        try {
            localStorage.setItem("theme", "light");
        } catch (error) {
            console.warn("The theme preference could not be saved.");
        }

    } else {
        if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            root.classList.add('dark-mode');
        } else {
            document.startViewTransition(() => root.classList.add('dark-mode'));
        }

        try {
            localStorage.setItem("theme", "dark");
        } catch (error) {
            console.warn("The theme preference could not be saved.");
        }
        
    }
}