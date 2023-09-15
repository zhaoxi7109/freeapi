#!/bin/sh

# 复制项目的文件到对应docker路径，便于一键生成镜像，该文件内容也可以手动完成
usage() {
	echo "Usage: sh copy.sh"
	exit 1
}


# copy sql
echo "begin copy sql "
cp ../sql/create_table.sql ./mysql/db

# copy html
echo "begin copy html "
cp -r ../freeapi-ui/dist/** ./nginx/html/dist


# copy jar
echo "begin copy freeapi-gateway "
cp ../freeapi-gateway/target/freeapi-gateway.jar ./freeapi/gateway/jar

echo "begin copy freeapi-core "
cp ../freeapi-core/target/freeapi-core.jar ./freeapi/core/jar

echo "begin copy freeapi-interface "
cp ../freeapi-core/target/freeapi-interface.jar ./freeapi/interface/jar

