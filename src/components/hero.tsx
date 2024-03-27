import Link from "next/link";

const Hero = () => {
  return (
    <>
      <header className="h-[74vh] w-full max-w-[1200px] flex justify-center m-auto">
        <section className="flex flex-col justify-center items-center gap-[4rem]">
          <div className="w-[100%] flex flex-col gap-8">
            <h2 className="text-white  text-center font-title">
            Transformando ideas en arte con IA
          
            </h2>

            <p className="text-zinc-500 text-center text-lg">
              
            Actualmente disponible en PC y formato horizontal,<br/> ¡pronto estará disponible también en formato vertical  y optimizado para dispositivos móviles!
            </p>
          </div>
          <div className="flex">
            
              <Link href="#formH" className="button-hero flex justify-center items-center">
                <button className=" text-black">Horizontal</button>
              </Link>
            
          </div>
          <div>
            <p className="text-zinc-500 text-center text-lg">
              Creado con <span className="text-yellow-ligth">Replicate AI</span> 
            </p>
          </div>
        </section>
      </header>
    </>
  );
};

export default Hero;
