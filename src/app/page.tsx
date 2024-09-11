import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-2xl mb-6">
        Southern California Edison Energy Usage Parser
      </h1>
      <div className="space-y-4 max-w-screen-md">
        <details className="open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg">
          <summary className="text-sm leading-6 text-slate-900 font-semibold select-none">
            Why this tool?
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600">
            <p>
              <Link
                href="https://www.sce.com"
                className="text-blue-500 font-bold"
              >
                Southern California Edison
              </Link>{" "}
              allows customers to download their energy usage data in CSV
              format. This tool helps you parse that data and visualize it in a
              more user-friendly way than the SCE website.
            </p>
          </div>
        </details>

        <details className="open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg">
          <summary className="text-sm leading-6 text-slate-900 font-semibold select-none">
            How can I get my usage data?
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600">
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
        </details>

        <details className="open:bg-white open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg">
          <summary className="text-sm leading-6 text-slate-900 font-semibold select-none">
            A note on privacy and security
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600">
            <p>
              This tool only stores and processes your data in your browser.
              Your data is never sent to any server. You can view the source
              code for this tool on our GitHub.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
