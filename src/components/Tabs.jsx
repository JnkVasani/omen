export default function Tabs({ files, activeId, setActiveId, closeFile, addFile }) {
  return (
    <div className="tabs">
      {files.map(file => (
        <div
          key={file.id}
          className={`tab ${file.id === activeId ? "active" : ""}`}
        >
          <span onClick={() => setActiveId(file.id)}>{file.name}</span>
          <button onClick={() => closeFile(file.id)}>✕</button>
        </div>
      ))}
      <button className="add-tab" onClick={addFile}>+</button>
    </div>
  );
}