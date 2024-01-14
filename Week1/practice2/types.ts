interface Performance {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: Performance[];
}
interface Play {
  name: string;
  type: string;
}

type PlayID = "hamlet" | "as-like" | "othello";

type Plays = Record<PlayID, Play>;

export { Performance, Invoice, Play, Plays };
