import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

const useSocket = (options = {}) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const setupSocket = () => {
      const token = getCookie("token") as string;

      if (token) {
        try {
          const data = jwtDecode<{ sessionId: string }>(token);

          // Disconnect existing socket if any
          if (socketRef.current) {
            socketRef.current.disconnect();
          }
          // console.log("Socket .sessionId", data.sessionId);
          socketRef.current = io(url, {
            extraHeaders: {
              Authorization: data.sessionId,
            },
          });

          socketRef.current?.on('exception', () => {
            // console.log('asdjhgaskdjhas dddconnect')
            toast.error('Failed to send message')

            // joinRoom()
          })
        } catch (error) {
          // consoleerror("Error setting up socket:", error);
        }
      }
    };

    setupSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
  };
};

export default useSocket;
