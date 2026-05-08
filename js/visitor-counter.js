// Visitor Counter - Increment on page load
(function initVisitorCounter() {
  // Configuration
  const SUPABASE_FUNCTION_URL =
    "https://vlszsqyuctpjqzxngzso.supabase.co/functions/v1/increment-visitor";

  // Fire-and-forget POST request to increment counter
  function incrementCounter() {
    try {
      fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).catch((err) => {
        // Silently fail - don't break the site if counter service is down
        console.debug("Visitor counter unavailable:", err);
      });
    } catch (err) {
      // Extra safety: catch any errors to prevent site breakage
      console.debug("Visitor counter error:", err);
    }
  }

  // Call increment on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", incrementCounter);
  } else {
    incrementCounter();
  }
})();
