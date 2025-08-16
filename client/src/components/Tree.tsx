import { useState } from "react";
import styled from "styled-components";
import { TreeNode } from "../types";

const NodeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  gap: 8px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Right = styled.div`
  font-size: 14px;
  color: #2563eb;
  cursor: pointer;
  user-select: none;
`;

const Child = styled.div`
  margin-left: 20px;
  border-left: 2px dashed #e5e7eb;
  padding-left: 12px;
`;

export default function Tree({
  node,
  refresh,
}: {
  node: TreeNode;
  refresh: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const onAdd = async () => {
    const name = prompt("Folder name?");
    if (!name) return;
    await fetch("http://localhost:5500/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parentId: node._id }),
    });
    refresh();
  };

  const onDelete = async () => {
    if (node.isRoot) {
      alert("Root cannot be deleted");
      return;
    }
    const ok = confirm(`Delete "${node.name}" and all its children?`);
    if (!ok) return;
    await fetch(`http://localhost:5500/api/folders/${node._id}`, {
      method: "DELETE",
    });
    refresh();
  };

  return (
    <div>
      <NodeRow>
        <Left>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
          >
            {node.children.length > 0 ? (expanded ? "▽" : "▶") : "•"}
          </span>
          <span
            style={{
              fontWeight: node.isRoot ? "bold" : "normal",
              fontSize: "15px",
            }}
          >
            📁 {node.name}
          </span>
          {!node.isRoot && (
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={onDelete}
            >
              ⓧ
            </span>
          )}
        </Left>
        <Right onClick={onAdd}>+ New</Right>
      </NodeRow>

      {expanded && (
        <Child>
          {node.children.length > 0 ? (
            node.children.map((c) => (
              <Tree key={c._id} node={c} refresh={refresh} />
            ))
          ) : (
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              - No folders
            </div>
          )}
        </Child>
      )}
    </div>
  );
}
