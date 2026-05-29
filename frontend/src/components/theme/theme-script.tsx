export function ThemeScript() {
  const code = `
    try {
      const theme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (theme === "dark" || (!theme && prefersDark)) {
        document.documentElement.classList.add("dark");
      }
    } catch {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
