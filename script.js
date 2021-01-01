//smooth scroll
// const scroll = new SmoothScroll('a[href*="#"]', {
// 	speed: 200,
// });

//navbar collapse on click navbar-item
const navItems = Array.from(document.getElementsByClassName("nav-item"));
const navbarSupportedContent = document.getElementById("navbarSupportedContent");

const hideNavbarSupportedContent = () => {
	navbarSupportedContent.classList.remove("show");
}

navItems.forEach(item => item.addEventListener("click", hideNavbarSupportedContent));

//change style nav-links on scroll
const sectionOptions = {
  rootMargin: "-30% 0px -70% 0px"
};

const switchNavBtns = (name) => {
	const section = document.querySelector(`.content ${name}`)
	const btn = document.querySelector(`.nav-item ${name}`)

	const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		entry.isIntersecting ? btn.classList.add("active") : btn.classList.remove("active");
	})
}, sectionOptions)

sectionObserver.observe(section)
}
switchNavBtns(".make-appointment");
switchNavBtns(".about");
switchNavBtns(".treatments");
//adding shopinfo
const storeHours = (times) => {
	return `
	${times
		.map(
			(time) => `
		<p class="hours"><b>${time.day}</b> ${time.closed 
			? `<span>${time.open} - ${time.closed}</span>` 
			: `<span>${time.open}</span>`
			}</p>
		`
		)
		.join("")}
	`;
};

const shopInfo = shopsBakkes
	.map((shop) => {
		const { place } = shop.address;
		const { hours } = shop;
		return `
	<div class="shop-container">
		<div class="${place.toLowerCase()}-btn">
			<a href="#"><h4>Afspraak ${place} maken</h4></a>
		</div>
		<div class="store-hours">${storeHours(hours)}</div>
	</div>
	`;
	})
	.join("");

const shops = document.querySelector(".shops");

shops.innerHTML = shopInfo;
