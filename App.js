
import React,{ Component } from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigators/AppNavigator';
import codePush from "react-native-code-push";
import store from './store';
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export default class App extends Component {
    render() {
        /**
         * 将store传递给App框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>
    }

    componentDidMount(){
            codePush.sync({
                updateDialog: true,
                installMode: codePush.InstallMode.IMMEDIATE,
                mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
                //deploymentKey为刚才生成的,打包哪个平台的App就使用哪个Key
                deploymentKey: 'KO4qebOmTclQsyPt4VwCgPs58A1Hce57de8f-ccfd-4815-8461-6fbb510379d0',
          });
      }

}




