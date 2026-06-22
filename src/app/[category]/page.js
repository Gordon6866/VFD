import categories from "@/data/categories.json";
import functions from "@/data/functions.json";

// 静态预渲染分类路由
export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.slug }));
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const currentCat = categories.find(c => c.slug === category);
  const catFunctions = functions.filter(item => item.category === category);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <a href="/" className="text-blue-600 mb-4 inline-block">← 返回首页</a>
      <h1 className="mb-2">{currentCat?.name}</h1>
      <p className="text-slate-500 mb-10">该分类下全部语音功能</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catFunctions.map(item => (
          <div
            key={item.id}
            className="func-card"
          >
            <h3>{item.name}</h3>
            <p className="text-slate-500 mt-2 text-sm">{item.desc}</p>
            <div className="mt-4 text-blue-600 text-sm">点击播放视频 →</div>
          </div>
        ))}
      </div>
    </main>
  );
}