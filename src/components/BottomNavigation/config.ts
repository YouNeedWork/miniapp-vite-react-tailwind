import { GAME_ICONS } from '../../constants/images';
import { ROUTES } from '../../constants/routes';

export const NAV_ITEMS = [
  { icon: GAME_ICONS.MINT, label: "Mine", path: ROUTES.HOME },
  { icon: GAME_ICONS.EARN, label: "Earn", path: ROUTES.EARN },
  { icon: GAME_ICONS.FRIENDS, label: "Friends", path: ROUTES.FRIENDS },
  { icon: GAME_ICONS.ME, label: "Me", path: ROUTES.ME },
] as const;