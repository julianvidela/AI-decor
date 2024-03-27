import Form from "@/components/form";
import Hero from "@/components/hero";


export default function Home() {
  return (
    <>
      <div className=" w-full bg-black bg-grid-white/[0.03] dark:bg-grid-black/[0.2] relative flex items-center justify-center flex-col">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_45%,black)]"></div>

        <Hero />
        <Form />
      </div>
    </>
  );
}
