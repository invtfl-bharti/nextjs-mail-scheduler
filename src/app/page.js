"use client";
import Image from "next/image";
import ScheduledInput from "../components/ScheduleInput";
import ScheduledList from "../components/ScheduledList";
import MailTemplate from "../components/MailTemplate";

export default function Home() {
  return (
    <div className="bg-white h-screen w-full p-10 px-40 flex flex-col text-black gap-4">
      <div className="w-full h-2/3 flex justify-between items-center gap-4">
        <ScheduledInput />
        <MailTemplate />
      </div>
      <div className="h-full w-full flex items-center justify-center gap-4">
        <ScheduledList />
      </div>
    </div>
  );
}
