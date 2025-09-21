import { useCallback, useEffect, useRef, useState } from "react";
import { UseGlobalState } from "../hooks/UseGlobalState";
import type { ICocktail } from "../models/ICocktail";
import { Heart, HeartFill } from "react-bootstrap-icons";

export function CardDetailModal({ cocktail, open, onRequestClose }: { cocktail: ICocktail; open?: boolean; onRequestClose: () => void }) {
	const { onLikeToggleCocktail } = UseGlobalState();
	const [liked, setLiked] = useState(false);

	const modalId: string = "CardDetailModal";
	const modalRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const onModalClose = useCallback(() => {
		onRequestClose();
	}, [onRequestClose]);

	useEffect(() => {
		const el = modalRef.current;
		if (!el) return;
		el.addEventListener('close.hs.overlay', onModalClose as EventListener);
		return () => {
			el.removeEventListener('close.hs.overlay', onModalClose as EventListener);
		};
	}, [onModalClose]);

	useEffect(() => {
		if (!open) return;
		// Ensure Preline has initialized components
		if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
			window.HSStaticMethods.autoInit();
		}
		triggerRef.current?.click();
	}, [open]);

	const orderSteps = () => {
		return [...cocktail.steps].sort((a, b) => a.order - b.order);
	};

	const onLikeBtnClick = () => {
		setLiked(!liked);
		onLikeToggleCocktail(cocktail.id, !liked);
	};

	return (
		<>
			<button ref={triggerRef} type="button" className="hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls={modalId} data-hs-overlay={'#' + modalId} />

			<div id={modalId} ref={modalRef} className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabIndex={-1} aria-labelledby={modalId + '-label'}>
				<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-4xl sm:w-full m-3 h-[calc(100%-56px)] sm:mx-auto">
					<div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
						<div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
							<button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay={'#' + modalId}>
								<span className="sr-only">Close</span>
								<svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
							</button>
						</div>

						<div className="max-w-[85rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14 mx-auto">
							<div className="md:grid md:grid-cols-2 md:items-stretch md:gap-6 xl:gap-12">

								<div className="px-0 sm:px-6 lg:px-8 ">
									<div className="h-64 sm:h-72 md:h-[80dvh] flex flex-col bg-[url('https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat rounded-2xl">
										<div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10" />
									</div>
								</div>

								<div className="mt-4 sm:mt-8 lg:mt-0 md:min-h-[80dvh] flex flex-col md:h-[80dvh] px-4 sm:px-6 lg:px-8">
									<div className="space-y-5 sm:space-y-7">

										<div className="space-y-1 md:space-y-4">
											<div className="flex items-center justify-between gap-3 sm:justify-center sm:text-center">
												<h2 className="font-bold text-3xl lg:text-4xl text-gray-800 sm:text-center">
													{cocktail.title}
												</h2>
												<button
													onClick={onLikeBtnClick}
													type="button"
													className="p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-red-300 bg-white text-red-600 hover:bg-red-50 focus:outline-hidden focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:pointer-events-none"
													aria-label={liked ? "Unlike" : "Like"}
												>
													{liked ? <HeartFill /> : <Heart />}
												</button>
											</div>
											<ul className="text-sm text-gray-600 sm:text-center sm:justify-center mt-1 sm:mt-2">
												<li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
													{cocktail.author}
												</li>
												<li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
													{cocktail.date.getFullYear()}
												</li>
											</ul>
											<div className="flex flex-wrap sm:text-center sm:justify-center gap-2 mt-1 max-[500px]:mt-2">
												{cocktail.tags.map((tag, idx) => (
													<span key={`${cocktail.id}-tag-${idx}`} className="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
														{tag}
													</span>
												))}
											</div>
											<div className="mt-3 sm:mt-4">
												<p className="text-gray-600 leading-relaxed mt-2">
													{cocktail.description}
												</p>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
											<div>
												<h3 className="text-2xl dark:text-white mb-2 sm:mb-3">Ingredients</h3>
												<ul className="w-full marker:text-blue-600 list-disc ps-5 mt-1 sm:mt-2 space-y-1.5 sm:space-y-2 text-sm text-gray-700 dark:text-neutral-300">
													{
														cocktail.ingredients.map((element, idx) => (
															<li key={`${cocktail.id}-ingredient-${idx}`}>{element.name} {element.units} {element.measurementType}</li>
														))
													}
												</ul>
											</div>

											<div>
												<h3 className="text-2xl dark:text-white mb-2 sm:mb-3">Steps</h3>
												<ol className="w-full marker:text-blue-600 list-decimal ps-5 mt-1 sm:mt-2 space-y-1.5 sm:space-y-2 text-sm text-gray-700 dark:text-neutral-300">
													{
														orderSteps().map((step) => (
															<li key={`${cocktail.id}-step-${step.order}`}>{step.description}</li>
														))
													}
												</ol>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

		</>
	);
}
