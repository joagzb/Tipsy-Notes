import { UseGlobalState } from "../hooks/UseGlobalState";
import { CocktailCard } from "./CocktailCard";
import { Navbar } from "./Navbar";
import { useCallback, useEffect, useState } from "react";
import { CardDetailModal } from "./CardDetailModal";
import type { ICocktail } from "../models/ICocktail";

export function CocktailList() {
	const { cocktails } = UseGlobalState();
	const [selected, setSelected] = useState<ICocktail | null>(null);
	const [open, setOpen] = useState(false);

	const onCardClick = useCallback((cocktail: ICocktail) => {
		setSelected(cocktail);
		setOpen(true);
	}, []);

	useEffect(() => {
		if (!open) return;
	}, [open]);

	return (
		<>
			<Navbar />

			<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-12">
						{cocktails.map((cocktail) => (
							<CocktailCard key={cocktail.id} cocktail={cocktail} onClick={() => onCardClick(cocktail)} />
						))}
					</div>
				</div>
			</div>

			{selected && <CardDetailModal cocktail={selected} open={open} onRequestClose={() => setOpen(false)} />}
		</>
	);
}
