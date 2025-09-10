'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageGallery from '@/components/image-gallery';
import MarqueeGroupNoAnimation from '@/components/marquee-group-no-animaition';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export interface SingleEventPageFromCmsProps {
	mainImage: string;
	mainVideo: string;
	eventLogo: string;
	eventName: string;
	eventDescription: string;
	eventImages: { src: string; alt: string }[];
	slug: string;
	href: string;
}

export default function SingleEventPageFromCms({
	mainImage,
	mainVideo,
	eventLogo,
	eventName,
	eventDescription,
	eventImages,
	slug,
}: SingleEventPageFromCmsProps) {
	const mainRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// Refs for video elements
	const videoRef = useRef<HTMLVideoElement>(null); // Main video
	const backgroundVideoRef = useRef<HTMLVideoElement>(null); // Blurred background video
	const [isVideoLoaded, setIsVideoLoaded] = useState(false); // For main video opacity transition

	const [textWidth, setTextWidth] = useState(0);

	useEffect(() => {
		if (textRef && textRef.current && textRef.current?.scrollWidth > 0) {
			setTextWidth(textRef.current.scrollWidth);
		}
	}, [textRef]);

	// Specific scroll progress for the oversized text
	const { scrollYProgress: textScrollProgress } = useScroll({
		target: textRef,
		offset: ['start center', 'end start'],
	});
	// Specific scroll progress for the gallery
	const { scrollYProgress: galleryScrollProgress } = useScroll({
		target: galleryRef,
		offset: ['start end', 'end start'],
	});

	// Transform scroll progress into animation values
	const textX = useTransform(galleryScrollProgress, [0, 1], [0, -textWidth]);
	const textOpacity = useTransform(
		textScrollProgress,
		[0, 0.2, 0.8, 1],
		[1, 1, 0.7, 0.5]
	);

	const handlePlay = () => {
		setIsPlaying(true);
		// Ensure both videos attempt to play when state changes
		setTimeout(() => {
			if (videoRef.current) {
				videoRef.current.play().catch((e) => {});
			}
			if (backgroundVideoRef.current) {
				backgroundVideoRef.current.play().catch((e) => {});
			}
		}, 0);
	};

	// Effect to handle video loading and playing for both main and background videos
	useEffect(() => {
		const mainVideoElement = videoRef.current;
		const bgVideoElement = backgroundVideoRef.current;

		if (isPlaying && mainVideo && mainVideoElement && bgVideoElement) {
			// Set sources for both videos
			mainVideoElement.src = mainVideo;
			bgVideoElement.src = mainVideo;

			// Load both videos
			mainVideoElement.load();
			bgVideoElement.load();

			// Handle loaded data for main video
			mainVideoElement.onloadeddata = () => {
				setIsVideoLoaded(true);
			};

			// Cleanup function
			return () => {
				mainVideoElement.onloadeddata = null; // Remove event listener
				setIsVideoLoaded(false); // Reset loaded state on unmount or src change
			};
		} else {
			// If not playing or no video, pause and clear sources
			if (mainVideoElement) {
				mainVideoElement.pause();
				mainVideoElement.src = '';
			}
			if (bgVideoElement) {
				bgVideoElement.pause();
				bgVideoElement.src = '';
			}
			setIsVideoLoaded(false);
		}
	}, [isPlaying, mainVideo]); // Depend on isPlaying and mainVideo prop

	return (
		<div className='flex flex-col bg-white'>
			{/* Hero Section with Play Button */}
			<section className='relative w-svw aspect-video mt-25 md:aspect-auto overflow-clip md:h-[calc(100svh-100px)] '>
				{!isPlaying ? (
					<>
						<Image
							src={mainImage ?? '/images/arm/main.jpg'}
							alt='ARM LABS Event'
							fill
							className='object-cover'
							priority
						/>
						<div className='absolute inset-0 bg-black/30 flex items-center justify-center flex-col'>
							<motion.button
								className='text-white text-7xl font-bold mb-4 font-tusker-grotesk tracking-wider cursor-pointer hover:scale-105 transition-transform'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								onClick={handlePlay}
								aria-label='Play video'
							>
								Play
							</motion.button>
						</div>
					</>
				) : (
					<div className='absolute inset-0 bg-black'>
						{/* Blurred background video */}
						<video
							ref={backgroundVideoRef}
							className='absolute inset-0 w-full h-full object-cover filter blur-xl scale-110'
							autoPlay
							muted
							loop
							playsInline
							src={mainVideo ?? '/videos/sample-2.webm'} // Use mainVideo prop
						/>
						{/* Main video */}
						<video
							ref={videoRef}
							className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
								isVideoLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							controls // Keep controls for the main video
							autoPlay
							muted
							loop
							playsInline
							src={mainVideo ?? '/videos/sample-2.webm'} // Use mainVideo prop
						>
							Your browser does not support the video tag.
						</video>
					</div>
				)}
			</section>
			{/* <div className="marquee">
        <MarqueeGroupNoAnimation />
      </div> */}
			{/* Main content container */}
			<MaxWidthWrapper>
				<div
					className='relative'
					ref={mainRef}
				>
					{/* Oversized ARM LABS text that becomes sticky */}
					<div
						className=' overflow-clip sticky top-20 '
						ref={textRef}
					>
						<motion.div
							className='px-4 md:px-8 flex items-center whitespace-nowrap '
							style={{
								x: textX,
								opacity: textOpacity,
							}}
						>
							<Image
								src={
									eventLogo ??
									'/images/arm/techstars-logo.png'
								}
								alt={`${
									eventName ?? 'ARM LABS - TECHSTARS'
								} Logo`}
								width={400}
								height={150}
								className='object-contain h-24 md:h-36 '
							/>
							<h1 className='font-tusker-grotesk-bold text-9xl md:text-[300px] font-black whitespace-nowrap'>
								{eventName ?? 'ARM LABS - TECHSTARS'}
							</h1>
						</motion.div>
						<p className='mt-5 md:mt-10 px-4 md:px-12 pb-8 text-xl md:text-[32px] font-bold '>
							{eventDescription}
						</p>
					</div>
					{/* Description Text */}
					<motion.div
						className='px-8 py-12 max-w-4xl relative z-10'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
					></motion.div>
					{/* Image Gallery that scrolls over the text */}
					<div
						ref={galleryRef}
						className='relative z-50'
					>
						<ImageGallery
							images={eventImages}
							scrollProgress={galleryScrollProgress}
						/>
					</div>
				</div>
			</MaxWidthWrapper>
			{/* Final Marquee */}
			<div className='marquee'>
				<MarqueeGroupNoAnimation />
			</div>
		</div>
	);
}
