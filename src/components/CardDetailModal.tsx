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
		<div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden">
				<div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 rounded-lg shadow-2xl border-8 border-amber-800/30 relative overflow-y-auto max-h-[95vh]">

					<div className="absolute top-4 left-4 w-8 h-8 lg:border-l-4 lg:border-t-4 lg:border-amber-800/40 lg:rounded-tl-lg" />
					<div className="absolute bottom-4 right-4 w-8 h-8 lg:border-r-4 lg:border-b-4 lg:border-amber-800/40 lg:rounded-br-lg" />

					<button onClick={onRequestClose}
						className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-amber-800/10 hover:bg-amber-800/20 transition-colors border border-amber-800/30"
					>
						<svg className="w-4 h-4 text-amber-800 dark:text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="p-6 sm:p-8 lg:p-12">
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start lg:max-h-[40vh]">
							<div className="space-y-8">
                <div className="text-center border-b-2 border-amber-800/30 pb-4">
									<div className="flex items-center justify-center gap-2 mb-2">
										<h1 className="text-4xl font-serif text-amber-900 dark:text-amber-100 tracking-wide">
											{cocktail.title}
										</h1>
										<button onClick={onLikeBtnClick}
											className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-700 transition-colors bg-amber-100/50 dark:bg-amber-900/20 rounded-full border border-red-300/50"
										>
											{liked ? <HeartFill className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
											<span className="text-sm font-medium">{cocktail.likes}</span>
										</button>
									</div>
									<p className="text-amber-800/80 dark:text-amber-200/80 italic font-serif text-md">
										{cocktail.author} • {cocktail.date.getFullYear()}
									</p>
									<div className="flex flex-wrap justify-center gap-2 mt-4">
										{cocktail.tags.map((tag, idx) => (
											<span
												key={`${cocktail.id}-tag-${idx}`}
												className="px-4 py-2 bg-amber-200/60 dark:bg-amber-800/40 text-amber-900 dark:text-amber-100 text-sm font-medium rounded-full border border-amber-300/50 font-serif"
											>
												{tag}
											</span>
										))}
									</div>
								</div>

                <div className="text-center px-4">
									<p className="text-amber-800 dark:text-amber-200 font-serif italic leading-relaxed text-md">
										"{cocktail.description}"
									</p>
								</div>

                <div className="text-center px-4">
									{cocktail.glass && (
										<div className="text-center py-4 bg-amber-100/30 dark:bg-amber-900/10 rounded-lg border-2 border-amber-200/30">
											<span className="text-amber-800 dark:text-amber-200 font-serif text-lg">
												Serve in: <em className="font-bold">{cocktail.glass}</em>
											</span>
										</div>
									)}
								</div>


							</div>
							<div className="flex items-center justify-center">
								<div className="relative">
									<img
										src={cocktail.imageUrl}
										alt={cocktail.title + ' image'}
										className="max-w-xs h-48 object-cover rounded-2xl shadow-2xl border-4 border-amber-800/40"
									/>
									<div className="absolute -inset-3 border-2 border-amber-800/20 rounded-2xl pointer-events-none" />
								</div>
							</div>

						</div>
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 lg:items-start lg:max-h-[60vh]">
              <div>
                <h2 className="text-2xl font-serif text-amber-900 dark:text-amber-100 text-center mb-4 tracking-wide">
                  ~ Ingredients ~
                </h2>
                <div className="space-y-3">
                  {cocktail.ingredients.map((ingredient, idx) => (
                    <div
                      key={`${cocktail.id}-ingredient-${idx}`}
                      className="flex justify-between items-center h-16 px-5 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50"
                    >
                      <span className="font-serif text-amber-900 dark:text-amber-100 text-lg truncate pr-4">
                        {ingredient.name}
                      </span>
                      <span className="text-amber-700 dark:text-amber-300 font-medium font-serif whitespace-nowrap">
                        {ingredient.units} {ingredient.measurementType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-amber-900 dark:text-amber-100 text-center mb-4 tracking-wide">
                  ~ Preparation ~
                </h2>
                <div className="space-y-3">
                  {orderSteps().map((step, idx) => (
                    <div
                      key={`${cocktail.id}-step-${step.order}`}
                      className="flex items-center gap-4 h-16 px-5 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50"
                    >
                      <span className="flex-shrink-0 w-10 h-10 bg-amber-800/20 text-amber-900 dark:text-amber-100 rounded-full flex items-center justify-center font-serif font-bold text-lg border-2 border-amber-800/30">
                        {idx + 1}
                      </span>
                      <p className="text-amber-800 dark:text-amber-200 font-serif leading-relaxed text-lg truncate">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

						<div className="lg:hidden space-y-6">
							<div className="text-center border-b-2 border-amber-800/30 pb-4">
								<div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
									<h1 className="text-3xl sm:text-4xl font-serif text-amber-900 dark:text-amber-100 tracking-wide">
										{cocktail.title}
									</h1>
									<button
										onClick={onLikeBtnClick}
										className="flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-700 transition-colors bg-amber-100/50 dark:bg-amber-900/20 rounded-full border border-red-300/50"
									>
										{liked ? <HeartFill className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
										<span className="text-xs font-medium">{cocktail.likes}</span>
									</button>
								</div>
								<p className="text-amber-800/80 dark:text-amber-200/80 italic font-serif">
									By {cocktail.author} • {cocktail.date.getFullYear()}
								</p>
								<div className="flex flex-wrap justify-center gap-2 mt-3">
									{cocktail.tags.map((tag, idx) => (
										<span
											key={`${cocktail.id}-tag-${idx}`}
											className="px-3 py-1 bg-amber-200/50 dark:bg-amber-800/30 text-amber-900 dark:text-amber-100 text-xs font-medium rounded-full border border-amber-300/50 font-serif"
										>
											{tag}
										</span>
									))}
								</div>
							</div>

							<div className="flex justify-center">
								<div className="relative">
                  <img
                    src={cocktail.imageUrl}
                    alt={cocktail.title + ' image'}
                    className="w-full max-w-xs h-48 object-cover rounded-xl shadow-xl border-4 border-amber-800/40"
                  />
									<div className="absolute -inset-2 border-2 border-amber-800/20 rounded-xl pointer-events-none" />
								</div>
							</div>

							<div className="text-center">
								<p className="text-amber-800 dark:text-amber-200 font-serif italic leading-relaxed">
									"{cocktail.description}"
								</p>
							</div>

							<div>
								<h2 className="text-xl font-serif text-amber-900 dark:text-amber-100 text-center mb-3 tracking-wide">
									~ Ingredients ~
								</h2>
								<div className="space-y-2">
									{cocktail.ingredients.map((ingredient, idx) => (
										<div
											key={`${cocktail.id}-ingredient-${idx}`}
											className="flex justify-between items-center py-2 px-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50"
										>
											<span className="font-serif text-amber-900 dark:text-amber-100">
												{ingredient.name}
											</span>
											<span className="text-amber-700 dark:text-amber-300 font-medium font-serif text-sm">
												{ingredient.units} {ingredient.measurementType}
											</span>
										</div>
									))}
								</div>
							</div>

							{cocktail.glass && (
								<div className="text-center py-3 bg-amber-100/30 dark:bg-amber-900/10 rounded-lg border border-amber-200/30">
									<span className="text-amber-800 dark:text-amber-200 font-serif">
										Serve in: <em>{cocktail.glass}</em>
									</span>
								</div>
							)}

							<div>
								<h2 className="text-xl font-serif text-amber-900 dark:text-amber-100 text-center mb-3 tracking-wide">
									~ Preparation ~
								</h2>
								<div className="space-y-3">
                  {orderSteps().map((step, idx) => (
                    <div
                      key={`${cocktail.id}-step-${step.order}`}
                      className="flex gap-3 p-3 h-14 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-200/30"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-amber-800/20 text-amber-900 dark:text-amber-100 rounded-full flex items-center justify-center font-serif font-bold text-sm border border-amber-800/30">
                        {idx + 1}
                      </span>
                      <p className="text-amber-800 dark:text-amber-200 font-serif leading-relaxed text-sm truncate">
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
		</div>
	);
}
