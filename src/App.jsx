import { useEffect, useState } from "react";

import TopBar from "./components/TopBar.jsx";
import Tabs from "./components/Tabs.jsx";
import FileTree from "./components/FileTree.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import Console from "./components/Console.jsx";
import Preview from "./components/Preview.jsx";

import { detectLanguage } from "./utils/detectLanguage.js";

const defaultFiles = [
  {
    id: 1,
    name: "main.js",
    code: "// Welcome to omen 🔮\nconsole.log('Hello omen');",
  },
];

export default function App() {
  /* ───────── State ───────── */
  const [files, setFiles] = useState(
    JSON.parse(localStorage.getItem("omen-files")) || defaultFiles
  );
  const [activeId, setActiveId] = useState(files[0].id);
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("omen-theme") || "dark"
  );

  /* ───────── Persist data ───────── */
  useEffect(() => {
    localStorage.setItem("omen-files", JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem("omen-theme", theme);
  }, [theme]);

  /* ───────── Helpers ───────── */
  const activeFile = files.find((f) => f.id === activeId);
  const language = detectLanguage(activeFile.name);

  const updateCode = (code) => {
    setFiles(
      files.map((f) =>
        f.id === activeId ? { ...f, code } : f
      )
    );
  };

  const renameFile = (id, name) => {
    setFiles(
      files.map((f) =>
        f.id === id ? { ...f, name } : f
      )
    );
  };

  const addFile = () => {
    const type = prompt("Enter file type: html, css, js", "html");
    if (!type) return;

    let ext = "";
    if (type === "html") ext = ".html";
    else if (type === "css") ext = ".css";
    else if (type === "js") ext = ".js";
    else return alert("Invalid file type");

    const name = prompt("Enter file name (without extension)", "index");
    if (!name) return;

    const id = Date.now();
    setFiles([
      ...files,
      {
        id,
        name: name + ext,
        code:
          type === "html"
            ? "<!DOCTYPE html>\n<html>\n<head>\n  <title>omen</title>\n</head>\n<body>\n\n</body>\n</html>"
            : "",
      },
    ]);
    setActiveId(id);
  };

  const closeFile = (id) => {
    const rest = files.filter((f) => f.id !== id);
    setFiles(rest);
    if (id === activeId && rest.length) {
      setActiveId(rest[0].id);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "darker" : "dark");
  };

  const runCode = () => {
    if (language === "javascript") {
      try {
        let logs = [];
        const original = console.log;
        console.log = (...args) => logs.push(args.join(" "));
        eval(activeFile.code);
        console.log = original;
        setOutput(logs.join("\n") || "No output");
      } catch (e) {
        setOutput(e.message);
      }
    }
  };

  /* ───────── UI ───────── */
  return (
    <div className={`app ${theme}`}>
      <TopBar
        runCode={runCode}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <Tabs
        files={files}
        activeId={activeId}
        setActiveId={setActiveId}
        closeFile={closeFile}
        addFile={addFile}
      />

      <div className="workspace">
        <FileTree
          files={files}
          activeId={activeId}
          setActiveId={setActiveId}
          renameFile={renameFile}
        />

        <div className="main">
          <CodeEditor
            language={language}
            code={activeFile.code}
            setCode={updateCode}
          />

          {language === "html" ? (
            <Preview code={activeFile.code} />
          ) : (
            <Console output={output} />
          )}
        </div>
      </div>
    </div>
  );
}