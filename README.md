famous-angular-myapp01
=======================

A little tutorial for Famo.us / Angular.

Embedded in "Dynamic Presentation Frame":
- Directive <presentationframe> shows App in a device or fullscreen
- Play with attribute: switch with device="iPhone" / device="none"

##Remark:
- fa-app needs fixed width/height => not so nize
- width and height can not be bound to model values in current Angular version (planned for 3.0 !)
- directive '<presentationframe>' uses a very simple but effective solution:
  insert CSS dynamically with the computed widht/height.
  Not nice looking, but works - at least for quick tests and prototypes...

##Versions:
- famous-angular 0.3.0
- famous-0.2.2

##Based on:
- Copy of 'famous-angular-examples'
- require.js dependency removed
- stripped down some details

