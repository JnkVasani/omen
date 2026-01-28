export default function Console({ output }) {
  return (
    <div className="console">
      <h3>Console</h3>
      <pre>{output}</pre>
    </div>
  );
}