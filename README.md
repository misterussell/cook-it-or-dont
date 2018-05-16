# cook-it-or-dont

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)

You know what I love? Cooking.

You know what I love more? Watching people cook.

You know what I love more more? Eating.

I consistently get frustrated with the state of Food Content on the web. Too much is wrong with it:
- Riddled with ads
- Either a deluge of text or expandable compartments
- Usually doesn't have measurement conversions
- Hard to find things that you can actually make

I'd like to attempt to do my part to solve this a bit. I'd like to learn a bit while doing that.

## Intentions
- A place to upload recipes.
- A place to organize recipes.
- A place to share recipes.
- A tool that can be used while cooking, i.e. a decent plaintext view.
- Computative measurements (don't require the user to translate everything)

## Stack/References
- React
- AWS AppSync
- [Real World FP](https://github.com/haskellcamargo/js-real-world-functional-programming)

## Installation
- Framework generation: npm install simple-react-app
- GraphQL tools/AWS Appsync: npm install aws-appsync aws-appsync-react react-apollo graphql-tag
- Cognito Login Tools: npm install --save-dev webpack json-loader + npm install --save amazon-cognito-identity-js
- Babel Polyfill: npm install --save-dev babel-polyfill ([see notes here](https://github.com/babel/babel-preset-env/issues/112))

## Best Practice Analysis
### - [https://www.bonappetit.com/](https://www.bonappetit.com/)
Probably my favorite food website. Great content an top of a well thought out UI. This is a good example of a header/content/footer site that priorizes the breadth of their content
##### Pros
- Ingredient lists are readable
- Breaks down equipment needs visually
- Practical Step by Step instructions
- Popup and modals aren't frequent/onPageLoad
- Ad placement doesn't break up flow of content
- Negative space embraced
- Filtering available when searching

##### Cons
- Image heavy
- Heavy scrolling required
- Mobile menu is extremely invasive
- Slow loadtime
- Overuse of images for Step by Step instructions
- Filtering only available when searching

### - [https://www.jamieoliver.com/](https://www.jamieoliver.com/)
Jamie Oliver is one of my food content producing heros. His attention to detail that drills down to healthy food options has translated rather well into his web platform. The recipe pages really shine. A broad spectrum of content as well.
##### Pros
- Fun Menu
- Difficulty ratings
- Detailed Step by Step instructions
- Text centric, images are highlights
- Ads are generally kept out of content flow

##### Cons
- Overactive home page
- Overuse of transitions
- Complete separation of ingredient / cook method on mobile: I feel the need to elaborate on this. Making people click when on a small mobile device when cooking is like asking me to get prepwork on my phone. My phone will get wet unless you let me scroll around to find what I need. I can use my clean wrist, or my nuckle. Don't make me click things while cooking!
- The amount of content can be a bit overwhelming

### - [http://theveganstoner.blogspot.com/](http://theveganstoner.blogspot.com/) (honorable mention)
How is a blogspot blog on my list of best practices? Because I've been visiting this website for years and actually continuously used it as a source of inspiration. Content management systems are still a viable method of knowledge transfer.
##### Pros
- Fun images
- Fast load time
- Information clear and easy to find

##### Cons
- Image centric - not accessible
- Filtering is impractical/not an option
