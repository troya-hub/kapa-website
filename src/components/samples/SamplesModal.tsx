// SamplesModal.tsx
/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Sample } from "@/types";

interface SamplesModalProps {
	isOpen: boolean;
	onClose: () => void;
	samples: Sample[];
	initialIndex: number;
}

export default function SamplesModal({
	isOpen,
	onClose,
	samples,
	initialIndex,
}: SamplesModalProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const swiperInstance = useRef<Swiper>();
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	const paginationRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		if (containerRef.current) {
			swiperInstance.current = new Swiper(containerRef.current, {
				modules: [Navigation, Pagination],
				initialSlide: initialIndex,
				slidesPerView: 1,
				navigation: {
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				},
				pagination: {
					el: paginationRef.current,
					clickable: true,
					bulletClass: "custom-bullet",
					bulletActiveClass: "custom-bullet-active outline-2 outline-offset-2 outline-solid",
				},
				loop: true,
				spaceBetween: 20,
			});
		}

		const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onEsc);
		return () => {
			document.removeEventListener("keydown", onEsc);
			swiperInstance.current?.destroy();
		};
	}, [isOpen, initialIndex, onClose]);

	if (!isOpen) return null;

	return (
		<>
			<style>{`
        .custom-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: white;
          border: 2px solid white;
          border-radius: 9999px;
          margin: 0 6px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          box-sizing: border-box;
        }
        .custom-bullet-active {
          outline: 1px solid white;
          outline-offset: 3px;
        }
      `}</style>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
				onClick={onClose}
			>
				<button className="absolute top-4 right-4 cursor-pointer text-3xl text-white">
					&times;
				</button>
				<div
					className="relative w-full max-w-4xl px-2 lg:px-8"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Custom navigation buttons */}
					<button
						ref={prevRef}
						className="absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100 md:block"
					>
						&#8592;
					</button>
					<button
						ref={nextRef}
						className="absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100 md:block"
					>
						&#8594;
					</button>

					<div className="swiper" ref={containerRef}>
						<div className="swiper-wrapper">
							{samples.map((sample) => (
								<div key={sample.id} className="swiper-slide">
									<div className="rounded-3xl p-2 shadow-xl lg:p-8">
										<img
											className="mx-auto w-auto max-w-[90%] rounded-2xl object-contain lg:max-w-[80%]"
											src={sample.attachment.public_path}
											alt={sample.attachment.original_name}
										/>
									</div>
								</div>
							))}
						</div>
						{/* Pagination dots */}
						<div ref={paginationRef} className="mt-6 text-center"></div>
					</div>
				</div>
			</div>
		</>
	);
}
