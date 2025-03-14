export default async function SingleEventPageFromCms({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return (
    <div className="grid h-screen place-items-center uppercase">{eventId}</div>
  );
}
