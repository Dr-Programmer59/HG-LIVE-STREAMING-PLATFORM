import React from "react";

import { Play } from "lucide-react";

import SearchBar from "./search-bar";

interface Stream {
  id: string;
  name: string;
  thumbnail: string;
  viewers: number;
}

const streams: Stream[] = [
  {
    id: "1",
    name: "GameMaster",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 1500,
  },
  {
    id: "2",
    name: "CookingPro",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 800,
  },
  {
    id: "3",
    name: "MusicLive",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 2200,
  },
  {
    id: "4",
    name: "TechTalk",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 1200,
  },
  {
    id: "5",
    name: "ArtStream",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 600,
  },
  {
    id: "6",
    name: "FitnessGuru",
    thumbnail: "/placeholder.svg?height=200&width=350",
    viewers: 950,
  },
];

const StreamsDisplay = () => {
  return (
    <div className=" bg-[#1F2226] text-[#ffffff]  p-8 min-h-screen w-full">
      <div className="flex justify-between flex-wrap">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl mb-5 text-center w-auto ">
          Live Streams
        </h1>
        <div className="w-auto flex justify-center items-center">
          <SearchBar />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((channel) => (
          <div
            key={channel.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img
                src={channel.thumbnail}
                alt={`${channel.name} thumbnail`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                LIVE
              </div>

              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded flex items-center">
                <Play className="w-4 h-4 mr-1" style={{ fill: "#FCAD06" }} />
                {channel.viewers.toLocaleString()}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{channel.name}</h3>
              <button
                className="w-full py-2 px-4 rounded font-semibold transition-colors duration-200"
                style={{ backgroundColor: "#FCAD06", color: "#1F2226" }}
              >
                Watch Stream
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamsDisplay;
