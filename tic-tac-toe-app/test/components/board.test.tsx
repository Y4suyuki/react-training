/**
 * @jest-environment jsdom
 */

import { Board } from "../../src/components/Board";
import { render } from '@testing-library/react';


describe("Board", () => {
    const squares = Array(9).fill(null);
    test("snapshot", () => {
        const board = render(<Board squares={squares} onClick={ () => console.log("HELLO") } />)
        expect(board).toMatchSnapshot()
    });
});
