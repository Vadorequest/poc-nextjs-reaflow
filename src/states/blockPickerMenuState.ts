import { atom } from 'recoil';
import BlockPickerMenu from '../types/BlockPickerMenu';

/**
 * Used to know the state of the block picker menu, whether it's displayed, where, etc..
 */
export const blockPickerMenuState = atom<BlockPickerMenu>({
  key: 'blockPickerMenuState',
  default: {
    isDisplayed: false,
  },
});