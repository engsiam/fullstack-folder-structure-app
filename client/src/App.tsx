import { useEffect, useState } from "react";
import styled from "styled-components";
import { TreeNode } from "./types";
import Tree from "./components/Tree";

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: #fff;
  font-family: monospace;
`;

export default function App() {
  const [tree, setTree] = useState<TreeNode | null>(null);

  const load = async () => {
    const res = await fetch("http://localhost:5500/api/tree");
    const data = await res.json();
    setTree(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h1>📂 Folder Structure Viewer</h1>
      <p>
        Create and delete folders in a MongoDB-backed tree. Root cannot be
        deleted.
      </p>
      <hr />
      {tree ? <Tree node={tree} refresh={load} /> : <p>Loading...</p>}
    </Container>
  );
}
