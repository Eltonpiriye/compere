'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useHover } from '@/context/hover-context';
import { EVENT_LIST } from '@/lib/consts';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundVideoPlayer() {
	const { hoveredItem, visibleItem } = useHover();
	const [videoSrc, setVideoSrc] = useState<string | null>(null);
	const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const backgroundVideoRef = useRef<HTMLVideoElement>(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	const activeItem = hoveredItem || visibleItem;

	// Handle image/video source changes based on active item
	useEffect(() => {
		if (!activeItem) {
			setVideoSrc(null);
			setCurrentImageSrc(null);
			setIsTransitioning(false);
			return;
		}

		const item = EVENT_LIST.find((item) => item.eventName === activeItem);

		if (item) {
			if (hoveredItem && item.mainVideo) {
				setVideoSrc(item.mainVideo);
				setCurrentImageSrc(null);
				setIsTransitioning(false);
			} else {
				setVideoSrc(null);
				if (currentImageSrc !== item.mainImage) {
					setIsTransitioning(true);
					setCurrentImageSrc(item.mainImage);
					setTimeout(() => setIsTransitioning(false), 600); // smooth fade timing
				}
			}
		}
	}, [activeItem, hoveredItem]);

	// Handle video loading
	useEffect(() => {
		const mainVideoElement = videoRef.current;
		const bgVideoElement = backgroundVideoRef.current;

		if (mainVideoElement && bgVideoElement) {
			if (videoSrc) {
				mainVideoElement.src = videoSrc;
				bgVideoElement.src = videoSrc;

				mainVideoElement.load();
				bgVideoElement.load();

				mainVideoElement
					.play()
					.then(() => setIsVideoLoaded(true))
					.catch((e) => {
						setIsVideoLoaded(false);
					});

				bgVideoElement.play().catch((e) => {});
			} else {
				mainVideoElement.pause();
				bgVideoElement.pause();
				mainVideoElement.src = '';
				bgVideoElement.src = '';
				setIsVideoLoaded(false);
			}
		}
	}, [videoSrc]);

	if (!videoSrc && !currentImageSrc) return null;

	return (
		<div className='absolute inset-0 w-full h-full overflow-hidden z-[-1] bg-black'>
			{/* Blurred background video */}
			{videoSrc && (
				<video
					ref={backgroundVideoRef}
					className='absolute inset-0 w-full h-full object-cover filter blur-xl scale-110'
					autoPlay
					muted
					loop
					playsInline
					src={videoSrc}
				/>
			)}

			{/* Main video */}
			{videoSrc && (
				<video
					ref={videoRef}
					className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
						isVideoLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					autoPlay
					muted
					loop
					playsInline
					src={videoSrc}
				/>
			)}

			{/* Image with smooth fade */}
			{!videoSrc && currentImageSrc && (
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentImageSrc}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
						className='absolute inset-0'
					>
						<Image
							src={currentImageSrc || '/placeholder.svg'}
							alt='Background'
							fill
							className='object-cover grayscale'
							priority
						/>
					</motion.div>
				</AnimatePresence>
			)}

			{/* Overlay */}
			<div className='absolute inset-0 bg-black/40' />
		</div>
	);
}
