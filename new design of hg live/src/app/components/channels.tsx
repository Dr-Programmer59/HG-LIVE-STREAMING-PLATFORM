"us client";

import React from "react";

import SearchBar from "./search-bar";
import { Users } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  avatar: string;
  followers: number;
}

const channels: Channel[] = [
  {
    id: "1",
    name: "PewDiePie",
    avatar: "/assets/main.png",
    followers: 111000000,
  },
  {
    id: "2",
    name: "MrBeast",
    avatar: "/assets/main.png",
    followers: 94700000,
  },
  {
    id: "3",
    name: "Markiplier",
    avatar: "/assets/main.png",
    followers: 34000000,
  },
  {
    id: "4",
    name: "Ninja",
    avatar: "/assets/main.png",
    followers: 23900000,
  },
  {
    id: "5",
    name: "Pokimane",
    avatar: "/assets/main.png",
    followers: 9200000,
  },
  {
    id: "6",
    name: "Shroud",
    avatar: "/assets/main.png",
    followers: 7100000,
  },
  {
    id: "7",
    name: "Valkyrae",
    avatar: "/assets/main.png",
    followers: 3600000,
  },
  {
    id: "8",
    name: "DrLupo",
    avatar: "/assets/main.png",
    followers: 4500000,
  },
  {
    id: "9",
    name: "TimTheTatman",
    avatar: "/assets/main.png",
    followers: 7000000,
  },
  {
    id: "10",
    name: "Myth",
    avatar: "/assets/main.png",
    followers: 7400000,
  },
  {
    id: "11",
    name: "Sykkuno",
    avatar: "/assets/main.png",
    followers: 4000000,
  },
  {
    id: "12",
    name: "Disguised Toast",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 3800000,
  },
  {
    id: "13",
    name: "Lirik",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 2800000,
  },
  {
    id: "14",
    name: "DrDisRespect",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 4400000,
  },
  {
    id: "15",
    name: "Sodapoppin",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 3300000,
  },
  {
    id: "16",
    name: "xQc",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 11000000,
  },
];

const ChannelCard = ({ channel }: { channel: Channel }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 min-w-[280px] transform hover:scale-105 hover:shadow-2xl">
    <div className="relative">
      <img
        src={channel.avatar}
        alt={`${channel.name}'s avatar`}
        className="w-full h-40 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-bold text-lg truncate">
          {channel.name}
        </h3>
      </div>
    </div>
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center text-gray-400">
        <Users size={16} className="mr-2" />
        <span>{channel.followers.toLocaleString()}</span>
      </div>
      <button
        className="bg-primary hover:bg-hoverPrimary text-gray-900 font-bold py-2 px-4 rounded-full transition-colors duration-300"
        style={{ backgroundColor: "#FCAD06" }}
      >
        Follow
      </button>
    </div>
  </div>
);

const ChannelsDisplay = () => {
  return (
    <div
      className="min-h-screen p-8 w-full"
      style={{ backgroundColor: "#1F2226" }}
    >
      <div className=" flex flex-col  max-w-full ">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl mb-5 text-center w-auto ">
            Discover Channels
          </h1>
          <div className="w-auto flex justify-center items-center">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelsDisplay;
