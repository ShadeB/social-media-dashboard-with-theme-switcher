const darkModeToggle = document.querySelector('#toggle');

// initialise variables to be used
const attribute = 'data-theme';
const dark = 'dark';
const light = 'light';
const page = document.documentElement;

darkModeToggle.addEventListener('change', () => {
	// if toggle is checked activate dark mode else default to light mode
	darkModeToggle.checked
		? page.setAttribute(attribute, dark)
		: page.setAttribute(attribute, light);
});
