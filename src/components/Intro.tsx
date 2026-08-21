export function Intro() {
  return (
    <div className="text-center flex flex-col gap-1.5 text-sm text-slate-600 max-w-[850px] w-full px-2">
      <p className="font-medium text-slate-800">
        Language Models do better when they are focused on relevant context.
      </p>
      <p className="text-xs sm:text-sm text-slate-500">
        One key strategy is passing a targeted subset (chunk) of your full data. This tool lets you explore and compare chunking algorithms in real time.
      </p>
    </div>
  );
}

