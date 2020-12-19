//smooth scroll
const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1200
});

//adding shopinfo
const storeHours = times => {
	return `
	${times.map(time => `
		<p>${time.day} ${time.closed ? `<span>${time.open}-${time.closed}</span>` : `<span>${time.open}</span>`}</p>
		 
		`).join("")}
	`			
}

const shopInfo = shopsBakkes.map(shop => {
	const {street, zipcode, place} = shop.address;
	const {hours} = shop;
	return `
	<div classname="${place.toLowerCase()}-container">
		<div classname="address">
			<h3>${place}</h3>
			<p>${street}</p> 
			<p>${zipcode} <span>${place}</span></p>
		</div>
		<div classname="store-hours">${storeHours(hours)}</div>
		<div class="${place.toLowerCase()}-btn">
			<a href="#"><h3>Afspraak ${place}</h3></a>
		</div>
	</div>
	`
  }
).join("");

const shops = document.querySelector(".shops");

shops.innerHTML = shopInfo;