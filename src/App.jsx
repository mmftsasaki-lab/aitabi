import Home from "./pages/Home.jsx";
import Stories from "./pages/Stories.jsx";
import StoryDetail from "./pages/StoryDetail.jsx";
import Themes from "./pages/Themes.jsx";
import Create from "./pages/Create.jsx";
import Editor from "./pages/Editor.jsx";
import MyPage from "./pages/MyPage.jsx";
import Saved from "./pages/Saved.jsx";
import About from "./pages/About.jsx";
import Pricing from "./pages/Pricing.jsx";
import { Footer, Header } from "./components/index.js";

const routes = {
  "/": Home,
  "/stories": Stories,
  "/stories/atami": StoryDetail,
  "/themes": Themes,
  "/create": Create,
  "/editor": Editor,
  "/mypage": MyPage,
  "/saved": Saved,
  "/about": About,
  "/pricing": Pricing
};

function NotFound() {
  return (
    <main className="min-h-[70vh] bg-ivory px-5 py-20 text-center text-espresso">
      <p className="text-sm tracking-[0.18em] text-rose">404</p>
      <h1 className="mt-5 font-serif text-4xl">ページが見つかりません</h1>
      <a className="mt-8 inline-block rounded-full bg-teal px-6 py-3 text-sm font-medium text-white" href="/">
        ホームへ戻る
      </a>
    </main>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = routes[pathname] || NotFound;

  return (
    <>
      <Header activePath={pathname} />
      <Page />
      <Footer />
    </>
  );
}
