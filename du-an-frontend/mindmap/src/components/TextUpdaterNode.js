"use client";
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const [name, setName] = useState(data.label);
  const [isRead, setIsRead] = useState(true);
  const ondblclick = () => {
    setIsRead(!isRead);
  };
  const onBlur = () => {
    if (!isRead) setIsRead(true);
  };
  const onChange = useCallback((evt) => {
    setName(evt.target.value);
    data.label = evt.target.value;
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        <input
          readOnly={isRead}
          id="text"
          name="text"
          onChange={onChange}
          onDoubleClick={ondblclick}
          onBlur={onBlur}
          className="nodrag"
          value={name}
        />
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      /> */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
