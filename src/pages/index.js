import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <div
        className={`font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {/* @note: h1 centered */}
          <h1 className="text-5xl font-bold text-center">
            <span className="text-primary">Akio</span> Portfolio
          </h1>
          <p className="text-center">
            <span className="text-primary">Akio</span> is a developer who loves
            building things.
          </p>
        </main>
      </div>
    </>
  );
}
