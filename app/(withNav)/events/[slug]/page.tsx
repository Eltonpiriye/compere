import SingleEventPageFromCms from "@/components/single-event";
import { EVENT_LIST } from "@/lib/consts";
import { notFound } from "next/navigation";

export default async function SingleEventPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await props.params).slug;
  const event = EVENT_LIST.find((event) => event.slug === slug);
  if (!event) {
    return notFound();
  }
  return (
    <SingleEventPageFromCms
      eventLogo={event.eventLogo}
      eventDescription={event.eventDescription}
      eventImages={event.eventImages}
      eventName={event.eventName}
      mainImage={event.mainImage}
      mainVideo={event.mainVideo}
      slug={event.slug}
      href={event.href}
    />
  );
}
