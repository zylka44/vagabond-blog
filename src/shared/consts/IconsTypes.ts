import deleteIcon from '../../assets/icons/deleteIcon.svg';
import upIcon from '../../assets/icons/upIcon.svg';
import downIcon from '../../assets/icons/downIcon.svg';
import downArrowIcon from '../../assets/icons/downArrowIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
import searchIcon from '../../assets/icons/searchIcon.svg';
import editIcon from '../../assets/icons/editIcon.svg';
import listIcon from '../../assets/icons/listIcon.svg';
import addIcon from '../../assets/icons/addIcon.svg';
import logoutIcon from '../../assets/icons/logoutIcon.svg';
import previewIcon from '../../assets/icons/previewIcon.svg';
import accountIcon from '../../assets/icons/accountIcon.svg';
import instagramIcon from '../../assets/icons/instagramIcon.svg';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.svg';
import rightArrowPinkIcon from '../../assets/icons/rightArrowPinkIcon.svg';
import locationIcon from '../../assets/icons/locationIcon.svg';
import okIcon from '../../assets/icons/okIcon.svg';
import eyeIcon from '../../assets/icons/eyeIcon.svg';
import eyeCrossedIcon from '../../assets/icons/eyeCrossedIcon.svg';

export type IconType =
  | 'account'
  | 'delete'
  | 'up'
  | 'down'
  | 'downArrow'
  | 'rightArrow'
  | 'rightArrowPink'
  | 'close'
  | 'search'
  | 'edit'
  | 'list'
  | 'add'
  | 'logout'
  | 'preview'
  | 'instagram'
  | 'location'
  | 'ok'
  | 'eye'
  | 'eyeCrossed';

export const iconUrl = {
  delete: deleteIcon,
  up: upIcon,
  down: downIcon,
  downArrow: downArrowIcon,
  close: closeIcon,
  search: searchIcon,
  edit: editIcon,
  list: listIcon,
  add: addIcon,
  logout: logoutIcon,
  preview: previewIcon,
  account: accountIcon,
  instagram: instagramIcon,
  rightArrow: rightArrowIcon,
  rightArrowPink: rightArrowPinkIcon,
  location: locationIcon,
  ok: okIcon,
  eye: eyeIcon,
  eyeCrossed: eyeCrossedIcon,
};
