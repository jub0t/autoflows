"use client"

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Autoflows, { NodeBuilder } from "../../src/core/builder"
import { BOOLEAN, STRING } from '../../src/core/datatypes';
import { NodeField } from '../../src/core/field';

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  // Client-side node building...
  const node = new NodeBuilder(
    "condition",
    [
      { key: "id", type: STRING, required: false },
      { key: "success", type: BOOLEAN, required: false }
    ] as const
  );

  // Server-side Virtual Machine...
  const autoflows = new Autoflows()
    .add(node)
    .define("condition", {
      onExecute: () => { }
    });

  return (
    <div style={{ backgroundColor: "#e1e1e1", width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-center" className="p-2 bg-white max-w-[400px] w-full rounded-md flex flex-wrap gap-1">
          <div className="cursor-pointer text-slate-700 hover:bg-gray-100 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
          </div>
          <div className="cursor-pointer text-slate-700 hover:bg-gray-100 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
          </div>
        </Panel>

        <Panel position="top-left" className="p-4 h-full max-w-[300px] max-h-[700px] w-full rounded-md flex flex-wrap">
          <div className="p-3 bg-white w-full text-slate-800 rounded-md">
            {autoflows.nodes.map((node, index) => (
              <div
                key={index}
                className="flex items-center gap-3 w-full p-3 border border-gray-200 cursor-pointer rounded-md bg-white"
              >
                {/* Icon */}
                <div className="flex items-center justify-center min-w-10 h-10 bg-blue-500 rounded-md text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-banana"
                  >
                    <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" />
                    <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-sm">{"Node Name"}</h2>
                  <p className="text-xs text-gray-600">
                    {"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
