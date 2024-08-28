# Quick Start

Let's say you wrote the market passage

```html
:: QuickStartStep0Market
<img src="images/market.jpg">

You are in vegetable market, where the air was rich with the scent of fresh produce and the vibrant colors of the stalls created a lively, welcoming atmosphere.
As they moved through the crowd, the mix of sounds and smells enveloped them, grounding them in the simple beauty of the moment.

You have $appleCount apple(s).
<<link [[Buy an apple|passage()]]>><<set $appleCount += 1>><</link>>

<<button [[Reload page|passage()]]>><</button>>
<<button [[Return to Quick Start|QuickStart]]>><</button>>
```

[Open market passage preview](https://twee-sugarcube-random-events.nyc3.cdn.digitaloceanspaces.com/index.html)

But the page looks very static, lifeless.
Let's add random events to make it more live
Step by step.

## Step 0 - Preparation

Here we will find out how to install random events library to your project

**If you use [Tweego](https://www.motoslave.net/tweego/) to build your project, then**
Copy file [random-event.min.js](https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.min.js) (or you can use debug build: [random-event.js](https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.js))
And paste it into folder with other js files

> [!NOTE]
> if you don't use specific folder with js files then you can copy/paste content to passage with `[script]` tag

**If you use [Twinery](https://twinery.org/") to build your project, then**
Copy content from file [random-event.min.js](https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.min.js) (or you can use debug build: [random-event.js](https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.js))
Open JavaScript window:

![How to open JS in Twinery](./images/twinery_js.png)

And paste content theare

## Step 1 - Embedded events (type: "embedded")

Here we will look at how to add embedded events to a passage.
Embedded events do not change the passage but only complement it.
Players can simply ignore this, so such events can be used to add optional events or to add background dialogs.

Create two event passages

```html
    :: QuickStartStep1MarketNeedHeroEvent [passage_metadata]
    <<PassageMetadata>>{
        type: "embedded",
        threshold: 50,
    }<</PassageMetadata>>
    Hey, I know you! You are hero! Can you help me?
    ...
```

[Open full passage code](../twee/quickStart/step1/events/QuickStartStep1MarketNeedHeroEvent.twee)

```html
    :: QuickStartStep1MarketHiddenStoreEvent [passage_metadata]
    <<PassageMetadata>>{
        type: "embedded",
        threshold: 50,
    }<</PassageMetadata>>
    Hi there, do you want to buy really rare?
    ...
```

[Open full passage code](../twee/quickStart/step1/events/QuickStartStep1MarketHiddenStoreEvent.twee)

Add events into your passage

```html
    <<RE [[QuickStartStep1MarketNeedHeroEvent]]>>\
    <<RE [[QuickStartStep1MarketHiddenStoreEvent]]>>\
```

[Open full passage code](../twee/quickStart/step1/QuickStartStep1Market.twee)

That's it, now market passage looks better.
But those events are just optional. In the next step, let's add an event that interrupts the market and redirects the player to the event passage.

## Step 2 - Interrupting events (type: "goto")

Here we will look at how interrupting events works and how to add it to a passage.
Interrupting events redirects player to a event passage
Players can't skip it, so such events can be used to completely change the behavior of a passage.

Create event passages

```html
    :: QuickStartStep2MarketStealEvent [passage_metadata]
    <<PassageMetadata>>{
        type: "goto",
        threshold: 50,
    }<</PassageMetadata>>

    Entering the market, a girl ran up to you, hugged you, giggled and ran on
    As soon as you came to your senses, you discovered that she had pulled out your wallet
    ...
```

[Open full passage code](../twee/quickStart/step2/events/QuickStartStep2MarketStealEvent.twee)

Add events into your passage

```html
    <<RE [[QuickStartStep2MarketStealEvent]]>>\
```

[Open full passage code](../twee/quickStart/step2/QuickStartStep2Market.twee)

Now market passage contain interupting event

## Step 3 - Groupe events

Now, in the market passage, different events are called sequentially
It looks good, but there are several problems

* There is a possibility that several events will be called at once
* The probability that at least one event out of three will trigger is 87.5% (because three events are called sequentially by 50%)
* It is not clear how to make it so that exactly one event is called with 100% probability
To solve these problems, you can use groups

## Step 4 - Adding new events to the group

Groups also have one advantage: to add new events to groups, you no longer need to change the market passage
Now easy to add new events to group

## Step 5 - Enable/disable events

As the story progresses, some events can be turned on or off
In our example, this could be the QuickStartStep5MarketNeedHeroEvent event. After finishing this side quest need to disable the event

## Step 6 - Filters

Some events should not be available immediately after the start
Sometimes, you can enable them after some plot twist, but most often, it is easier to use filters
In our example, this could be QuickStartStep6MarketHiddenStoreEvent. You can add a filter so that this event is available only after five apples are purchased

## Step 7 - Limits

Everything looks good, but there are inconsistencies in the events that are repeated constantly
For example, some events are more logical to limit running only once a day, and other events can be limited by the time of day
We can use filters for that, but better to use limitations for that

## Results

Now the market looks more alive. There are side quests, dialogues, and a hidden store. And it all looks logical. Not all events are available from the start, some are available only once, and there are those that are available only at a certain time of day.
But the most important thing is that these events are very easy to maintain and add new events. Market passage does not have hundreds of if/else constructions that plunge you into horror, all the settings are in the events themselves, and market passage contains only one line

```html
<<REGroup "QuickStartStep7MarketEvents" 100>>
```

## Next steps

> [!WARNING]
> The following steps not done

* Detailed Documentations
* Enable/Disable events vs filters vs limits
* Complex passage with many possible events and groups
* How to debug events
* JS API
