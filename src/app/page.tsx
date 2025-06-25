import Header from "@/components/header";
import banner from "@/assets/images/banner.jpg"
import Image, {StaticImageData} from "next/image";
export default function Home() {
  return (
    <div>
        <Header/>
        <Image src={banner as StaticImageData} alt={'banner'}/>
    </div>
);
}
