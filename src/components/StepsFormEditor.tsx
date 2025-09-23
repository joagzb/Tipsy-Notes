import type { Dispatch, SetStateAction } from "react";
import type { ICocktailStep } from "../models/ICocktail";

interface IStepsFormEditorProps {
	steps: ICocktailStep[];
	setSteps: Dispatch<SetStateAction<ICocktailStep[]>>;
}

export function StepsFormEditor({ steps, setSteps, }: IStepsFormEditorProps) {

	const addStep = (): void => {
		setSteps((existingSteps) => [
			...existingSteps,
			{ order: existingSteps.length + 1, description: "" },
		]);
	};

	const updateStep = (index: number, field: keyof ICocktailStep, value: string | number): void => {
		setSteps((existingSteps) => {
			const existing = [...existingSteps];
			existing[index] = { ...existing[index], [field]: value } as ICocktailStep;
			return existing;
		});
	};

	const removeStep = (index: number): void => {
		setSteps((existingSteps) => existingSteps.filter((_, i) => i !== index));
	};

	const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
		e.dataTransfer.setData("text/plain", String(index));
		e.dataTransfer.effectAllowed = "move";
	};

	const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number): void => {
		e.preventDefault();
		const draggedData = e.dataTransfer.getData("text/plain");
		const fromIndex = Number(draggedData);

		if (Number.isNaN(fromIndex) || fromIndex === dropIndex) {
			return;
		}

		setSteps((existing) => {
			const next = [...existing];
			const [moved] = next.splice(fromIndex, 1);
			next.splice(dropIndex, 0, moved);
			return next.map((s, i) => ({ ...s, order: i + 1 }));
		});
	};

	return (
		<>
			<h3>Steps</h3>
			{steps.map((step, idx) => (
				<div
					key={`step-${idx}`}
					draggable
					onDragStart={(e) => onDragStart(e, idx)}
					onDragOver={onDragOver}
					onDrop={(e) => onDrop(e, idx)}
					style={{ cursor: "move" }}
				>
					<input
						type="text"
						placeholder="description"
						value={step.description}
						onChange={(e) => updateStep(idx, "description", e.target.value)}
					/>
					<button type="button" onClick={() => removeStep(idx)}>
						Remove
					</button>
				</div>
			))}

			<button type="button" onClick={addStep}>
				+ Add Step
			</button>
		</>
	);
}
