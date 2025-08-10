

export default function ThemeToggle() {


  return (
    <label className="sticky bottom-0 inline-block w-[60px] h-[34px]">
      <div className="absolute cursor-pointer inset-0 bg-blue-500 transition-all duration-400 overflow-hidden rounded-full peer-checked:bg-black">
        {/* Sun/Moon */}
        <div
          className="absolute left-1 bottom-1 w-[26px] h-[26px] bg-yellow-400 rounded-full transition-all duration-400 peer-checked:translate-x-[26px] peer-checked:bg-white"
        >
          {/* Moon dots */}
          <svg
            className="absolute left-[10px] top-[3px] w-[6px] h-[6px] fill-gray-500 opacity-0 peer-checked:opacity-100"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute left-[2px] top-[10px] w-[10px] h-[10px] fill-gray-500 opacity-0 peer-checked:opacity-100"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="absolute left-[16px] top-[18px] w-[3px] h-[3px] fill-gray-500 opacity-0 peer-checked:opacity-100"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        {/* Stars */}
        <div className="transform -translate-y-8 opacity-0 transition-all duration-400 peer-checked:translate-y-0 peer-checked:opacity-100">
          <svg className="absolute w-[20px] top-[2px] left-[3px] fill-white animate-star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="absolute w-[6px] top-[16px] left-[3px] fill-white animate-star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="absolute w-[12px] top-[20px] left-[10px] fill-white animate-star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className="absolute w-[18px] top-0 left-[18px] fill-white animate-star" viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
        </div>
      </div>
    </label>
  );
}
