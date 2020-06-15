const navSlide = () => {
	const mobile = document.querySelector('.mobile');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	
	mobile.addEventListener('click', () => {
		//Toggle Nav Bar
		nav.classList.toggle('nav-active');
		//Link animations
		navLinks.forEach((link, homepage) => {
		if(link.style.animation){
			link.style.animation = '';
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${homepage / 7 + 0.5}s`;
		}
		
	});

	});
}
//Calls function
navSlide();

//https://www.youtube.com/watch?v=gXkqy0b4M5g&t=37s - youtube video reference