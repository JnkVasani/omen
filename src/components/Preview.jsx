export default function Preview({ code }) {
  return (
    <iframe
      className="preview"
      title="preview"
      srcDoc={code}
      sandbox="allow-scripts"
    />
  );
}