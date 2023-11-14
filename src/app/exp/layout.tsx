import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="absolute top-8 left-8 z-10 w-200">
        <Link href="/">
          <div className="w-full relative group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <div className="text-sm">
              <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                &lt;-
              </span>{" "}
              Back to Home
            </div>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
}
