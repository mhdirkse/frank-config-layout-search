import PriorityQueue, {Comparator, Options} from "../priority.queue/PriorityQueue";

export interface Node<T> {
	getScore(): number;
	getChildren(): Node<T>[];
}

// Not thread safe!
export class GraphSearch<T> {
	private queue: PriorityQueue<Node<T>>;
	private solutions: Node<T>[] = [];

	constructor(root: Node<T>) {
		var comparator: Comparator<Node<T>> = function(a: Node<T>, b: Node<T>) {
			return a.getScore() - b.getScore();
		}
		let opts: Options<Node<T>> = {comparator: comparator, initialValues: [root]};
		this.queue = new PriorityQueue(opts);
	}
}