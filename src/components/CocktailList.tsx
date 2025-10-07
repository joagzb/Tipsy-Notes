import { UseGlobalState } from "../hooks/UseGlobalState";
import { CocktailCard } from "./CocktailCard";
import { Navbar } from "./Navbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardDetailModal } from "./CardDetailModal";
import type { ICocktail } from "../models/ICocktail";
import { HorizontalScroller } from "./HorizontalScroller";
import { Hero } from "./Hero";

export function CocktailList() {
	const { cocktails } = UseGlobalState();

	const [selected, setSelected] = useState<ICocktail | null>(null);
	const [isModalOpen, setIsModalOpenOpen] = useState(false);
	const [hasActiveFilters, setHasActiveFilters] = useState(false);
	const [filtered, setFiltered] = useState<ICocktail[]>(cocktails);

	const onCardClick = useCallback((cocktail: ICocktail) => {
		setSelected(cocktail);
		setIsModalOpenOpen(true);
	}, []);

	const cocktailsByCategory = useMemo(() => {
		const grouped = new Map<string, ICocktail[]>();

		cocktails.forEach(cocktail => {
			cocktail.tags.forEach(tag => {
				if (!grouped.has(tag)) {
					grouped.set(tag, []);
				}
				grouped.get(tag)!.push(cocktail);
			});
		});

		const sorted = Array.from(grouped.entries()).sort((a, b) => b[1].length - a[1].length);
		
		return new Map<string, ICocktail[]>(sorted);
	}, [cocktails]);

	useEffect(() => {
		if (!hasActiveFilters) {
			setFiltered(cocktails);
		}
	}, [cocktails, hasActiveFilters]);

	useEffect(() => {
		if (!isModalOpen) {
			return;
		}
	}, [isModalOpen]);

	return (
		<>
			<Navbar />
			<Hero onFiltersChange={(hasActiveFilters, results) => { setHasActiveFilters(hasActiveFilters); setFiltered(results); }} />

			<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{!hasActiveFilters ? (
						<div className="space-y-16">
							{Array.from(cocktailsByCategory.entries()).map(([category, categoryCocktails]) => (
								<div key={category} className="space-y-6">

									<div className="text-center">
										<h2 className="text-3xl md:text-4xl font-serif text-amber-900 dark:text-amber-100 capitalize tracking-wide">
											{category}
										</h2>
										<div className="flex items-center justify-center mt-2">
											<div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24" />
											<div className="mx-3 text-amber-400">✦</div>
											<div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24" />
										</div>
									</div>

									<HorizontalScroller className="w-full" contentClassName="py-2">
										{categoryCocktails.map((cocktail) => (
											<div key={cocktail.id} className="shrink-0 w-[18rem]">
												<CocktailCard cocktail={cocktail} onClick={() => onCardClick(cocktail)} />
											</div>
										))}
									</HorizontalScroller>

								</div>
							))}
						</div>
					) : filtered.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">🍸</div>
							<h3 className="text-2xl font-serif text-muted-foreground mb-2">No cocktails found</h3>
							<p className="text-muted-foreground">Try adjusting your filters</p>
						</div>
					) : (
						<div className="space-y-12">
							<HorizontalScroller className="w-full" contentClassName="py-2">
								{filtered.map((cocktail) => (
									<div key={cocktail.id} className="shrink-0 w-[18rem]">
										<CocktailCard cocktail={cocktail} onClick={() => onCardClick(cocktail)} />
									</div>
								))}
							</HorizontalScroller>
						</div>
					)}
				</div>
			</div>

			{selected && <CardDetailModal cocktail={selected} open={isModalOpen} onRequestClose={() => setIsModalOpenOpen(false)} />}
		</>
	);
}
