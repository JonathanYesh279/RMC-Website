import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 py-6 mt-12">
      <Container>
        <p className="text-sm text-neutral-600">
          © {year} Raanana Music Center
        </p>
      </Container>
    </footer>
  );
}
