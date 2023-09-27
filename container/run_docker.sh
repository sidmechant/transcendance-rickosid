mkdir -p data
docker build -t scottmossnodejv4formation .
docker run -it -p 3000:3000 -p 5555:5555 -v /mnt/nfs/homes/sredjini/container/data:/data scottmossnodejv4formation