"use client";

import Image from "next/image";
import { Play } from "lucide-react";

export default function FuncCard({ item, onClick, isSelected = false }) {
  return (
    <div
      onClick={() => onClick(item)}
      className={`func-card group relative ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""
      }`}
    >
      {/* 选中指示器 */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full 
                        bg-blue-500 text-white flex items-center justify-center 
                        shadow-lg animate-scale-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* 视频封面 */}
      <div className="func-card-image relative">
        {item.videoCover ? (
          <Image 
            src={item.videoCover} 
            fill 
            alt={item.funcName} 
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* 播放按钮 */}
        <div className="func-card-play-btn opacity-0 group-hover:opacity-100">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* 功能编号 */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm 
                        flex items-center justify-center text-white text-sm font-bold">
          {item.id}
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="func-card-body">
        <h3 className="func-card-title">{item.funcName}</h3>
        
        <p className="func-card-desc">
          {item.definition}
        </p>

        {/* 示例指令 */}
        {item.demoCommand && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs text-gray-500 italic line-clamp-2">
              "{item.demoCommand}"
            </span>
          </div>
        )}

        {/* 查看详情指示器 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {isSelected ? "当前预览中" : "点击查看演示"}
          </span>
          <svg className="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
