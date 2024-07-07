import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
  
    <div className="p-5 mt-5 flex flex-col items-center justify-center">
    <h2>How your Dashboard is look like</h2>
      <Image src={'/dashboard.png'} width={1000} height={800} alt="dashboard image" />
    </div>
    </>
  );
}
