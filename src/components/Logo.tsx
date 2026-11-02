import { img } from "@/data/images";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={img.logo}
      alt="Três Marias Essências"
      className={`${className} w-auto mix-blend-multiply object-contain`}
      width={600}
      height={300}
    />
  );
}
