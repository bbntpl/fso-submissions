import { CoursePart } from '../types';
interface PartParams {
	part: CoursePart
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = (props: PartParams) => {
	const { part } = props;

	// const narrowType = (part: CoursePart) => {
	// 	const narrowedPart: CoursePart | { name: string, kind: string } = {
	// 		name: part.name,
	// 		kind: part.kind
	// 	};
	// 	switch (part.kind) {
	// 		case "basic":
	// 			narrowedPart.description = part.description;
	// 			narrowedPart.exerciseCount = part.exerciseCount;
	// 			break;
	// 		case "group":
	// 			narrowedPart.groupProjectCount = part.groupProjectCount;
	// 			narrowedPart.exerciseCount = part.exerciseCount;
	// 			break;
	// 		case "background":
	// 			narrowedPart.description = part.description;
	// 			narrowedPart.exerciseCount = part.exerciseCount;
	// 			narrowedPart.backgroundMaterial = part.backgroundMaterial;
	// 			break;
	// 		case "special":
	// 			narrowedPart.description = part.description;
	// 			narrowedPart.exerciseCount = part.exerciseCount;
	// 			narrowedPart.requirements = part.requirements;
	// 			break;
	// 		default:
	// 			return assertNever(part);
	// 	}
	// 	return narrowedPart;
	// }

	const dividedParts = (part: CoursePart) => {
		if (part.kind === 'basic') {
			return <p>{part.description}</p>
		} else if (part.kind === 'group') {
			return <p>project exercises {part.groupProjectCount}</p>
		} else if (part.kind === 'background') {
			return <div>
				<p>{part.description}</p>
				<p>{part.backgroundMaterial}</p>
			</div>
		} else if (part.kind === 'special') {
			return <div>
				<p>{part.description}</p>
				Required Skills: {part.requirements.join()}
			</div>
		}
	}

	return <div>
		<p><strong>{part.name} {part.exerciseCount}</strong></p>
		{dividedParts(part)}
	</div >
}

export default Part;