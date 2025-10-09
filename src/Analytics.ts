declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const initGA = () => {
    if (typeof window === "undefined") return;

    // Carrega o script do GA
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-PL0XL85PHG";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-PL0XL85PHG");
  };
  