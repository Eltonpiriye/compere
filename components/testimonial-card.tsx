'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TestimonialCardProps {
	avatarSrc?: string;
	name: string;
	title: string;
	quote: string;
}

export default function TestimonialCard({
	avatarSrc,
	name,
	title,
	quote,
}: TestimonialCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className='relative overflow-hidden rounded-lg shadow-md group cursor-pointer'
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
		>
			{/* Background Image */}
			<motion.div
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage: avatarSrc
						? `url(${avatarSrc})`
						: `url(/placeholder.svg?height=400&width=400&query=professional%20portrait)`,
				}}
				animate={{
					filter: isHovered
						? 'blur(2px) brightness(0.9) grayscale(0%)'
						: 'blur(1px) brightness(0.5) grayscale(100%)',
				}}
				transition={{ duration: 0.3 }}
			/>

			{/* Overlay for better text readability */}
			<motion.div
				className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20'
				animate={{
					opacity: isHovered ? 0.9 : 0.7,
				}}
				transition={{ duration: 0.3 }}
			/>

			<Card
				className={`relative bg-transparent border-0 shadow-none ${
					isHovered ? 'font-bold' : ''
				}`}
			>
				<CardContent className='p-6 relative '>
					<motion.div
						className='flex items-center mb-4'
						animate={{
							y: isHovered ? -5 : 0,
						}}
						transition={{ duration: 0.3 }}
					>
						<Avatar className='h-12 w-12 mr-4 ring-2 ring-white/50'>
							{avatarSrc ? (
								<AvatarImage
									className='object-cover'
									src={avatarSrc || '/placeholder.svg'}
									alt={name}
								/>
							) : (
								<AvatarFallback className='bg-white/20 text-white backdrop-blur-sm'>
									<User className='h-6 w-6' />
								</AvatarFallback>
							)}
						</Avatar>
						<div>
							<motion.h3
								className='text-lg font-semibold text-white drop-shadow-lg loading'
								animate={{
									textShadow: isHovered
										? '0 2px 8px rgba(0,0,0,0.8)'
										: '0 1px 4px rgba(0,0,0,0.6)',
								}}
								transition={{ duration: 0.3 }}
							>
								{name}
							</motion.h3>
							<motion.p
								className='text-sm text-white/90 drop-shadow-md loading'
								animate={{
									opacity: isHovered ? 1 : 0.8,
								}}
								transition={{ duration: 0.3 }}
							>
								{title}
							</motion.p>
						</div>
					</motion.div>

					<motion.p
						className='text-white/95 leading-relaxed drop-shadow-lg loading'
						animate={{
							y: isHovered ? -3 : 0,
							opacity: isHovered ? 1 : 0.9,
						}}
						transition={{ duration: 0.3 }}
					>
						<span className='text-white/80 text-xl'>"</span>
						{quote}
						<span className='text-white/80 text-xl'>"</span>
					</motion.p>
				</CardContent>
			</Card>
		</motion.div>
	);
}
