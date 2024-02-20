import PriorityQueue, {Comparator, Options} from "../priority.queue/PriorityQueue";

export interface Node<T> {
	getScore(): number;
	getChildren(): Node<T>[];
	// Should return true if there are no children and vice versa.
	// This method should be faster than calculating the children.
	isSolution(): boolean;
}

// Not thread safe!
export class GraphSearch<T> {
	private queue: PriorityQueue<Node<T>>;
	private solutions: PriorityQueue<Node<T>>;

	constructor(root: Node<T>) {
		var comparator: Comparator<Node<T>> = function(a: Node<T>, b: Node<T>) {
			return a.getScore() - b.getScore();
		}
		let opts: Options<Node<T>> = {comparator: comparator};
		this.queue = new PriorityQueue(opts);
		this.solutions = new PriorityQueue(opts);
		this.putInQueueOrSolutions(root);
	}

	private putInQueueOrSolutions(node: Node<T>) {
		if(node.isSolution()) {
			this.solutions.queue(node);
		} else {
			this.queue.queue(node);
		}
	}

	public isDone(): boolean {
		return this.queue.length == 0;
	}

	public peekCurrent(): Node<T> {
		return this.queue.peek();
	}

	public expand() {
		if(! this.isDone()) {
			var current: Node<T> = this.queue.dequeue();
			var children: Node<T>[] = current.getChildren();
			children.forEach(c => this.putInQueueOrSolutions(c));
		}
	}

	public hasSolutions(): boolean {
		return this.solutions.length != 0;
	}

	public popNextSolution(): Node<T> {
		return this.solutions.dequeue();
	}
}