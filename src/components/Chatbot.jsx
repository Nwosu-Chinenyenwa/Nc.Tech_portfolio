import { useEffect, useState } from "react";
import logo from "../assets/images/favicon-BOjLDTG7.webp"; 
import "./Chatbot.scss"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = function (...args) {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const loadScript = () => {
      if (document.getElementById("chatbase-widget")) return;

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "chatbase-widget";
      script.async = true;
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadScript();
    } else {
      window.addEventListener("load", loadScript);
      return () => window.removeEventListener("load", loadScript);
    }
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
   <button
  onClick={toggleChat}
  style={{
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    borderRadius: "200px",
    height: "60px",
    width: "60px",       
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <img
    src={logo}
    alt="logo"
    style={{
      width: "100%",        
      height: "100%",
      objectFit: "cover",    
      borderRadius: "200px",
    }}
  />
</button>

      {isOpen && (
        <iframe
          src={`https://www.chatbase.co/chatbot-iframe/LYNir2y9m-CFJOOwsSNSa`}
          title="Chatbase Chatbot"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "500px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
}
