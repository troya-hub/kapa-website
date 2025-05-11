import { useEffect, useRef } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import gsap from "gsap";
import type { IServiceItem } from "@/types";
import ServiceItemPill from "@/components/ui/services/ServiceItemPill.tsx";

interface Props {
	items: IServiceItem[];
	forward?: boolean;
}

const InfinitePillsCarousel: FunctionalComponent<Props> = ({ items, forward = false }) => {
	const trackRef = useRef<HTMLDivElement | null>(null);
	const speed = 20;

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const totalWidth = track.scrollWidth / 2; // only count one set
		const duration = totalWidth / speed;

		// Kill any existing animations
		gsap.killTweensOf(track);

		// Reset position
		gsap.set(track, { x: 0 });

		// Create identical animations but with opposite directions
		gsap.to(track, {
			duration,
			x: forward ? -totalWidth : totalWidth,
			ease: "none",
			repeat: -1,
			modifiers: {
				x: (x) => {
					const val = parseFloat(x);
					// We need to handle the modulus differently based on direction
					// to ensure they look identical but reversed
					const looped = ((val % totalWidth) + totalWidth) % totalWidth;
					return `${-looped}px`;
				},
			},
		});

		return () => {
			gsap.killTweensOf(track);
		};
	}, [items, forward]);

	const infiniteItems = [...items, ...items];

	return (
		<div className="-my-20 w-full touch-pan-y overflow-x-hidden overscroll-x-contain py-20">
			<div ref={trackRef} className="flex w-max gap-x-3 will-change-transform">
				{infiniteItems.map((data, index) => (
					<ServiceItemPill key={`${data.title}-${index}`} data={data} />
				))}
			</div>
		</div>
	);
};

export default InfinitePillsCarousel;
