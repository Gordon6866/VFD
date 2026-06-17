"use client";
import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoModal({ item, closeModal }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      new Plyr(videoRef.current, { controls: ["play", "progress", "volume", "fullscreen"] });
    }
  }, [item]);

  return (
    <div className="modal-mask" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{item.funcName}</h2>
          <button onClick={closeModal} className="text-xl">✕</button>
        </div>
        <div className="p-4">
          <video ref={videoRef} src={item.videoUrl} className="w-full rounded" controls />
        </div>
        <div className="p-6 space-y-4 border-t max-h-96 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-lg">专业定义</h3>
            <p className="mt-2 text-gray-700">{item.definition}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">指令示例</h3>
            <p className="mt-2 bg-gray-100 p-3 rounded">{item.demoCommand}</p>
          </div>
        </div>
      </div>
    </div>
  );
}