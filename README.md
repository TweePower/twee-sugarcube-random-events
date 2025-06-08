# Random event for Twee/Sugarcube

Random event on steroids for Twee+SugarCube with percent threshold, groups, limitations, enable/disable, and many more

This library is based on [Twee SugarCube Passage Metadata Collector](https://github.com/TweePower/twee-sugarcube-passage-metadata-collector).

## Motivation

I found that many projects on Twee+Sugarcube write random events using.

- a set of conditions
- flags to turn random events on/off
- flags and counters to limit the triggering of events at a certain point in time
- and many duplicated codes if needed to trigger random events in other passages or by other conditions

As a result, the code is complex, difficult to maintain, and has bugs due to numerous duplicates.

I thought it would be convenient to describe trigger conditions and limit, and other settings directly in the "random event" passage and call this passage in the right place, something like that:

```html
<<RE [[MyRandomEventName]]>>
```

## Feature list

- **Configuration and Integration**: Add configuration directly to random event passage and effortlessly embed it into many passages using `<<RE>>`.
- **Event Enablement/Disabling**: Create an enabled or disabled random event by default and enable or disable it after the player reaches a needed checkpoint.
- **Event Trigger Chance**: Control and manage the chance of occurrence of a specific event or group of events.
- **Event Show Behavior**: Tailor event handling preferences, allowing embedding within the current page or direct redirection to a dedicated random event passage.
- **Event Filters**: Create a filter to control whether a random event precisely matches the conditions.
- **Event Grouping and Weighting**: Organize events into groups, assigning each event a weight and sequential number within the group. Choose between random or sequential event selection within groups.
- **Tagging System And Limitation Strategy**: Leverage tags with variable support and limitation strategy to restrict event activation based on prior occurrences, ensuring diverse gameplay experiences.
- **Event Blocking System**: A robust random event-blocking mechanism. Random events will be automatically blocked after the user is redirected to another random event passage to prevent multiple random events triggering in a single piece of time. Manual blocking from the JS code is also supported for advanced control.

## Quick Start

In the [Quick Start](./doc/QuickStart.md), you will learn step by step how to use the library to turn a huge piece of code into a single line `<<REGroup "MarketEvents" 1 100>>`.

<details><summary>!! Show/Hide how this code would be looked at without the library !!</summary>

```html
<<switch $currentDayTime>>\
    <<case "Morning">>\
        <<set _events = []>>\
        <<if ($marketDialogEventCalledAtMorningTimes < 10)>>\
            <<set _events.push('MarketDialogEvent8')>>\
            <<set _events.push('MarketDialogEvent9')>>\
        <</if>>\
        <<if (!$isMarketNeedHeroEventFinished)>>\
            <<set _events.push('MarketNeedHeroEvent')>>\
        <</if>>\
        <<if (!$isMarketStealEventCalledToday)>>\
            <<set _events.push('MarketStealEvent')>>\
        <</if>>\
        <<if _events.length > 0>>\
            <<set _r = random(0, _events.length - 1)>>\
            <<set _event = _events[_r]>>\
            <<if _event === 'MarketDialogEvent8' or _event === 'MarketDialogEvent9'>>\
                <<set $marketDialogEventCalledAtMorningTimes += 1>>\
                <<include [[_event]]>>\
            <</if>>\
            <<if _event === 'MarketNeedHeroEvent'>>\
                <<include [[MarketNeedHeroEvent]]>>\
            <</if>>\
            <<if _event === 'MarketStealEvent'>>\
                <<set $isMarketStealEventCalledToday = true>>\
                <<goto [[MarketStealEvent]]>>\
            <</if>>\
        <</if>>\
    <<case "Noon">>\
        <<set _events = []>>\
        <<if ($marketDialogEventCalledAtNoonTimes < 10)>>\
            <<set _events.push('MarketDialogEvent1')>>\
            <<set _events.push('MarketDialogEvent2')>>\
            <<set _events.push('MarketDialogEvent3')>>\
            <<set _events.push('MarketDialogEvent4')>>\
            <<set _events.push('MarketDialogEvent5')>>\
        <</if>>\
        <<if (!$isMarketNeedHeroEventFinished)>>\
            <<set _events.push('MarketNeedHeroEvent')>>\
        <</if>>\
        <<if (!$isMarketStealEventCalledToday)>>\
            <<set _events.push('MarketStealEvent')>>\
        <</if>>\
        <<if ($appleCount >= 5 and !$isMarketHiddenStoreEventCalledToday)>>\
            <<set _events.push('MarketHiddenStoreEvent')>>\
        <</if>>\
        <<if _events.length > 0>>\
            <<set _r = random(0, _events.length - 1)>>\
            <<set _event = _events[_r]>>\
            <<if _event === 'MarketDialogEvent1' or _event === 'MarketDialogEvent2' or _event === 'MarketDialogEvent3' or _event === 'MarketDialogEvent4' or _event === 'MarketDialogEvent5'>>\
                <<set $marketDialogEventCalledAtNoonTimes += 1>>\
                <<set _rr = random(0, 4)>>\
                <<include [[_event]]>>\
            <</if>>\
            <<if _event === 'MarketNeedHeroEvent'>>\
                <<include [[MarketNeedHeroEvent]]>>\
            <</if>>\
            <<if _event === 'MarketStealEvent'>>\
                <<set $isMarketStealEventCalledToday = true>>\
                <<goto [[MarketStealEvent]]>>\
            <</if>>\
            <<if _event === 'MarketHiddenStoreEvent'>>\
                <<set $isMarketHiddenStoreEventCalledToday = true>>\
                <<include [[MarketHiddenStoreEvent]]>>\
            <</if>>\
        <</if>>\
    <<case "Afternoon">>\
        <<set _events = []>>\
        <<if ($marketDialogEventCalledAtAfternoonTimes < 10)>>\
            <<set _events.push('MarketDialogEvent1')>>\
            <<set _events.push('MarketDialogEvent2')>>\
            <<set _events.push('MarketDialogEvent3')>>\
            <<set _events.push('MarketDialogEvent4')>>\
            <<set _events.push('MarketDialogEvent5')>>\
        <</if>>\
        <<if (!$isMarketNeedHeroEventFinished)>>\
            <<set _events.push('MarketNeedHeroEvent')>>\
        <</if>>\
        <<if (!$isMarketStealEventCalledToday)>>\
            <<set _events.push('MarketStealEvent')>>\
        <</if>>\
        <<if ($appleCount >= 5 and !$isMarketHiddenStoreEventCalledToday)>>\
            <<set _events.push('MarketHiddenStoreEvent')>>\
        <</if>>\
        <<if _events.length > 0>>\
            <<set _r = random(0, _events.length - 1)>>\
            <<set _event = _events[_r]>>\
            <<if _event === 'MarketDialogEvent1' or _event === 'MarketDialogEvent2' or _event === 'MarketDialogEvent3' or _event === 'MarketDialogEvent4' or _event === 'MarketDialogEvent5'>>\
                <<set $marketDialogEventCalledAtAfternoonTimes += 1>>\
                <<set _rr = random(0, 4)>>\
                <<include [[_event]]>>\
            <</if>>\
            <<if _event === 'MarketNeedHeroEvent'>>\
                <<include [[MarketNeedHeroEvent]]>>\
            <</if>>\
            <<if _event === 'MarketStealEvent'>>\
                <<set $isMarketStealEventCalledToday = true>>\
                <<goto [[MarketStealEvent]]>>\
            <</if>>\
            <<if _event === 'MarketHiddenStoreEvent'>>\
                <<set $isMarketHiddenStoreEventCalledToday = true>>\
                <<include [[MarketHiddenStoreEvent]]>>\
            <</if>>\
        <</if>>\
    <<case "Evening">>\
        <<set _events = []>>\
        <<if ($marketDialogEventCalledAtEveningTimes < 10)>>\
            <<set _events.push('MarketDialogEvent6')>>\
            <<set _events.push('MarketDialogEvent7')>>\
        <</if>>\
        <<if (!$isMarketNeedHeroEventFinished)>>\
            <<set _events.push('MarketNeedHeroEvent')>>\
        <</if>>\
        <<if (!$isMarketStealEventCalledToday)>>\
            <<set _events.push('MarketStealEvent')>>\
        <</if>>\
        <<if _events.length > 0>>\
            <<set _r = random(0, _events.length - 1)>>\
            <<set _event = _events[_r]>>\
            <<if _event === 'MarketDialogEvent6' or _event === 'MarketDialogEvent7'>>\
                <<set $marketDialogEventCalledAtEveningTimes += 1>>\
                <<set _rr = random(0, 4)>>\
                <<include [[_event]]>>\
            <</if>>\
            <<if _event === 'MarketNeedHeroEvent'>>\
                <<include [[MarketNeedHeroEvent]]>>\
            <</if>>\
            <<if _event === 'MarketStealEvent'>>\
                <<set $isMarketStealEventCalledToday = true>>\
                <<goto [[MarketStealEvent]]>>\
            <</if>>\
        <</if>>\
    <<case "Night">>\
        <<set _events = []>>\
        <<if (!$isMarketNeedHeroEventFinished)>>\
            <<set _events.push('MarketNeedHeroEvent')>>\
        <</if>>\
        <<if (!$isMarketStealEventCalledToday)>>\
            <<set _events.push('MarketStealEvent')>>\
        <</if>>\
        <<if _events.length > 0>>\
            <<set _r = random(0, _events.length - 1)>>\
            <<set _event = _events[_r]>>\
            <<if _event === 'MarketNeedHeroEvent'>>\
                <<include [[MarketNeedHeroEvent]]>>\
            <</if>>\
            <<if _event === 'MarketStealEvent'>>\
                <<set $isMarketStealEventCalledToday = true>>\
                <<goto [[MarketStealEvent]]>>\
            <</if>>\
        <</if>>\
<</switch>>
```

</details>

## Examples + Docs

Detailed documentation: [Documentation](./doc/Documentation.md)

> [!NOTE]
> TODO: JS API Documentation, CookBook with examples, minigame based on events

## Installation & Usage

You can find manual about how to install Random Events library here: [Quick start Step 0 - Preparation](./doc/QuickStart.md#step-0---how-to-install)

If you're using VSCode with the [Twee 3 Language Tools extension](https://marketplace.visualstudio.com/items?itemName=t3lt.twee3-language-tools), simply copy `'random-events.twee-config.yml'` into your project to automatically apply the correct macro configuration.

## How to use

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
    limitationStrategies: [
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

Also, if you have the random event `MyRandomEvent2` with the same limitationStrategies, it will not be triggered in the morning when `MyRandomEvent` is already triggered in the morning.

Because limitationStrategies works globally using tags. So you willn't have a mess with random events when they are called one by one.

But if you want to separate the random event from others, add `isSeparate: true` to limitationStrategies:

```html
    limitationStrategies: [
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

## Debug

If debug is enabled (see: https://www.motoslave.net/sugarcube/2/docs/#config-api-property-debug)

You can check logs in the browser console. Logs will look like this:

```text
Start random event MyRandomEvent
  Verify:
    + verify IsEnable using: definition configuration
      + event enabled
    + verify filter using: definition configuration
      + filter expression returns true
    + verify limitationStrategies using: definition configuration
    + verify threshold using: definition configuration
      + threshold passed (random=97 <= threshold=100)
```

## Support

If you find the bug, please create an issue or pull request.

I'm not a professional frontend developer, so I'll be glad if you help me to make randome events better :)

## Related Resources

- [SugarCube official repository](https://github.com/tmedwards/sugarcube-2)
- [SugarCube documentation](https://www.motoslave.net/sugarcube/2/)
- [Tweego documentation](https://www.motoslave.net/tweego/docs/)
- [Twee SugarCube Passage Metadata Collector](https://github.com/TweePower/twee-sugarcube-passage-metadata-collector)

## License

This project is licensed under the MIT License.
