# Calculator Project

## A Challenge Project from an Instructional by Zell Liew

- #### Adapted for Node and coded by PGA

## Project Story
I undertook this approach to creating a calculator as a challenge to create a functional way to work with dataset values of DOM elements; giving a greater import to using the textContext and dataset values to separate concerns between what the user sees, and what the state of the data is at any given time. Zell's approach is pretty straighforward, and offers the student a challenge to work with DOM-centric functional programming. I personally needed to get back to writing templates for Node that used SCSS for a change, so adapting this one for my usage was a great deal more interesting than just the codepen Liew uses. I would also caution anybody undertaking this challenge to realize that Zell forces the student to follow along very closely with his method of coding; you really can't copy and paste on this one! There is also a bug in the final code, for his version; you can figure it out, if you look at my code -- an come up with a better version than I did!

#### Final Refactor Separation of Concerns
- Result string 
- Calculator State
- Visual State 

Liew had us create a refactored separation of concerns for the calculator function calls; a housing wrapper, if you will, to represent the current output string, the general state of the data, and the output visual state. This is a good reason for students to undertake this basic HTML/CSS/JS calculator -- really helps to structure the functional calls and nesting in these types of work; making a basic project like this also extensibly relevant to Angular,React,Vue and other frameworks using JS.

## Mods
- I totally modded the external CSS, and will likely re-write the calculator CSS in the future as well
- I had to change part of the state calculation to get the final refactor to work
- Originally this was a [codepen](https://codepen.io/zellwk/pen/pLgmGL) by Zell Liew, I modded it for Node.js using NPM and set SCSS watch/compile/update settings to use with liveserver




