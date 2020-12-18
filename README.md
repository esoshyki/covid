## REDUX

Редакс нужен для того, чтобы создать один общий state для всего приложения, доступный внутри любого компонента, любой вложенности.

#### Создаем store

** /state/store.js **

```
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import countries from './reducers/countries'
import summary from './reducers/summary';
import chosenCountry from './reducers/chosenCountry'

const reducers = combineReducers({
  summary, countries, chosenCountry
})

const _createStore = () => {

  const preloadedState = {};

  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return store
}

export default _createStore
```

Эта функция создает **store**.

Это не сам стейт с данными. Это объект redux. 
У него есть 4 метода.
  * getState
  * dispatch
  * subscrube
  * replaceReducer

Два последних нам не нужны.

Store создается с помощью **редьюсеров**.
Можно обойтись одним, но я разделил на несколько с помощью combineReducers.

В редьюсере мы описываем поведение нашего стейта при возникновении (dispatch) "событий" (action'ов) конкретного типа.

dispatch - это функция, которая принимает action, благодаря которой, можно вызвать событие (action) указанного типа, 
и redux найдет в редьюсере тип этого события, и выполнит код, указанным там для  его обработки. Либо же, если он его не найдет, 
то вернет тот же стейт, что и был.

Подключаем мы state с помощью, wrapper'a ```<Provider>``` в **/pages/_app.js**, который мы ипортируем из библиотеки **react-redux**,
а также withRedux wrapper из **next-redux-wrapper** который предоставляет доступ к стор.

Это компонент ```<App>```. Самый верхний.

В остальных компонентах, доступ к **store** может быть получен, через wrapper **connect** из библиоткеи **react-redux**

Мы засовываем данные из стейта из стейта в пропсы компонента следующим образом:

```
const mapStateToProps = state => {

  return {
    population: state.summary.population,
    countries: state.countries,
    chosenCountry: state.chosenCountry
  }
}

export default connect(mapStateToProps)(App)
```
Все. Так как при изменении пропсов компонент обновляется. Нам больше не нужны никакие стейты.

### Диспатчим action'ы

При экспорте компонента через **connect** в props'ы попадает также уже известный нам метод dispatch.

Соответственно чтобы изменить стейт, нам нужно вызвать этот метод и передать в него в качестве аргумента action
с указанным **type** и **payload (если он необходим)**
Но, чтобы структуировать еще круче, в папке state/actions есть функции (например **chooseCountry**), которые 
получают данные с api, обрабатывают данные,( или могут делать еще то угодно,) - и, главное, **СОЗДАЮТ ACTION**,
с указанным **type** и **payload** и диспатчат его. 
Эти функции называются **actionCreator'**ами
Все, что нам нужно сделать, чтобы из любого компонента изменить стейт, это импортировать **actionCreator** и вызвать
метод dispath засунув туда сам **actionCreator**.
Стейт изменяется. А значит и пропсы всех компонентов, в которые есть сслыки на разделы и значения state переданные через
mapStateToProps. И так как результатом обработки action'а **всегда является новый объект** -
 ** все эти компоненты обновляются с новыми значениями стей**

Как-то так.

