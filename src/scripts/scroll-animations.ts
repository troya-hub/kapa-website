import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationHandler = (el: Element) => void;

const animations: Record<string, AnimationHandler> = {
	"fade-up": (el) => {
		const children = el.querySelectorAll("[data-animate-child]");
		if (children.length > 0) {
			gsap.from(children, {
				scrollTrigger: {
					trigger: el,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				y: 40,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: "power2.out",
			});
		} else {
			gsap.from(el, {
				scrollTrigger: {
					trigger: el,
					start: "top 85%",
					toggleActions: "play none none none",
				},
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: "power2.out",
			});
		}
	},

	"fade-in": (el) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: "top 85%",
				toggleActions: "play none none none",
			},
			opacity: 0,
			duration: 1,
			ease: "power2.out",
		});
	},

	"scale-in": (el) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: "top 85%",
				toggleActions: "play none none none",
			},
			scale: 0.95,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		});
	},

	"stagger-grid": (el) => {
		const grid = el.querySelector(".grid");
		if (grid) {
			gsap.from(Array.from(grid.children), {
				scrollTrigger: {
					trigger: el,
					start: "top 80%",
					toggleActions: "play none none none",
				},
				y: 50,
				opacity: 0,
				duration: 0.7,
				stagger: 0.12,
				ease: "power2.out",
			});
		}
	},

	counter: (el) => {
		const target = parseInt(el.getAttribute("data-counter-target") || "0", 10);
		const obj = { val: 0 };
		gsap.to(obj, {
			val: target,
			duration: 2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: el,
				start: "top 85%",
				toggleActions: "play none none none",
			},
			onUpdate: () => {
				el.textContent = Math.round(obj.val).toLocaleString();
			},
		});
	},

	parallax: (el) => {
		gsap.to(el, {
			scrollTrigger: {
				trigger: el,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			y: -50,
			ease: "none",
		});
	},
};

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-animate]").forEach((el) => {
		const type = el.getAttribute("data-animate");
		if (type && animations[type]) {
			animations[type](el);
		}
	});
});
