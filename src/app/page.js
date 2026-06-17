"use client";
import { useState } from "react";
import FuncCard from "@/components/FuncCard";
import VideoModal from "@/components/VideoModal";
import SearchBar from "@/components/SearchBar";
import categories from "@/data/categories.json";
import functions from "@/data/functions.json";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [currentFunc, setCurrentFunc] = useState(null);

  // 过滤显示且匹配搜索的功能
  const list = functions
    .filter((f) => f.status === 1)
    .filter((f) =>
      f.funcName.includes(searchText) || f.definition.includes(searchText)
    )
    .sort((a, b) => a.sort - b.sort);

  const openModal = (item) => setCurrentFunc(item);
  const closeModal = () => setCurrentFunc(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">车载语音助手全功能展示库</h1>
      <SearchBar value={searchText} onChange={setSearchText} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((item) => (
          <FuncCard key={item.id} item={item} onClick={openModal} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-10">未匹配到相关功能</p>
      )}

      {currentFunc && <VideoModal item={currentFunc} closeModal={closeModal} />}
    </div>
  );
}