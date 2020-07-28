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
result:"version"
```

### 2.检查权限

```js
type:"check"
password:"password"
```

```js
return
type:"check"
result:"code"
remark:"remark"
```

### 3.存入缓存

```js
type:"add"
key:"key"       
value:"value"
password:"password"
```

```js
return
type:"add"
result:"code"
remark:"success"
```

### 4.获取元素

```js
type:"get"
key:"key"
password:"password"
```

```js
return 
type:"get"
value:"json"
result:"code"
remark:"remark"
```

### 5.寻找元素是否存在

```js
type:"find"
key:"key"
password:"password"
```

```js
return
type:"find"
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

### 9.开启一段事务
```js
type:"trans"
password:"password"
value:"[{type:reduce,key:a,value:b},{type:getall},etc]"
```

```js
return 
type:"trans"
result:"code"
remark:"success" or "xxx command error" or "other"
```
### 10.删除某个缓存的内容
```js
type:"delete"
password:"password"
key:"key"
```

```js
return
type:"delete"
result:"code"
remark:"remark"
```

### 11.更新某个key的值
```js
type:"update"
password:"password"
key:"key"
value:"value"
```
```js 
return
type:"update"
result:"code"
remark:"remark"
```

### 12.上锁
```js
type:"setlock"
password:"password"
key:"key"
value:"time"
```
```js
return 
type:"setlock"
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
#是否需要密码
usePassword=true

#AESKey=9cd5b4cf899492077b4a125a79af8e76
#AESiv=e6db271db12d4d47


[solid]
#是否固化
isSolid=true
#固化间隔（秒）
setTime=3
#固化的文件路径
logPathMac=/Users/hideyoshi/Desktop/codes/Nodis/
logPathWin=E:/gitee/Nodis/
logPathDef=./

#固化的文件名
logName=solid.json
logNameTemp=solid.json.temp

#useEncrypt=true

[lock]
#在无法得到锁的时候尝试多少次
trys=10
#每次尝试的时间间隔
ms=300
#是否启用锁
uselock=true
```