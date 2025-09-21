import { useMemo, useState } from "react";
import { type RecipeCategory, type MeasurementType } from "../models/Types";
import type { ICocktail, ICocktailIngredient, ICocktailStep } from "../models/ICocktail";
import { IngredientsFormEditor } from "./IngredientsFormEditor";
import { StepsFormEditor } from "./StepsFormEditor";
import { UseGlobalState } from "../hooks/UseGlobalState";
import { Navbar } from "./Navbar";
import { CATEGORIES } from "../models/CategoriesEnum";
import { GLASS_TYPES } from "../models/GlassesEnum";
import Select, { type MultiValue, type SingleValue } from 'react-select'

export function CocktailForm() {
	const { createCocktail } = UseGlobalState();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [glass, setGlass] = useState("");
	const [tags, setTags] = useState("");

	const [ingredients, setIngredients] = useState<ICocktailIngredient[]>([
		{ name: "", units: "", measurementType: "oz" as MeasurementType },
	]);

	const [steps, setSteps] = useState<ICocktailStep[]>([
		{ order: 1, description: "" },
	]);

	const parsedTags = useMemo<RecipeCategory[]>(() => {
		const set = new Set(CATEGORIES);
		return tags
			.split(",")
			.map((s) => s.trim().toLowerCase())
			.filter((s): s is RecipeCategory => set.has(s as RecipeCategory));
	}, [tags]);

	const resetForm = (): void => {
		setTitle("");
		setDescription("");
		setAuthor("");
		setGlass("");
		setTags("");

		setIngredients([
			{ name: "", units: "", measurementType: "oz" as MeasurementType },
		]);

		setSteps([{ order: 1, description: "" }]);
	};

	const onSubmitBtnClick = (e: React.FormEvent): void => {
		e.preventDefault();

		const newCocktail: ICocktail = {
			id: crypto.randomUUID(),
			title: title,
			description: description,
			author: author,
			date: new Date(),
			imageUrl:
				"https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // TODO: replace with upload later
			glass: glass,
			tags: parsedTags,
			ingredients: ingredients,
			steps: steps,
			likes: 0,
		};

		createCocktail(newCocktail);
		resetForm();
	};

	const glassOptions = useMemo(() => {
		return GLASS_TYPES.map(g => ({ value: g, label: g }));
	}, []);

	const categoryOptions = useMemo(() => {
		return CATEGORIES.map(c => ({ value: c, label: c }));
	}, []);

	const onGlassSelect = (e: SingleValue<{ value: string; label: string }>) => {
		setGlass((e?.value) || "")
	}

	const onTagsSelect = (vals: MultiValue<{ value: string; label: string }>) => {
		const picked = vals.map(v => v.value);
		const limited = picked.slice(0, 4);
		setTags(limited.join(", "));
	}

	return (
		<>
			<Navbar />

			<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-10">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-amber-200/60 dark:border-amber-800/40 rounded-2xl shadow-xl p-6 sm:p-8">
						<h1 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6">
							Create Cocktail
						</h1>

						<form onSubmit={onSubmitBtnClick} className="space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="title-input" className="block text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">Title</label>
									<div className="relative">
										<input
											type="text"
											id="title-input"
											name="title-input"
											onChange={(e) => setTitle(e.target.value)}
											value={title}
											placeholder="My Amazing Drink"
											autoFocus
											minLength={0}
											maxLength={128}
											className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500"
										/>
										<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
											<svg className="shrink-0 size-4 text-amber-500 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
										</div>
									</div>
								</div>

								<div>
									<label htmlFor="author-input" className="block text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">Author</label>
									<div className="relative">
										<input
											type="text"
											id="author-input"
											name="author-input"
											onChange={(e) => setAuthor(e.target.value)}
											value={author}
											placeholder="John Doe"
											minLength={0}
											maxLength={128}
											className="py-2.5 sm:py-3 px-4 ps-11 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500"
										/>
										<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
											<svg className="shrink-0 size-4 text-amber-500 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
										</div>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="glass-select" className="block text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">Glass Type</label>
									<Select
										className="py-2.5 sm:py-3 px-4 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
										classNamePrefix="select"
										placeholder=""
										isSearchable
										name="glass-select"
										inputId="glass-select"
										value={GLASS_TYPES.map(g => ({ value: g, label: g })).find(o => o.value === glass) ?? null}
										onChange={onGlassSelect}
										options={glassOptions}
									/>

								</div>

								<div>
									<label htmlFor="tags-input" className="block text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">Categories</label>
									<Select
										isMulti
										inputId="tags-input"
										name="tags-input"
										className="py-2.5 sm:py-3 px-4 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
										classNamePrefix="select"
										value={CATEGORIES.map(c => ({ value: c, label: c })).filter(o => tags.split(',').map(s => s.trim()).filter(Boolean).includes(o.value)).slice(0, 4)}
										onChange={onTagsSelect}
										options={categoryOptions}
										placeholder="Select up to 4 categories"
										noOptionsMessage={() => "No categories"}
									/>
									<p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Max 4 categories.</p>
								</div>
							</div>

							<div>
								<label htmlFor="description-textarea" className="block text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">Description</label>
								<textarea
									id="description-textarea"
									minLength={0}
									maxLength={255}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Describe flavors, method, or vibe of your cocktail..."
									rows={4}
									className="py-2.5 sm:py-3 px-4 block w-full border border-amber-200 rounded-lg sm:text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500"
								/>
								<p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Max 255 characters.</p>
							</div>

							<div className="space-y-6">
								<div className="p-4 border border-amber-200 dark:border-amber-800 rounded-xl bg-amber-50/40 dark:bg-amber-900/10">
									<h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">Ingredients</h2>
									<IngredientsFormEditor ingredients={ingredients} setIngredients={setIngredients} />
								</div>

								<div className="p-4 border border-amber-200 dark:border-amber-800 rounded-xl bg-amber-50/40 dark:bg-amber-900/10">
									<h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">Steps</h2>
									<StepsFormEditor steps={steps} setSteps={setSteps} />
								</div>
							</div>

							<div className="flex items-center justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={resetForm}
									className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-100 focus:outline-hidden focus:ring-2 focus:ring-amber-300 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
								>
									Reset
								</button>
								<button
									type="submit"
									className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 focus:outline-hidden focus:ring-2 focus:ring-orange-300 disabled:opacity-50 disabled:pointer-events-none"
								>
									Save Cocktail
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
