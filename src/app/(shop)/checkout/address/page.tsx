// esto es generado  por el servidor: server componet

import { Title } from "@/src/components";
import { AdressForm } from "./ui/AdressForm";
import { getCountries, getUserAddress } from "@/src/actions";
import { auth } from "@/src/auth.config";

// import { Title } from '@/components';
import { UserAddress } from "../../../generated/prisma/browser";

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user) {
    return <h3>500 - No hay session de usuario</h3>;
  }

  const UserAddress = await getUserAddress(session.user.id) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-250 flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AdressForm countries={countries} userStoredAddress={ UserAddress } />
      </div>
    </div>
  );
}
