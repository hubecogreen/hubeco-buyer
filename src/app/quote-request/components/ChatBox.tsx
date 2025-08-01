"use client";

import useApi from "@/components/Fetcher/useAPI";
import useGetBuyer from "@/components/hooks/useGetBuyer";
import useSocket from "@/components/hooks/useSocket";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
export interface messageType {
  isAQuery: boolean;
  details: any;
  type: string;
  content: string;
  senderId: string;
  roomId: string;
  ref: string;
  createdAt: string;
  updatedAt: string;
  chatEndPoint: string;
  roomEndPoint: string;
  refer: string;
  width: string;
  transactionList?: string;
  canChat: boolean;
  closeText: string;
}

interface Props {
  sender: {
    name?: string;
    displayImage?: string;
  };
  receiver: {
    name?: string;
    displayImage?: string;
  };
  receiverId?: string;
  chatEndPoint: string;
  roomEndPoint: string;
  refer: string;
  width: string;
  transactionList?: string;
  canChat: boolean;
  closeText: string;
}

export default function ChatBox({
  sender,
  receiver,
  receiverId,
  chatEndPoint,
  roomEndPoint,
  refer,
  width,
  transactionList,
  canChat,
  closeText,
}: Props) {
  const { socket } = useSocket();
  const { callApi } = useApi();
  const params = useSearchParams();
  const [myId, setMyId] = useState<string | null | undefined>(receiverId);
  const [roomId, setRoomId] = useState<string | null | undefined>(receiverId);
  const [messagesList, setMessagesList] = useState<messageType[]>([]);
  const [apiCalled, setIsApiCalled] = useState<boolean>(false);
  const [text, setText] = useState("");
  const { getBuyer } = useGetBuyer();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [metadata, setMetadata] = useState<{
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    totalCount: number;
    totalPages: number;
  }>({
    currentPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
  });

  const handleSend = (text: string) => {
    const payeload = {
      room: roomId,
      message: text,
      timestamp: new Date().toISOString(),
    };
    socket?.emit("message", payeload); // Emit the message to
    setText("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  async function getRoomId() {
    try {
      const id = window.location.pathname.split("/")[2];
      const res = (await callApi(`${roomEndPoint}/${id}`, "GET")) as any;
      if (res.data !== null) {
        // console.log(res.data.roomId, " Socket Decoded token");
        return res.data.roomId;
      }
    } catch (e) {
      // consoleerror("Error fetching new room ID:", e);
    }
  }

  async function getChatHistory() {
    try {
      const id = window.location.pathname.split("/")[2];
      const res = (await callApi(
        `${chatEndPoint}/${id}?limit=${metadata.limit}&page=${
          metadata.totalPages > metadata.currentPage + 1
            ? metadata.currentPage + 1
            : metadata.totalPages
        }`,
        "GET"
      )) as any;
      if (res.data !== null) {
        // console.log(res.data, "Socket Decoded token");
        setMessagesList((prev) => [...res.data.data.reverse(), ...prev]);
        setMetadata(res.data.metadata);
      }
    } catch (e) {
      // consoleerror("Error fetching room ID:", e);
    } finally {
      setIsApiCalled(true);
    }
  }

  async function runSocket() {
    const roomId = await getRoomId();
    // console.log('check api called', apiCalled)
    if (!apiCalled) {
      await getChatHistory();
    }
    // console.log(roomId, params, " Socket roomID");
    setRoomId(roomId);
    if (socket && roomId) {
      socket.emit("joinRoom", { roomId: roomId });
      // console.log("Socket joined room successfully");
    }
  }

  const fetchMoreMessages = () => {
    // console.log("coming");
    if (metadata.currentPage < metadata.totalPages) {
      getChatHistory();
    }
  };

  useEffect(() => {
    socket?.on("connect", () => {
      runSocket();
    });

    socket?.on(
      "message",
      (message: { message: string; senderId: string; timestamp: string }) => {
        // console.log("Socket Received message:", message);
        if (message.message) {
          const payload = {
            content: message.message,
            senderId: message.senderId || "unknown", // Replace with actual sender ID
            room: roomId, // Replace with actual room ID
            ref: refer, // Unique reference ID
            createdAt: message.timestamp,
            updatedAt: message.timestamp,
          };

          setMessagesList((prev: any) => [...prev, payload]);
        }
      }
    );

    if (!receiverId) {
      const buyerUserInfo = sessionStorage.getItem("buyerUserInfo");
      const buyer = buyerUserInfo ? JSON.parse(buyerUserInfo) : null;
      if (buyer) {
        receiverId = buyer.id;
        setMyId(buyer.id);
      }
    }

    return () => {
      if (socket) {
        socket.off("chat message");
      }
    };
  }, [socket, receiverId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateHeader = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);

    const sameDay = now.toDateString() === messageDate.toDateString();
    if (sameDay) return "Today";

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const sameYesterday =
      yesterday.toDateString() === messageDate.toDateString();
    if (sameYesterday) return "Yesterday";

    const daysDiff = Math.floor(
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff <= 7)
      return messageDate.toLocaleDateString("en-US", { weekday: "long" });

    return messageDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const mergedMessages = useMemo(() => {
    const combined = [
      ...messagesList.map((msg: any) => ({ ...msg, type: "message" })),
      ...(Array.isArray(transactionList) && transactionList.length > 0
        ? transactionList
            .filter((txn: any) => txn.adminChangedStatus) // Filter transactions with adminChangedStatus true
            .map((txn: any) => ({ ...txn, type: "transaction" }))
        : []),
    ];
    return combined.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messagesList, transactionList]);

  const groupedMessages = mergedMessages.reduce(
    (acc: { [key: string]: typeof messagesList }, message) => {
      const dateKey = new Date(message.createdAt).toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(message);
      return acc;
    },
    {}
  );

  useEffect(() => {
    getBuyer();
  }, []);

  return (
    <div
      className={`bg-white w-full max-w-${width} rounded-lg shadow-lg p-4 relative`}
    >
      <h6 className="border-b text-lg p-3">{receiver.name || "Receiver"}</h6>
      <div
        ref={scrollRef}
        className="scrollableDiv overflow-y-auto h-96 space-y-4 scrollbar slim-scroll pr-5 "
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={mergedMessages.length}
          next={fetchMoreMessages}
          hasMore={metadata.hasNextPage}
          loader={
            <div className="flex justify-center mt-0.5 mb-0.5">
              <CircularProgress size={18} />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {Object.keys(groupedMessages).map((dateKey) => (
            <div key={dateKey}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
              >
                <Badge color="secondaryBg" className="bg-secondaryBg">
                  {formatDateHeader(dateKey)}
                </Badge>
              </div>
              {groupedMessages[dateKey].map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-2 ${
                    message.senderId === myId
                      ? "justify-end"
                      : message?.isAQuery == true
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.senderId !== myId && receiver.displayImage && message.isAQuery !== true && (
                      <Image
                        className="w-10 h-10 rounded-full"
                        src={receiver.displayImage}
                        alt={receiver.name || "Receiver"}
                        width={40}
                        height={40}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    )}
                    <div className="flex flex-col">
                      <div
                        className={`${
                          message.senderId === myId
                            ? "bg-[#009886] text-white"
                            : message?.isAQuery == false
                            ? "bg-[#EEFFFD] text-primary"
                            : message?.isAQuery == true
                            ? "bg-[#B906471A] text-secondary"
                            : "bg-secondaryBg text-gray-900"
                        } rounded-lg px-4 py-2 max-w-xs`}
                      >
                        <p className="text-sm">
                          {" "}
                          {message.type === "transaction"
                            ? message.details
                            : message.content}
                        </p>
                        <p className="text-xs ml-auto text-right">
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                    {message.senderId === myId && sender.displayImage && (
                      <Image
                        className="w-10 h-10 rounded-full"
                        src={sender.displayImage}
                        alt={sender.name || "Sender"}
                        width={40}
                        height={40}
                        onError={e => {
                          e.currentTarget.src = '/images/product-placeholder.webp'
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <div className="border-t mt-4 pt-4 flex gap-2 items-center max-w-full flex-wrap">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend(text)}
          className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:border-[#009886]"
          placeholder="Type your message here..."
        />
        <button
          onClick={() => handleSend(text)}
          className="ml-2 bg-[#009886] text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
      {canChat == false && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500/60 flex justify-center items-center text-white font-bold backdrop-blur-sm z-10">
          <p className="text-center text-white text-semibold px-10">
            {closeText}
          </p>
        </div>
      )}
    </div>
  );
}
