// app/events-hosted/page.tsx
import { EVENT_LIST } from '@/lib/consts';
import EventCard from '@/components/event-card';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventsHostedPage() {
	return (
		<MaxWidthWrapper>
			<h1 className='text-4xl md:text-6xl font-bold text-center mb-12 text-gray-900'>
				Events Hosted
			</h1>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Column One: How it works & Stats */}
				<div className='lg:col-span-1 flex flex-col gap-8'>
					<Card className='p-6'>
						<CardHeader>
							<CardTitle className='text-2xl font-bold mb-4'>
								How It Works
							</CardTitle>
						</CardHeader>
						<CardContent className='text-gray-700 space-y-4'>
							<p>
								Our event hosting process is designed for
								seamless execution and maximum impact. We
								collaborate closely with organizers from concept
								to completion, ensuring every detail aligns with
								the event's vision.
							</p>
							<p>
								From initial planning and content curation to
								on-stage delivery and audience engagement, we
								bring a dynamic presence that elevates the
								experience for all attendees.
							</p>
						</CardContent>
					</Card>

					<Card className='p-6'>
						<CardHeader>
							<CardTitle className='text-2xl font-bold mb-4'>
								Key Stats
							</CardTitle>
						</CardHeader>
						<CardContent className='text-gray-700 space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<p className='text-4xl font-bold text-primary'>
										5000+
									</p>
									<p className='text-sm text-gray-600'>
										Attendees Engaged
									</p>
								</div>
								<div>
									<p className='text-4xl font-bold text-primary'>
										20+
									</p>
									<p className='text-sm text-gray-600'>
										Events Hosted
									</p>
								</div>
								<div>
									<p className='text-4xl font-bold text-primary'>
										7+
									</p>
									<p className='text-sm text-gray-600'>
										Countries Reached
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Column Two: Events Grid */}
				<div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
					{EVENT_LIST.map((event) => (
						<EventCard
							key={event.slug}
							{...event}
						/>
					))}
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
