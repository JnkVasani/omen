import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, code, setCode }) {
  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={(v) => setCode(v)}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}