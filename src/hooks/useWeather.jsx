import { useState, useRef, useEffect } from "react";
import weatherApi from "../../api/axios";

import { useTranslation } from "react-i18next";

const cityMap = {
  // ==================== سوريا ====================
  اللاذقية: "Latakia",
  دمشق: "Damascus",
  الشام: "Damascus",
  حلب: "Aleppo",
  حمص: "Homs",
  طرطوس: "Tartus",
  حماه: "Hama",
  "دير الزور": "Deir ez-Zur",
  الحسكة: "Al Hasakah",
  الرقة: "Ar Raqqah",
  إدلب: "Idlib",
  القنيطرة: "Quneitra",
  درعا: "Daraa",
  السويداء: "As Suwayda",
  "ريف دمشق": "Rif Dimashq",

  // ==================== الجزائر ====================
  الجزائر: "Algiers",
  "الجزائر العاصمة": "Algiers",
  وهران: "Oran",
  قسنطينة: "Constantine",
  عنابة: "Annaba",
  الجلفة: "Djelfa",
  باتنة: "Batna",
  سطيف: "Setif",
  تلمسان: "Tlemcen",
  بجاية: "Bejaia",
  بسكرة: "Biskra",
  تيارت: "Tiaret",
  ورقلة: "Ouargla",
  الشلف: "Chlef",
  سكيكدة: "Skikda",
  بومرداس: "Boumerdes",

  // ==================== مصر ====================
  القاهرة: "Cairo",
  الاسكندرية: "Alexandria",
  الإسكندرية: "Alexandria",
  الجيزة: "Giza",
  المنصورة: "Mansoura",
  الزقازيق: "Zagazig",
  طنطا: "Tanta",
  أسيوط: "Asyut",
  الأقصر: "Luxor",
  أسوان: "Aswan",
  بورسعيد: "Port Said",
  السويس: "Suez",
  المنيا: "Minya",
  بنها: "Benha",

  // ==================== السعودية ====================
  الرياض: "Riyadh",
  جدة: "Jeddah",
  مكة: "Mecca",
  المدينة: "Medina",
  الدمام: "Dammam",
  الخبر: "Khobar",
  الظهران: "Dhahran",
  تبوك: "Tabuk",
  بريدة: "Buraidah",
  حائل: "Hail",
  نجران: "Najran",
  أبها: "Abha",

  // ==================== الإمارات ====================
  دبي: "Dubai",
  أبوظبي: "Abu Dhabi",
  الشارقة: "Sharjah",
  عجمان: "Ajman",
  "رأس الخيمة": "Ras al Khaimah",
  الفجيرة: "Fujairah",
  "أم القيوين": "Umm al Quwain",

  // ==================== الأردن ====================
  عمان: "Amman",
  الزرقاء: "Zarqa",
  إربد: "Irbid",
  الرصيفة: "Russeifa",
  السلط: "Al Salt",
  مادبا: "Madaba",
  العقبة: "Aqaba",
  معان: "Maan",

  // ==================== لبنان ====================
  بيروت: "Beirut",
  طرابلس: "Tripoli",
  صيدا: "Sidon",
  زحلة: "Zahle",
  جونيه: "Jounieh",

  // ==================== فلسطين ====================
  القدس: "Jerusalem",
  غزة: "Gaza",
  "رام الله": "Ramallah",
  نابلس: "Nablus",
  الخليل: "Hebron",
  "بيت لحم": "Bethlehem",
  جنين: "Jenin",
  طولكرم: "Tulkarm",

  // ==================== العراق ====================
  بغداد: "Baghdad",
  البصرة: "Basra",
  الموصل: "Mosul",
  أربيل: "Erbil",
  السليمانية: "Sulaymaniyah",
  كركوك: "Kirkuk",
  النجف: "Najaf",
  كربلاء: "Karbala",
  الحلة: "Hillah",
  ديالى: "Diyala",

  // ==================== الكويت ====================
  الكويت: "Kuwait City",
  الجهراء: "Jahra",
  حولي: "Hawally",
  الفروانية: "Farwaniya",
  "مبارك الكبير": "Mubarak Al-Kabeer",

  // ==================== قطر ====================
  الدوحة: "Doha",
  الريان: "Al Rayyan",
  الوكرة: "Al Wakrah",
  الخور: "Al Khor",

  // ==================== البحرين ====================
  المنامة: "Manama",
  المحرق: "Muharraq",
  الرفاع: "Riffa",

  // ==================== عمان ====================
  مسقط: "Muscat",
  صلالة: "Salalah",
  صور: "Sur",
  نزوى: "Nizwa",

  // ==================== اليمن ====================
  صنعاء: "Sanaa",
  عدن: "Aden",
  تعز: "Taiz",
  الحديدة: "Hodeidah",
  المكلا: "Mukalla",
  إب: "Ibb",

  // ==================== ليبيا ====================
  بنغازي: "Benghazi",
  مصراتة: "Misrata",
  البيضاء: "Bayda",
  سبها: "Sabha",
  زليتن: "Zliten",

  // ==================== تونس ====================
  تونس: "Tunis",
  صفاقس: "Sfax",
  سوسة: "Sousse",
  القيروان: "Kairouan",
  بنزرت: "Bizerte",
  قابس: "Gabes",
  نابل: "Nabeul",

  // ==================== المغرب ====================
  "الدار البيضاء": "Casablanca",
  الرباط: "Rabat",
  فاس: "Fes",
  مراكش: "Marrakech",
  طنجة: "Tangier",
  أكادير: "Agadir",
  مكناس: "Meknes",
  وجدة: "Oujda",
  تطوان: "Tetouan",

  // ==================== موريتانيا ====================
  نواكشوط: "Nouakchott",
  نواذيبو: "Nouadhibou",

  // ==================== السودان ====================
  الخرطوم: "Khartoum",
  "أم درمان": "Omdurman",
  بورتسودان: "Port Sudan",
  كسلا: "Kassala",
  الأبيض: "El Obeid",

  // ==================== الصومال ====================
  مقديشو: "Mogadishu",
  هرجيسا: "Hargeisa",

  // ==================== جيبوتي ====================
  جيبوتي: "Djibouti",

  // ==================== جزر القمر ====================
  موروني: "Moroni",
};

export function useWeather() {
  const { t, i18n } = useTranslation();

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [siteLang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("language");
    return savedLang || "ar";
  });

  useEffect(() => {
    siteLang === "ar"
      ? (document.title = "برنامج الطقس")
      : (document.title = "Weather App");
  }, [siteLang]);

  useEffect(() => {
    localStorage.setItem("language", siteLang);
    i18n.changeLanguage(siteLang);
  }, [siteLang, i18n]);

  const timerRef = useRef(null);
  const abortRefController = useRef(null);
  const currentCity = useRef("");

  const showErrorWithTimeOut = (msg) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setErrorMsg(msg);
    setShowError(true);

    timerRef.current = setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const getWeatherData = async (searchCity) => {
    if (!searchCity?.trim()) {
      showErrorWithTimeOut(t("enterCityName"));
      return;
    }

    currentCity.current = searchCity;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (abortRefController.current) {
      abortRefController.current.abort();
    }

    const controller = new AbortController();
    abortRefController.current = controller;

    setIsLoading(true);
    setErrorMsg("");
    setShowError(false);
    setWeatherData(null);

    try {
      const response = await weatherApi.get("/weather", {
        params: {
          q: cityMap[searchCity] || searchCity,
          lang: siteLang,
        },
        signal: controller.signal,
      });
      setWeatherData(response.data);
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        console.log(t("canceledRequest"));
        return;
      }

      if (error.response?.status === 404) {
        showErrorWithTimeOut(t("cityNotFound"));
      } else if (error.response?.status === 401) {
        showErrorWithTimeOut(t("apiError"));
      } else {
        showErrorWithTimeOut(t("generalError"));
      }
    } finally {
      if (abortRefController.current === controller) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentCity.current) {
      const refreshData = async () => {
        setIsLoading(true);
        try {
          const response = await weatherApi.get("/weather", {
            params: {
              q: cityMap[currentCity.current] || currentCity.current,
              lang: siteLang,
            },
          });
          setWeatherData(response.data);
        } catch (error) {
          console.error("Error refreshing weather data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      refreshData();
    }
  }, [siteLang]);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const getDefault = async () => {
      setIsLoading(true);
      currentCity.current = "syria";
      try {
        const response = await weatherApi.get("/weather", {
          params: {
            q: "syria",
            lang: siteLang,
          },
        });

        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDefault();

    return () => {
      if (abortRefController.current) {
        abortRefController.current.abort();
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [siteLang]);

  const closeError = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setShowError(false);
  };

  return {
    city,
    setCity,
    siteLang,
    setLang,
    weatherData,
    isLoading,
    errorMsg,
    showError,
    getWeatherData,
    closeError,
  };
}
