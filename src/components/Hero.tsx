import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { HeartFill, Heart } from "react-bootstrap-icons";
import Select from "react-select";
import type { ICocktail } from "../models/ICocktail";
import type { SingleValue } from "react-select";
import { UseGlobalState } from "../hooks/UseGlobalState";
import { CATEGORIES } from "../models/CategoriesEnum";

interface IHeroProps {
	onFiltersChange: (hasActiveFilters: boolean, results: ICocktail[]) => void;
}

export function Hero({ onFiltersChange }: IHeroProps) {
	const { cocktails } = UseGlobalState();

	const [keywords, setKeywords] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<string>("Any Category");

	const categoryOptions = useMemo(() => [{ value: "Any Category", label: "Any Category" }, ...CATEGORIES.map(c => ({ value: c, label: c }))], []);

	const commitKeyword = (keyword: string) => {
		const cleanKeyword = keyword.trim().toLowerCase();
		if (!cleanKeyword) {
			return;
		}

		const keywordsSet = new Set(keywords.map(k => k.toLowerCase()));
		keywordsSet.add(cleanKeyword);
		setKeywords(Array.from(keywordsSet));
		setInputValue("");
	};

	const removeKeyword = (index: number): void => {
		setKeywords((existing) => existing.filter((_, i) => i !== index));
	};

	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			commitKeyword(inputValue);
		}
	};

	const filterResultsByIngredient = useMemo((): ICocktail[] => {
		let filteredCocktails = cocktails;

		if (selectedCategory !== "Any Category") {
			filteredCocktails = filteredCocktails.filter(c => c.tags.some(t => t === selectedCategory));
		}

		if (showFavoritesOnly) {
			filteredCocktails = filteredCocktails.filter(c => c.liked);
		}

		if (keywords.length > 0) {
			filteredCocktails = filteredCocktails.filter(c =>
				keywords.every(k => c.ingredients.some(i => i.name.toLowerCase().includes(k)))
			);
		}

		return filteredCocktails;
	}, [cocktails, keywords, selectedCategory, showFavoritesOnly]);

	const hasActiveFilters = useMemo(() => {
		return keywords.length > 0 || selectedCategory !== "Any Category" || showFavoritesOnly;
	}, [keywords, selectedCategory, showFavoritesOnly]);

	useEffect(() => {
		onFiltersChange(hasActiveFilters, filterResultsByIngredient);
	}, [onFiltersChange, hasActiveFilters, filterResultsByIngredient]);

	const onCategoryFilterSet = (e: SingleValue<{ value: string; label: string }>) => {
		setSelectedCategory(e?.value ?? "Any Category");
	}

	return (
		<div className="relative bg-gradient-to-b from-amber-900 via-orange-900 to-yellow-900 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-20 px-4 sm:px-6 lg:px-8">
			<div className="absolute inset-0 opacity-70 bg-no-repeat" style={{ backgroundImage: "url('/background_bar.jpg')", backgroundPosition: "center 65%", backgroundSize: "cover" }} />

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
							placeholder="Start typing ingredients and press Enter or coma (,)"
							className="flex-1 min-w-0 w-full sm:w-auto bg-transparent outline-none border-0 focus:outline-none focus:ring-0 focus:border-transparent py-1 px-2 placeholder:text-muted-foreground text-lg h-12"
							type="text"
						/>
						<button
							onClick={() => commitKeyword(inputValue)}
							className="hidden md:inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
						>
							Add
						</button>
					</div>

					<div className="flex flex-row gap-4 justify-center">
						<div className="flex items-center gap-2">
							<button
								aria-pressed={showFavoritesOnly}
								onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
								className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border-2 font-serif font-medium text-sm transition-all shadow-md ${showFavoritesOnly
									? 'bg-red-600 border-red-400 text-white hover:bg-red-700'
									: 'bg-amber-100/60 dark:bg-amber-900/40 border-amber-300/70 text-amber-900 dark:text-amber-100 hover:bg-amber-200/70 dark:hover:bg-amber-800/60'
									}`}
								title="Toggle favorites"
							>
								{showFavoritesOnly ? <HeartFill className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
								<span className="hidden sm:inline">Favorites</span>
							</button>
						</div>

						<Select
							className="py-2.5 sm:py-3 px-0 w-full basic-multi-select"
							classNamePrefix="select"
							isSearchable
							name="category-select"
							inputId="category-select"
							value={categoryOptions.find(c => c.value === selectedCategory)}
							onChange={onCategoryFilterSet}
							options={categoryOptions}
							noOptionsMessage={() => "Any Category"}
							styles={{
								control: (base, state) => ({
									...base,
									borderWidth: 2,
									borderColor: state.isFocused ? '#fbbf24' : 'rgba(251, 191, 36, 0.3)',
									boxShadow: 'none',
									outline: 'none',
									backgroundColor: 'transparent',
									borderRadius: 9999,
									minHeight: '2.75rem',
									'&:hover': { borderColor: '#fbbf24' },
								}),
								valueContainer: (base) => ({
									...base,
									padding: '0 0.5rem',
								}),
								input: (base) => ({
									...base,
									color: 'inherit',
									boxShadow: 'none',
									outline: 'none',
								}),
								placeholder: (base) => ({
									...base,
									color: 'rgba(120, 53, 15, 0.7)',
								}),
								singleValue: (base) => ({
									...base,
									color: 'inherit',
								}),
								indicatorsContainer: (base) => ({
									...base,
									color: 'inherit',
								}),
								indicatorSeparator: () => ({ display: 'none' }),
								dropdownIndicator: (base, state) => ({
									...base,
									color: state.isFocused ? '#b45309' : '#92400e',
									'&:hover': { color: '#b45309' },
								}),
								menu: (base) => ({
									...base,
									border: '1px solid rgba(251, 191, 36, 0.3)',
									backgroundColor: 'rgba(255, 251, 235, 0.96)',
									borderRadius: 12,
									overflow: 'hidden',
								}),
								menuList: (base) => ({
									...base,
									paddingTop: 4,
									paddingBottom: 4,
								}),
								option: (base, state) => ({
									...base,
									backgroundColor: state.isSelected
										? 'rgba(245, 158, 11, 0.25)'
										: state.isFocused
											? 'rgba(245, 158, 11, 0.15)'
											: 'transparent',
									color: 'inherit',
									cursor: 'pointer',
								}),
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
