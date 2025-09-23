import type { ICocktail } from "../models/ICocktail";

interface ICockailCardProps {
	cocktail: ICocktail;
	onClick: () => void;
}

export function CocktailCard({ cocktail, onClick }: ICockailCardProps) {

	const onCardClick = (): void => {
		onClick();
	};

	return (
		<div onClick={onCardClick}
			className="group relative overflow-hidden
        bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20
        border-2 border-amber-200 dark:border-amber-800
        rounded-3xl shadow-xl hover:shadow-2xl
        transition-all duration-500 ease-out
        hover:scale-[1.02]">

			<div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-amber-400 rounded-tl-2xl opacity-60" />
			<div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-amber-400 rounded-tr-2xl opacity-60" />
			<div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-amber-400 rounded-bl-2xl opacity-60" />
			<div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-amber-400 rounded-br-2xl opacity-60" />

			<div className="p-8">
				<div className="flex flex-col lg:flex-row lg:items-center gap-6">

					<div className="shrink-0 relative w-full lg:w-72 h-56 lg:h-48">
						<img
							className="size-full object-cover rounded-2xl
                border-4 border-amber-300/50 dark:border-amber-700/50
                transition-all duration-700 ease-out
                group-hover:scale-110 group-hover:rotate-2"

							src={cocktail.imageUrl}
							alt={'image of ' + cocktail.title}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-amber-200/10 rounded-2xl" />
					</div>

					<div className="flex-1 space-y-5">
						<div className="relative">
							<h3 className="text-2xl lg:text-3xl font-bold
                bg-gradient-to-r from-amber-800 to-orange-700 dark:from-amber-300 dark:to-orange-300
                bg-clip-text text-transparent
                group-hover:from-amber-700 group-hover:to-orange-600
                transition-all duration-300
                font-serif tracking-wide
                drop-shadow-sm"
							>
								{cocktail.title}
							</h3>
							<div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
						</div>

						<p className="text-amber-900 dark:text-amber-100 leading-relaxed text-lg
              font-serif italic
              line-clamp-3"
						>
							{cocktail.description}
						</p>

						<div className="flex flex-wrap gap-3 pt-2">
							{cocktail.tags.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center px-4 py-2
                    text-sm font-semibold tracking-wide
                    bg-gradient-to-r from-amber-200 to-orange-200
                    dark:from-amber-800 dark:to-orange-800
                  text-amber-800 dark:text-amber-200
                    border-2 border-amber-300 dark:border-amber-700
                    rounded-full shadow-md
                    transition-all duration-300
                    hover:shadow-lg hover:scale-105
                    group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-orange-300
                    font-serif uppercase"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

				</div>
			</div>

			<div className="absolute inset-0 opacity-5 pointer-events-none">
				<div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_transparent_40%,_rgba(180,83,9,0.1)_100%)]" />
			</div>
		</div>
	);
}
