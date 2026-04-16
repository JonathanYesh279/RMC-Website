import Container from "@/components/Container";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-3">מרכז המוסיקה רעננה</h1>
      <p className="text-neutral-600 mb-8 max-w-2xl">
        ברוכים הבאים לאתר מרכז המוסיקה רעננה. בחרו אחד מהתחומים כדי להמשיך.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard
          href="/conservatory"
          title="קונסרבטוריון"
          description="לימודי מוסיקה, חוגים ומורים."
        />
        <SectionCard
          href="/rentals"
          title="השכרות והקלטות"
          description="השכרת חללים, ציוד ושירותי הקלטה."
        />
        <SectionCard
          href="/concerts"
          title="קונצרטים"
          description="לוח קונצרטים והופעות קרובות."
        />
      </div>
    </Container>
  );
}
