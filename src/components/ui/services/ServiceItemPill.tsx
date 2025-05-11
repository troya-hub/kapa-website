import { serviceThemes } from "@/data/services.ts";
import type { IServiceItem } from "@/types";

interface Props {
	data: IServiceItem;
}

const ServiceItemPill = ({ data }: Props) => (
	<div className="rounded-[40px] shadow-[10px_10px_15px_rgba(255,255,255,0.2)_inset,3px_3px_6px_rgba(255,255,255,0.3)_inset,60px_70px_30px_rgba(0,0,0,0.02),20px_25px_20px_rgba(0,0,0,0.05),5px_5px_10px_rgba(0,0,0,0.07)]">
		<div
			className={`${serviceThemes[data.theme].background} text-k-lg rounded-[40px] px-5 py-2 shadow-[0px_-0.368px_0.23px_rgba(255,255,255,0.4),0px_-0.787px_0.787px_rgba(255,255,255,0.5),0px_0.368px_0.276px_rgba(0,0,0,0.2),0px_0.787px_0.787px_rgba(0,0,0,0.15)]`}
		>
			<div className="flex items-center justify-center space-x-2 text-nowrap">
				<img src={data.icon} alt={data.title} />
				<span className={`${serviceThemes[data.theme].textColor} font-medium`}>{data.title}</span>
			</div>
		</div>
	</div>
);

export default ServiceItemPill;
