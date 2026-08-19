import { useWeather } from "../hooks/useWeather";

import WeatherInfo from "./WeatherInfo";
import Loader from "./Loader";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import moment from "moment";
import "moment/dist/locale/ar";

export default function WeatherComponent() {
  const { t, i18n } = useTranslation();

  const {
    city,
    setCity,
    isLoading,
    getWeatherData,
    siteLang,
    setLang,
    weatherData,
    showError,
    errorMsg,
    closeError,
  } = useWeather();

  const isRTL = siteLang === "ar";

  const [dateAndTime, setDateAndTime] = useState(
    moment().format(isRTL ? "LL" : "MMMM Do YYYY, h:mm a"),
  );

  useEffect(() => {
    const timeLang = () => {
      const savedTimeLang = localStorage.getItem("i18nextLng");
      moment.locale(savedTimeLang);
      setDateAndTime(moment().format(isRTL ? "LL" : "MMMM Do YYYY, h:mm a"));
    };
    timeLang();
  }, [isRTL]);

  function toggleLang() {
    const newLang = isRTL ? "en" : "ar";
    setLang(newLang);
    document.title = isRTL ? "Weather App" : "برنامج الطقس";
    i18n.changeLanguage(newLang);
  }

  function renderContent() {
    if (isLoading) return <Loader />;

    if (weatherData)
      return <WeatherInfo data={weatherData} time={dateAndTime} />;

    return (
      <div className="flex flex-col items-center mt-25">
        <p className="text-lg text-white/60">{t("emptyMessage")}</p>
        <p className="text-sm text-white/40 mt-2">{t("example")}</p>
      </div>
    );
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-[#11233b]/55 w-4/5 h-auto min-h-136 py-3 px-2 m-3 md:p-5 my-auto shadow-md border-2 border-black/5 rounded-2xl z-1"
    >
      <button
        onClick={toggleLang}
        className=" rounded-xl p-2 mt-2 text-sm bg-black/55 text-white font-bold cursor-pointer active:bg-black/70 "
      >
        {siteLang === "ar" ? "العربية" : "English"}
      </button>
      <h1 className="my-5 text-center text-2xl md:text-3xl font-bold text-white text-shadow-md">
        {t("title")}
      </h1>

      {showError && (
        <div
          role="alert"
          aria-live="polite"
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md py-4 px-6 rounded-lg bg-red-500 z-50 animate-[slideDown_0.5s_ease-in-out] will-change-transform"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">⚠️ {errorMsg}</h3>
            <button
              onClick={closeError}
              className="bg-white py-1 px-4 rounded-lg text-gray-400 hover:text-gray-600 transition-colors text-xl cursor-pointer"
              aria-label={t("close")}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* خانة البحث */}

      <section
        dir={isRTL ? "rtl" : "ltr"}
        className="flex items-center justify-center  gap-4 mt-10"
      >
        <div className="relative max-w-md flex-1">
          <input
            type="text"
            className={`w-full bg-white/40 py-2 ${isRTL ? "pl-16 pr-3" : "pr-16 pl-3"} md:py-3 text-sm md:text-lg rounded-xl md:rounded-2xl outline-none focus:bg-white/60 focus:shadow-lg transition-colors duration-200 ease-in-out placeholder:text-gray-700 border-2 border-white/40`}
            placeholder={t("placeholder")}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && getWeatherData(city)}
          />

          <button
            onClick={() => {
              getWeatherData(city);
            }}
            className={`absolute ${isRTL ? "left-0 md:left-1" : "right-0 md:right-1"} top-1/2 -translate-y-1/2 text-white rounded-xl md:rounded-2xl py-2 px-4 md:py-3 bg-black/30 active:bg-black/60  transition-colors duration-200 ease-in-out  cursor-pointer`}
          >
            {t("search")}
          </button>
        </div>
      </section>
      {renderContent()}
    </div>
  );
}
