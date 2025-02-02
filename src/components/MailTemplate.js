import React from "react";
import { useEffect, useState } from "react";

const MailTemplate = () => {

  const [templates, setTemplates] = useState([]);

  useState(() => {
    fetch("/api/mailers").then((res) => res.json()).then((data) => setTemplates(data)).catch((err) => console.error(err))
  }, []);
  return <div className=" h-full w-full"><h1>Mail Template</h1></div>;
};

export default MailTemplate;
