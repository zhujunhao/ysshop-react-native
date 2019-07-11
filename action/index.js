
import { onRefreshRecommend, onLoadMoreRecommend, onFlushRecommendFavorite} from './recommend';
import { onSearch,onLoadMoreSearch,onSearchCancel } from './search';
import { onLoadCategory } from './category';
import { onLoadFavoriteData } from './favorite';
import { onRefreshYdr,onLoadMoreYdr,onFlushYdrFavorite } from './ydr';
import { onThemeChange, onShowCustomThemeView, onThemeInit } from './theme';
import { onRefreshRelative, onLoadMoreRelative, onFlushRelativeFavorite } from './relative';
import { onLoginChange } from './loginStatus';
import { onRefreshInvite, onLoadMoreInvite } from './InvitePartners';
import { onLoadMyInfo } from './myInfo';

export default {
    onRefreshRecommend,
    onLoadMoreRecommend,
    onFlushRecommendFavorite,
    onSearch,
    onLoadMoreSearch,
    onSearchCancel,
    onLoadCategory,
    onLoadFavoriteData,
    onThemeChange,
    onShowCustomThemeView,
    onThemeInit,
    onRefreshYdr,
    onLoadMoreYdr,
    onFlushYdrFavorite,
    onRefreshRelative,
    onLoadMoreRelative,
    onFlushRelativeFavorite,
    onLoginChange,
    onRefreshInvite,
    onLoadMoreInvite,
    onLoadMyInfo
}