---
layout: post
title: NPath complexity and cyclomatic complexity explained
description: NPath complexity and cyclomatic complexity sounds really scary, but they are fancy words for quite simple concepts, here is a simple explanation for them.
permalink: /npath-complexity-cyclomatic-complexity-explained/
categories: [complexity]
tags: [phpmd]
---

If you happen to be using [PHP Mess Detector](https://phpmd.org/) (which you should for any larger project) you have probably stumbled upon these two, but do you really know what they stand for? NPath complexity and cyclomatic complexity sounds really scary, but they are fancy words for quite simple concepts. Let's go through them and find out why they're important for maintainable and testable code. Both of these concepts are used in static code analysis and are measurements of how complex a function is.

<!-- more -->

## Cyclomatic complexity

This is a very straight forward concept, it's pretty well [documented](https://phpmd.org/rules/codesize.html#cyclomaticcomplexity) in PHPMD's documentation and what it does is pretty much count some statements. The standard threshold for this complexity is 10 points, if you have a function with higher complexity than that, you should try to reduce it.

It will begin by adding 1 point for the function declaration, after that it will add 1 point for every `if`, `while`, `for` and `case`. I'll copy the example code from PHPMD's documentation to illustrate how this function ends up with a cyclomatic complexity of 12.

```php
<?php
class Foo
{
1   public function example() {
2       if ($a == $b) {
3           if ($a1 == $b1) {
                fiddle();
4           } else if ($a2 == $b2) {
                fiddle();
            } else {
                fiddle();
            }
5       } else if ($c == $d) {
6           while ($c == $d) {
                fiddle();
            }
7       } else if ($e == $f) {
8           for ($n = 0; $n > $h; $n++) {
                fiddle();
            }
        } else {
            switch ($z) {
9               case 1:
                    fiddle();
                    break;
10              case 2:
                    fiddle();
                    break;
11              case 3:
                    fiddle();
                    break;
12              default:
                    fiddle();
                    break;
            }
        }
    }
}
```

Not that hard, huh?

## NPath complexity

The [PHPMD documentation](https://phpmd.org/rules/codesize.html#npathcomplexity) on this used to be confusing, saying:

> The NPath complexity of a method is the number of acyclic execution paths through that method.

Huh, what? That made no sense to me. Since initially writing this blog post, I finally contributed [a pull request](https://github.com/phpmd/phpmd/pull/954) to make more sense of it. It's fancy talk for simple stuff. The simple explanation is how many "paths" there are in the flow of your code. Or it could be described as the number of possible outcomes for a function/method. Hence my suggested update to the documentation, with the following example code included.

> The NPath complexity of a method is the number of acyclic execution paths through that method, that is how many possible outcomes it has.

Let's look at the simple example function.

```php
<?php
function foo($a, $b)
{
    if ($a > 10) {
        echo 1;
    } else {
        echo 2;
    }
    if ($a > $b) {
        echo 3;
    } else {
        echo 4;
    }
}

foo(1, 2); // Outputs 24
foo(11, 1); // Outputs 13
foo(11, 20); // Outputs 14
foo(5, 1); // Outputs 23
```

Here we have a function with 4 possible outcomes, since we have 2 statements that have 2 possible outcomes each (`2 * 2 = 4`). That means that the function's NPath complexity is 4. If we would add another statement with 2 possible outcomes we would get a complexity of 8 since `2 * 2 * 2 = 8`.

The NPath complexity is exponential and could easily get out of hand, in old legacy code don't be surprised if you find functions with complexity over 100 000. The default value of the threshold for this complexity is 200, staying under that value is something you should strive for.

## Why is the complexity important?

Simple code is always better than complex code. This applies to areas as readability, maintainability and testability. Consider writing a unit test and you have a function with an NPath complexity of 16. This means that if you want 100% code coverage you need to test for 16 possible outcomes and that would end up in pretty messy tests. This goes against the entire philosophy of unit testing since you want as much isolation as possible when writing your tests. That's why you should always try to reduce complexity in your application.

Don't be scared of these seemingly scary concepts but instead embrace them and use them to your advantage.
