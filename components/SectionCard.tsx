import Link from "next/link";

type SectionCardProps = {
  href: string;
  title: string;
  description: string;
};

export default function SectionCard({ href, title, description }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-neutral-600">{description}</p>
    </Link>
  );
}
