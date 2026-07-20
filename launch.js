"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const translations = window.Q8JAN_TRANSLATIONS || {};
  const languageSelect = document.getElementById("languageSelect");
  const notification = document.getElementById("notification");
  const contractAddressElement = document.getElementById("contractAddress");
  const copyContractButton = document.getElementById("copyContract");
  const sharePageButton = document.getElementById("sharePage");
  const currentYearElement = document.getElementById("currentYear");

  const defaultLanguage = "en";
  const launchUrl = "https://jarrahnour.github.io/Q8JAN/launch.html";
  let notificationTimer = null;

  function t(language, key) {
    return translations[language]?.[key] ?? translations.en?.[key] ?? key;
  }

  function showNotification(message) {
    if (!notification) return;
    notification.textContent = message;
    notification.classList.add("show");
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => notification.classList.remove("show"), 2400);
  }

  function setLanguage(language) {
    const selected = translations[language] ? language : defaultLanguage;
    const dictionary = translations[selected];

    document.documentElement.lang = selected;
    document.documentElement.dir = dictionary.direction || "ltr";
    document.title = dictionary.pageTitle || "Q8JAN | Official Launch";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] || translations.en?.[key]) {
        element.textContent = t(selected, key);
      }
    });

    if (languageSelect) languageSelect.value = selected;

    try {
      localStorage.setItem("q8janLaunchLanguage", selected);
    } catch (_) {}
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem("q8janLaunchLanguage");
      if (saved && translations[saved]) return saved;
    } catch (_) {}

    const browser = navigator.language.toLowerCase().split("-")[0];
    return translations[browser] ? browser : defaultLanguage;
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    } catch (_) {
      return false;
    }
  }

  languageSelect?.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  copyContractButton?.addEventListener("click", async () => {
    const address = contractAddressElement?.textContent.trim();
    if (!address) return;

    const language = document.documentElement.lang || defaultLanguage;
    const copied = await copyText(address);

    if (copied) {
      showNotification(t(language, "copySuccess"));
    } else {
      window.prompt(t(language, "copyPrompt"), address);
    }
  });

  document.querySelectorAll(".sunswap-link").forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      window.open(link.href, "_blank", "noopener,noreferrer");

      const address = contractAddressElement?.textContent.trim();
      if (!address) return;

      const language = document.documentElement.lang || defaultLanguage;
      const copied = await copyText(address);

      if (copied) {
        showNotification(t(language, "sunSwapContractCopied"));
      } else {
        window.prompt(t(language, "copyPrompt"), address);
      }
    });
  });
  sharePageButton?.addEventListener("click", async () => {
    const language = document.documentElement.lang || defaultLanguage;
    const data = {
      title: t(language, "pageTitle"),
      text: t(language, "shareText"),
      url: launchUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (await copyText(launchUrl)) {
        showNotification(t(language, "shareSuccess"));
      } else {
        window.prompt(t(language, "sharePrompt"), launchUrl);
      }
    } catch (error) {
      if (error?.name !== "AbortError") console.error(error);
    }
  });

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  setLanguage(getInitialLanguage());
    const geckoTerminalApi =
    "https://api.geckoterminal.com/api/v2/networks/tron/pools/TZEwy5tJKH4ybox3Y4uUCPVKDmMG5DSCcx";

  const priceElement = document.getElementById("gt-price");
const liquidityElement = document.getElementById("gt-liquidity");
const volumeElement = document.getElementById("gt-volume");
const marketCapElement = document.getElementById("gt-market-cap");

  const formatUsd = (value, maximumFractionDigits = 2) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "--";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits
    }).format(number);
  };

  const loadGeckoTerminalData = async () => {
    try {
      const response = await fetch(geckoTerminalApi, {
        headers: {
          Accept: "application/json;version=20230203"
        }
      });

      if (!response.ok) {
        throw new Error(`GeckoTerminal API error: ${response.status}`);
      }

      const result = await response.json();
      const attributes = result?.data?.attributes;

      if (!attributes) {
        throw new Error("GeckoTerminal pool data is unavailable.");
      }

      if (priceElement) {
        priceElement.textContent = formatUsd(
          attributes.base_token_price_usd,
          10
        );
      }

      if (liquidityElement) {
        liquidityElement.textContent = formatUsd(
          attributes.reserve_in_usd,
          2
        );
      }

      if (volumeElement) {
        volumeElement.textContent = formatUsd(
          attributes.volume_usd?.h24,
          2
        );
      }
      if (marketCapElement) {
  marketCapElement.textContent = formatUsd(
    attributes.fdv_usd,
    2
  );
}
    } catch (error) {
      console.error("Unable to load GeckoTerminal data:", error);

      if (priceElement) priceElement.textContent = "--";
      if (liquidityElement) liquidityElement.textContent = "--";
      if (volumeElement) volumeElement.textContent = "--";
      if (marketCapElement) marketCapElement.textContent = "--";
    }
  };

  loadGeckoTerminalData();

  setInterval(loadGeckoTerminalData, 60000);
});
