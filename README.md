# Nodis

## 介绍
用Node.js实现的Redis

## 软件架构
语言:Node.js

数据库:MySQL

操作系统：全平台



## 命令字格式(Json)

命令字格式大小写任意，如ping，PING，Ping。

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
value:"code"
remark:"remark"
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
value:"code"
remark:"success"
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
value:"code"
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


### 8.减少某个key的值

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

## 配置文件示例

```ini
[main]
#Nodis的IP 端口
ip=127.0.0.1
port=13000

[mysql]
#暂时没用
ip=127.0.0.1
name=root
password=123456
dbname=Nodis


[Nodis]
#Nodis的版本号 ping的时候会返回
version=V0.0.1
#用户密码的MD5
password=E10ADC3949BA59ABBE56E057F20F883E


[solid]
#是否固化
isSolid=true
#固化间隔（秒）
setTime=5

#固化的文件名
logPathMac=/Users/hideyoshi/Desktop/codes/Nodis/solid.json
logPathWin=E:\gitee\Nodis\solid.json
logPathLinux=/Users/hideyoshi/Desktop/codes/Nodis/solid.json
logName=solid.json
logNameTemp=solid.json.temp
```