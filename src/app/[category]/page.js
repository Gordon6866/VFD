"use client";
import { useState } from "react";
import FuncCard from "@/components/FuncCard";
import VideoModal from "@/components/VideoModal";
import SearchBar from "@/components/SearchBar";
import categories from "@/data/categories.json";
import functions from "@/data/functions.json";

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const [searchText, setSearchText] = useState("");
  const [currentFunc, setCurrentFunc] = useState(null);

  const catInfo = categories.find((c) => c.slug === category);
  const catId = catInfo?.id;

  const list = functions
    .filter((f) => f.categoryId === catId && f.status === 1)
    .filter((f) => f.funcName.includes(searchText) || f.definition.includes(searchText))
    .sort((a, b) => a.sort - b.sort);

  const openModal = (item) => setCurrentFunc(item);
  const closeModal = () => setCurrentFunc(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">{catInfo?.name}</h1>
      <SearchBar value={searchText} onChange={setSearchText} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((item) => (
          <FuncCard key={item.id} item={item} onClick={openModal} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-10">该分类暂无功能或无搜索结果</p>
      )}

      {currentFunc && <VideoModal item={currentFunc} closeModal={closeModal} />}
    </div>
  );
}