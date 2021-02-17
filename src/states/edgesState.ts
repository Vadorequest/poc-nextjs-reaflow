import {
  atom,
  selector,
} from 'recoil';
import BaseEdgeData from '../types/BaseEdgeData';
import { hasDuplicates } from '../utils/array';
import { getCanvasDatasetFromLS } from '../utils/persistCanvasDataset';

/**
 * Used to know what are the edges currently displayed within the Canvas component.
 */
export const edgesState = atom<BaseEdgeData[] | undefined>({
  key: 'edgesState',
  default: undefined,
});

/**
 * Custom selector for the atom.
 *
 * Applies custom business logic and sanity check when manipulating the atom.
 */
export const edgesSelector = selector<BaseEdgeData[]>({
  key: 'edgesSelector',
  get: ({ get }): BaseEdgeData[] => {
    const currentEdges: BaseEdgeData[] | undefined = get(edgesState);

    if (typeof currentEdges === 'undefined') {
      return getCanvasDatasetFromLS()?.edges || [];
    } else {
      return currentEdges;
    }
  },

  /**
   * Ensures we don't update the edges if there are duplicates.
   *
   * @param set
   * @param get
   * @param reset
   * @param newValue
   */
  set: ({ set, get, reset }, newValue): void => {
    const hasDuplicateEdges = hasDuplicates(newValue as BaseEdgeData[], 'id');

    if (!hasDuplicateEdges) {
      // console.log('setEdgesSelector', newValue);
      set(edgesState, newValue);
    } else {
      const message = `Duplicate edge ids found, the edges weren't updated to avoid to corrupt the dataset.`;
      console.error(message, newValue);
      throw new Error(message);
    }
  },
});
