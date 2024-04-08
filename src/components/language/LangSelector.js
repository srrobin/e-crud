import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "EN" },
  { code: "bd", lang: "BN" },
  { code: "ar", lang: "AR" }
]; 

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const handleLang = (e) => {
    const targetLang = e.target.value;
    setLang(targetLang);
    i18n.changeLanguage(targetLang);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <Form.Select
      size="sm"
      value={lang}
      onChange={handleLang}
      className="custom__select"
    >
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.lang}
        </option>
      ))}
    </Form.Select>
  );
};

export default LangSelector;

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
