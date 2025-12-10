import { Handle, Position } from "@xyflow/react";
import { PropsWithChildren } from "react";
import { NodeTraits } from "../../../../src/core/builder";

export default function BasicNode(props: any) {
    const traits = props.data?.traits || [];
    return <div onClick={() => {
    }} className={`${traits.includes(NodeTraits.IS_ROOT) || traits.includes(NodeTraits.IS_TERMINAL) ? '' : ''} border border-gray-200 bg-white cursor-pointer rounded-xl py-3 px-4`}>


        <div className="flex flex-wrap justify-start items-center space-x-3">
            <div className="w-full flex flex-wrap items-center space-x-1 text-xs">
                {props.data.icon && <div className="rounded-lg flex flex-wrap items-center justify-center bg-opacity-60">
                    {props.data.icon}
                </div>}

                <h1 className="font-semibold text-xs">{props.data.label}</h1>
            </div>

            <div className="w-full mt-5">
                <p className="text-xs opacity-80">{props.id}</p>
            </div>
        </div>

        {/* {JSON.stringify(props.data)} */}

        {!traits?.includes(NodeTraits.IS_TERMINAL) && <Handle type="source" position={Position.Right} className="bg-gray-200 text-gray-200"></Handle>}
        {!traits?.includes(NodeTraits.IS_ROOT) && <Handle type="target" position={Position.Left} className="bg-gray-200 text-gray-200"></Handle>}
    </div>
}