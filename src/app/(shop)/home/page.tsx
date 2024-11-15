import Navbar from "./_components/Navbar";
import CardItem from "@/app/(admin)/dashboard/cadastro/_components/cardItem";

export default function Page() {
  return (
    <div className="flex flex-col font-sans">
      <Navbar />
      <div className="flex lg:w-[1040px] w-full mx-auto p-4">
        <CardItem />
      </div>
    </div>
  );
}
