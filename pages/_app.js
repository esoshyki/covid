import '../styles/globals.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import _createStore from '../state/store';
import withRedux from "next-redux-wrapper";

function MyApp({ Component, pageProps, store }) {

  console.log(store)

  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
    )
}

export default withRedux(_createStore)(MyApp)
