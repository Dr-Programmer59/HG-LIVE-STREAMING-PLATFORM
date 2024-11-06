import { ButtonInterface } from "../Interface";

export default function Button({
  name,
  customClass,
  onClick,
}: ButtonInterface) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary hover:bg-primary/80 text-[#1F2226] flex flex-row px-10 py-3 rounded-md justify-center items-center ${customClass}`}
    >
      {name}
    </button>
  );
}
