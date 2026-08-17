
import { useWeather } from "../hooks/useWeather";
import { useTranslation } from "react-i18next";

export default function WeatherInfo({ data, time }) {
  const { t } = useTranslation();
  const { siteLang } = useWeather();
  const { name, sys, main, weather, wind } = data;

  const isRTL = siteLang === "ar";

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(siteLang === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-col md:flex-col lg:flex-row items-center justify-between p-5 gap-8"
    >
      <div className="mt-5 flex flex-col items-center text-center min-w-50">
        <p className="text-lg font-bold text-[#dfdfdf] text-shadow-md">
          {time}
        </p>
        <img
          loading="lazy"
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt={t(weather[0].description)}
          width="150px"
          height="150px"
          className="w-25 h-25 md:w-35 md:h-35 drop-shadow-md"
        />
        <p className="text-lg  md:text-2xl font-bold text-[#dfdfdf] text-shadow-md">
          {t(weather[0].description)}
        </p>
        <h2 className="text-lg  md:text-2xl font-bold text-[#dfdfdf] text-shadow-md mt-5">
          {t(name)} / {t(sys.country)}
        </h2>
        <p className="text-2xl md:text-3xl font-bold text-white mt-2">
          {main.temp}°C
        </p>
        <p className="text-[#dfdfdf] text-sm mt-1">
          {t("feelsLike")} {Math.round(main.feels_like)}°C
        </p>
      </div>
      {/* Card Container */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 w-full md:w-auto">
        {/* Card */}

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">💨</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("wind")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {wind.speed}
            {t("unitWind")}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">💧</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("humidity")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {main.humidity}%
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">📊</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("pressure")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {main.pressure} {t("unitPressure")}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">👁️</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("visibility")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {data.visibility / 1000} {t("unitKm")}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">🌅</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("sunrise")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {formatTime(sys.sunrise)}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">🌇</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("sunset")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {formatTime(sys.sunset)}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">🔥</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("max")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {main.temp_max}°C
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 border border-white/10 hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center select-none">
          <span className="text-lg md:text-xl mb-1">❄️</span>
          <h3 className="text-[#dfdfdf] text-sm font-medium mb-1">
            {t("min")}
          </h3>
          <p className="text-white text-sm md:text-lg font-bold">
            {main.temp_min}°C
          </p>
        </div>
      </div>
    </section>
  );
}
