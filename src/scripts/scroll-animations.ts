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

	// --- Apple-esque animations ---

	"pinned-bento": (el) => {
		const grid = el.querySelector(".grid");
		if (!grid) return;

		const cards = grid.children;
		if (cards.length < 2) return;

		const card1 = cards[0] as HTMLElement;
		const card2 = cards[1] as HTMLElement;

		gsap.set(card1, { x: -80, opacity: 0, rotation: 2 });
		gsap.set(card2, { x: 80, opacity: 0, rotation: -2 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				start: "top 20%",
				end: "+=150%",
				pin: true,
				scrub: 0.8,
			},
		});

		// Title fades in first
		const title = el.querySelector("h1, h2, h3, h4, h5, h6");
		if (title) {
			gsap.set(title, { opacity: 0, y: 30 });
			tl.to(title, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
		}

		// Card 1 slides in from left with rotation
		tl.to(
			card1,
			{
				x: 0,
				opacity: 1,
				rotation: 0,
				duration: 0.3,
				ease: "power2.out",
			},
			"+=0.05",
		);

		// Card 2 slides in from right with rotation
		tl.to(
			card2,
			{
				x: 0,
				opacity: 1,
				rotation: 0,
				duration: 0.3,
				ease: "power2.out",
			},
			"-=0.15",
		);
	},

	"horizontal-scroll": (el) => {
		const track = el.querySelector(".horizontal-scroll-panels") as HTMLElement;
		if (!track) return;

		const panels = track.querySelectorAll(".horizontal-scroll-panel");
		if (panels.length === 0) return;

		const totalPanels = panels.length;

		gsap.to(track, {
			x: () => -(track.scrollWidth - (el as HTMLElement).offsetWidth),
			ease: "none",
			scrollTrigger: {
				trigger: el,
				start: "top 10%",
				end: () => `+=${track.scrollWidth}`,
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});

		// Animate each panel's image based on scroll progress
		panels.forEach((panel, i) => {
			const img = panel.querySelector(".horizontal-scroll-image");
			if (img) {
				ScrollTrigger.create({
					trigger: el,
					start: () => `top+=${(i / totalPanels) * track.scrollWidth * 0.5} top`,
					onEnter: () => {
						gsap.to(img, {
							scale: 1,
							opacity: 1,
							duration: 0.6,
							ease: "power2.out",
						});
					},
					once: true,
				});
			}
		});
	},

	"text-wipe": (el) => {
		// Tween gradient background-position from right (gray) to left (dark)
		gsap.to(el, {
			backgroundPosition: "0% 0",
			ease: "none",
			scrollTrigger: {
				trigger: el,
				start: "top 80%",
				end: "top 30%",
				scrub: 0.5,
			},
		});

		// Fade in the founders row below
		const parent = el.closest(".site-container");
		if (parent) {
			const foundersRow = parent.querySelector(".founders-row");
			if (foundersRow) {
				gsap.to(foundersRow, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
					scrollTrigger: {
						trigger: foundersRow,
						start: "top 85%",
						toggleActions: "play none none none",
					},
				});
			}
		}
	},

	"pop-grid": (el) => {
		const grid = el.querySelector(".grid");
		if (!grid) return;

		const children = Array.from(grid.children) as HTMLElement[];

		gsap.from(children, {
			scrollTrigger: {
				trigger: el,
				start: "top 80%",
				toggleActions: "play none none none",
			},
			scale: 0.8,
			opacity: 0,
			duration: 0.6,
			stagger: {
				grid: "auto",
				from: "start",
				amount: 0.6,
			},
			ease: "back.out(1.7)",
			onComplete: () => {
				// Micro-bounce on card icon containers after cards land
				const icons = grid.querySelectorAll("[class*='rounded-md']");
				if (icons.length > 0) {
					gsap.fromTo(
						icons,
						{ scale: 1 },
						{
							scale: 1.15,
							duration: 0.15,
							stagger: 0.05,
							yoyo: true,
							repeat: 1,
							ease: "power2.inOut",
						},
					);
				}
			},
		});
	},

	"focus-reveal": (el) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: "top 85%",
				toggleActions: "play none none none",
			},
			filter: "blur(6px)",
			opacity: 0.7,
			duration: 0.8,
			ease: "power2.out",
		});
	},

	"depth-parallax": (el) => {
		const htmlEl = el as HTMLElement;
		const foreground = el.querySelector(".services-v2-foreground");

		// Background image shifts down
		gsap.to(htmlEl, {
			backgroundPositionY: "60%",
			ease: "none",
			scrollTrigger: {
				trigger: el,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
		});

		// Foreground content shifts up for depth effect
		if (foreground) {
			gsap.to(foreground, {
				y: -20,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});
		}
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
