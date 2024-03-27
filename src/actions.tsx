"use server"
import { unstable_noStore as nStore} from "next/cache";
import { Prediction } from "@/types";



const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function createPrediction(formData:FormData):Promise<Prediction> {
    
  nStore();

  const imageUrl = await  fetch(
    `https://api.cloudinary.com/v1_1/jv-/image/upload?upload_preset=diseño-ia`,
    {
      method: "PUT",
      body: formData.get("image") as File,
    },
  )
    .then((res) => res.json() as Promise<{secure_url:string}>)
    .then(({secure_url}) => secure_url)

    const prediction = await fetch("https://replicate.com/api/predictions", {
      headers: {
        accept: "application/json",
        "accept-language": "es-ES,es;q=0.9",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "AbtR0SSs5ONNkrxpQTsoXOUUvZLuhYBc",
      },
      referrer: "https://replicate.com/jagilley/controlnet-hough",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          eta: 0,
          image: imageUrl,
          scale: 9,
          prompt: formData.get("prompt") as string,
          a_prompt:
            "best quality, extremely detailed, 4k, octane render, sharp, bloom, dayligth",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry, ",
          ddim_steps: 20,
          num_samples: "1",
          value_threshold: 0.1,
          image_resolution: "512",
          detect_resolution: 512,
          distance_threshold: 0.1,
        },
        is_training: false,
        create_model: "0",
        stream: false,
        version:
          "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }).then((res) => res.json() as Promise<Prediction>);


    return prediction;
  }

function noStore() {
    throw new Error("Function not implemented.");
}


export async function getPrediction(id:string){

    nStore();

   return fetch("https://replicate.com/api/predictions/" + id,
        {
          headers: {
            accept: "*/*",
            "accept-language": "es-ES,es;q=0.9",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc":"1",
          },
          referrer: "https://replicate.com/jagilley/controlnet-hough",
          referrerPolicy: "same-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      ).then((res) => res.json() as Promise<Prediction>)


}