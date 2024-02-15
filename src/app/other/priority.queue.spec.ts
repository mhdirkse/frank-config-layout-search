import PriorityQueue, {Comparator, Options} from "../priority.queue/PriorityQueue";

describe('Other test', () => {
	function doComp(a: number, b: number) {
		return a - b;
	}

	it('Test referencing priority queue from elsewhere', () => {
		var comparator: Comparator<number> = doComp;
		var options: Options<number> = {comparator: comparator};
		var queue = new PriorityQueue(options);
		queue.queue(5);
		queue.queue(3);
		queue.queue(2);
		expect(queue.dequeue()).toBe(2);
		expect(queue.dequeue()).toBe(3);
		expect(queue.dequeue()).toBe(5);
	})
})
