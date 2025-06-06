"use client";

import useApi from "@/components/Fetcher/useAPI";
import useSocket from "@/components/hooks/useSocket";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image"
export interface messageType {
  content: string;
  senderId: string;
  roomId: string;
  ref: string;
  createdAt: string;
  updatedAt: string;
  chatEndPoint: string;
  roomEndPoint:string;
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
  chatEndPoint:string;
  roomEndPoint:string;
}

export default function ChatBox({ sender, receiver, receiverId, chatEndPoint,roomEndPoint }: Props) {
  const { socket } = useSocket();
  const { callApi } = useApi();
  const params = useSearchParams();
  const [myId, setMyId] = useState<string | null | undefined>(receiverId);
  const [roomId, setRoomId] = useState<string | null | undefined>(receiverId);
  const [messagesList, setMessagesList] = useState<messageType[]>([]);
  const [text, setText] = useState("");

  const handleSend = (text: string) => {
    const payeload = {
      room: roomId,
      message: text,
      timestamp: new Date().toISOString(),
    };
    socket?.emit("message", payeload); // Emit the message to
    setText("");
  };

  async function getRoomId() {
    try {
      const id = window.location.pathname.split("/")[2];
      const res = (await callApi(
        `customerSupport/getOrCreateRoom/${id}`,
        "GET"
      )) as any;
      if (res.data !== null) {
        // console.log(res.data.roomId, " Socket Decoded token");
        return res.data.roomId;
      }
    } catch (e) {
      // consoleerror("Error fetching room ID:", e);
    }
  }

  async function getChatHistory() {
    try {
      const id = window.location.pathname.split("/")[2];
      const res = (await callApi(
        `customerSupport/getCSChats/${id}`,
        "GET"
      )) as any;
      if (res.data !== null) {
        // console.log(res.data, "Socket Decoded token");
        setMessagesList((prev) => [...prev, ...res.data.data.reverse()]);
      }
    } catch (e) {
      // consoleerror("Error fetching room ID:", e);
    }
  }

  async function runSocket() {
    const roomId = await getRoomId();
    await getChatHistory();
    // console.log(roomId, params, " Socket roomID");
    setRoomId(roomId);
    if (socket && roomId) {
      socket.emit("joinRoom", { roomId: roomId });
      // console.log("Socket joined room successfully");
    }
  }

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
            ref: `Support`, // Unique reference ID
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

  return (
    <div className="bg-white w-full max-w-[640px] rounded-lg shadow-lg p-4 relative">
      <div className="overflow-y-auto h-96 space-y-4">
        <div className='flex items-center font-medium border-b pb-4'>
        
        <Image
          src="/images/Admin-2.png"
          alt="Avatar"
          width={40}
          height={40}
          onError={(e) => {
            e.currentTarget.src = '/images/product-placeholder.jpg';
          }}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover"
        />

        <h6 className="ml-2 text-lg font-medium">Hubeco-Support</h6>

        </div>
        {messagesList.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.senderId === myId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-2">
              {message.senderId !== myId && receiver.displayImage && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={receiver.displayImage}
                  alt={receiver.name || "Receiver"}
                />
              )}
              <div className="flex flex-col">
                {message.senderId !== myId && (
                  <h4 className="text-sm font-medium text-gray-900">
                    {receiver.name || "Receiver"}
                  </h4>
                )}
                <div
                  className={`${
                    message.senderId === myId
                      ? "bg-[#009886] text-white"
                      : "bg-gray-100 text-gray-900"
                  } rounded-lg px-4 py-2 max-w-xs`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {/* <p className="text-xs text-gray-500 mt-1">{message.createdAt}</p> */}
              </div>
              {message.senderId === myId && sender.displayImage && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={sender.displayImage}
                  alt={sender.name || "Sender"}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t mt-4 pt-4 flex items-center">
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
    </div>
  );
}




// "use client";

// import useApi from "@/components/Fetcher/useAPI";
// import useSocket from "@/components/hooks/useSocket";
// import { CircularProgress } from "@chakra-ui/react";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import InfiniteScroll from 'react-infinite-scroll-component'

// export interface messageType {
//   content: string;
//   senderId: string;
//   roomId: string;
//   ref: string;
//   createdAt: string;
//   updatedAt: string;
//   chatEndPoint: string;
//   roomEndPoint: string;
//   refer: string;
//   width: string;
// }

// interface Props {
//   sender: {
//     name?: string;
//     displayImage?: string;
//   };
//   receiver: {
//     name?: string;
//     displayImage?: string;
//   };
//   receiverId?: string;
//   chatEndPoint: string;
//   roomEndPoint: string;
//   refer: string;
//   width: string;
// }

// export default function ChatBox({
//   sender,
//   receiver,
//   receiverId,
//   chatEndPoint,
//   roomEndPoint,
//   refer,
//   width,
// }: Props) {
//   const { socket } = useSocket();
//   const { callApi } = useApi();
//   const params = useSearchParams();
//   const [myId, setMyId] = useState<string | null | undefined>(receiverId);
//   const [roomId, setRoomId] = useState<string | null | undefined>(receiverId);
//   const [messagesList, setMessagesList] = useState<messageType[]>([]);
//   const [text, setText] = useState("");
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [metadata, setMetadata] = useState<{
//     currentPage: number
//     hasNextPage: boolean
//     hasPrevPage: boolean
//     limit: number
//     totalCount: number
//     totalPages: number
//   }>({
//     currentPage: 0,
//     hasNextPage: false,
//     hasPrevPage: false,
//     limit: 10,
//     totalCount: 0,
//     totalPages: 0
//   })

//   const handleSend = (text: string) => {
//     const payeload = {
//       room: roomId,
//       message: text,
//       timestamp: new Date().toISOString(),
//     };
//     socket?.emit("message", payeload); // Emit the message to
//     setText("");
//     scrollToBottom();
//   };

//   const scrollToBottom = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   async function getRoomId() {
//     try {
//       const id = window.location.pathname.split("/")[2];
//       const res = (await callApi(`${roomEndPoint}/${id}`, "GET")) as any;
//       if (res.data !== null) {
//         // console.log(res.data.roomId, " Socket Decoded token");
//         return res.data.roomId;
//       }
//     } catch (e) {
//       // consoleerror("Error fetching room ID:", e);
//     }
//   }

//   async function getChatHistory() {
//     try {
//       const id = window.location.pathname.split("/")[2];
//       const res = (await callApi(`${chatEndPoint}/${id}?limit=${metadata.limit}&page=${metadata.totalPages < metadata.currentPage + 1 ? metadata.currentPage + 1 : metadata.totalPages}`, "GET")) as any;
//       if (res.data !== null) {
//         // console.log(res.data, "Socket Decoded token");
//         setMessagesList((prev) => [...prev, ...res.data.data.reverse()]);
//         setMetadata(res.data.metadata)
//       }
//     } catch (e) {
//       // consoleerror("Error fetching room ID:", e);
//     }
//   }

//   async function runSocket() {
//     const roomId = await getRoomId();
//     await getChatHistory();
//     // console.log(roomId, params, " Socket roomID");
//     setRoomId(roomId);
//     if (socket && roomId) {
//       socket.emit("joinRoom", { roomId: roomId });
//       // console.log("Socket joined room successfully");
//     }
//   }

//   const fetchMoreMessages = () => {
//     if (metadata.currentPage < metadata.totalPages) {
//       getChatHistory();
//     }
//   };

//   useEffect(() => {
//     socket?.on("connect", () => {
//       runSocket();
//     });

//     socket?.on(
//       "message",
//       (message: { message: string; senderId: string; timestamp: string }) => {
//         // console.log("Socket Received message:", message);
//         if (message.message) {
//           const payload = {
//             content: message.message,
//             senderId: message.senderId || "unknown", // Replace with actual sender ID
//             room: roomId, // Replace with actual room ID
//             ref: refer, // Unique reference ID
//             createdAt: message.timestamp,
//             updatedAt: message.timestamp,
//           };

//           setMessagesList((prev: any) => [...prev, payload]);
//         }
//       }
//     );

//     if (!receiverId) {
//       const buyerUserInfo = sessionStorage.getItem("buyerUserInfo");
//       const buyer = buyerUserInfo ? JSON.parse(buyerUserInfo) : null;
//       if (buyer) {
//         receiverId = buyer.id;
//         setMyId(buyer.id);
//       }
//     }

//     return () => {
//       if (socket) {
//         socket.off("chat message");
//       }
//     };
//   }, [socket, receiverId]);

//   return (
//     <div
//       className={`bg-white w-full max-w-${width} rounded-lg shadow-lg p-4 relative`}
//     >
//       <h6 className="border-b text-lg p-3">{receiver.name || "Receiver"}</h6>
//       <div
//         ref={scrollRef}
//         className="overflow-y-auto h-96 space-y-4 scrollbar slim-scroll pr-5"
//       >
//         {messagesList.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.senderId === myId ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div className="flex items-start space-x-2">
//               {message.senderId !== myId && receiver.displayImage && (
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={receiver.displayImage}
//                   alt={receiver.name || "Receiver"}
//                 />
//               )}
//               <div className="flex flex-col">
//                 {/* {message.senderId !== myId && (
//                   <h4 className="text-sm font-medium text-gray-900">
//                     {receiver.name || "Receiver"}
//                   </h4>
//                 )} */}
//                 <div
//                   className={`${
//                     message.senderId === myId
//                       ? "bg-[#009886] text-white"
//                       : "bg-secondaryBg text-gray-900"
//                   } rounded-lg px-4 py-2 max-w-xs`}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//                 {/* <p className="text-xs text-gray-500 mt-1">{message.createdAt}</p> */}
//               </div>
//               {message.senderId === myId && sender.displayImage && (
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={sender.displayImage}
//                   alt={sender.name || "Sender"}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div
//         ref={scrollRef}
//         className="overflow-y-auto h-96 space-y-4 scrollbar slim-scroll pr-5"
//         id="scrollableDiv"
//       >
//         <InfiniteScroll
//           dataLength={messagesList.length}
//           next={fetchMoreMessages}
//           hasMore={metadata.hasNextPage}
//           loader={
//             <div style={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//               <CircularProgress size={24} />
//             </div>
//           }
//           inverse={true} // Load new messages at the top
//           scrollableTarget="scrollableDiv"
//         >
//           {messagesList.map((message, index) => (
//             <div
//               key={index}
//               className={`flex mb-2 ${
//                 message.senderId === myId ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div className="flex items-start space-x-2">
//                 {message.senderId !== myId && receiver.displayImage && (
//                   <img
//                     className="w-10 h-10 rounded-full"
//                     src={receiver.displayImage}
//                     alt={receiver.name || "Receiver"}
//                   />
//                 )}
//                 <div className="flex flex-col">
//                   <div
//                     className={`${
//                       message.senderId === myId
//                         ? "bg-[#009886] text-white"
//                         : "bg-secondaryBg text-gray-900"
//                     } rounded-lg px-4 py-2 max-w-xs`}
//                   >
//                     <p className="text-sm">{message.content}</p>
//                   </div>
//                 </div>
//                 {message.senderId === myId && sender.displayImage && (
//                   <img
//                     className="w-10 h-10 rounded-full"
//                     src={sender.displayImage}
//                     alt={sender.name || "Sender"}
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </InfiniteScroll>
//         </div>
//       <div className="border-t mt-4 pt-4 flex items-center">
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSend(text)}
//           className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:border-[#009886]"
//           placeholder="Type your message here..."
//         />
//         <button
//           onClick={() => handleSend(text)}
//           className="ml-2 bg-[#009886] text-white px-4 py-2 rounded-full"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
