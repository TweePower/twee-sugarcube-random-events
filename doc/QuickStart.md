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

But the page looks very static, lifeless.
Let's add random events to make it more live
Step by step.

## Step 0 - Preparation

Here we will find out how to install random events library to your project

**If you use [[https://www.motoslave.net/tweego/|tweego]] to build your project, then**
Copy file [[https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.min.js|random-event.min.js]] (or you can use debug build: [[https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.js|random-event.js]])
And paste it into folder with other js files

> [!NOTE]
> if you don't use specific folder with js files then you can copy/paste content to passage with `[script]` tag

**If you use [[https://twinery.org/"|twinery]] to build your project, then**
Copy content from file [[https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.min.js|random-event.min.js]] (or you can use debug build: [[https://github.com/TweePower/twee-sugarcube-random-events/blob/main/dist/random-event.js|random-event.js]])
Open JavaScript window:
![How to open JS in Twinery](./images/twinery_js.png)
And paste content theare

## Step 1 - Embedded events (type: "embedded")

Here we will look at how to add embedded events to a passage.
Embedded events do not change the passage but only complement it.
Players can simply ignore this, so such events can be used to add optional events or to add background dialogs.
