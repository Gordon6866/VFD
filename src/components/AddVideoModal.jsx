"use client";

import { useState } from "react";

// 预设车型列表（可根据实际情况修改）
const CAR_MODELS = [
  "Model X",
  "Model Y", 
  "Model 3",
  "Model S",
  "蔚来 ET5",
  "蔚来 ES6",
  "理想 L9",
  "理想 L8",
  "小鹏 P7",
  "小鹏 G9",
  "比亚迪 汉",
  "比亚迪 海豹",
];

export default function AddVideoModal({ isOpen, onClose, funcName, onAdd }) {
  const [carModel, setCarModel] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCover, setVideoCover] = useState("");

  const finalCarModel = carModel === "custom" ? customModel : carModel;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!finalCarModel.trim() || !videoUrl.trim()) return;
    onAdd({
      carModel: finalCarModel.trim(),
      videoUrl: videoUrl.trim(),
      videoCover: videoCover.trim(),
    });
    // 清空表单
    setCarModel("");
    setCustomModel("");
    setVideoUrl("");
    setVideoCover("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal-box max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              新增视频 - {funcName}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 车型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                车型 <span className="text-red-500">*</span>
              </label>
              <select
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">请选择车型</option>
                {CAR_MODELS.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
                <option value="custom">+ 自定义车型</option>
              </select>
            </div>

            {/* 自定义车型输入 */}
            {carModel === "custom" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  自定义车型名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="输入车型名称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            )}

            {/* 视频地址 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                视频地址 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="例如：/videos/modelx-demo.mp4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 封面地址 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                封面地址
              </label>
              <input
                type="text"
                value={videoCover}
                onChange={(e) => setVideoCover(e.target.value)}
                placeholder="例如：/images/modelx-cover.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 按钮 */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={!finalCarModel.trim() || !videoUrl.trim()}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 
                           disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                确认新增
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
