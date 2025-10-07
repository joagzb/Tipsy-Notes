import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface IHorizontalScrollerProps {
	children: React.ReactNode;
	className?: string;
	contentClassName?: string;
	ariaLabel?: string;
}

export function HorizontalScroller({ children, className = "", contentClassName = "", ariaLabel }: IHorizontalScrollerProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const isDownRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const draggedRef = useRef(false);

	const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
	const childArray = useMemo(() => React.Children.toArray(children), [children]);
	const [scales, setScales] = useState<number[]>(() => childArray.map(() => 1));

	const [canLeft, setCanLeft] = useState(false);
	const [canRight, setCanRight] = useState(false);

	const updateArrows = useCallback(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		const { scrollLeft, clientWidth, scrollWidth } = el;
		setCanLeft(scrollLeft > 0);
		setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		updateArrows();
		const onScroll = () => updateArrows();
		el.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			el.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [updateArrows]);

	const updateScales = useCallback(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		const containerRect = el.getBoundingClientRect();
		const centerX = containerRect.left + containerRect.width / 2;
		const halfWidth = containerRect.width / 2;
		setScales(childArray.map((_, i) => {
			const node = itemRefs.current[i];
			if (!node) return 1;
			const rect = node.getBoundingClientRect();
			const childCenter = rect.left + rect.width / 2;
			const dist = Math.abs(childCenter - centerX);
			const norm = Math.min(1, dist / halfWidth);
			return parseFloat((0.92 + 0.08 * (1 - norm)).toFixed(3));
		}));
	}, [childArray]);

	useEffect(() => {
		itemRefs.current = childArray.map((_, i) => itemRefs.current[i] ?? null);
		setScales(childArray.map(() => 1));
		updateScales();
	}, [childArray, updateScales]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		updateScales();
		const onScroll = () => updateScales();
		const onResize = () => updateScales();
		el.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		return () => {
			el.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
		};
	}, [updateScales]);

	const onMouseDown = (e: React.MouseEvent) => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		isDownRef.current = true;
		startXRef.current = e.pageX - el.offsetLeft;
		scrollLeftRef.current = el.scrollLeft;
		draggedRef.current = false;
	};

	const onMouseLeave = () => {
		isDownRef.current = false;
	};

	const onMouseUp = () => {
		isDownRef.current = false;
		setTimeout(() => (draggedRef.current = false), 0);
	};

	const onMouseMove = (e: React.MouseEvent) => {
		const el = containerRef.current;
		if (!el || !isDownRef.current) {
			return;
		}

		e.preventDefault();
		const x = e.pageX - el.offsetLeft;
		const walk = (x - startXRef.current) * 1.4; // drag sensitivity

		if (Math.abs(walk) > 5) {
			draggedRef.current = true;
		}

		el.scrollLeft = scrollLeftRef.current - walk;
	};

	const onClickCapture = (e: React.MouseEvent) => {
		if (draggedRef.current) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const onTouchStart = (e: React.TouchEvent) => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		isDownRef.current = true;
		startXRef.current = e.touches[0].pageX - el.offsetLeft;
		scrollLeftRef.current = el.scrollLeft;
		draggedRef.current = false;
	};

	const onTouchMove = (e: React.TouchEvent) => {
		const el = containerRef.current;
		if (!el || !isDownRef.current) {
			return;
		}

		const x = e.touches[0].pageX - el.offsetLeft;
		const walk = (x - startXRef.current) * 1;
		if (Math.abs(walk) > 5) draggedRef.current = true;
		el.scrollLeft = scrollLeftRef.current - walk;
	};

	const onTouchEnd = () => {
		isDownRef.current = false;
		setTimeout(() => (draggedRef.current = false), 0);
	};

	const scrollByAmount = (dir: 1 | -1) => {
		const el = containerRef.current;
		if (!el) {
			return;
		}

		const amount = Math.max(240, Math.floor(el.clientWidth * 0.8));
		el.scrollBy({ left: dir * amount, behavior: "smooth" });
	};

	return (
		<div className={`relative ${className}`} aria-label={ariaLabel}>
			<div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-amber-50/95 dark:from-amber-950/95 to-transparent" />
			<div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-amber-50/95 dark:from-amber-950/95 to-transparent" />

			<button
				type="button"
				aria-label="Scroll left"
				onClick={() => scrollByAmount(-1)}
				className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 size-9 items-center justify-center rounded-full border shadow-sm transition-colors ${canLeft
					? "bg-amber-100/80 dark:bg-amber-900/80 border-amber-300/50 hover:bg-amber-200 dark:hover:bg-amber-800"
					: "opacity-0 pointer-events-none"
					}`}
			>
				<span className="text-amber-800 dark:text-amber-200">‹</span>
			</button>

			<button
				type="button"
				aria-label="Scroll right"
				onClick={() => scrollByAmount(1)}
				className={`hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 size-9 items-center justify-center rounded-full border shadow-sm transition-colors ${canRight
					? "bg-amber-100/80 dark:bg-amber-900/80 border-amber-300/50 hover:bg-amber-200 dark:hover:bg-amber-800"
					: "opacity-0 pointer-events-none"
					}`}
			>
				<span className="text-amber-800 dark:text-amber-200">›</span>
			</button>

			<div
				ref={containerRef}
				className={`overflow-x-hidden overflow-y-hidden no-scrollbar cursor-grab active:cursor-grabbing select-none ${contentClassName}`}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
				onMouseUp={onMouseUp}
				onMouseMove={onMouseMove}
				onClickCapture={onClickCapture}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<div className={`flex gap-4 px-1 ${childArray.length === 1 ? "justify-center" : ""}`}>
					{childArray.map((child, i) => (
						<div
							key={i}
							ref={(el) => { itemRefs.current[i] = el; }}
							className="transition-transform duration-300 ease-out"
							style={{ transform: `scale(${scales[i] ?? 1})` }}
						>
							{child}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
