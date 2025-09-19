
export function NotFound() {

	const onReturnBtnClick = () => window.location.href = '/cocktails';

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 flex items-center justify-center p-4">
			<div className="max-w-2xl mx-auto text-center">
				<div className="relative bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-3xl shadow-2xl border-4 border-amber-200 dark:border-amber-700 p-12 overflow-hidden">

					<div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-amber-400 dark:border-amber-600 rounded-tl-lg"></div>
					<div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-amber-400 dark:border-amber-600 rounded-tr-lg"></div>
					<div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-amber-400 dark:border-amber-600 rounded-bl-lg"></div>
					<div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-amber-400 dark:border-amber-600 rounded-br-lg"></div>

					<div className="relative z-10">
						<div className="text-8xl font-bold text-amber-800 dark:text-amber-200 mb-6 font-serif">
							404
						</div>

						<h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100 mb-4 font-serif">
							Well, This is Embarrassing...
						</h1>

						<p className="text-xl text-amber-700 dark:text-amber-300 mb-2 font-serif leading-relaxed">
							Looks like this cocktail isn't on our menu!
						</p>

						<p className="text-lg text-amber-600 dark:text-amber-400 mb-8 font-serif italic">
							Perhaps you've had one too many, or our bartender mixed up the recipes.
							<br />
							Either way, let's get you back to the bar!
						</p>

						<button onClick={onReturnBtnClick}
							className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700
                         text-white font-bold py-4 px-8 rounded-full text-lg font-serif
                         shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                         border-2 border-amber-500 hover:border-amber-400">
							🍹 Return to the Bar
						</button>

					</div>

					<div className="absolute inset-0 opacity-10">
						<div className="absolute top-1/4 left-1/4 text-6xl">🍸</div>
						<div className="absolute top-1/3 right-1/4 text-4xl">🥃</div>
						<div className="absolute bottom-1/4 left-1/3 text-5xl">🍷</div>
						<div className="absolute bottom-1/3 right-1/3 text-3xl">🍹</div>
					</div>

				</div>
			</div>
		</div>
	);
};