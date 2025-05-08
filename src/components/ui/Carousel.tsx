/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { RefObject } from "preact";

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
}

const SwiperCarousel = ({
	data,
	aspectRatio = "aspect-square",
	refInstance,
	loop = true,
	autoplay = false,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const swiperInstance = useRef<Swiper>();

	useEffect(() => {
		if (containerRef.current) {
			swiperInstance.current = new Swiper(containerRef.current, {
				modules: [Navigation, Pagination],
				slidesPerView: 4,
				spaceBetween: 10,
				autoplay,
				loop,
			});

			if (refInstance) {
				refInstance.current = {
					next: () => swiperInstance.current?.slideNext(),
					prev: () => swiperInstance.current?.slidePrev(),
					getSwiper: () => swiperInstance.current,
				};
			}
		}
	}, []);

	return (
		<div class="relative mx-auto w-full">
			<div class="swiper" ref={containerRef}>
				<div class="swiper-wrapper">
					{data.map((item) => (
						<div className="swiper-slide">
							<img class={aspectRatio} src={item.image} alt={item.alt} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SwiperCarousel;
