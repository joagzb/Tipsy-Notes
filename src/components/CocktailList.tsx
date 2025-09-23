import { UseGlobalState } from "../hooks/UseGlobalState";
import { CocktailCard } from "./CocktailCard";
import { Navbar } from "./Navbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardDetailModal } from "./CardDetailModal";
import type { ICocktail } from "../models/ICocktail";

export function CocktailList() {
	const { cocktails } = UseGlobalState();
	const [selected, setSelected] = useState<ICocktail | null>(null);
	const [keywords, setKeywords] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const [open, setOpen] = useState(false);

	const onCardClick = useCallback((cocktail: ICocktail) => {
		setSelected(cocktail);
		setOpen(true);
	}, []);

	const commitKeywords = (keyword: string) => {
		const cleanKeyword = keyword.trim();
		if (!cleanKeyword) {
			return;
		}

		const keywordsSet = new Set(keywords.map(k => k.toLowerCase()));
		keywordsSet.add(cleanKeyword);
		setKeywords(Array.from(keywordsSet));
		setInputValue("");
	};

	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			commitKeywords(inputValue);
		}
	};

	const removeKeyword = (index: number): void => {
		setKeywords((existing) => existing.filter((_, i) => i !== index));
	};

	const filterResultsByIngredient = useMemo((): ICocktail[] => {
		if (keywords.length === 0){
			 return cocktails;
			}

		return cocktails.filter(c =>
			keywords.every(k => c.ingredients.some(i => i.name.toLowerCase().includes(k.toLowerCase())))
		);
	}, [cocktails, keywords]);


	useEffect(() => {
		if (!open) return;
	}, [open]);

	return (
		<>
			<Navbar />

			<div className="max-w-7xl mx-auto px-4 mt-6">
				<div className="flex flex-wrap items-center gap-2 border rounded-lg p-2 bg-muted">
					{keywords.map((k, indx) => (
						<button
							key={`${k}-${indx}`}
							onClick={() => removeKeyword(indx)}
							className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-amber-200/60 dark:bg-amber-800/40 text-amber-900 dark:text-amber-100 text-sm border border-amber-300/50"
							title="Remove keyword"
						>
							<span className="truncate max-w-[10rem]">{k}</span>
							<span className="text-amber-900/70 dark:text-amber-100/70">×</span>
						</button>
					))}
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={onInputKeyDown}
						placeholder="Type ingredients, press Enter or ,"
						className="flex-1 min-w-[16rem] bg-transparent outline-none py-1 px-2 placeholder:text-muted-foreground"
						type="text"
					/>
					<button
						onClick={() => commitKeywords(inputValue)}
						className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
					>
						Add
					</button>
				</div>
			</div>

			<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-12">
						{filterResultsByIngredient.map((cocktail) => (
							<CocktailCard key={cocktail.id} cocktail={cocktail} onClick={() => onCardClick(cocktail)} />
						))}
					</div>
				</div>
			</div>

			{selected && <CardDetailModal cocktail={selected} open={open} onRequestClose={() => setOpen(false)} />}
		</>
	);
}
