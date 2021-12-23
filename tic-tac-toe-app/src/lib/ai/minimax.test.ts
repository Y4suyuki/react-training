import { bestMove, gameOver, miniMax, wins } from "./minimax";

describe("minimax", () => {
  describe("wins", () => {
    it("return true for win board", () => {
      expect(
        wins(["O", "O", "O", null, null, null, null, null, null], "O")
      ).toBe(true);
      expect(
        wins(["X", "X", "X", null, null, null, null, null, null], "X")
      ).toBe(true);
      expect(
        wins(["X", null, null, "X", null, null, "X", null, null], "X")
      ).toBe(true);
      expect(
        wins(["X", null, null, null, "X", null, null, null, "X"], "X")
      ).toBe(true);
    });
  });

  describe("gameOver", () => {
    it("declare gameover to full board", () => {
      expect(gameOver(["O", "O", "O", "O", "O", "O", "O", "O", "O"])).toBe(
        true
      );
    });

    it("return false if there is at least one null", () => {
      expect(gameOver(["O", "O", "O", "O", "O", null, "O", "O", "O"])).toBe(
        false
      );
    });
  });

  describe("miniMax", () => {
    it("", () => {
      expect(
        miniMax(["X", "O", null, "X", "O", null, null, null, null], 1, false)
      ).toBe(-10);
    });
  });

  describe("bestMove", () => {
    it("", () => {
      expect(
        bestMove(["O", "O", null, null, "X", null, null, null, null], true)
      ).toBe(2);
    });

    it("", () => {
      expect(
        bestMove(["X", "X", null, null, "O", null, null, null, null], false)
      ).toBe(2);
    });

    it("", () => {
      expect(
        bestMove(["X", null, null, "X", "O", null, null, null, null], false)
      ).toBe(6);
    });
  });
});
