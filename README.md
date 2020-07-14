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
value:code
```

### 3.存入缓存

```js
type:"addkey"
key:"key"       
value:"value"
password:"password"
```

```js
return
type:"addkey"
value:code
```

### 4.获取元素

```js
type:"getkey"
key:"key"
password:"password"
```

```js
return 
type:"getkey"
value:"json"
result:"code"
remark:"remark"
```

### 5.寻找元素是否存在

```js
type:"findkey"
key:"key"
password:"password"
```

```js
return
type:"findkey"
value:code
remark:"remark"
```


### 6.获得所有的Nodis缓存内容
```js
type:"getAll"
password:"password"
remark:"remark"
```

```js
return
type:"getAll"
result:"code"
value:"value"
```


### 7.增加某个key的值

```js
type:"raise"
password:"password"
key:"key"
value:"value"
```

```js
return
type:"raise"
result:"code"
remark:"remark"
```


### 8.增减少某个key的值

```js
type:"reduce"
password:"password"
key:"key"
value:"value"
```

```js
return
type:"reduce"
result:"code"
remark:"remark"
```

