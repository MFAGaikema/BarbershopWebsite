//smooth scroll
// const scroll = new SmoothScroll('a[href*="#"]', {
// 	speed: 200,
// });

//navbar collapse on click navbar-item
const navItems = Array.from(document.getElementsByClassName('nav-item'));
const navbarSupportedContent = document.getElementById('navbarSupportedContent');

const hideNavbarSupportedContent = () => {
	navbarSupportedContent.classList.remove('show');
};

navItems.forEach((item) => item.addEventListener('click', hideNavbarSupportedContent));

//change style nav-links on scroll
const sectionOptions = {
	rootMargin: '-30% 0px -70% 0px',
};

const switchNavBtns = (name) => {
	const section = document.querySelector(`.content ${name}`);
	const btn = document.querySelector(`.nav-item ${name}`);

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.isIntersecting ? btn.classList.add('active') : btn.classList.remove('active');
		});
	}, sectionOptions);

	sectionObserver.observe(section);
};
switchNavBtns('.make-appointment');
switchNavBtns('.about');
switchNavBtns('.treatments');

//adding shopinfo
const storeHours = (times) => {
	return `
		${times
			.map(
				(time) => `
					<p class="hours"><b>${time.day}</b> 
					<span>${time.closed ? `${time.open} - ${time.closed}` : `${time.open}`}</span>
					</p>
				`
			)
		.join('')}
	`;
};

const shopInfo = shopsBakkes
	.map((shop) => {
		const { place } = shop.address;
		const { hours } = shop;
		return `
			<div class="shop-container">
				<div class="${place.toLowerCase()}-bg-container">
					<a href="#">Afspraak ${place} maken</a>
				</div>
				<div class="store-hours">${storeHours(hours)}
				</div>
			</div>
		`;
	})
	.join('');

const shops = document.querySelector('.shops');

shops.innerHTML = shopInfo;

//adding treatmentcards

const categoryAccordion = allTreatments
	.map((treatment) => {
		const { category, treatments } = treatment;
		return `
			<div class="category-container">
				<div class="${category.toLowerCase()}-container container">
					<h3>${category.toUpperCase()}</h3>
					<ul class="treatment-list row">${treatments.map(treatment => {
						const {name, description, picUrl} = treatment;
						return `		
						<li class="treatment-card col-md-6">
							<div class="card-text">
								<h5>${name}</h5>
								<p>${description}</p>
							</div>
							<img src="../../images/Behandelingen/${picUrl}"/>
						</li>
					`
					}).join("")}
					</ul>
				</div>
			</div>
			`;
	})
	.join('');

const treatmentsContainer = document.querySelector('.treatments-container');

treatmentsContainer.innerHTML = categoryAccordion;

//change font-size based on width container
const shopContainer = document.querySelector('.shop-container');
const linkBtn = Array.from(document.querySelectorAll('.shops a'));
const hours = Array.from(document.querySelectorAll('.hours'));
const descriptionTreatment = Array.from(document.querySelectorAll('.card-text p'));

const changeFontSize = () => {
	linkBtn.forEach(btn => (btn.style.fontSize = `${shopContainer.offsetWidth / 25}px`));
	hours.forEach(hour => shopContainer.offsetWidth < 400 ? hour.style.fontSize = '10px' : hour.style.fontSize = '14px');
	descriptionTreatment.forEach(description => shopContainer.offsetWidth < 400 ? description.style.fontSize = '10px' : description.style.fontSize = '12px')
};
changeFontSize();

new ResizeObserver(changeFontSize).observe(shopContainer);
