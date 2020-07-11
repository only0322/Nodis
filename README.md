# Nodis

## 介绍
用Node.js实现的Redis

## 软件架构
软件架构说明


## 命令字格式(Json)

### 1.检查版本 

```js
type:"ping"
```

```js
return
type:"ping"
value:"version"
```

### 2.检查权限

```js
type:"check"
password:"password"
```

```js
return
type:"check"
value:true
```

### 3.存入缓存

```js
type:"add"
key:["a","b","c"]       //a.b.c = value
value:"value"
```

```js
return
type:"add"
value:true
```

### 4.获取元素

```js
type:"get"
key:["a","b","c"]   //获取a.b.c
```

```js
return 
type:"get"
value:"json"
```

### 5.寻找元素是否存在

```js
type:"find"
key:["a","b","c"]   //判断a.b.c是否存在
```

```js
return
type:"find"
value:true
```