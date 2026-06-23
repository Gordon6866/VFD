"use client";

import { useState, useCallback, useEffect } from "react";
import TreeView from "@/components/TreeView";
import AddCategoryModal from "@/components/AddCategoryModal";
import AddFunctionModal from "@/components/AddFunctionModal";

import initialCategories from "@/data/categories.json";
import initialFunctions from "@/data/functions.json";

export default function HomePage() {
  const [categories, setCategories] = useState(initialCategories);
  const [functions, setFunctions] = useState(initialFunctions);

  const [selectedFunc, setSelectedFunc] = useState(
    initialFunctions.length > 0 ? initialFunctions[0] : null
  );

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddFunction, setShowAddFunction] = useState(false);
  const [addFunctionCategoryId, setAddFunctionCategoryId] = useState(null);

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

  const carModels = selectedFunc?.carModels?.length > 0 
    ? selectedFunc.carModels 
    : [{ carModel: "理想L6", embedUrl: "" }];
  const [selectedCarModel, setSelectedCarModel] = useState(0);

  useEffect(() => {
    setSelectedCarModel(0);
  }, [selectedFunc?.id]);

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
                {/* 上方：功能详情 */}
                <div className="space-y-8">
                  {/* 功能名称和切换按钮水平对齐 */}
                  <div className="flex items-center justify-between">
                    {/* 功能名称 */}
                    <h2 className="text-5xl font-bold leading-tight">
                      {selectedFunc.funcName || selectedFunc.name}
                    </h2>

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
                    <div className="p-5 rounded-xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-blue-200 font-semibold uppercase tracking-wide mb-1.5">
                            示例指令
                          </div>
                          <div className="text-white font-medium text-lg leading-relaxed break-words">
                            "{selectedFunc.demoCommand}"
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                  </div>
                )}

                {/* 视频播放器区域 - 固定显示一个视频窗口 */}
                <div className="relative">
                  {/* 视频标题栏 */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 backdrop-blur-sm rounded-t-xl border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-300">演示视频</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                      {carModels[selectedCarModel]?.carModel || "理想L6"}
                    </span>
                  </div>
                  {/* 视频播放区域 */}
                  <div className="relative aspect-video rounded-b-xl overflow-hidden shadow-2xl bg-black/50 ring-1 ring-white/10">
                    {carModels[selectedCarModel]?.embedUrl ? (
                      <iframe
                        key={selectedCarModel}
                        src={carModels[selectedCarModel]?.embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        title={carModels[selectedCarModel]?.carModel || "演示视频"}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <div className="text-center text-gray-400">
                          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <p className="text-lg">暂无视频</p>
                          <p className="text-sm text-gray-500">请在后台配置 embedUrl</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
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

      </div>
  );
}
