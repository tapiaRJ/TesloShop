"use client";

import { authenticate } from "@/src/actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { use, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoAddOutline, IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  //const router = useRouter(); // 👈 Hook para la redirección manual de Fernando
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // useActionState maneja el estado devuelto por tu Server Action
  const [state, formAction] = useActionState(
    async (prevState: string | undefined, formData: FormData) => {
      return await authenticate(prevState, formData);
    },
    undefined,
  );

  // 🚀 El ajuste de Fernando Herrera (image_61d2e2.png)
  useEffect(() => {
    if (state === "Success") {
      // Redirecciona al callbackUrl inteligente o a la raíz '/'
      //router.replace(callbackUrl);

      window.location.replace("/");
    }
  }, [state, callbackUrl]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {/* 🚀 Cambiado errorMessage por state para que coincida con tu hook */}
      {state && state !== "Success" && (
        <div className="flex flex-row text-center justify-center mb-2 items-center gap-1">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state}</p>
        </div>
      )}

      {/* {errorMessage && (
        <div className="flex flex-row text-center justify-center mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )} */}

      <LoginButton />
      {/* <button type="submit" className="btn-primary">Ingresar</button> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

// 🌟 BOTÓN APARTE (Respeta la documentación oficial de Next.js)
function LoginButton() {
  //useFormStatus sabe mágicamente si el formulario padre se está enviando
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn-primary flex justify-center items-center disabled:bg-gray-400"
      disabled={pending} // 👈 Evita que el usuario haga doble clic al enviar
      aria-disabled={pending}
    >
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  );
}
