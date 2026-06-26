"use client";

import { useState, useCallback, useEffect } from "react";

// 图标组件
const ChevronIcon = ({ isOpen, className = "" }) => (
  <svg
    className={`w-4 h-4 text-white transition-transform duration-200 ${
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
    fill={isOpen ? "none" : "currentColor"}
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

// 功能节点组件（支持三级子功能）
function FunctionItem({ func, selectedFuncId, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubFunctions = func.subFunctions && func.subFunctions.length > 0;
  const isSelected = selectedFuncId === func.id || 
                     (hasSubFunctions && func.subFunctions.some(sub => sub.id === selectedFuncId));

  const handleClick = () => {
    if (hasSubFunctions) {
      setIsExpanded(!isExpanded);
    }
    onSelect && onSelect(func);
  };

  return (
    <div>
      <button
        key={func.id}
        onClick={handleClick}
        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm 
                   text-left transition-all duration-150
                   ${isSelected
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
      >
        {hasSubFunctions ? (
          <ChevronIcon isOpen={isExpanded} className="w-3 h-3" />
        ) : (
          <FuncIcon />
        )}
        <span className="truncate flex-1 text-white">{func.funcName || func.name}</span>
        {hasSubFunctions && (
          <span className="text-xs text-gray-400">{func.subFunctions.length}</span>
        )}
      </button>

      {/* 三级子功能列表 */}
      {hasSubFunctions && (
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="ml-6 pl-2 border-l-2 border-gray-600 py-1 space-y-0.5">
            {func.subFunctions.map((subFunc) => (
              <button
                key={subFunc.id}
                onClick={() => onSelect && onSelect(subFunc)}
                className={`w-full flex items-center gap-2 px-3 py-1 rounded-md text-xs
                           text-left transition-all duration-150
                           ${selectedFuncId === subFunc.id
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
              >
                <span className="truncate flex-1">{subFunc.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 分类节点组件
function CategoryNode({ category, functions, selectedFuncId, onSelect, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

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
          <span className="flex-1 text-sm font-medium truncate text-white">
            {category.name}
          </span>
          <span className="text-xs text-gray-300 bg-gray-700 px-2 py-0.5 rounded-full">
            {categoryFunctions.length}
          </span>
        </button>
      </div>

      {/* 功能列表 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 pl-2 border-l-2 border-gray-200 py-1 space-y-1">
          {categoryFunctions.map((func) => (
            <FunctionItem
              key={func.id}
              func={func}
              selectedFuncId={selectedFuncId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 计算功能匹配权重
const getMatchWeight = (func, searchTerm) => {
  let weight = 0;
  const funcName = func.funcName || func.name;
  
  if (funcName?.includes(searchTerm)) {
    weight += 10;
    if (funcName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      weight += 5;
    }
  }
  if (func.definition?.includes(searchTerm)) {
    weight += 1;
  }
  if (func.subFunctions?.some(sub => sub.name?.includes(searchTerm))) {
    weight += 5;
  }
  if (func.subFunctions?.some(sub => sub.definition?.includes(searchTerm))) {
    weight += 1;
  }
  return weight;
};

// 主 TreeView 组件
export default function TreeView({ categories, functions, onSelectFunction, selectedFuncId }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [allExpanded, setAllExpanded] = useState(false); // 全局展开/收折状态，默认收起

  const processCategories = () => {
    if (!searchFilter) {
      return categories.map(cat => ({
        ...cat,
        functions: functions.filter(f => f.categoryId === cat.id)
      }));
    }

    return categories
      .map(cat => {
        const catFunctions = functions.filter(f => f.categoryId === cat.id);
        const matchedFunctions = catFunctions
          .map(func => ({
            ...func,
            matchWeight: getMatchWeight(func, searchFilter)
          }))
          .filter(func => func.matchWeight > 0)
          .sort((a, b) => b.matchWeight - a.matchWeight);
        
        return {
          ...cat,
          functions: matchedFunctions,
          hasMatch: cat.name.includes(searchFilter) || matchedFunctions.length > 0
        };
      })
      .filter(cat => cat.hasMatch);
  };

  const processedCategories = processCategories();

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center mb-3">
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
        </div>
        
        {/* 搜索框 */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
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
              onChange={(e) => {
                setSearchFilter(e.target.value);
                // 搜索时自动展开所有分类
                if (e.target.value && !allExpanded) {
                  setAllExpanded(true);
                }
              }}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-blue-500/20 text-white 
                         placeholder-blue-200 text-sm focus:outline-none focus:bg-blue-500/30 
                         transition border-none"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center
                           text-blue-300 hover:text-white transition-colors"
                title="清除搜索"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* 全局展开/收折按钮 */}
          <button
            onClick={() => setAllExpanded(!allExpanded)}
            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-white transition-colors"
            title={allExpanded ? "收起全部" : "展开全部"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${allExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 树状内容 - 显示所有功能 */}
      <nav className="flex-1 overflow-y-auto p-3 bg-gray-900">
        {processedCategories.map((category) => (
          <CategoryNode
            key={category.id}
            category={category}
            functions={category.functions}
            selectedFuncId={selectedFuncId}
            onSelect={onSelectFunction}
            defaultExpanded={allExpanded}
          />
        ))}

        {processedCategories.length === 0 && (
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
      <div className="p-3 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>共 {categories.length} 个分类</span>
          <span>共 {functions.length} 个功能</span>
        </div>
      </div>
    </div>
  );
}
