const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

const workSiteUrls = {
	tokyoCoffee: "./tokyo-coffee/index.html",
	luminaHair: "./lumina-hair/index.html",
};

document.querySelectorAll("[data-work-site]").forEach((link) => {
	const url = workSiteUrls[link.dataset.workSite];
	if (url) link.href = url;
});

menuButton.addEventListener("click", () => {
	const isOpen = menuButton.getAttribute("aria-expanded") === "true";
	menuButton.setAttribute("aria-expanded", String(!isOpen));
	menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
	siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		menuButton.setAttribute("aria-expanded", "false");
		menuButton.setAttribute("aria-label", "メニューを開く");
		siteNav.classList.remove("is-open");
	}
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}
