import EventDetail from "@/components/EventDetail";
import { Suspense } from "react";
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        <EventDetail params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
