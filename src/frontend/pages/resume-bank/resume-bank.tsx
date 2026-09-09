"use client";

interface ResumeBankProps {
  existingValue: string;
}

export function ResumeBank({ existingValue }: ResumeBankProps) {
  return (
    <div className="h-screen flex flex-col pt-[54px]">
      <div className="h-full grid grid-cols-[4fr_1fr] items-center gap-4 bg-[#03060a] z-10">
        <div className="h-full flex items-center justify-center p-5">
          <textarea
            className="w-full h-full z-10 rounded-lg p-4"
            defaultValue={existingValue}
            style={{ background: "rgb(20, 23, 44)" }}
          />
        </div>
      </div>
    </div>
  );
}
