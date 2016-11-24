# lazyLoad
图片懒加载

使用方法：
```html
<img class="lazy" data-original="img/bmw_m1_hood.jpg" width="765" height="574">
注意：data-original是你的图片路径，class为lazy,需要固定宽高;
```
js:
1.在页面中引入
```javascript
<script type="text/javascript" src="lazyload.js"></script>
```
2.调用
```javascript
<script>new lazyLoad({/*可以传入一个对象覆盖默认选项，选项见下方*/})</script>
```    
可以自定义选项在实例化时传入:
1.{threshold:需要提前多少阈值加载图片,默认为0}<br>
2.{placeholder:自定义loading,默认为一张灰色背景}
   
