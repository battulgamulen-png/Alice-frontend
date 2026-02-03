import Video from "next-video";
import getStarted from "/videos/get-started.mp4";

export default function Page() {
  return <Video src={getStarted} />;
}
