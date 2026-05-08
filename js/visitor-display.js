// Live Visitor Counter Display
(function initVisitorDisplay() {
  const SUPABASE_URL = "https://vlszsqyuctpjqzxngzso.supabase.co";
  const SUPABASE_KEY = "sb_publishable_zIyRmlgDRuzkIexoVZp-lw_HswicWwI";
  const UPDATE_INTERVAL = 30000; // 30 seconds

  function updateVisitorCount() {
    fetch(
      `${SUPABASE_URL}/rest/v1/visits?select=total_count&apikey=${SUPABASE_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          const count = data[0].total_count;
          const element = document.getElementById("visitor-count-number");
          if (element) {
            element.textContent = count.toLocaleString();
          }
        }
      })
      .catch((err) => console.debug("Visitor count unavailable:", err));
  }

  // Update on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateVisitorCount);
  } else {
    updateVisitorCount();
  }

  // Update every 30 seconds
  setInterval(updateVisitorCount, UPDATE_INTERVAL);
})();
