import { message } from "@/prisma/generated";

type MessageListProps = {
  messages: message[];
  receiverID: number;
}

export default function MessageList({ messages, receiverID }: MessageListProps) {
  return (
    <ul className="inline-flex flex-col mt-4 p-4 flex-1 w-full">
      {messages.map(({ content, sender_id}, index) => (
        <li
          key={index}
          className={`py-2 ${
            sender_id === receiverID ? "self-start" : "self-end"
          }`}
        >
          <p className={`text-sm text-gray-500 ${receiverID === sender_id ? "text-right" : "text-left"}`}>{}</p>
          <p
            className={`px-4 py-2 text-center text-white rounded-lg ${
              receiverID === sender_id
                ? "bg-blue-500 "
                : "bg-gray-800"
            }`}
          >
            {content}
          </p>
        </li>
      ))}
    </ul>
  );
}