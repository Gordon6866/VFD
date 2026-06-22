"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import TreeView from "@/components/TreeView";
import AddCategoryModal from "@/components/AddCategoryModal";
import AddFunctionModal from "@/components/AddFunctionModal";
import AddVideoModal from "@/components/AddVideoModal";

// 初始数据（从 JSON 文件加载）
import initialCategories from "@/data/categories.json";
import initialFunctions from "@/data/functions.json";

export default function HomePage() {
  // 动态数据状态
  const [categories, setCategories] = useState(initialCategories);
  const [functions, setFunctions] = useState(initialFunctions);

  // 当前选中的功能
  const [selectedFunc, setSelectedFunc] = useState(
    initialFunctions.length > 0 ? initialFunctions[0] : null
  );

  // 模态框状态
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddFunction, setShowAddFunction] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [addFunctionCategoryId, setAddFunctionCategoryId] = useState(null);

  const videoRef = useRef(null);

  // 处理功能选择
  const handleSelectFunction = useCallback((func) => {
    setSelectedFunc(func);
  }, []);

  // 新增分类
  const handleAddCategory = useCallback((newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  // 新增功能
  const handleAddFunction = useCallback((newFunc) => {
    setFunctions((prev) => [...prev, newFunc]);
  }, []);

  // 新增视频（为选中功能添加新车型视频）
  const handleAddVideo = useCallback((newVideo) => {
    setFunctions((prev) =>
      prev.map((f) => {
        if (f.id === selectedFunc?.id) {
          const updated = {
            ...f,
            carModels: [...(f.carModels || []), newVideo],
          };
          setSelectedFunc(updated);
          return updated;
        }
        return f;
      })
    );
  }, [selectedFunc?.id]);

  // 切换到上一个功能
  const goToPrev = () => {
    const currentIndex = functions.findIndex((f) => f.id === selectedFunc?.id);
    const prevIndex = currentIndex <= 0 ? functions.length - 1 : currentIndex - 1;
    setSelectedFunc(functions[prevIndex]);
  };

  // 切换到下一个功能
  const goToNext = () => {
    const currentIndex = functions.findIndex((f) => f.id === selectedFunc?.id);
    const nextIndex = (currentIndex + 1) % functions.length;
    setSelectedFunc(functions[nextIndex]);
  };

  // 当前功能的车型列表
  const carModels = selectedFunc?.carModels || [];
  const [selectedCarModel, setSelectedCarModel] = useState(0);

  // 当切换功能时，重置车型选择
  useEffect(() => {
    setSelectedCarModel(0);
  }, [selectedFunc?.id]);

  // 当前选中的视频
  const currentVideo =
    carModels.length > 0
      ? carModels[selectedCarModel]
      : { videoUrl: selectedFunc?.videoUrl, videoCover: selectedFunc?.videoCover };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* 左侧树状导航 - 固定宽度，始终可见 */}
      <div className="w-80 h-full bg-white shadow-xl flex-shrink-0">
        <TreeView
          categories={categories}
          functions={functions}
          onSelectFunction={handleSelectFunction}
          selectedFuncId={selectedFunc?.id}
          onAddCategory={() => setShowAddCategory(true)}
          onAddFunction={(categoryId) => {
            setAddFunctionCategoryId(categoryId);
            setShowAddFunction(true);
          }}
        />
      </div>

      {/* 右侧主内容区 */}
      <main className="flex-1 overflow-y-auto">
        {selectedFunc ? (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="px-16 py-20">
              <div className="w-full max-w-5xl mx-auto space-y-16">
                {/* 上方：视频播放器 */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/50 ring-1 ring-white/10">
                  <video
                    ref={videoRef}
                    src={currentVideo?.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    poster={currentVideo?.videoCover || undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 车型选择标签 */}
                {carModels.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-gray-400">车型：</span>
                    {carModels.map((cm, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCarModel(idx)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${idx === selectedCarModel
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                      >
                        {cm.carModel}
                      </button>
                    ))}
                    {/* 新增视频按钮 */}
                    <button
                      onClick={() => setShowAddVideo(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                    >
                      + 新增视频
                    </button>
                  </div>
                )}

                {/* 如果没有车型视频，显示新增按钮 */}
                {carModels.length === 0 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowAddVideo(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                                 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30
                                 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      新增视频
                    </button>
                    <span className="text-sm text-gray-500">为该功能添加不同车型的视频</span>
                  </div>
                )}

                {/* 下方：功能详情 */}
                <div className="space-y-8">
                  {/* 分类标签和导航 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
                        {categories.find((c) => c.id === selectedFunc.categoryId)?.name || "未分类"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        功能 #{selectedFunc.id}
                      </span>
                    </div>

                    {/* 上下切换按钮 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPrev}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                        title="上一个功能"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={goToNext}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
                        title="下一个功能"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 功能名称 */}
                  <h2 className="text-5xl font-bold leading-tight">
                    {selectedFunc.funcName || selectedFunc.name}
                  </h2>

                  {/* 功能描述 */}
                  {selectedFunc.definition && (
                    <div className="prose prose-lg prose-invert">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {selectedFunc.definition}
                      </p>
                    </div>
                  )}

                  {/* 示例指令 */}
                  {selectedFunc.demoCommand && (
                    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-2">
                            示例指令
                          </div>
                          <div className="text-white font-medium text-lg">
                            "{selectedFunc.demoCommand}"
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-4 pt-6">
                    <button
                      onClick={() => videoRef.current?.play()}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl 
                                 bg-gradient-to-r from-blue-500 to-blue-600 
                                 hover:from-blue-600 hover:to-blue-700 
                                 text-white font-semibold text-lg
                                 shadow-lg shadow-blue-500/30 
                                 transition-all duration-200
                                 hover:shadow-xl hover:shadow-blue-500/40 
                                 active:scale-[0.98]"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      播放演示视频
                    </button>
                    
                    <button
                      onClick={goToNext}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl 
                                 bg-white/10 hover:bg-white/20 
                                 text-white font-semibold text-lg
                                 border border-white/20 hover:border-white/30
                                 transition-all duration-200"
                    >
                      下一个功能
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* 进度指示器 */}
                  <div className="pt-8">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>当前进度</span>
                      <span>{functions.findIndex((f) => f.id === selectedFunc.id) + 1} / {functions.length}</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/10">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                        style={{ 
                          width: `${((functions.findIndex((f) => f.id === selectedFunc.id) + 1) / functions.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 空状态 */
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-4">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600">请从左侧导航选择功能</h3>
              <p className="text-sm text-gray-400">选择功能后，将在此处显示视频演示和详细说明</p>
            </div>
          </div>
        )}
      </main>

      {/* 模态框 */}
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onAdd={handleAddCategory}
      />

      <AddFunctionModal
        isOpen={showAddFunction}
        onClose={() => setShowAddFunction(false)}
        categoryId={addFunctionCategoryId}
        onAdd={handleAddFunction}
      />

      <AddVideoModal
        isOpen={showAddVideo}
        onClose={() => setShowAddVideo(false)}
        funcName={selectedFunc?.funcName || selectedFunc?.name}
        onAdd={handleAddVideo}
      />
    </div>
  );
}
