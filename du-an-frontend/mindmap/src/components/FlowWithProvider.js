"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  MiniMap,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "@/assets/css/reactflow.css";
import MindMapAction from "./MindMapAction";
import TextUpdaterNode from "./TextUpdaterNode";
import ShareModal from "./ShareModal";

const initialNodes = [
  {
    id: "0",
    type: "textUpdater",
    data: { label: "Text" },
    position: { x: 0, y: 50 },
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const AddNodeOnEdgeDrop = ({ dataMindMap, isOwner }) => {
  const data = JSON.parse(dataMindMap?.data);
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes] = useNodesState(data?.nodes || initialNodes);
  const [edges, setEdges] = useEdgesState(data?.edges || []);
  const { screenToFlowPosition } = useReactFlow();

  const [modalOn, setModalOn] = useState(false);

  let id = nodes.length;
  const getId = () => `${id++}`;
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          type: "textUpdater",
          data: { label: `Text ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes]
  );

  return (
    <>
      <MindMapAction
        setModalOn={setModalOn}
        nodes={nodes}
        edges={edges}
        dataMindMap={dataMindMap}
        isOwner={isOwner}
      />
      <div
        className="wrapper"
        style={{ width: "100%", height: "500px" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={[0.5, 0]}
        />
        <Controls />
        <MiniMap />
        <Background
          variant="dots"
          gap={15}
          style={{ width: "50%", height: "500px" }}
        />
      </div>
      {modalOn && (
        <ShareModal
          setModalOn={setModalOn}
          nodes={nodes}
          edges={edges}
          dataMindMap={dataMindMap}
        />
      )}
    </>
  );
};

const FlowWithProvider = (props) => {
  return (
    <div className="py-5 mx-auto">
      <ReactFlowProvider>
        <AddNodeOnEdgeDrop {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWithProvider;
