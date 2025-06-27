import banner from "@/assets/images/banner.jpg"
import Image, {StaticImageData} from "next/image";
export default function Home() {
  return (
    <div>
        <Image src={banner as StaticImageData} alt={'banner'}/>
    </div>
);
}
