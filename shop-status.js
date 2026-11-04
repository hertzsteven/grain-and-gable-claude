(function (root) {
  "use strict";

  var DAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var OPEN = 7 * 60;
  var CLOSE = 17 * 60;

  function easternParts(date) {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    var part = {};
    fmt.formatToParts(date).forEach(function (piece) {
      part[piece.type] = piece.value;
    });
    var hour = Number(part.hour);
    var minute = Number(part.minute);
    if (!part.weekday || Number.isNaN(hour) || Number.isNaN(minute)) {
      return null;
    }
    if (hour === 24) hour = 0;
    return { weekday: part.weekday.slice(0, 3), minutes: hour * 60 + minute };
  }

  function shopStatus(date) {
    var when = easternParts(date);
    if (!when) return "";
    var day = DAY[when.weekday];
    if (day === undefined) return "";
    if (day === 0) return "Closed today. Opens Monday at 7am Eastern.";
    if (day === 6) return "Saturday is by appointment.";
    if (when.minutes >= OPEN && when.minutes < CLOSE) {
      return "Open now. Closes at 5pm Eastern.";
    }
    if (when.minutes < OPEN) return "Closed now. Opens today at 7am Eastern.";
    if (day === 5) return "Closed now. Saturday is by appointment.";
    return "Closed now. Opens tomorrow at 7am Eastern.";
  }

  function mount() {
    var el = document.getElementById("shop-status");
    if (!el) return;
    function render() {
      el.textContent = shopStatus(new Date());
    }
    render();
    setInterval(render, 60000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") render();
    });
  }

  if (typeof document !== "undefined") mount();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { shopStatus: shopStatus };
  } else {
    root.shopStatus = shopStatus;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
