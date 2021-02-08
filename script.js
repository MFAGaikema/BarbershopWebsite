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
switchNavBtns('.webshop');
switchNavBtns('.barbertrain');
switchNavBtns('.contact');

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
					<a class="submit-btn" href="#">Afspraak ${place} maken</a>
				</div>
				<div class="store-hours">${storeHours(hours)}
				</div>
			</div>
		`;
	})
	.join('');

const shops = document.querySelector('.shops');

shops.innerHTML = shopInfo;

//adding about-carousel
const glide = new Glide(document.querySelector('.glide'), {
  type: 'carousel',
  perView: 2,
  focusAt: 'center',
  autoplay: 6000,
  animationDuration: 500,
  animationTimingFunc: "ease-in-out",
  hoverpause: false,
  touchRatio: 0.5,
  breakpoints: {
    800: {
      perView: 1
    }
  }
})

glide.mount();

//adding treatmentcards

const categoryAccordion = allTreatments
	.map((treatment) => {
		const { category, treatments } = treatment;
		return `
				<div class="category-container">
					<h3>${category.toUpperCase()}</h3>
					<ul class="treatment-list row">${treatments.map(treatment => {
						const {name, description, picUrl} = treatment;
						return `		
						<li class="treatment-card col-lg-6">
							<div class="card-text">
								<img src="../../images/Behandelingen/${picUrl}"/>
								<h5>${name}</h5>
								<p>${description}</p>
							</div>
							
						</li>
					`
					}).join("")}
					</ul>
				</div>
			`;
	})
	.join('');

const treatmentsContainer = document.querySelector('.treatments-container');

treatmentsContainer.innerHTML = categoryAccordion;

//change font-size based on width container
const shopContainer = document.querySelector('.shop-container');
const linkBtn = Array.from(document.querySelectorAll('.content .btn'));
const hours = Array.from(document.querySelectorAll('.hours'));
const descriptionTreatment = Array.from(document.querySelectorAll('.card-text p'));

const changeFontSize = () => {
	linkBtn.forEach(btn => (btn.style.fontSize = `${shopContainer.offsetWidth / 25}px`));
	hours.forEach(hour => shopContainer.offsetWidth < 400 ? hour.style.fontSize = '10px' : hour.style.fontSize = '14px');
	descriptionTreatment.forEach(description => shopContainer.offsetWidth < 400 ? description.style.fontSize = '10px' : description.style.fontSize = '12px')
};
changeFontSize();

new ResizeObserver(changeFontSize).observe(shopContainer);

// put placeholder/label on top input contact-form
const span = document.querySelectorAll("form span");
const input = document.querySelectorAll("form .input");

const translateLabel = (e) => {
	span.forEach(span => {
		if(span.id === e.target.id) {
			span.style.opacity = "1";
		} else {
			span.style.opacity = "0";
		}
	})
}

input.forEach(input => input.addEventListener("focus", translateLabel));
window.addEventListener("click", translateLabel);

//adding map info container to contact shop container

const contactShopContainer = document.querySelector(".contact-shop-container");

const mapInfo = shopsBakkes.map(shop => {
	const {street, zipcode, place} = shop.address;
	return `
	<div class="map-info-container">
		<iframe
			src="https://www.google.com/maps/embed?pb=${shop.mapUrl}"
		></iframe>
		<div class="contact-info">
			<h3>BAKKES ${place}</h3>
			<p><i class="fas fa-home"></i> ${street} ${zipcode} ${place}</p>
			<p><i class="fas fa-phone-alt"></i> ${shop.phone}</p>
			<p><i class="fas fa-at"></i> <a href="mailto:${shop.email}">${shop.email}</a></p>
			<p class="social-media">Volg ons op:
				<a href="#"><i class="fab fa-facebook-square"></i></a>
				<a href="#"><i class="fa fa-instagram"></i></a>
			</p>
		</div>
	</div>
	`
})
.join("")

contactShopContainer.innerHTML = mapInfo;

//validate forms
const forms = document.querySelectorAll(".needs-validation");
const submitBtns = document.querySelectorAll("form .submit-btn");
const feedback = document.querySelectorAll(".invalid-feedback");
const modal = document.querySelector(".modal");
const backdrop = document.getElementById("backdrop");
const modalBody = document.querySelector(".modal-body");

submitBtns.forEach(btn => btn.addEventListener("click", (e) => {
	modalBody.innerText = e.target.id === "msg-submit" ? 
		"Bedankt voor je bericht, we zullen zo snel mogelijk contact met je opnemen!" :
		"Bedankt voor je aanmelding!"
}))

const showModal = () => {
	modal.classList.add("show");
	modal.style.display = "block";
	backdrop.style.display = "block";
	
	setTimeout(() => {
		modal.style.opacity = "1";
		backdrop.style.opacity = "0.5";
	}, 0);
}

const hideModal = () => {
		modal.style.opacity = "0";
		backdrop.style.opacity = "0";

	setTimeout(() => {
		modal.classList.remove("show");
		modal.style.display = "none";
		backdrop.style.display = "none";
	}, 300);
}

forms.forEach(form => form.addEventListener("submit", (e) => {
	if(!form.checkValidity()) {
		e.preventDefault();
		e.stopPropagation();		
	} else {
		e.preventDefault();
		form.reset();
		feedback.forEach(feedback => feedback.innerHTML = "");
		showModal();
		setTimeout(() => {
			hideModal();
		}, 4000);
	}
	form.classList.add("was-validated");
}))

window.addEventListener("click", (e) => {
	if (e.target == modal) {
		hideModal();
	}
}) 

//adding info to modals
const mainModal = document.querySelector(".main-modal");
const modalContainer = document.querySelector(".modal-container")
const modalBtns = Array.from(document.querySelectorAll(".modal-btn"));

const modals = modalBtns.map(btn => {
	return `		
		<div class="modal fade main-modal" id="${btn.name}" tabindex="-1" aria-labelledby="mainModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title" id="mainModalLabel"><b>${btn.value}</b></h3>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="submit-btn" data-bs-dismiss="modal">Sluiten</button>
					</div>
				</div>
			</div>
		</div>
	`
}).join("");

modalContainer.innerHTML = modals;

modalBtns.forEach(btn => btn.addEventListener("click", (e) => {
	const mainModalBodies = Array.from(document.querySelectorAll(".main-modal .modal-body"));
	const subjectObj = modalContent.find(content => content.subject === e.target.name);
	mainModalBodies.forEach(body => body.innerHTML = subjectObj.content);
}))