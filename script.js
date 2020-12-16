//smooth scroll
const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1800
});

//toevoegen shopinfo
shops.forEach(shop => {
	shop.hours.forEach(day =>{
		console.log(day);
	})
})