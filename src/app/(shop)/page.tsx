import Image from "next/image";
import { titleFont } from "../../config/fonts";

export default function Home() {
  return (

    <div className="">
      <h1>Hola Mundo Javier</h1>
      <h1 className={ `${ titleFont.className } font-bold `}>Hola Mundo Javier</h1>
      <h1 className={ `${ titleFont.className } `}>Hola Javier que hay de nuevo</h1>
    </div>

  );
}
     