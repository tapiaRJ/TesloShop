

interface Props {
  name: string;
  ci: number;
  age: number;
}

export const ageJavier = ({ name, ci, age }: Props) => {

  return (
    <div>
      <h1>Hola {name}</h1>
      <p>Tu CI es: {ci}</p>
      <p>Tu edad es: {age}</p>
    </div>

  );
}




