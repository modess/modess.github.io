---
layout: post
title: The interface is dead, long live the interface!
description: Using interfaces just because you can or should is a bad decision, it often ends up with over-architectured application. Let's explore why this culture has evolved (especially in the Laravel world) and how to deal with it.
permalink: /the-interface-is-dead-long-live-the-interface/
---

For me personally, this topic has grown on me and I think it's time to address it. For a long time I think bad architectural decisions have been made because of an unhealthy culture. I don't consider this unhealthy culture to be an intentional one, it spawned from good intentions but along the way it backfired. I'd say mostly this is directed at the Laravel community, but it could perhaps apply to PHP in general (I honestly have no idea).

<!-- more -->

##  A tale from the Kingdom of Laravel

Let me tell you the tale of a kingdom, a kingdom once ruled by a King and a Prince. A not long, long time ago the King and Prince ruled this kingdom and they did this with a cunning use of craftsmanship, entrepreneurialism and knowledge. I'm talking about the _Kingdom of Laravel_ with its king _Taylor Otwell_ and prince _Jeffrey Way_. At this point I'd like to make it clear that these two fine nobles are in an exclusive league when it comes to contributing to the PHP community and this is in no way an attempt to slander them in any way, I have nothing but respect and admiration for them.

So what did they do? Taylor created the framework Laravel, today's most popular PHP framework (if you count by number of Github stars) and opened a world to many developers of a simple, clean and intuitive way of solving previously mundane tasks. Jeffrey started making screencasts and educating the newly converted Laravel developers with his smooth and soothing voice, often referred to as the _Morgan Freeman_ of Laravel/PHP. Later he created his service [Laracasts](https://www.laracasts.com) which is the number one resource for educational content for the framework, which I for the most part highly recommend.

There have of course been a number of contributors to the framework and its ecosystem, I just can't name them all but they shouldn't be ignored in any way. 

## So what went wrong?

The Laravel internals are based on a great architectural approach to building complex systems, where pretty much all parts are replaceable, extendable and testable. Looking under the hood of Laravel is a joy, and you can easily tell that a lot of thought and time have been spent on writing excellent code.

When Taylor went out to the public to promote his framework he did a couple of screencasts and was interviewed in podcasts and articles. Here he started promoting his architectural approach to Laravel and how you also could use this approach in your application. Jeffrey by extension also started promoting this way of writing code.

There wasn't any bad intentions in this of course, they just happily wanted to share what they thought was good architecture and code. And **it is** good architecture and code, no questions about that. However it **depends on the application** whether it's good or bad. 

## The interface problem

Now we're getting to the core of what I think went wrong, namely _interfaces_. Interfaces are an excellent tool for abstraction and polymorphism, making things interchangeable and makes it possible to write code that isn't coupled to an implementation but instead to an abstraction. One of the core principles of SOLID code. Something that is heavily used in Laravel's core making it possible for you for example to switch out your session storage to _Redis_ instead of files by one line of code.

However we live in a reality as software developers where we're more than often "locked" to a certain service, such as using MySQL as our data persistence layer. This will hardly ever change because situations where MySQL won't be able to handle the use case will be in an extreme minority.

In my experience you can divide the use cases for your code in two categories, is it dependent on **internal** or **external** systems? This is where I draw the line on whether I'd write an abstraction with an interface or not. And where do I draw the line between an internal and external dependency? Quite simple, an internal dependency is a system within your organization and an external dependency is a system outside your organization.

Is your application dependent on a MySQL database that is managed by your organization? That'd be an internal dependency. Is your application sending e-mails through a provider with an API? That'd be an external dependency, since you're relying on an external system. All in all, is your team or organization in charge of the system you're integrating with is the key factor.


Do you have a piece of code for sending e-mails to users through an API? Excellent, write an interface for it. Could be as simple as:

```php
<?php

interface EmailerInterface
{
  public function send(string $email, string $message);
}
```

A very simple example obviously, and the implementation would be more complex depending on the service. The thing here is that it might be a possible scenario that you'll switch provider for sending e-mails. This could be because of costs, or that your marketing department have found useful features in another service. So an interface for sending e-mails seems reasonable.

The problem with the "education" of Laravel developers through the _Kingdom of Laravel_ has been to view **all** systems as external dependencies, that could be your database, cache and file system. This is something great, since Laravel solves that dependency for you and you can easily switch it out! But when it comes to your business logic and domain, you won't hardly ever switch out your dependencies. More than often you hear the example of "we might want to switch from MySQL to MongoDB" and prepare the applications for that situation. And this is where I see that it all went wrong. We need to take responsibility and criticize this type of thinking that is not connected to delivering software in the real world.

In my experience companies **do not** switch their underlying data structure. Of course it happens in a few unicorn cases, but you'll probably be using the same data persistence layer for your general application infrastructure. Perhaps that some parts of an applications might be switched out, such as statistics to an external vendor that excels at just that which PHP doesn't.

## Why is this a problem?

Some might argue that it doesn't hurt with the abstraction since it's a "we might need it someday" type of issue. But I don't see it this way, to me it's a way to over-architecture your application. This leads to unnecessary complexity and cognitive load on the developers in the project, and especially when it comes to new developers on the project that has to learn this type of architecture.

You'll end up with 1-2 extra files for each class in your application. This will differ, but I've seen cases where each model, repository and service had an interface and in some cases a facade and a service provider. As an example:

```php
class User implements UserModelInterface
{
  //
}

class UserRepository implements UserRepositoryInterface
{
  //
}

class UserService implements UserServiceInterface
{
  //
}

class UserProvider extends ServiceProvider {
    public function register()
    {
        $this->app->bind(UserModelInterface::class, User::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }
}
```

This example I actually shortened it a bit, because under most circumstances I've seen this there have been an service provider for each binding (and I also didn't include the interfaces).

In the case of switching out a part of an application to another service, let's take the example of switching out generating statistical reports to another service, you'll realize that it's not the code that will be the majority of the work load. You'll have to migrate data, learn a new system, educate people in the new system, etc. The amount of time you've spent on preparing the code for this hypothetical scenario will seem irrelevant.

## Keep it simple

According to [Wikipedia](https://en.wikipedia.org/wiki/Occam%27s_razor), Occam's Razor is the problem-solving principle that states:

> "Entities should not be multiplied without necessity"

But is often commonly used as "the simplest explanation for something is usually the correct explanation". But if we stick we the intended purpose of this expression I think it applies very well to software architecture. It can be put in Of course it happens in a few unicorn cases, but in 99.9% of all cases in my experience you'll be using the same data persistence layer for your general application infrastructure.a simple pseudo code _if_ statement such as:

```php
if ($futureHoursSpent > $currentHourSpent) {
  $this->useAbstractionForEverything();
}
```

A statement to me that will in most cases be a falsy one. That's why I say that in most cases just keep it simple and solve the issues at hand instead of solving hypothetical future scenarios. Such as _Occam's Razor_ states, **do not multiply it without necessity**. Over-architecturing your application is creating technical debt when you don't have to.