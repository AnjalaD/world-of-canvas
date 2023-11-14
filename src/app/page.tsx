import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-end font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/AnjalaD"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <span className="font-bold text-xl">AnjalaD</span>
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <span className="text-4xl text-center mb-8">World of Canvas</span>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {links.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {item.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

const links = [
  {
    link: "/exp/1",
    title: "First",
    description: "Just getting started.",
  },
  {
    link: "/exp/2",
    title: "Globe I",
    description: "Simple Earth with spheres and textures.",
  },
  {
    link: "/exp/3",
    title: "Globe II",
    description: "Earth with atmosphere using custom shaders.",
  },
  {
    link: "/exp/4",
    title: "Globe III",
    description: "Earth with starts in space.",
  },
  {
    link: "/exp/5",
    title: "Globe IV",
    description: "Pixelated Earth with custom shader.",
  },
  {
    link: "/exp/6",
    title: "Magic Window",
    description: "World inside the window.",
  },
  {
    link: "/exp/7",
    title: "Gravity",
    description: "Push to the moon.",
  },
];
