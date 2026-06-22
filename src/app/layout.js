import "./globals.css";

export const metadata = {
  title: "车载语音助手功能展示平台",
  description: "全品类车载语音功能词条+演示视频",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
