import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, dict }) {
  const router = useRouter();
  const dir = router.locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={router.locale} className="min-h-screen flex flex-col">
      <Navbar dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
