//lrc paracrear rapidamente la funcion.

import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";


export default async function CheckoutLayout({ children }: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (!session?.user) {
  // redirect('/auth/login?returnTo=/perfil');
    redirect("/auth/login?redirectTo=/checkout/address");
  }
  console.log('hola adress');
  return (
    <>
      {children}
    </>
  );
}


