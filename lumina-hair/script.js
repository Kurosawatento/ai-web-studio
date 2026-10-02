const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

document.documentElement.classList.add("js-enabled");

navToggle.addEventListener("click", () => {
	const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
	navToggle.setAttribute("aria-expanded", String(!isExpanded));
	navToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
	mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		navToggle.setAttribute("aria-expanded", "false");
		navToggle.setAttribute("aria-label", "メニューを開く");
		mainNav.classList.remove("is-open");
	});
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
	}, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}
