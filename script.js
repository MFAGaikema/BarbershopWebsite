//smooth scroll
const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1200,
});

//adding shopinfo
const storeHours = (times) => {
	return `
	${times
		.map(
			(time) => `
		<p class="hours"><b>${time.day}</b> ${
				time.closed ? `<span>${time.open} - ${time.closed}</span>` : `<span>${time.open}</span>`
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
	<div class="${place.toLowerCase()}-container">
		<div class="${place.toLowerCase()}-btn">
			<a href="#"><h3>Afspraak ${place}</h3></a>
		</div>
		<div class="store-hours">${storeHours(hours)}</div>
	</div>
	`;
	})
	.join("");

const shops = document.querySelector(".shops");

shops.innerHTML = shopInfo;
