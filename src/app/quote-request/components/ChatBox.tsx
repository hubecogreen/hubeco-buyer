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
import { FiSend } from "react-icons/fi";
import { Minus } from "lucide-react";
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
  height:string;
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
  height
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
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
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
    setShowOverlay(false);
    if (messagesList.length > 0) {
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
    // if (messagesList.length > 0) {
    //   setShowOverlay(false);
    // }    
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
        `${chatEndPoint}/${id}?limit=${metadata.limit}&page=${metadata.totalPages > metadata.currentPage + 1
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
      className={`bg-white w-full max-w-${width} rounded-lg shadow-lg flex flex-col h-full relative`}

    >
      <div className="bg-[#B90647] text-white rounded-t-lg px-5 py-3 flex justify-between items-start sticky top-0 shadow-sm">
        {/* Left side — name and time */}
        <div>
          <h6 className="text-lg font-semibold leading-tight">
            {receiver.name || "Receiver"}
          </h6>
          {/* <p className="text-sm text-gray-200">
          {formattedDay}, {formattedTime}
        </p> */}
        </div>

        {/* Right side — minimize icon */}
        {/* <button
          className="text-white hover:text-gray-200 transition"
          title="Minimize"
        >
          <Minus size={20} strokeWidth={3} />
        </button> */}
      </div>
      <div
        ref={scrollRef}
        className="scrollableDiv flex-1 overflow-y-auto space-y-4 scrollbar slim-scroll pr-5"
        id="scrollableDiv"
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        {mergedMessages.length === 0 ? (
          // 🟢 When there are no chats, show this placeholder
          <div className="flex flex-col justify-center items-center text-center text-gray-500 h-full py-10">
            {<Image
              src="\images\Chat.svg" // optional decorative image
              alt="No chats yet"
              width={45}
              height={45}
              className="mb-4 opacity-80"
            />}
            <p className="text-sm text-gray-600 max-w-[260px] mt-1">
              Start a conversation with your vendor to discuss RFQs, delivery, or pricing.
            </p>
          </div>
        ) : (
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
                    className={`flex mb-2 ${message.senderId === myId
                      ? "justify-end"
                      : message?.isAQuery == true
                        ? "justify-end"
                        : "justify-start"
                      }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.senderId !== myId &&
                        receiver.displayImage &&
                        message.isAQuery !== true && (
                          <Image
                            className="w-10 h-10 rounded-full"
                            src={receiver.displayImage}
                            alt={receiver.name || "Receiver"}
                            width={40}
                            height={40}
                            onError={(e) => {
                              e.currentTarget.src = "/images/product-placeholder.webp";
                            }}
                            loading="lazy"
                          />
                        )}
                      <div className="flex flex-col">
                        <div
                          className={`${message.senderId === myId
                            ? "bg-white text-gray-900 shadow-[0px_1px_6px_0px_#2F2B3D1A] rounded-[9px]"
                            : message?.isAQuery == false
                              ? "bg-white text-gray-900 shadow-[0px_1px_6px_0px_#2F2B3D1A] rounded-[9px]"
                              : message?.isAQuery == true
                                ? "bg-[#B906471A] text-secondary"
                                : "bg-white text-gray-900 shadow-[0px_1px_6px_0px_#2F2B3D1A] rounded-[9px]"
                            } rounded-lg px-4 py-2 max-w-xs`}
                        >
                          <p className="text-sm">
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
                          onError={(e) => {
                            e.currentTarget.src = "/images/product-placeholder.webp";
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
        )}
      </div>
      <div className="border-t p-3 flex items-center gap-2 w-full">
        <div className="flex w-full items-center sm:flex-row flex-row">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(text)}
            placeholder="Type your message here..."
            className="border rounded-full px-4 py-2 focus:outline-none focus:border-[#009886]
                 w-[80%] sm:w-full transition-all duration-200"
          />
          <button
            onClick={() => handleSend(text)}
            className="bg-[#B90647] hover:bg-[#9b043d] text-white px-4 py-2 rounded-full font-semibold
                 flex items-center justify-center gap-1 ml-2 w-[20%] sm:w-auto transition-all duration-200"
          >
            <span className="hidden sm:inline">Send</span>
            <FiSend className="text-white text-lg sm:ml-1" />
          </button>
        </div>
      </div>

      {canChat == false && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500/60 flex justify-center items-center text-white font-bold backdrop-blur-sm z-10">
          <p className="text-center text-white text-semibold px-10">
            {closeText}
          </p>
        </div>
      )}
      {/* 👇 ADDED: Overlay for No Messages Yet */}
      {canChat && mergedMessages.length === 0 && showOverlay && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-white/95 flex flex-col justify-center items-center z-10 p-4"
          style={{ backdropFilter: 'blur(1px)' }}
        >
          {/* Chat Icon - Replicated look from Vendor component */}
          <div
            className='w-12 h-12 bg-[#009886] rounded-lg flex items-center justify-center mb-4 shadow-lg cursor-pointer transition transform hover:scale-105'
            onClick={() => setShowOverlay(false)}
          >
            <svg width='20' height='20' fill='white' viewBox='0 0 24 24'>
              <path
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
            </svg>
          </div>

          {/* Content */}
          <h6 className='font-semibold text-lg text-gray-800 mb-1 text-center'>
            No Messages Yet
          </h6>
          <p className='text-gray-600 text-sm text-center max-w-xs'>
            Start a conversation with your vendor/buyer to discuss RFQs, delivery or pricing
          </p>
        </div>
      )}
    </div>
  );
}
