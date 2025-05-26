// src/scripts/activeStateManager.js

class ActiveStateManager {
	constructor() {
		this.configs = [
			{
				linkSelector: ".nav-link",
				circleSelector: ".active-circle",
				activeClasses: ["font-medium"],
				inactiveClasses: ["hover:text-blue-500"],
				circleActiveClasses: ["bg-pumpkin", "opacity-100"],
				circleInactiveClasses: ["opacity-0"],
			},
			{
				linkSelector: ".mobile-nav-link",
				circleSelector: ".mobile-active-circle",
				activeClasses: ["bg-orange-50", "font-medium"],
				inactiveClasses: ["hover:bg-gray-50", "hover:text-blue-500"],
				circleActiveClasses: ["bg-pumpkin", "opacity-100"],
				circleInactiveClasses: ["opacity-0"],
			},
			{
				linkSelector: ".footer-nav-link",
				circleSelector: ".active-circle",
				activeClasses: ["font-medium"],
				inactiveClasses: ["hover:text-pumpkin"],
				circleActiveClasses: ["bg-pumpkin", "opacity-100", "w-2", "mr-2"],
				circleInactiveClasses: ["opacity-0", "w-0", "mr-0"],
			},
		];

		this.init();
	}

	init() {
		// Update active states on page load
		document.addEventListener("DOMContentLoaded", () => this.updateActiveStates());

		// Update active states when the URL changes (for client-side routing)
		window.addEventListener("popstate", () => this.updateActiveStates());

		// Optional: Update active states when clicking nav links (for immediate feedback)
		document.addEventListener("click", (event) => {
			const link = event.target.closest(".nav-link, .mobile-nav-link, .footer-nav-link");
			if (link) {
				// Small delay to allow navigation to complete
				setTimeout(() => this.updateActiveStates(), 10);
			}
		});
	}

	normalizeCurrentPath() {
		let currentPath = window.location.pathname;

		// Normalize path by removing trailing slash (except for root)
		if (currentPath.endsWith("/") && currentPath !== "/") {
			currentPath = currentPath.slice(0, -1);
		}

		return currentPath;
	}

	isActive(href, currentPath) {
		if (href === "#") {
			return currentPath === "/";
		}
		return currentPath === href;
	}

	updateLinksForConfig(config) {
		const currentPath = this.normalizeCurrentPath();
		const links = document.querySelectorAll(config.linkSelector);

		links.forEach((link) => {
			const href = link.getAttribute("data-href");
			const circle = link.querySelector(config.circleSelector);

			if (!circle) return; // Skip if no circle found

			const isActive = this.isActive(href, currentPath);

			// Update the data-active attribute
			link.setAttribute("data-active", isActive.toString());

			// Update styles based on active state
			if (isActive) {
				link.classList.add(...config.activeClasses);
				link.classList.remove(...config.inactiveClasses);
				circle.classList.add(...config.circleActiveClasses);
				circle.classList.remove(...config.circleInactiveClasses);
			} else {
				link.classList.remove(...config.activeClasses);
				link.classList.add(...config.inactiveClasses);
				circle.classList.remove(...config.circleActiveClasses);
				circle.classList.add(...config.circleInactiveClasses);
			}
		});
	}

	updateActiveStates() {
		this.configs.forEach((config) => {
			this.updateLinksForConfig(config);
		});
	}
}

// Initialize the active state manager
new ActiveStateManager();
