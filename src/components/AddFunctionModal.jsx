"use client";

import { useState } from "react";

export default function AddFunctionModal({ isOpen, onClose, categoryId, onAdd }) {
  const [funcName, setFuncName] = useState("");
  const [definition, setDefinition] = useState("");
  const [demoCommand, setDemoCommand] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!funcName.trim()) return;
    onAdd({
      id: Date.now(),
      categoryId: categoryId,
      funcName: funcName.trim(),
      name: funcName.trim(),
      definition: definition.trim(),
      demoCommand: demoCommand.trim(),
      carModels: [],
    });
    setFuncName("");
    setDefinition("");
    setDemoCommand("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal-box max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">新增功能</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                功能名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={funcName}
                onChange={(e) => setFuncName(e.target.value)}
                placeholder="例如：语音导航"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                功能定义
              </label>
              <textarea
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="描述该功能的用途和效果"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                示例指令
              </label>
              <input
                type="text"
                value={demoCommand}
                onChange={(e) => setDemoCommand(e.target.value)}
                placeholder='例如："导航到公司"'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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
                disabled={!funcName.trim()}
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