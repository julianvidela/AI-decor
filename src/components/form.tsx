"use client";

import { useState } from "react";
import { createPrediction, getPrediction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Prediction } from "@/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Formcompo() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Prediction | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);
      await sleep(10000);
    }

    setLoading(false);
    setState(prediction);
  }

  function handleDownloadImage() {
    if (state?.output) {
      const imageUrl = state.output[1];
      window.open(imageUrl, "_blank");
    }
  }

  return (
    <>
      <section className="h-[85vh] w-full flex" id="formH">
        <main className="rounded-xl h-[36rem] w-[75%] flex justify-center items-center m-auto mt-10 bg-transparent gap-10">
          <div className="bg-black h-[430px] text-black w-[45%] rounded-xl border-solid border-[1px] border-zinc-500 flex justify-center items-center">
            {loading ? (
              <Skeleton className="w-full h-full rounded-xl bg-zinc-600" />
            ) : state?.output ? (
              <div className="w-full h-full flex justify-center items-center">
                <img
                  alt="previsualizacion del render"
                  src={state.output[1]}
                  className="w-full h-full rounded-xl"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-white cursor-default">Carga una imagen</p>
              </div>
            )}
          </div>
          <div className="w-[40%] h-full flex flex-col justify-end gap-4">
            <form
              onSubmit={handleSubmit}
              className="justify-center w-[100%] m-auto h-[60%]"
            >
              <section className="flex flex-col items-center text-zinc-400 w-[100%] h-[100%]">
                <div className="w-[75%]">
                  <div className="flex flex-col gap-4 py-4 ">
                    <h2 className="text-4xl font-semibold text-yellow-ligth cursor-default">
                      Instrucciones
                    </h2>
                    <li className="text-md w-[100%] cursor-default list-none">
                      <ol>1-Selecione el boceto o imagen que quiera recrear</ol>
                      <ol>2-Agrege una intruccion. <span className="text-white">Ej: an industrial office</span></ol>
                      <ol>3-Selecione el boton Crear y espere el resultado</ol>
                      <ol>4-Selecione el boton Descargar y podra descargar la imagen</ol>
                    </li>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Input
                      className="rounded-xl bg-yellow-light border-yellow text-black cursor-pointer"
                      name="image"
                      type="file"
                    />
                    <Textarea
                      name="prompt"
                      className="rounded-xl bg-zinc-950 border-solid border-[1px] border-zinc-500 text-zinc-500 resize-none cursor-pointer"
                      placeholder="Enter a prompt"
                    />
                    <Button
                      disabled={loading}
                      className="w-full bg-yellow-light text-black rounded-xl hover:bg-black hover:text-white duration-500 ease-in-out"
                      type="submit"
                    >
                      Crear
                    </Button>
                  </div>
                </div>
              </section>
            </form>
            <div className="flex justify-center h-[20%]">
              <Button
                className="w-[75%] bg-yellow-light text-black rounded-xl hover:bg-black hover:text-white duration-500 ease-in-out"
                onClick={handleDownloadImage}
              >
                Descargar
              </Button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
