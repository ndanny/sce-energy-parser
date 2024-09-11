import Link from "next/link";
import Faq from "./components/faq";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-2xl mb-6">
        Southern California Edison Energy Usage Parser
      </h1>
      <Faq />
    </div>
  );
}
