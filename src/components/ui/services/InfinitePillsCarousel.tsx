import { useEffect, useRef } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import gsap from "gsap";
import type { IServiceItem } from "@/types";
import ServiceItemPill from "@/components/ui/services/ServiceItemPill.tsx";

interface Props {
	items: IServiceItem[];
	reversed?: boolean;
}

const InfinitePillsCarousel: FunctionalComponent<Props> = ({ items, reversed = false }) => {
	const trackRef = useRef<HTMLDivElement | null>(null);
	const speed = 15;

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const totalWidth = track.scrollWidth / 2; // only count one set
		const duration = totalWidth / speed;

		const tl = gsap.timeline({ repeat: -1, ease: "none" });

		tl.to(track, {
			duration,
			x: totalWidth, // always animate forward
			modifiers: {
				x: (x) => {
					const val = parseFloat(x);
					const looped = ((val % totalWidth) + totalWidth) % totalWidth;
					return `${-looped}px`;
				},
			},
		});

		if (reversed) {
			tl.totalProgress(1);
			tl.timeScale(-1);
		}

		return () => {
			tl.kill();
		};
	}, [items, reversed]);

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
