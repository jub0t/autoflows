"use client"

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Panel, NodeChange, EdgeChange, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Node, SchemaField } from "../../src/core/builder"
import { AutoflowsBuilder } from "../../src/core/client/builder"
import { randomBytes } from 'crypto';
import BasicNode from "./ui/nodes/BasicNode"
import { STRING } from '../../src/core/datatypes';

const initialEdges: any[] | (() => any[]) = [];
const initialNodes: any[] | (() => any[]) = [];

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<any>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string; }>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );


  const Cronjob = new Node(
    {
      options: { name: "Cronjob", label: "Cron Job", description: "Execute precisely timed actions." },
      schema: {
        output: [
          { key: "subject", type: STRING, },
        ],
      }
    },
  );

  const Mailer = new Node(
    {
      options: { name: "Mail", label: "Mail", description: "Send an E-mail." },
      schema: {
        output: [],
        input: [],
      }
    },
  );

  // Client-side (React) builder.
  const builder = new AutoflowsBuilder()
    .add(Cronjob)
    .add(Mailer)

  return (
    <div style={{ backgroundColor: "#fffefeff", width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{
          BasicNode: BasicNode,
        }}
        fitView
      >
        <Background patternClassName='dots'></Background>
        <Panel position="top-center" className="p-2 border border-gray-200 bg-white max-w-[400px] w-full rounded-2xl flex flex-wrap gap-1">
          <div className="cursor-pointer text-slate-950 hover:bg-black hover:text-white p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
          </div>
          <div className="cursor-pointer text-slate-950 hover:bg-black hover:text-white p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
          </div>
        </Panel>

        <Panel position="top-left" className="h-full max-w-[300px] max-h-[700px] w-full flex flex-wrap">
          <div className="p-3 border border-gray-200 bg-white w-full space-y-3 text-slate-800 rounded-2xl">
            <section>
              <input type="text" className='text-sm w-full rounded-xl p-3 bg-slate-50 border border-gray-200' placeholder='Search node...' />
            </section>
            <section className='space-y-2'>
              {builder.nodes.map((node, index) => (
                <div
                  onClick={() => {
                    setNodes(prev => {
                      return [
                        ...prev,
                        { type: "BasicNode", id: randomBytes(8).toString("hex"), position: { x: 0, y: 0 }, data: { label: node.options.label || node.options.name } },
                      ]
                    })
                  }}
                  key={index}
                  className="group hover:bg-black hover:text-white flex items-center gap-3 w-full p-4 border border-gray-200 cursor-pointer rounded-xl bg-white"
                >
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-sm">{node.options.label || node.options.name}</h2>
                    <p className="text-xs text-gray-600 group-hover:text-gray-200">
                      {node.options.description}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
