export default function FileTree({ files, activeId, setActiveId, renameFile }) {
  return (
    <div className="filetree">
      <h4>Files</h4>
      {files.map(file => (
        <div
          key={file.id}
          className={`file ${file.id === activeId ? "active" : ""}`}
          onClick={() => setActiveId(file.id)}
          onDoubleClick={() => {
            const name = prompt("Rename file", file.name);
            if (name) renameFile(file.id, name);
          }}
        >
          📄 {file.name}
        </div>
      ))}
    </div>
  );
}