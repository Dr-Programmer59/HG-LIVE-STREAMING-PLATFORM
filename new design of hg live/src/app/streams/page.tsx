import { Sidebar, StreamsDisplay } from "../components";

export default function StreamsSection() {
  return (
    <div className="flex flex-row justify-between gap-0">
      <Sidebar />
      <StreamsDisplay />
    </div>
  );
}
