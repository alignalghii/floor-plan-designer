# To-do's

## Code metrics to-do's

 - Copy:
      - There are much more to-do's in the sourcecode: `grep TODO -r . --exclude-dir=.git`. Copy theme here too.
      - Copy Todos also from the exercise-book.
 - Use software metrics hint applications to follow the code quality: [jshint](https://jshint.com/), see also [DZone](https://dzone.com/articles/clean-code-isnt-a-goal-but-a-solution-how-to-write#8599)
 - Widget:
      - Do not micromanage to coordinate low-graphic-level and high-level always by hand when you move a polygon. Make a `Widget` class to take the responsibility to own a high-level and a low-level collaborator and manage them, delegate to them. `SvgGraphics` is too complicated. A clean Widget with collborators `AbstractPolygon` and `LowLevelSvg`: apply single-responsibility priciple and SOLID.
      - Write the test/spec for `PolygonWidget` first, in order to become simple (KISS).
      - `Board` is probably a design fault: it exposes a low-level detail (the polygon ID) to the high-level. The polygon ID should be a low-level detail hidden from the high-level. `Board` seems also to be redundant: the connection between high-level representation and low-level graphics is kept by Object ID, an OOP feature that can be frowned upon from the FP aspect, but the cose is anyway already imperative.
      - Read more design patters. E.g. notifier/subscriber, probably not used here.
      - Read several graphics, game, and collision detection libraries. Install TeamViewer, study the former code.
 - Use mock-based testing, maybe move from TDD on to BDD. See Martin Fowler's [article](https://martinfowler.com/articles/mocksArentStubs.html), maybe also a [video](https://www.youtube.com/watch?reload=9&v=YUcxik0PnWY).
 - Tidy the top level of the directory hierarchy, separate `test` vs `app` more clearly. Note that app may use test too.
 - Documentation
     - Comments. See [SO](https://www.quora.com/As-a-developer-what-is-the-thing-that-irritate-you-the-most-in-otherslines-of-code)
     - Write both user and developer doc
     - Function, var, class names, better naming revision
 - Write integrations tests too.
 - Naming revision, code revision.
 - How to implement class methods and constants in JavaScript?
 - Rewrite `eq`, `vecEq` and `prefix`: see the new `Eq.js` class.

