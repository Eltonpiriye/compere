import MaxWidthWrapper from '@/components/max-width-wrapper';
import TestimonialCard from '@/components/testimonial-card';
import { TESTIMONIALS_DATA } from '@/lib/consts';

export default function TestimonialsPage() {
	return (
		<main className='flex-1 py-12 md:py-32'>
			<MaxWidthWrapper>
				<div className='columns-1 sm:columns-2 lg:columns-3 gap-6'>
					{[...TESTIMONIALS_DATA].map((testimonial, index) => (
						<div
							key={index}
							className='mb-6 break-inside-avoid-column'
						>
							<TestimonialCard {...testimonial} />
						</div>
					))}
				</div>
			</MaxWidthWrapper>
		</main>
	);
}
