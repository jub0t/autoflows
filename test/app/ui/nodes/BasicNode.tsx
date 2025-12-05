import { Handle, Position } from "@xyflow/react";
import { PropsWithChildren } from "react";

export default function BasicNode(props: PropsWithChildren) {
    console.log(props)
    return <div className="bg-white rounded-xl border border-gray-200 py-3 px-5">
        <h1 className="font-semibold">{props.data.label}</h1>
        <p className="text-sm text-gray-700">{props.id}</p>

        <Handle type="source" position={Position.Right} className="bg-gray-200 text-gray-200"></Handle>
        <Handle type="target" position={Position.Left} className="bg-gray-200 text-gray-200"></Handle>
    </div>
}