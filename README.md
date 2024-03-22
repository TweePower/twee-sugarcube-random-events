# Random event for Twee/Sugarcube

Random event on steroids for Twee+SugarCube with percent threshold, limitations, enable/disable, and many more

# Motivation

I found that many projects on Twee+Sugarcube write random events using.

- a set of conditions
- flags to enable/disable random events
- flags and counters to limit the triggering of events at a certain point in time
- and duplicate all that code if needed to trigger random events in other passage

As a result, the code is complex, difficult to maintain, and has bugs due to numerous duplicates.

I thought it would be convenient to describe trigger conditions and limit, and other settings directly in the "random event" passage and call this passage in the right place, something like that:

```html
<<RE [[MyRandomEventName]]>>
```

# Your new options:

- **Configuration and Integration**: Add configuration directly to random event passage and effortlessly embed it into many passages using `<<RE>>`.
- **Event Enablement/Disabling**: Create an enabled or disabled random event by default and enable or disable it after the player reaches a needed checkpoint.
- **Event Trigger Chance**: Control and manage the chance of occurrence of a specific event or group of events.
- **Event Show Behavior: Tailor event handling preferences, allowing embedding within the current page or direct redirection to a dedicated random event passage.
- **Event Filters**: Create a filter to control whether a random event precisely matches the conditions.
- **Event Grouping and Weighting**: Organize events into groups, assigning each event a weight and sequential number within the group. Choose between random or sequential event selection within groups.
- **Tagging System And Limitation Strategy**: Leverage tags with variable support and limitation strategy to restrict event activation based on prior occurrences, ensuring diverse gameplay experiences.
- **Event Blocking System**: A robust random event-blocking mechanism. Random events will be automatically blocked after the user is redirected to another random event passage to prevent multiple random events triggering in a single piece of time. Manual blocking from the JS code is also supported for advanced control.

# How to install

- Open compiled file https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.min.js
- Copy this file to your js folder
- Or copy content to your passage with [script] tag

That's it

# How to use

Open you random event passage, add tag 'passage_metadata', and add `<<PassageMetadata>>` with necessary settings
Example:

```html
:: MyRandomEvent [passage_metadata]
<<PassageMetadata>>{
    isEnabled: true,
    type: "goto",
}<</PassageMetadata>>\

Some content here
```

In necessary passage, call this random event using `<<RE [[MyRandomEvent]]>>`

That's all, `MyRandomEvent` will be triggered with a 100% chance.

But let's add some filters, thresholds, and limitations.

```html
<<PassageMetadata>>{
    isEnabled: true,
    type: "goto",
    threshold: 30,
    filter: `$myVar > 10`,
    tags: ["Chapter1", "SomePlaceName", "Daily", "$CurrentDayTime"],
    limitationStrategy: [
        { max: 1, tags: ["SomePlaceName", "Morning"] },
        { max: 1, tags: ["SomePlaceName", "Afternoon"] },
        { max: 1, tags: ["SomePlaceName", "Evening"] },
        { max: 2, tags: ["SomePlaceName", "Daily"]},
    ]
}<</PassageMetadata>>
```

And now the random event will be triggered:
- with a 30% chance
- when variable $myVar is greater than 10
- once when variable $CurrentDayTime is equal to "morning", "afternoon" or "evening" but no more than two times per day

Also, if you have the random event `MyRandomEvent2` with the same limitationStrategy, it will not be triggered in the morning when `MyRandomEvent` is already triggered in the morning.
Because limitationStrategy works globally using tags. So you willn't have a mess with random events when they are called one by one.

But if you want to separate the random event from others, add `isSeparate: true` to limitationStrategy:
```html
    limitationStrategy: [
        { max: 1, tags: ["SomePlaceName", "Morning"], isSeparate: true },
        { max: 1, tags: ["SomePlaceName", "Afternoon"], isSeparate: true },
        { max: 1, tags: ["SomePlaceName", "Evening"], isSeparate: true },
        { max: 2, tags: ["SomePlaceName", "Daily"]},
    ]
```

When the game day is over, you need to reset limitation counters. Just add this code in the necessary place:
```html
<<REResetByTag "Morning">>
<<REResetByTag "Afternoon">>
<<REResetByTag "Evening">>
<<REResetByTag "Daily">>
```

In some cases, you need to disable or enable some events.
It's especially useful when:
- player reaches some checkpoint
- Make some important decision
- Found some item or got some skill
- etc
Use this code:
```html
<<REDisable [[MyRandomEvent]]>>
<<REEnable [[MyRandomEvent2]]>>
```
Or by tag:
```html
<<REDisableByTag "Chapter1">>
<<REEnableByTag "Chapter2">>
```

# Debug

If debug is enabled (see: https://www.motoslave.net/sugarcube/2/docs/#config-api-property-debug)
You can check logs in the browser console. Logs will look like this:
```
Start random event MyRandomEvent
  Verify:
    + verify IsEnable using: definition configuration
      + event enabled
    + verify filter using: definition configuration
      + filter expression returns true
    + verify limitationStrategy using: definition configuration
    + verify threshold using: definition configuration
      + threshold passed (random=97 <= threshold=100)
```

# Examples + Docs

Not finished!
More examples and docs here https://html-preview.github.io/?url=https://github.com/TweePower/twee-sugarcube-random-events/blob/main/doc/index.html
Example twee files: https://github.com/TweePower/twee-sugarcube-random-events/tree/main/twee

# Support

If you find the bug, please create an issue or pull request.
I'm not a professional frontend developer, so I'll be glad if you help me to make randome events better :)
