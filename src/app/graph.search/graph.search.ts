import PriorityQueue, {Comparator, Options} from "../priority.queue/PriorityQueue";

export interface Node<T> {
	getScore(): number;
	getChildren(): Node<T>[];
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
		this.queue.queue(root);
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
			if(children.length == 0) {
				this.solutions.queue(current);
			} else {
				children.forEach(c => this.queue.queue(c));
			}
		}
	}

	public hasSolutions(): boolean {
		return this.solutions.length != 0;
	}

	public popNextSolution(): Node<T> {
		return this.solutions.dequeue();
	}
}