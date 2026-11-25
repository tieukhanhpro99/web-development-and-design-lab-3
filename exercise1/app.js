const themeBtn = document.querySelector('#themeBtn');

const STORAGE_KEY = 'theme';


const savedTheme = localStorage.getItem(STORAGE_KEY);


document.body.classList.toggle(
    'dark-mode',
    savedTheme === 'dark'
);


function updateButton() {
    const isDark = document.body.classList.contains('dark-mode');

    themeBtn.textContent = isDark
        ? '☀️ Light Mode'
        : '🌙 Dark Mode';
}

updateButton();


themeBtn.addEventListener('click', () => {

    const isDark = document.body.classList.toggle('dark-mode');

    localStorage.setItem(
        STORAGE_KEY,
        isDark ? 'dark' : 'light'
    );


    updateButton();
});