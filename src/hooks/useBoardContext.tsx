import { useContext } from "react";
import { BoardContext } from "../providers/BoardProvider";

export function useBoardContext() {
    const boardContext = useContext(BoardContext);

    if (boardContext == null) {
        throw new Error('Must be within provider');
    }

    return boardContext;
}