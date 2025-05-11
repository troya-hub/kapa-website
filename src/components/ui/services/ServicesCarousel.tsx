/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import Carousel, { type SwiperCarouselHandle } from "../Carousel.tsx";

import { services } from "@/data/services.ts";

import LeftArrowIcon from "@/assets/icons/services/left-arrow.svg?url";
import RightArrowIcon from "@/assets/icons/services/right-arrow.svg?url";

export default function CarouselWrapper({ children }: { children: ComponentChildren }) {
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
			<div class="site-container">
				<div class="flex">
					<div class="grow">{children}</div>
					<div class="flex gap-x-4">
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

			<div class="site-container pr-0 sm:pr-0 xl:pr-0">
				<Carousel data={services} aspectRatio="aspect-[3/4]" refInstance={ref} loop={false} />
			</div>
		</>
	);
}
