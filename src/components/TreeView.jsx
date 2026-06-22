"use client";

import { useState, useCallback } from "react";

// 图标组件
const ChevronIcon = ({ isOpen, className = "" }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${
      isOpen ? "rotate-90" : ""
    } ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const FolderIcon = ({ isOpen }) => (
  <svg
    className="w-5 h-5 text-blue-500"
    fill={isOpen ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const FuncIcon = () => (
  <svg
    className="w-4 h-4 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

// 分类节点组件
function CategoryNode({ category, functions, selectedFuncId, onSelect, onAddFunction }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const categoryFunctions = functions.filter(
    (f) => f.categoryId === category.id
  );

  return (
    <div className="mb-1">
      {/* 分类标题 */}
      <div className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <ChevronIcon isOpen={isExpanded} />
          <FolderIcon isOpen={isExpanded} />
          <span className="flex-1 text-sm font-medium truncate text-gray-700">
            {category.name}
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {categoryFunctions.length}
          </span>
        </button>

        {/* 新增功能按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddFunction && onAddFunction(category.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-blue-100 text-blue-500 transition-all duration-200"
          title="新增功能"
        >
          <PlusIcon />
        </button>
      </div>

      {/* 功能列表 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 pl-2 border-l-2 border-gray-200 py-1 space-y-1">
          {categoryFunctions.map((func) => (
            <button
              key={func.id}
              onClick={() => {
                onSelect && onSelect(func);
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm 
                         text-left transition-all duration-150
                         ${func.id === selectedFuncId
                           ? "bg-blue-50 text-blue-600 font-semibold"
                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                         }`}
            >
              <FuncIcon />
              <span className="truncate flex-1">{func.funcName || func.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 主 TreeView 组件
export default function TreeView({ categories, functions, onSelectFunction, selectedFuncId, onAddCategory, onAddFunction }) {
  const [searchFilter, setSearchFilter] = useState("");

  const filteredCategories = categories.filter((cat) => {
    if (!searchFilter) return true;
    const catFunctions = functions.filter((f) => f.categoryId === cat.id);
    return (
      cat.name.includes(searchFilter) ||
      catFunctions.some(
        (f) =>
          (f.funcName || f.name)?.includes(searchFilter) ||
          f.definition?.includes(searchFilter)
      )
    );
  });

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <h2 className="text-lg font-bold">功能导航</h2>
          </div>

          {/* 新增分类按钮 */}
          <button
            onClick={() => onAddCategory && onAddCategory()}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
            title="新增分类"
          >
            <PlusIcon />
          </button>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="搜索功能..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-500/20 text-white 
                       placeholder-blue-200 text-sm focus:outline-none focus:bg-blue-500/30 
                       transition border-none"
          />
        </div>
      </div>

      {/* 树状内容 - 显示所有功能 */}
      <nav className="flex-1 overflow-y-auto p-3">
        {filteredCategories.map((category) => (
          <CategoryNode
            key={category.id}
            category={category}
            functions={functions}
            selectedFuncId={selectedFuncId}
            onSelect={onSelectFunction}
            onAddFunction={onAddFunction}
          />
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm">未找到匹配功能</p>
          </div>
        )}
      </nav>

      {/* 底部统计 */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>共 {categories.length} 个分类</span>
          <span>共 {functions.length} 个功能</span>
        </div>
      </div>
    </div>
  );
}
