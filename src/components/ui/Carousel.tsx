/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { RefObject } from "preact";
import clsx from "clsx";
import { randomizeSamples, samples } from "@/data/samples.ts";

export type SwiperCarouselHandle = {
	next: () => void;
	prev: () => void;
	getSwiper: () => Swiper | undefined;
};

interface Props {
	data: Array<{ image: string; alt: string }>;
	aspectRatio?: string;
	refInstance?: RefObject<SwiperCarouselHandle>;
	loop?: boolean;
	autoplay?: boolean;
	randomize?: boolean;
}

const SwiperCarousel = ({
	data,
	aspectRatio = "aspect-square",
	refInstance,
	loop = false,
	autoplay = false,
	randomize = false,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const swiperInstance = useRef<Swiper>();
	const images = randomizeSamples(data);

	useEffect(() => {
		if (containerRef.current) {
			swiperInstance.current = new Swiper(containerRef.current, {
				modules: [Navigation, Pagination, Autoplay],
				slidesPerView: 5,
				loop,
				autoplay: autoplay
					? {
							delay: 5000,
						}
					: false,
				breakpoints: {
					1: {
						slidesPerView: 1,
					},
					640: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 4,
					},
					1024: {
						slidesPerView: 5,
					},
					1550: {
						slidesPerView: 7,
					},
				},
				spaceBetween: 20,
			});

			if (refInstance) {
				refInstance.current = {
					next: () => swiperInstance.current?.slideNext(),
					prev: () => swiperInstance.current?.slidePrev(),
					getSwiper: () => swiperInstance.current,
				};
			}
		}
	}, [autoplay, loop]);

	return (
		<div class="relative mx-auto w-full">
			<div class="swiper" ref={containerRef}>
				<div class="swiper-wrapper">
					{images.map((item) => (
						<div className={`swiper-slide object-cover ${aspectRatio}`}>
							<img
								class={clsx(aspectRatio, "h-full w-full rounded-lg object-cover")}
								src={item.image}
								alt={item.alt}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SwiperCarousel;
