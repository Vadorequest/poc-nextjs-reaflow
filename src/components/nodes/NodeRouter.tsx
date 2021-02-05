import classnames from 'classnames';
import React from 'react';
import { NodeProps } from 'reaflow';
import { NodeData } from 'reaflow/dist/types';
import { useRecoilState } from 'recoil';
import { isDraggedNodeCloseState } from '../../states/isDraggedNodeCloseState';
import { isDraggedNodeDroppableState } from '../../states/isDraggedNodeDroppableState';
import { lastFocusedNodeState } from '../../states/lastFocusedNodeState';
import { selectedNodesState } from '../../states/selectedNodesState';
import BaseNodeData from '../../types/BaseNodeData';
import BaseNodeProps from '../../types/BaseNodeProps';
import BaseNodeType from '../../types/BaseNodeType';
import InformationNode from './InformationNode';
import QuestionNode from './QuestionNode';

type Props = {
  nodeProps: NodeProps;
  updateCurrentNode: (nodeData: Partial<BaseNodeData>) => void;
}

const NodeRouter: React.FunctionComponent<Props> = (props) => {
  const {
    nodeProps,
    updateCurrentNode,
  } = props;
  const [lastFocusedNode, setLastFocusedNode] = useRecoilState(lastFocusedNodeState);
  const [isDroppable, setDroppable] = useRecoilState(isDraggedNodeDroppableState);
  const [isDraggedNodeClose, setIsDraggedNodeClose] = useRecoilState(isDraggedNodeCloseState);
  const [selectedNodes, setSelectedNodes] = useRecoilState(selectedNodesState);

  console.log('router nodes', props);

  const { properties } = nodeProps || {};
  const { data } = properties || {};
  const { type }: { type: BaseNodeType } = data || {};

  if (!type) {
    try {
      console.error(`Node with type="${type}" couldn't be rendered. Properties: ${JSON.stringify(properties, null, 2)}`);
    } catch (e) {
      console.error(`Node with type="${type}" couldn't be rendered. Properties cannot be stringified.`);
    }

    return null;
  }

  const defaultStrokeWidth = 0;
  const strokeWidth = lastFocusedNode?.id === nodeProps.id && isDroppable && isDraggedNodeClose ? 10 : defaultStrokeWidth;

  const commonBlockProps: Partial<BaseNodeProps> = {
    ...nodeProps,
    updateCurrentNode,
    className: classnames({ 'dnd-closest': lastFocusedNode?.id === nodeProps.id }, `node node-${type}`),
    style: {
      strokeWidth: strokeWidth,
      fill: 'white',
      color: 'black',
    },
    onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData) => {
      console.log(`node clicked (${nodeProps?.properties?.text || nodeProps?.id})`, nodeProps)
      setSelectedNodes([node]);
    },
    onEnter: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: BaseNodeData) => {
      if (node?.id !== lastFocusedNode?.id) {
        setLastFocusedNode(node);
        console.log('setLastFocusedNode', node);
      }
    },
    onLeave: (event: React.MouseEvent<SVGGElement, MouseEvent>, node: BaseNodeData) => {
      if (lastFocusedNode?.id === node?.id) {
        setLastFocusedNode(undefined);
        console.log('setLastFocusedNode', undefined);
      }
    },
  };

  // console.log('rendering node of type: ', type, commonBlockProps)

  switch (type) {
    case 'information':
      return (
        <InformationNode
          {...commonBlockProps}
        />
      );
    case 'question':
      return (
        <QuestionNode
          {...commonBlockProps}
        />
      );
  }

  return null;
};

export default NodeRouter;
