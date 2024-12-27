# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

#Repo Nº1
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# Add the repository to Apt sources:
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

#Repo Nº2
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

##======================================##
#Install docker

sudo apt-get update #To connect to docker repo
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

##======================================##
# Connect EC2 to github

#Create key
ssh-keygen -t ed25519 -C "firstName.lastName@gmail.com" # flag -t and -C not necessary

#Eval command make sure ssh-agent is running it returns pid
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/name-of-ssh-key

#View content of pub key to ctrl+c ctrl+v into github
cat ~/.ssh/name-of-ssh-key.pub

#Make sure it connected
ssh -T git@github.com

##Go to the repo you wanna clone click on code, go to ssh tab and git clone using that link

##======================================##