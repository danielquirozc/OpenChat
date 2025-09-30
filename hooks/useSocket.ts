import { useSocketContext } from "@/context/SocketContext";
import { useCallback } from "react";

type EventCallback = (...args: any[]) => void;

export function useSocket() {
  const { socket } = useSocketContext();

  const emit = useCallback((event: string, data?: any) => {
    socket?.emit(event, data);
  }, []);

  const on = useCallback((event: string, callback: EventCallback) => {
    socket?.on(event, callback);

    return () => {
      socket?.off(event, callback);
    };
  }, []);

  return { socket, on, emit };
}
