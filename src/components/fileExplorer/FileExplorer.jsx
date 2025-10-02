import { useId, useState } from "react";
import "./styles.css";
import { clsx } from "../utils";

export default function FileExplorer({ data }) {
  return (
    <div aria-label="File Explorer" role="tree">
      <FileList data={data} level={1} />
    </div>
  );
}

function FileList({ data, level }) {
  const directories = data.filter((item) => Boolean(item.children));
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = data.filter((item) => !Boolean(item.children));
  nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const fileDataSorted = [...directories, ...nonDirectories];

  return (
    <ul className="file-list" role="group">
      {fileDataSorted.map((file) => {
        return <FileListItem file={file} key={file.id} level={level} />;
      })}
    </ul>
  );
}

function FileListItem({ file, level }) {
  const id = useId();
  const { name, children } = file;
  const [expanded, setExpanded] = useState(false);
  const isDirectory = Boolean(children);

  return (
    <li
      role="treeitem"
      aria-expanded={isDirectory ? expanded : undefined}
      aria-level={level}
      aria-labelledby={id}
    >
      <button
        type="button"
        className={clsx([
          "file-list-item-button",
          isDirectory && "file-list-item-button--isDir",
        ])}
        onClick={() => {
          if (!isDirectory) return;
          setExpanded(!expanded);
        }}
      >
        <span> {name} </span>
        {isDirectory && <>[{expanded ? "-" : "+"}]</>}
      </button>
      {expanded && children && children.length && (
        <FileList data={children} level={level + 1} />
      )}
    </li>
  );
}
