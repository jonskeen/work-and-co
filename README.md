# Work & Co Web Code Assessment

This is a copy of the [Redux Shopping Cart Example](https://github.com/reactjs/redux/tree/master/examples/shopping-cart).

To install dependencies, use the package manager [Yarn](https://yarnpkg.com/en/):

```
yarn
```

To start a development server:

```
yarn start
```

## Setup

Please create a new, public Github repository where your assessment can be reviewed. We recommend the following steps:

- Create a repository on your personal Github. Make sure the `Initialize this repository with a README` box is unchecked.
- Visit your new repository. Copy the `…or push an existing repository from the command line` code provided and run it in your terminal in the same directory as this README file. It will look something like this:

```
git remote add origin git@github.com:my-username/my-assessment.git
git push -u origin master
```

Note: You're encouraged to show your work by including multiple commits - we'll be looking through your git history.

## Tasks

1. [Implement Responsive Design](/tasks/01-responsive-design.md)
2. [Enhance Cart Functionality](/tasks/02-cart-enhancements.md)
3. [Hook Up Product API](/tasks/03-product-api.md)

You're welcome (but not required) to add any libraries you think would be helpful.

Please also update this README file: we'd love to see notes on your decision-making process, links to the most exciting pieces of code, or anything else that will give us additional context when reviewing your assessment.

## Notes on My Work
###Webpack and react-app-rewired
I used a plugin called "react-app-rewired" to make changes to the Webpack config without ejecting from create-react-app. I added several PostCSS plugins to bring in the custom media and style variables I'm used to working with; I added an SVG loader so I can import SVGs as React components; and I added a path resolution to the 'src' directory to make using relative paths feasible. This was all probably overkill for a small project, but I wanted to demonstrate a little more of my toolset and experience with Webpack.

[See the config-overrides here](./config-overrides.js).

###CSS Variables
As mentioned above, I made use of CSS variables in this codebase. Even on something small like this I find they provide a lot of value. For starters, once I get the variable set, I can stop referencing Sketch for the same values like hex codes or border radii.

That said, I really only used them for colors and font-families here. Normally I would scour the specs to identify the common spacings (i.e., margin and padding), font-sizes, letter-spacing, etc. and work with Design to come up with a style guide to ensure consistency across all modules in the project. The setup can be tedious, but the result is a very tight set of variables that can make sweeping changes when global updates are needed. It also makes theming possible, which can be useful for a platform that will be reskinned on an individual client basis.

My variables are broken into a few files. There are few enough here that I could have combined them into a single file, but I prefer the separation of concerns even at this level.
 
Variable files for [Colors](./src/globals/css/variables.colors.css), [Typography](./src/globals/css/variables.typography.css), and [Spacing](./src/globals/css/variables.spacing.css).   

###User Experience and the Update Button
I intentionally omitted the "Update" button from the checkout screen. My understanding is that a user would adjust quantities of items and hit update to see a new total. That would be really confusing for the user however, mainly because the update button is located between the invoice information and the update button. A user could quite easily update quantities, not realize the totals don't reflect the accurate totals (not to mention the quantities shown on screen aren't actually what's in the cart). 

Instead, I live-update the totals as the quantities are adjusted, and I allow the user to subtract quantities down to zero. When the modal closes without a submission, I look to see if any values in the cart have been zeroed out and I fully remove them from the cart. The next time the checkout modal opens, the empty items are no longer shown. I hope this is approach is ok - in real life I would talk to the UI/UX folks to express my concerns and work with them to come up with a better solution. I wanted to demonstrate my critical thinking process, and ability to add value to the UI/UX process, and this seemed like a good chance to do so. 

###Accessibility
I would have liked to make the checkout overlay more accessible (at least navigable by keyboard alone), but the version of React included with the sample predates my experience with React and the refs structure seems different enough that I didn't want to break what I had working so far. What I would do with more current versions is get a reference for the overlay and manually set focus to the first sensible element once the overlay was mounted. I know none of that was required, but my views on accessibility have recently changed and it sits much higher on my list of priorities than it used to. I have a lot to learn in this area, but I do think it's important and wanted to at least give it a mention.

The main product list is navigable via keyboard alone. I did a little work to make the tab flow sensible and I think it makes sense when using a screen reader or the VoiceOver utility included in OSX.

###Units and Responsiveness
My work should be responsive, however I use static values for padding and margins. In my experience, at least with AKQA, designers really like to keep those values static - i.e., predictable. However, I could have made them responsive as well by making use of the VH and VW units, but I really think the static values for these make more sense.

####A quick note on breakpoints!
I made my lowest breakpoint wider than the specs in order to keep the mobile view on wider phone screens like the iPhone 6/7/8 Plus.

[Custom Media Query Definitions](./src/globals/css/media-queries.css)

###Browser Compatibility
I developed in Chrome, but I did check out the app in Safari and FireFox on OSX and Safari and Chrome on iOS. I did not test IE or Edge because I don't think I can bring myself to do that voluntarily. I am familiar with writing (or installing!) polyfills to ensure my work is supported there as well and I am much less laissez faire about it in real settings.

I used the super helpful [ngrok](https://ngrok.com/) to test on my mobile because I have learned not to trust Chrome's emulation alone.