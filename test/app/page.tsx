"use client"

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Panel, NodeChange, EdgeChange, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Node, NodeTraits } from "../../src/core/builder"
import { AutoflowsBuilder } from "../../src/core/client/builder"
import { randomBytes } from 'crypto';
import BasicNode from "./ui/nodes/BasicNode"
import { BOOLEAN, NUMBER, OBJECT, STRING } from '../../src/core/datatypes';

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

  const [selectedNode, selectNode] = useState<string | null>(null)

  const Start = new Node(
    {
      options: {
        icon: (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 4.98951C5 4.01835 5 3.53277 5.20249 3.2651C5.37889 3.03191 5.64852 2.88761 5.9404 2.87018C6.27544 2.85017 6.67946 3.11953 7.48752 3.65823L18.0031 10.6686C18.6708 11.1137 19.0046 11.3363 19.1209 11.6168C19.2227 11.8621 19.2227 12.1377 19.1209 12.383C19.0046 12.6635 18.6708 12.886 18.0031 13.3312L7.48752 20.3415C6.67946 20.8802 6.27544 21.1496 5.9404 21.1296C5.64852 21.1122 5.37889 20.9679 5.20249 20.7347C5 20.467 5 19.9814 5 19.0103V4.98951Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        traits: [NodeTraits.IS_ROOT], category: "Misc", name: "Start", label: "Start", description: "The event that starts it all."
      },
      schema: {
        output: [],
        input: [],
      }
    },
  );

  const Exit = new Node(
    {
      options: {
        icon: (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M4.93 4.93L19.07 19.07M2 8.52274V15.4773C2 15.7218 2 15.8441 2.02763 15.9592C2.05213 16.0613 2.09253 16.1588 2.14736 16.2483C2.2092 16.3492 2.29568 16.4357 2.46863 16.6086L7.39137 21.5314C7.56432 21.7043 7.6508 21.7908 7.75172 21.8526C7.84119 21.9075 7.93873 21.9479 8.04077 21.9724C8.15586 22 8.27815 22 8.52274 22H15.4773C15.7218 22 15.8441 22 15.9592 21.9724C16.0613 21.9479 16.1588 21.9075 16.2483 21.8526C16.3492 21.7908 16.4357 21.7043 16.6086 21.5314L21.5314 16.6086C21.7043 16.4357 21.7908 16.3492 21.8526 16.2483C21.9075 16.1588 21.9479 16.0613 21.9724 15.9592C22 15.8441 22 15.7218 22 15.4773V8.52274C22 8.27815 22 8.15586 21.9724 8.04077C21.9479 7.93873 21.9075 7.84119 21.8526 7.75172C21.7908 7.6508 21.7043 7.56432 21.5314 7.39137L16.6086 2.46863C16.4357 2.29568 16.3492 2.2092 16.2483 2.14736C16.1588 2.09253 16.0613 2.05213 15.9592 2.02763C15.8441 2 15.7218 2 15.4773 2H8.52274C8.27815 2 8.15586 2 8.04077 2.02763C7.93873 2.05213 7.84119 2.09253 7.75172 2.14736C7.6508 2.2092 7.56432 2.29568 7.39137 2.46863L2.46863 7.39137C2.29568 7.56432 2.2092 7.6508 2.14736 7.75172C2.09253 7.84119 2.05213 7.93873 2.02763 8.04077C2 8.15586 2 8.27815 2 8.52274Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ), traits: [NodeTraits.IS_TERMINAL], category: "Misc", name: "Exit", label: "Exit", description: "Use this node to terminate the workflow."
      },
      schema: {
        output: [],
        input: [],
      }
    },
  );

  const Delay = new Node(
    {
      options: {
        icon: (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12L7.72711 8.43926C7.09226 7.91022 6.77484 7.6457 6.54664 7.32144C6.34444 7.03413 6.19429 6.71354 6.10301 6.37428C6 5.99139 6 5.57819 6 4.7518V2M12 12L16.2729 8.43926C16.9077 7.91022 17.2252 7.6457 17.4534 7.32144C17.6556 7.03413 17.8057 6.71354 17.897 6.37428C18 5.99139 18 5.57819 18 4.7518V2M12 12L7.72711 15.5607C7.09226 16.0898 6.77484 16.3543 6.54664 16.6786C6.34444 16.9659 6.19429 17.2865 6.10301 17.6257C6 18.0086 6 18.4218 6 19.2482V22M12 12L16.2729 15.5607C16.9077 16.0898 17.2252 16.3543 17.4534 16.6786C17.6556 16.9659 17.8057 17.2865 17.897 17.6257C18 18.0086 18 18.4218 18 19.2482V22M4 2H20M4 22H20"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ), traits: [], category: "Time", name: "Delay", label: "Delay", description: "Pause execution for unit of time."
      },
      schema: {
        output: [],
        input: [],
      }
    },
  );

  const Generate = new Node(
    {
      options: {
        category: "AI",
        name: "Generate",
        label: "Generate",
        description: "Generate a voice-AI.",
        icon: (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path
              d="M19.7479 4.99993C21.1652 6.97016 22 9.38756 22 11.9999C22 14.6123 21.1652 17.0297 19.7479 18.9999M15.7453 7.99993C16.5362 9.13376 17 10.5127 17 11.9999C17 13.4872 16.5362 14.8661 15.7453 15.9999M9.63432 4.36561L6.46863 7.5313C6.29568 7.70425 6.2092 7.79073 6.10828 7.85257C6.01881 7.9074 5.92127 7.9478 5.81923 7.9723C5.70414 7.99993 5.58185 7.99993 5.33726 7.99993H3.6C3.03995 7.99993 2.75992 7.99993 2.54601 8.10892C2.35785 8.20479 2.20487 8.35777 2.10899 8.54594C2 8.75985 2 9.03987 2 9.59993V14.3999C2 14.96 2 15.24 2.10899 15.4539C2.20487 15.6421 2.35785 15.7951 2.54601 15.8909C2.75992 15.9999 3.03995 15.9999 3.6 15.9999H5.33726C5.58185 15.9999 5.70414 15.9999 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2091 6.29568 16.2956 6.46863 16.4686L9.63431 19.6342C10.0627 20.0626 10.2769 20.2768 10.4608 20.2913C10.6203 20.3038 10.7763 20.2392 10.8802 20.1175C11 19.9773 11 19.6744 11 19.0686V4.9313C11 4.32548 11 4.02257 10.8802 3.88231C10.7763 3.76061 10.6203 3.69602 10.4608 3.70858C10.2769 3.72305 10.0627 3.93724 9.63432 4.36561Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      schema: {
        input: [
          new STRING("prompt"),
          new BOOLEAN("use_gpu"),
          new NUMBER("temperature"),
        ],
        output: [
          new OBJECT("results",
            // fields
            [
              new BOOLEAN("success"),
            ]
          ),
        ],
      }
    },
  );

  // Client-side (React) builder.
  const builder = new AutoflowsBuilder()
    .add(Start)
    .add(Delay)
    .add(Exit)
    .add(Generate)

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
        <Panel position="top-center" className="p-2 border border-gray-200 bg-white max-w-[300px] w-full rounded-2xl flex flex-wrap gap-1">
          <div className="cursor-pointer text-slate-950 hover:bg-black hover:text-white p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
          </div>
          <div className="cursor-pointer text-slate-950 hover:bg-black hover:text-white p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
          </div>
        </Panel>

        <Panel position="top-right" className="border border-gray-200 bg-white max-w-[400px] w-full rounded-2xl flex flex-wrap gap-1 h-full min-h-screen">
          <main className='w-full p-3 h-auto'>

          </main>
        </Panel>

        <Panel position="top-left" className="h-full max-w-[330px] max-h-[700px] w-full flex flex-wrap">
          <div className="p-3 border border-gray-200 bg-white w-full space-y-3 text-slate-800 rounded-2xl">
            <section>
              <input type="text" className='text-sm w-full rounded-xl p-3 bg-slate-50 border border-gray-200' placeholder='Search node...' />
            </section>

            <section className='space-y-3 mt-4'>
              {[...new Set(builder.nodes.map(i => i.options.category))].map((category, index) => {
                const nodes = builder.nodes.filter(n => n.options.category === category)
                return <main className='space-y-1'>
                  <h1 className='font-semibold text-sm'>{category}</h1>
                  {nodes.map((node, index) => {
                    return (
                      <div
                        onClick={() => {
                          setNodes(prev => {
                            return [
                              ...prev,
                              { type: "BasicNode", id: randomBytes(8).toString("hex"), position: { x: 0, y: 0 }, data: { ...node.options, label: node.options.label || node.options.name, } },
                            ]
                          })
                        }}
                        key={index}
                        className="group hover:bg-black hover:text-white flex flex-wrap items-center gap-3 w-full p-4 border border-gray-200 cursor-pointer rounded-xl bg-white"
                      >
                        <div className="w-full flex items-center space-x-3">
                          {node.options.icon && (
                            <div className="flex-shrink-0 px-1">
                              {node.options.icon}
                            </div>
                          )}

                          <div className="flex flex-col">
                            <h2 className="font-semibold text-sm">
                              {node.options.label || node.options.name}
                            </h2>

                            <p className="text-xs text-gray-600 group-hover:text-gray-200">
                              {node.options.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </main>
              })}
            </section>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
