/** @jsxImportSource preact */
import { useRef, useState, useEffect } from "preact/hooks";
import Carousel, { type SwiperCarouselHandle } from "../Carousel.tsx";

import { services } from "@/data/services.ts";

import LeftArrowIcon from "@/assets/icons/services/left-arrow.svg?url";
import RightArrowIcon from "@/assets/icons/services/right-arrow.svg?url";

export default function CarouselWrapper() {
	const ref = useRef<SwiperCarouselHandle>(null);

	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	useEffect(() => {
		const swiper = ref.current?.getSwiper?.();

		if (!swiper) return;

		const update = () => {
			setAtStart(swiper.isBeginning);
			setAtEnd(swiper.isEnd);
		};

		swiper.on("slideChange", update);
		update();

		return () => swiper.off("slideChange", update);
	}, [ref.current]);

	return (
		<>
			<div class="site-container flex">
				<div class="mt-20 mb-10 flex grow flex-col lg:mt-30 lg:mb-25 lg:flex-row">
					<div class="grow">
						<h2 class="text-k-h1-mobile lg:text-k-h1 mb-almost-large font-semibold text-neutral-100">
							Whatever you need, <br class="hidden lg:inline" /> we’ve got you covered.
						</h2>
					</div>
					<div class="mt-10 flex gap-x-4">
						<button
							class="disabled:opacity-35"
							disabled={atStart}
							onClick={() => ref.current?.prev()}
						>
							<img src={LeftArrowIcon} alt="Previous" />
						</button>
						<button
							class="disabled:opacity-35"
							disabled={atEnd}
							onClick={() => ref.current?.next()}
						>
							<img src={RightArrowIcon} alt="Next" />
						</button>
					</div>
				</div>
			</div>

			<div class="site-container md:pr-0 xl:pr-0">
				<Carousel data={services} aspectRatio="aspect-[3/4]" refInstance={ref} loop={false} />
			</div>
		</>
	);
}
