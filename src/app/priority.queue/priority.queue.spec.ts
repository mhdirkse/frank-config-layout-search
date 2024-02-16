import {Comparator, Options} from "ts-priority-queue/src/PriorityQueue";
import PriorityQueue from "ts-priority-queue/src/PriorityQueue";

describe('Priority queue tests', () => {
	function doComp(a: number, b: number) {
		return a - b;
	}

	it('Trivial test', () => {
		expect(2).toBe(2);
	})

	it('Simple test', () => {
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

	var data = [
		[0, 1, 2, 3],
		[1, 0, 2, 3],
		[0, 2, 1, 3],
		[1, 2, 0, 3],
		[2, 0, 1, 3],
		[2, 1, 0, 3],

		[0, 1, 3, 2],
		[1, 0, 3, 2],
		[0, 2, 3, 1],
		[1, 2, 3, 0],
		[2, 0, 3, 1],
		[2, 1, 3, 0],

		[0, 3, 1, 2],
		[1, 3, 0, 2],
		[0, 3, 2, 1],
		[1, 3, 2, 0],
		[2, 3, 0, 1],
		[2, 3, 1, 0],

		[3, 0, 1, 2],
		[3, 1, 0, 2],
		[3, 0, 2, 1],
		[3, 1, 2, 0],
		[3, 2, 0, 1],
		[3, 2, 1, 0],
	]

	data.forEach(row => {
		it(`Test PriorityQueue enqueue all ${row} then dequeue`, () => {
			var comparator: Comparator<number> = doComp;
			var options: Options<number> = {comparator: comparator, initialValues: row};
			var queue = new PriorityQueue(options);
			expect(queue.dequeue()).toBe(0);
			expect(queue.dequeue()).toBe(1);
			expect(queue.dequeue()).toBe(2);
			expect(queue.dequeue()).toBe(3);
		})
	})
})
