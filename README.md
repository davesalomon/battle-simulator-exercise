# "RPG Battle Simulator"

### To run the project

1) Clone the repo
2) yarn install
3) yarn start

_Pro Tip: If you want to run a shorter game (where each characters has 10hp instead of 100), replace `yarn start` with `yarn start-short`._

_________________________________________________________________________________________________________

#### Cool Stuff

It works offline.

Visually, I think it looks pretty cool.

All assets (music, images) are free for commercial use and do not require attribution.


#### Observations

I originally had an Array of Hero/Monster, to support a 'party' or a group of
monsters. This hugely increased the complexity, so was removed. A lot of complexities were around
targeting a specific character, but it also meant more complex logic around game over checking, etc

Redux has changed a lot since I last used it (pre-hooks)! Redux Toolkit takes away
a lot of the mundane stuff I disliked having to write for Redux.


#### Problems that can be fixed with a bit more time

Accessibility is an issue. Whilst the game can be played using the keyboard, it's
a pretty poor UX. One way of overcoming this might be to focus on the Round Result text
after each round, before re-placing the focus on the 'Attack' button.

The "Attack" Model won't support a different number of sides on different die.
(e.g. 1x 6-sided die + 1x 10-sided die)

I like the thought of a dynamically-generated dice image, so I don't need to explicitly include an asset
for each possible roll. Even just using a number could work, like a d20 in D&D.
Similarly, the animation of the dice being 'rolled' doesn't match the dice model being used.
(e.g. If the dice was a D20, it would still only visually roll a 1-6.)

There's no Reset button when the game ends. (easy fix)

Needs loads more tests. I didn't want to delve too far from the standard create-react-app, but haven't yet used
React Testing Library. That, combined with getting up to speed with how Redux works today became a bit of a time sink,
so I didn't focus too much on tests.
