import { UseGlobalState } from "../hooks/UseGlobalState";
import { CocktailCard } from "./CocktailCard";
import { Navbar } from "./Navbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardDetailModal } from "./CardDetailModal";
import type { ICocktail } from "../models/ICocktail";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { CATEGORIES } from "../models/CategoriesEnum";
import Select from "react-select";
import type { SingleValue } from "react-select";

export function CocktailList() {
	const { cocktails } = UseGlobalState();
	const [selected, setSelected] = useState<ICocktail | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("Any Category");
	const [keywords, setKeywords] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
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
		let filteredCocktails = cocktails;

		if (selectedCategory !== "Any Category") {
			filteredCocktails = filteredCocktails.filter(c => c.tags.some(t => t === selectedCategory));
		}

		if (showFavoritesOnly) {
			filteredCocktails = filteredCocktails.filter(c => c.likes > 0);
		}

		if (keywords.length > 0) {
			filteredCocktails = filteredCocktails.filter(c =>
				keywords.every(k => c.ingredients.some(i => i.name.toLowerCase().includes(k.toLowerCase())))
			);
		}

		return filteredCocktails;
	}, [cocktails, keywords, selectedCategory, showFavoritesOnly]);

	const categoryOptions = useMemo(() => {
		return [{ value: "Any Category", label: "Any Category" }, ...CATEGORIES.map(c => ({ value: c, label: c }))];
	}, []);

	const onCategoryFilterSet = (e: SingleValue<{ value: string; label: string }>) => {
		setSelectedCategory(e?.value ?? "Any Category");
	}

	useEffect(() => {
		if (!open) return;
	}, [open]);

	return (
		<>
			<Navbar />

			<div className="relative bg-gradient-to-b from-amber-900 via-orange-900 to-yellow-900 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-20 px-4 sm:px-6 lg:px-8">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23d97706%22%20fill-opacity=%220.1%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

				<div className="relative max-w-4xl mx-auto text-center">
					<div className="mb-8">
						<div className="text-amber-300 text-sm font-serif mb-2 tracking-widest uppercase">Est. 1897</div>
						<h1 className="text-4xl md:text-6xl font-bold font-serif text-amber-100 mb-4 drop-shadow-2xl">
							The Tipsy Notes
						</h1>
						<div className="flex items-center justify-center mb-6">
							<div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32" />
							<div className="mx-4 text-amber-300">✦</div>
							<div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32" />
						</div>
					</div>

					<h2 className="text-2xl md:text-3xl font-serif text-amber-200 mb-8 italic">
						Tell me your spirit, and I'll mix the rest
					</h2>

					<div className="max-w-2xl mx-auto">
						<div className="flex flex-wrap items-center gap-2 rounded-lg p-2 bg-card/90 backdrop-blur-sm border-2 border-amber-300/30">
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
								placeholder="Start Typing ingredients and then hit Enter"
								className="flex-1 min-w-[16rem] bg-transparent outline-none border-0 py-1 px-2 placeholder:text-muted-foreground text-lg h-12"
								type="text"
							/>
							<button
								onClick={() => commitKeywords(inputValue)}
								className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
							>
								Add
							</button>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<div className="flex items-center gap-2">
								<button
									aria-pressed={showFavoritesOnly}
									onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
									className={`inline-flex items-center justify-center size-10 rounded-full border transition-colors ${showFavoritesOnly ? 'bg-red-600/90 border-red-300 text-white' : 'bg-amber-100/40 border-amber-300/60 text-red-600 hover:bg-amber-200/60'}`}
									title="Toggle favorites"
								>
									{showFavoritesOnly ? <HeartFill className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
								</button>
								<span className="text-sm text-amber-100/90">Favorites</span>
							</div>

							<Select
								className="py-2.5 sm:py-3 px-4 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
								classNamePrefix="select"
								isSearchable
								name="category-select"
								inputId="category-select"
								value={categoryOptions.find(c => c.value === selectedCategory)}
								onChange={onCategoryFilterSet}
								options={categoryOptions}
								noOptionsMessage={() => "Any Category"}
							/>
						</div>
					</div>
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
