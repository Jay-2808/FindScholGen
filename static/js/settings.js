document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const themeSelect = document.getElementById('themeSelect');
    const applyThemeButton = document.getElementById('applyTheme');

    // Load saved settings
    loadSavedSettings();

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileSettings();
    });

    applyThemeButton.addEventListener('click', applyTheme);

    function saveProfileSettings() {
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;

        localStorage.setItem('userProfile', JSON.stringify({ name, email }));
        alert('Profile settings saved!');
    }

    function loadSavedSettings() {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (savedProfile) {
            document.getElementById('profileName').value = savedProfile.name;
            document.getElementById('profileEmail').value = savedProfile.email;
        }

        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            themeSelect.value = savedTheme;
        }
    }

    function applyTheme() {
        const selectedTheme = themeSelect.value;
        localStorage.setItem('selectedTheme', selectedTheme);

        // Basic theme switching (you'd expand this with more comprehensive theming)
        switch(selectedTheme) {
            case 'dark':
                document.body.style.backgroundColor = '#333';
                document.body.style.color = '#fff';
                break;
            case 'ocean':
                document.body.style.backgroundColor = '#e0f2f1';
                document.body.style.color = '#004d40';
                break;
            default:
                document.body.style.backgroundColor = '#fff';
                document.body.style.color = '#000';
        }
    }
});