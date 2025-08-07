"use client";
import React, { useEffect, useState } from "react";
import { notifyError } from "@/utils/toast";
import { GENERATE_VIDEO_URL } from "@/modules/hokage/actions";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    (async () => {
      const result = await GENERATE_VIDEO_URL({ videoId: videoUrl });

      if (!result.success || !result.data) {
        notifyError(result?.message);
      }

      setVideoData(result.data!);
    })();
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
          style={{
            border: 0,
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}{" "}
    </div>
  );
};

export default VideoPlayer;
