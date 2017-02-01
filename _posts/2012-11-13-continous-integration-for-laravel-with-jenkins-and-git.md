---
layout: post
title: 'Laravel & Jenkins: Continuous integration'
description: 'Learn how to set up continous integration with Laravel & Jenkins, just follow these simple steps!'
permalink: /continuous-integration-for-laravel-with-jenkins-and-git/
---

<span class="alert">I have published [an updated version of this post](https://modess.io/jenkins-php/) since this one is a bit outdated. The new post deals with PHP applications in general, and can easily be applied for continuous integration with Laravel Jenkins. Read it instead.</span>

This will be a hands on guide for setting up automated builds for a [Laravel](http://www.laravel.com) application using [Jenkins](http://www.jenkins-ci.org). Pretty much that when you do a commit, Jenkins will automagically make a build and in that check code errors and syntax, run unit tests and provide visual code coverage for your code base. Achieve continous integration for PHP with Laravel & Jenkins, along with other goodies. 

<!-- more -->

I've completely switched over to Laravel as my weapon of choice for PHP frameworks, I'm not going to get into details about why but the philosophy behind it is just as awesome as the code. One of the concepts is that the entire framework is **unit tested with 100% code coverage**, which makes it a perfect candidate for continuos integration. 

Jenkins is an open source continuos integration server that has gotten a lot of attention recently as the #1 open source continuos integration server. Mostly because its vast amount of plugins, which currently is 600+ as I'm writing this. We're going to use 10 of those to automate our test environment. This guide will use the following:

*   Ubuntu 12.10
*   PHP 5.4.6
*   Git
*   Jenkins

## Installing stuff

We're going to start off by installing all the necessary software for this to be possible. We'll start with PHP, Git and Jenkins.

```bash
sudo apt-get install php5 git-core curl jenkins
```

You will now be able to open Jenkins in your browser by going to `http://localhost:8080` to see if the installation worked. ![](/public/images/jenkins-dashboard.png) Then it's time to setup a Laravel installation.

```bash
cd /var/www
git clone https://github.com/laravel/laravel.git laravel
```

And now you'll a fresh installation of Laravel in `/var/www/laravel`. Now we continue by installing all the PHP packages through PEAR and also the plugins Jenkins need. Most of this is based on [jenkins-php](http://jenkins-php.org/). We also download the latest jenkins.war file since the one shipped with the standard package in Ubuntu has caused me nothing but problem.

```bash
sudo apt-get install php-pear
sudo pear config-set auto_discover 1
sudo pear install pear.phpqatools.org/phpqatools
curl -L http://updates.jenkins-ci.org/update-center.json | sed '1d;$d' | curl -X POST -H 'Accept: application/json' -d @- http://localhost:8080/updateCenter/byId/default/postBack
jenkins-cli -s http://localhost:8080 install-plugin checkstyle cloverphp dry htmlpublisher jdepend plot pmd violations xunit git
sudo wget -O /usr/share/jenkins/jenkins.war http://mirrors.jenkins-ci.org/war/latest/jenkins.war
sudo /etc/init.d/jenkins restart
```

Go to Jenkins web interface (when it has finished restarting) and go to `Manage Jenkins` -> `Configure System`, then scroll down until you find `Git Plugin`. Then fill in the git configuration for Jenkins, such as _jenkins_ as _jenkins@localhost_ and hit `Save`. ![](/public/images/jenkins-git-settings.png)

## Configure build

Now clone my github repository [laravel-jenkins](https://github.com/modess/laravel-jenkins) which is the boilerplate for all the config files and the Jenkins job.

```bash
cd /var/www
git clone git://github.com/modess/laravel-jenkins.git
mv laravel-jenkins/* laravel/
cd /var/www/laravel
```

Now you should have these files in your Laravel directory as well:

```
build/
    - code-browser/
    - coverage/
    - logs/
    - pdepend/
    - phpcs.xml (PHP Code Sniffer config)
    - phpmd.xml (PHP Mess Detector config)
build.xml (build config)
config.xml (Jenkins job config)
phpunit-bootstrap.php (PHPUnit bootstrap script)
phpunit.xml.dist (PHPUnit config)
```

## Configure Jenkins

Now we have to setup a job in Jenkins for building your application on commit. How this will work is that you add a hook to git which will trigger Jenkins to pull the code and start the automated build. Lucky you I have just like a TV chef prepared that for you. First we start by setting up the Job by moving it to Jenkins folder for jobs and reloading the configuration.

```bash
cat config.xml | jenkins-cli -s http://localhost:8080/ create-job laravel-job
sudo chown -R jenkins:jenkins /var/lib/jenkins/jobs/laravel-job  
jenkins-cli -s http://localhost:8080 reload-configuration
```

Then you must (but it's optional..) add a post-commit git hook, that will trigger every time you do a commit. What it does is notify the Jenkins that a commit has been made and that it should fetch the code and do an automated build.

```bash
vim .git/hooks/post-commit 
```

Then add this to that file and save

```bash
#!/bin/sh
curl http://localhost:8080/git/notifyCommit?url=/var/www/laravel
```

And we also need to make the git executable

```bash
chmod +x .git/hooks/post-commit
```

## Try out your new Laravel & Jenkins combo!

All you have to do now is make a commit.

```bash
git add .
git commit -m "Test autobuild in Jenkins"
```

After your commit you should see this in Jenkins, and the build should pass. Since Laravel ships with an example test (that just asserts true is true) you should have one passed test as well. ![](/public/images/jenkins-build.png) Congratulations, you have learned PHP continous integration for a Laravel application leveraging Jenkins and Git! Laravel & Jenkins go very smoothly hand in hand.
