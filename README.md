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
typo(string)
```

| Before | After |
| --- | --- |
| *не в силах выдержать несовершенства мира - закрыл я очи* | *не![](assets/space.png)в![](assets/space.png)силах выдержать несовершенства мира![](assets/space.png)&mdash; закрыл я очи* |

## Options


### digits:

При достаточно широкой колонке цифры привязываются с двух сторон:

```js
typo(string, { digits: true })
```

| Before | After |
| --- | --- |
| *...купите 200 граммов водки и 30 граммов огурца* | *...купите![](assets/space.png)200![](assets/space.png)граммов водки и![](assets/space.png)30![](assets/space.png)граммов огурца* |

### digitsR

Привязывает цифры слева:

```js
typo(string, { digitsR: true })
```
| Before | After |
| --- | --- |
| *...купите 200 граммов водки и 30 граммов огурца* | *...купите 200![](assets/space.png)граммов водки и 30![](assets/space.png)граммов огурца* |



### header:

В заголовках приклеиваются длинные предлоги:
```js
typo(string, { header: true })
```
| Before | After |
| --- | --- |
| *Как ничего не понять и не подать виду* | *Как![](assets/space.png)ничего не![](assets/space.png)понять и![](assets/space.png)не![](assets/space.png)подать виду* |


### hyphen

расстановка переносов:
```js
typo(string, { hyphern: true })
```
| Before | After |
| --- | --- |
| TODO | TODO |

Регулярные выражения для переносов взяты с http://vyachet.ru/hyphen-russian-html-text/
