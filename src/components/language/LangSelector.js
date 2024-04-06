import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "EN" },
  { code: "bd", lang: "BN" },
  { code: "ar", lang: "AR" }
]; 

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const handleToggleLanguage = () => {
    const nextIndex = (currentLanguageIndex + 1) % languages.length;
    setCurrentLanguageIndex(nextIndex);
    i18n.changeLanguage(languages[nextIndex].code);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
    console.log("i18n.dir()-------", i18n.dir());
  }, [i18n, i18n.language]);

  return (
    <Button 
      variant="outline-light" 
      size="sm" 
      className="lang__btn"
      onClick={handleToggleLanguage}
    >
      {languages[currentLanguageIndex].lang}
    </Button>
  );
};

export default LangSelector;

// import React, { useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { useTranslation } from "react-i18next";

// const language = [
//   { code: "en", lang: "EN" },
//   { code: "bd", lang: "BN" },
//   { code: "ar", lang: "AR" }
// ]; 

// const LangSelector = () => {
//   const { i18n } = useTranslation();

//   const handleLang = (lang) => {
//     i18n.changeLanguage(lang);
//   };
    
//   useEffect(() => {
//     document.body.dir = i18n.dir();
//     console.log("i18n.dir()-------", i18n.dir());
//   }, [i18n, i18n.language]);

//   return (
//     <>
//       {language.map((lng) => {
//         return (
//           <Button 
//             variant="outline-light" 
//             active={lng.code === i18n.language}
//             size="sm" 
//             className="lang__btn"
//             key={lng.code}
//             onClick={() => handleLang(lng.code)}
//           >
//             {lng.lang}
//           </Button>
//         );
//       })}         
//     </>
//   );
// };

// export default LangSelector;
