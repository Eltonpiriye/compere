'use client';

import { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { FocusCards } from './ui/focus-cards';

interface ImageGalleryProps {
	scrollProgress: MotionValue<number>;
	images: { src: string; alt: string }[];
}

export default function ImageGallery({
	scrollProgress,
	images,
}: ImageGalleryProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Transform scroll progress into blur amount (0px to 16px)
	const blurAmount = useTransform(
		scrollProgress,
		[0, 0.2, 0.4, 0.7, 1],
		[0, 1, 4, 8, 16]
	);

	// Transform scroll progress into background opacity
	const bgOpacity = useTransform(
		scrollProgress,
		[0, 0.2, 0.8, 1],
		[0, 0.5, 0.7, 0.8]
	);

	return (
		<div className='relative'>
			<motion.div
				className='py-8'
				ref={containerRef}
				style={{
					backdropFilter: useTransform(
						blurAmount,
						(v) => `blur(${v}px)`
					),
					WebkitBackdropFilter: useTransform(
						blurAmount,
						(v) => `blur(${v}px)`
					),
				}}
			>
				<FocusCards
					cards={images.map((img, idx) => ({
						title: img.alt,
						src: img.src,
						key: idx,
					}))}
				/>
			</motion.div>
		</div>
	);
}
