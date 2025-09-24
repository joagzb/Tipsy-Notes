import { useState } from "react";
import { UseGlobalState } from "../hooks/UseGlobalState";
import type { ICocktail } from "../models/ICocktail";
import { Heart, HeartFill } from "react-bootstrap-icons";

interface CocktailModalProps {
	cocktail: ICocktail;
	open: boolean;
	onRequestClose: () => void;
}

export function CardDetailModal({ cocktail, open, onRequestClose }: CocktailModalProps) {
	const { onLikeToggleCocktail } = UseGlobalState();

	const [liked, setLiked] = useState(false);

	if (!open) return null;

	const orderSteps = () => [...cocktail.steps].sort((a, b) => a.order - b.order);

	const onLikeBtnClick = () => {
		setLiked(!liked);
		onLikeToggleCocktail(cocktail.id, !liked);
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onRequestClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleBackdropClick}>
			<div
				className="relative w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-800/50"
				style={{
					backgroundImage: `url(${cocktail.imageUrl})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-yellow-50/95 dark:from-amber-950/95 dark:via-orange-950/90 dark:to-yellow-950/95 backdrop-blur-[2px]" />

				<div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-amber-800/60 rounded-tl-lg" />
				<div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-amber-800/60 rounded-br-lg" />

				<button
					onClick={onRequestClose}
					className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-amber-800/10 hover:bg-amber-800/20 transition-colors border border-amber-800/30"
				>
					<span className="w-4 h-4 text-amber-800 dark:text-amber-200">X</span>
				</button>

				<div className="relative z-10 h-full flex flex-col p-8">
					<div className="text-center mb-6">
						<div className="flex items-center justify-center gap-3 mb-2">
							<h1 className="text-4xl font-serif text-amber-900 dark:text-amber-100 tracking-wide drop-shadow-sm">
								{cocktail.title}
							</h1>
							<button
								onClick={onLikeBtnClick}
								className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-700 transition-colors bg-white/80 dark:bg-black/20 rounded-full border border-red-300/50 shadow-sm"
							>
								{liked ? <HeartFill/> : <Heart/>}
								<span className="text-sm font-medium">{cocktail.likes}</span>
							</button>
						</div>
						<p className="text-amber-800/80 dark:text-amber-200/80 italic font-serif">
							{cocktail.author} • {cocktail.date.getFullYear()}
						</p>
						<div className="flex flex-wrap justify-center gap-2 mt-3">
							{cocktail.tags.map((tag, idx) => (
								<span
									key={`${cocktail.id}-tag-${idx}`}
									className="px-3 py-1 bg-amber-200/70 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 text-xs font-medium rounded-full border border-amber-300/50 font-serif"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
						<div className="space-y-4">
							<div className="text-center p-4 bg-white/60 dark:bg-black/20 rounded-lg border border-amber-200/50 backdrop-blur-sm">
								<p className="text-amber-800 dark:text-amber-200 font-serif italic leading-relaxed">
									"{cocktail.description}"
								</p>
							</div>
							{cocktail.glass && (
								<div className="text-center p-3 bg-amber-100/60 dark:bg-amber-900/30 rounded-lg border border-amber-200/50">
									<span className="text-amber-800 dark:text-amber-200 font-serif">
										Serve in: <em className="font-bold">{cocktail.glass}</em>
									</span>
								</div>
							)}
						</div>

						<div>
							<h2 className="text-xl font-serif text-amber-900 dark:text-amber-100 text-center mb-3 tracking-wide">
								~ Ingredients ~
							</h2>
							<div className="space-y-2 max-h-64 overflow-y-auto">
								{cocktail.ingredients.map((ingredient, idx) => (
									<div
										key={`${cocktail.id}-ingredient-${idx}`}
										className="flex justify-between items-center py-2 px-4 bg-white/60 dark:bg-black/20 rounded-lg border border-amber-200/50 backdrop-blur-sm"
									>
										<span className="font-serif text-amber-900 dark:text-amber-100 text-sm">
											{ingredient.name}
										</span>
										<span className="text-amber-700 dark:text-amber-300 font-medium font-serif text-sm">
											{ingredient.units} {ingredient.measurementType}
										</span>
									</div>
								))}
							</div>
						</div>

						<div>
							<h2 className="text-xl font-serif text-amber-900 dark:text-amber-100 text-center mb-3 tracking-wide">
								~ Preparation ~
							</h2>
							<div className="space-y-2 max-h-64 overflow-y-auto">
								{orderSteps().map((step, idx) => (
									<div
										key={`${cocktail.id}-step-${step.order}`}
										className="flex gap-3 p-3 bg-white/60 dark:bg-black/20 rounded-lg border border-amber-200/50 backdrop-blur-sm"
									>
										<span className="flex-shrink-0 w-6 h-6 bg-amber-800/80 text-white rounded-full flex items-center justify-center font-serif font-bold text-xs">
											{idx + 1}
										</span>
										<p className="text-amber-800 dark:text-amber-200 font-serif text-sm leading-relaxed">
											{step.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
