import {Node, GraphSearch} from './graph.search'

describe('Test graph search', () => {
	class RawNode {
		constructor(private letter: string) {
			if(letter.length != 1) {
				throw new Error(`RawNode instances cannot contain multi-letter string: ${letter}`);
			}
			if(letter < 'A' || letter > 'Z') {
				throw new Error(`RawNode instance cannot contain non-capital: ${letter}`);
			}
		}

		public getLetter(): string {
			return this.letter;
		}
	};

	class TestNode extends RawNode implements Node<TestNode> {
		constructor(letter: string, private edges: Map<String, String>) {
			super(letter);
		}

		public getScore(): number {
			return this.getLetter().charCodeAt(0) - "A".charCodeAt(0);
		}

		public getChildren(): TestNode[] {
			if(! this.edges.has(this.getLetter())) {
				return [];
			}
			var childSeeds = this.edges.get(this.getLetter())!;
			var result: TestNode[] = [];
			var i: number;
			for(i = 0; i < childSeeds.length; ++i) {
				result.push(new TestNode(childSeeds.charAt(i), this.edges));
			}
			return result;
		}
	}

	it('Simple search', () => {
		var edges: Map<string, string> = new Map<string, string>([
			['E', 'AGF'],
			['F', 'H'],
			['G', 'CB'],
			['H', 'I']
		]);
		var root: TestNode = new TestNode('E', edges);
		var S: GraphSearch<TestNode> = new GraphSearch(root);
		expectLetter(S, 'E');
		S.expand();
		expectLetter(S, 'A');
		S.expand();
		expectLetter(S, 'F');
		S.expand();
		expectLetter(S, 'G');
		S.expand();
		expectLetter(S, 'B');
		S.expand();
		expectLetter(S, 'C');
		S.expand();
		expectLetter(S, 'H');
		S.expand();
		expectLetter(S, 'I');
		expect(S.isDone()).toBeFalse;
		S.expand();
		expect(S.isDone()).toBeTrue;
		expectSolution(S, 'A');
		expectSolution(S, 'B');
		expectSolution(S, 'C');
		expect(S.hasSolutions).toBeTrue;
		expectSolution(S, 'I');
		expect(S.hasSolutions()).toBeFalse;
	})

	function expectLetter(S: GraphSearch<TestNode>, expected: string) {
		var actual: string = (S.peekCurrent() as TestNode).getLetter();
		expect(actual).toBe(expected);
	}

	function expectSolution(S: GraphSearch<TestNode>, expected: string) {
		var actual: string = (S.popNextSolution() as TestNode).getLetter();
		expect(actual).toBe(expected);
	}
})