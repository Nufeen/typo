# Типограф

Cкрипт для расстановки переносов и привязывания предлогов в русскоязычных текстах. 


## Installation

В виде es6-модуля:
```js
import typo from './myPath/typo.js'
```

В виде npm-пакета:
```
TODO
```


## Usage

По умолчанию привязываются предлоги, тире заменяется на широкое:
```js
typo(string, { options })
```

## Options


### digits: 

При достаточно широкой колонке цифры привязываются с двух сторон:

```js
typo(string, { digits: true })
```

| Before | After |
| --- | --- |
| не в силах выдержать несовершенства мира закрыл я очи | не![](../assets/space.png)в![](../assets/space.png)силах выдержать несовершенства мира закрыл я очи |

### digitsR

Привязывает цифры слева:

```js
typo(string, { digitsR: true })
```
| Before | After |
| --- | --- |
| TODO | TODO |


### header: 

В заголовках приклеиваются длинные предлоги:
```js
typo(string, { header: true })
```
| Before | After |
| --- | --- |
| TODO | TODO |


### hyphern

расстановка переносов:
```js
typo(string, { hyphern: true })
```
| Before | After |
| --- | --- |
| TODO | TODO |

Регулярные выражения для переносов взяты с http://vyachet.ru/hyphen-russian-html-text/
