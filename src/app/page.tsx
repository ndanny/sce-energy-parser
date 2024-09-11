import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="space-y-5">
        <h1 className="text-2xl">
          Southern California Edison Energy Usage Parser
        </h1>
        <div className="max-w-screen-md">
          <p className="font-bold">Why this tool?</p>
          <p>
            <Link
              href="https://www.sce.com"
              className="text-blue-500 font-bold"
            >
              Southern California Edison
            </Link>{" "}
            allows customers to download their energy usage data in CSV format.
            This tool helps you parse that data and visualize it in a more
            user-friendly way than the SCE website.
          </p>
        </div>
        <div className="max-w-screen-md">
          <p className="font-bold">How can I get my usage data?</p>
          <p>
            Visit{" "}
            <Link
              href="https://www.sce.com/sma/ESCAA/EscGreenButtonData"
              className="text-blue-500 font-bold"
            >
              this link
            </Link>{" "}
            and log in to your SCE account. Select the date range you want to
            see your energy usage for, choose the CSV format option, and
            download the CSV. You will upload this CSV file to this tool.
          </p>
        </div>
        <div className="max-w-screen-md">
          <p className="font-bold">A note on privacy and security</p>
          <p>
            This tool only stores and processes your data in your browser. Your
            data is never sent to any server. You can view the source code for
            this tool on our GitHub.
          </p>
        </div>
      </div>
    </div>
  );
}
