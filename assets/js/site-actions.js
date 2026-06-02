document.addEventListener("DOMContentLoaded", () => {
  const printReportBtn = document.querySelector("[data-print-report]");

  printReportBtn?.addEventListener("click", () => {
    window.print();
  });
});
