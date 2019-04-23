export default class NavigatorUtil {
    /**
     * 跳转到指定页面
     */
    static goPage(params,page) {
        const navigation = NavigatorUtil.navigation;
        if (!navigation) {
            console.log('NavigatorUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /**
     * 返回上一页
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置到首页
     */

    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate("HomePage");
    }

    /**
     * 重置到引导页
     */

    static resetToSlidePage(params) {
        const { navigation } = params;
        navigation.navigate("SliderImg");
    }

}