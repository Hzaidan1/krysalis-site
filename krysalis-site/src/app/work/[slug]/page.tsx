export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="min-h-screen px-6 py-24">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        Project: {slug} — placeholder
      </h1>
    </main>
  );
}
