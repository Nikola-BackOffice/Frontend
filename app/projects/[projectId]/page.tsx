import { ETAPAS } from "@/const";

export default function page() {
  return (
    <div>
      {ETAPAS.map((etapa, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="text-lg font-semibold">{index + 1}</div>
          <div>{etapa}</div>
        </div>
      ))}
    </div>
  );
}
