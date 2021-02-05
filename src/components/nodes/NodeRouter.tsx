import classnames from 'classnames';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import { NodeProps } from 'reaflow';
import { NodeData } from 'reaflow/dist/types';
import { useRecoilState } from 'recoil';
import { nodesState } from '../../states/nodesState';
import { selectedNodesState } from '../../states/selectedNodesState';
import BaseNodeData from '../../types/BaseNodeData';
import BaseNodeProps from '../../types/BaseNodeProps';
import BaseNodeType from '../../types/BaseNodeType';
import InformationNode from './InformationNode';
import QuestionNode from './QuestionNode';

type Props = {
  nodeProps: NodeProps;
}

const NodeRouter: React.FunctionComponent<Props> = (props) => {
  const {
    nodeProps,
  } = props;
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [selectedNodes, setSelectedNodes] = useRecoilState(selectedNodesState);

  // console.log('router nodes', props);

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

  /**
   * Updates the properties of the current node.
   *
   * @param nodeData
   */
  const updateCurrentNode = (nodeData: Partial<BaseNodeData>): void => {
    console.log('Updating current node with', nodeData);
    const nodeToUpdateIndex = nodes.findIndex((node: BaseNodeData) => node.id === nodeProps.id);
    console.log('updateCurrentNode nodeToUpdateIndex', nodeToUpdateIndex);
    const nodeToUpdate = {
      ...nodes[nodeToUpdateIndex],
      ...nodeData,
      id: nodeProps.id, // Force keep same id to avoid edge cases
    };
    console.log('updateCurrentNode updated node', nodeToUpdate);

    const newNodes = cloneDeep(nodes);
    newNodes[nodeToUpdateIndex] = nodeToUpdate;
    console.log('updateCurrentNode new nodes', newNodes);

    setNodes(newNodes);
  };

  /**
   * When clicking on a node.
   *
   * @param event
   * @param node
   */
  const onNodeClick = (event: React.MouseEvent<SVGGElement, MouseEvent>, node: NodeData) => {
    console.log(`node clicked (${nodeProps?.properties?.text || nodeProps?.id})`, nodeProps);
    console.log(`node selected`, node);
    setSelectedNodes([node]);
  };

  /**
   * When the mouse enters a node (on hover).
   *
   * XXX Does not work because `foreignObject` is displayed on top of the Node. See https://github.com/reaviz/reaflow/issues/45
   *
   * @param event
   * @param node
   */
  const onNodeEnter = (event: React.MouseEvent<SVGGElement, MouseEvent>, node: BaseNodeData) => {

  };

  /**
   * When the mouse leaves a node (leaves hover area).
   *
   * XXX Does not work because `foreignObject` is displayed on top of the Node. See https://github.com/reaviz/reaflow/issues/45
   *
   * @param event
   * @param node
   */
  const onNodeLeave = (event: React.MouseEvent<SVGGElement, MouseEvent>, node: BaseNodeData) => {

  };

  /**
   * Node props applied to all nodes, no matter what type they are.
   */
  const commonNodeProps: Partial<BaseNodeProps> = {
    ...nodeProps,
    updateCurrentNode,
    className: classnames(
      `node node-${type}`,
    ),
    style: {
      strokeWidth: 0,
      fill: 'white',
      color: 'black',
    },
    onClick: onNodeClick,
    onEnter: onNodeEnter,
    onLeave: onNodeLeave,
  };

  // console.log('rendering node of type: ', type, commonBlockProps)

  switch (type) {
    case 'information':
      return (
        <InformationNode
          {...commonNodeProps}
        />
      );
    case 'question':
      return (
        <QuestionNode
          {...commonNodeProps}
        />
      );
  }

  return null;
};

export default NodeRouter;
