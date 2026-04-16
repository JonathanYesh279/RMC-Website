import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 py-4">
      <Container className="flex items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold">
          Raanana Music Center
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/conservatory" className="hover:underline">
            קונסרבטוריון
          </Link>
          <Link href="/rentals" className="hover:underline">
            השכרות והקלטות
          </Link>
          <Link href="/concerts" className="hover:underline">
            קונצרטים
          </Link>
        </nav>
      </Container>
    </header>
  );
}
