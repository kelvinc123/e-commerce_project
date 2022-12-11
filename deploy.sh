PROJECT_NETWORK='final-project-network'
GATEWAY_IMAGE='gateway-image'
GATEWAY_CONTAINER='gateway-container'
GATEWAY_PORT='3000'
RATING_IMAGE='rating-image'
RATING_CONTAINER='rating-container'
RATING_PORT='9000'
PRODUCT_IMAGE='product-image'
PRODUCT_CONTAINER='product-container'
PRODUCT_PORT='6100'
PURCHASE_IMAGE='purchase-image'
PURCHASE_CONTAINER='purchase-container'
PURCHASE_PORT='7100'
PAYMENT_IMAGE='payment-image'
PAYMENT_CONTAINER='payment-container'
PAYMENT_PORT='7200'
USER_MANAGEMENT_IMAGE='user-management-image'
USER_MANAGEMENT_CONTAINER='user-management-container'
USER_MANAGEMENT_PORT='8000'

# export DOCKER_BUILDKIT=1
# export COMPOSE_DOCKER_CLI_BUILD=0

# clean up existing resources, if any
echo "----------Cleaning up existing resources----------"
docker container stop $GATEWAY_CONTAINER 2> /dev/null && docker container rm $GATEWAY_CONTAINER 2> /dev/null
docker container stop $PRODUCT_CONTAINER 2> /dev/null && docker container rm $PRODUCT_CONTAINER 2> /dev/null
docker container stop $PAYMENT_CONTAINER 2> /dev/null && docker container rm $PAYMENT_CONTAINER 2> /dev/null
docker container stop $PURCHASE_CONTAINER 2> /dev/null && docker container rm $PURCHASE_CONTAINER 2> /dev/null
docker container stop $RATING_CONTAINER 2> /dev/null && docker container rm $RATING_CONTAINER 2> /dev/null
docker container stop $USER_MANAGEMENT_CONTAINER 2> /dev/null && docker container rm $USER_MANAGEMENT_CONTAINER 2> /dev/null
docker network rm $PROJECT_NETWORK 2> /dev/null

# only cleanup
if [ "$1" == "cleanup-only" ]
then
  exit
fi

# create a custom virtual network
echo "----------creating a virtual network----------"
docker network create $PROJECT_NETWORK

# build the images from Dockerfile
echo "----------Building images----------"
docker build -t $GATEWAY_IMAGE --target gateway-build .
docker build -t $PRODUCT_IMAGE --target product-build .
docker build -t $PAYMENT_IMAGE --target payment-build .
docker build -t $PURCHASE_IMAGE --target purchase-build .
docker build -t $RATING_IMAGE --target rating-build .
docker build -t $USER_MANAGEMENT_IMAGE --target user-management-build .

# run the image and open the required ports
echo "----------Running sever app----------"
docker run -d -p $GATEWAY_PORT:$GATEWAY_PORT --name $GATEWAY_CONTAINER $GATEWAY_IMAGE
docker run -d -p $PRODUCT_PORT:$PRODUCT_PORT --name $PRODUCT_CONTAINER $PRODUCT_IMAGE
docker run -d -p $PAYMENT_PORT:$PAYMENT_PORT --name $PAYMENT_CONTAINER $PAYMENT_IMAGE
docker run -d -p $PURCHASE_PORT:$PURCHASE_PORT --name $PURCHASE_CONTAINER $PURCHASE_IMAGE
docker run -d -p $RATING_PORT:$RATING_PORT --name $RATING_CONTAINER $RATING_IMAGE
docker run -d -p $USER_MANAGEMENT_PORT:$USER_MANAGEMENT_PORT --name $USER_MANAGEMENT_CONTAINER $USER_MANAGEMENT_IMAGE

echo "----------watching logs from server----------"
echo "to view server logs use ./server_log.sh command"