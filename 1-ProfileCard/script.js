// Dark Mode Toggle with Local Storage
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check local storage for dark mode preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});
