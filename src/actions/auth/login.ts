"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn } from "@/src/auth.config";
import { sleep } from "@/src/utils";
import { AuthError } from "next-auth";
import { sign } from "crypto";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await sleep(2);

    await signIn("credentials", formData);

    return "Success";
  } catch (error) {
    // 🚀 ¡LA SOLUCIÓN! Si es un error de redirección nativo de Next.js, relánzalo
    // para que Next.js haga su trabajo y no ensucie tu terminal.
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Hola! Invalid credentials.";
        default:
          return "Algo salio mal.";
      }
    }
    throw error;
  }
}

export const login  = async ( email: string, password: string ) => {

  try {
    await signIn ('credentials0', { email, password })
    return {ok: false};

  } catch (error) {
    console.log(error);
    return {
      ok: false, 
       message: 'No se pudo iniciar sesion'
    }
  }
}
